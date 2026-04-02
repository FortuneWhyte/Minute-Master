import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import type { Session } from '@supabase/supabase-js';

export type ThemeType = 'light' | 'dark';

export interface ActionItem {
  id: string;
  task: string;
  assignee: string;
  status: 'Pending' | 'In Progress' | 'Completed';
}

export interface Motion {
  id: string;
  description: string;
  mover: string;
  seconder: string;
  result: 'Carried' | 'Defeated' | 'Tabled';
}

export interface Meeting {
  id: string;
  date: string;
  title: string;
  status: 'Completed' | 'Processing' | 'Error';
  motions: Motion[];
  actionItems: ActionItem[];
  minutesText: string;
  metadata?: {
    location?: string;
    attendance?: {
      boardMembers: number;
      residents: number;
    };
  };
}

interface AppState {
  // Auth
  session: Session | null;
  organizationId: string | null;
  organizationName: string;

  // UI
  theme: ThemeType;
  sidebarOpen: boolean;

  // Data
  meetings: Meeting[];
  currentMeetingId: string | null;
  loading: boolean;

  // Auth actions
  setSession: (session: Session | null) => void;
  loadProfile: () => Promise<void>;

  // UI actions
  toggleTheme: () => void;
  setSidebarOpen: (open: boolean) => void;
  setCurrentMeetingId: (id: string | null) => void;

  // Data actions (Supabase-backed)
  fetchMeetings: () => Promise<void>;
  addMotion: (meetingId: string, motion: Omit<Motion, 'id'>) => Promise<void>;
  updateMinutesText: (meetingId: string, text: string) => void;
  addActionItem: (meetingId: string, item: Omit<ActionItem, 'id'>) => Promise<void>;
  removeActionItem: (meetingId: string, itemId: string) => Promise<void>;
}

export const useAppStore = create<AppState>((set, get) => ({
  // Auth defaults
  session: null,
  organizationId: null,
  organizationName: '',

  // UI defaults
  theme: 'light',
  sidebarOpen: false,

  // Data defaults
  meetings: [],
  currentMeetingId: null,
  loading: false,

  // --- Auth Actions ---
  setSession: (session) => set({ session }),

  loadProfile: async () => {
    const { data, error } = await supabase
      .from('profiles')
      .select('organization_id, organizations(name)')
      .single();

    if (!error && data) {
      const orgName =
        (data.organizations as unknown as { name: string })?.name || '';
      set({
        organizationId: data.organization_id,
        organizationName: orgName,
      });
    }
  },

  // --- UI Actions ---
  toggleTheme: () =>
    set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  setCurrentMeetingId: (id) => set({ currentMeetingId: id }),

  // --- Data Actions ---
  fetchMeetings: async () => {
    const orgId = get().organizationId;
    if (!orgId) return;

    set({ loading: true });

    // Fetch meetings with their motions and action items
    const { data: meetingsData } = await supabase
      .from('meetings')
      .select('*')
      .eq('organization_id', orgId)
      .order('created_at', { ascending: false });

    if (!meetingsData) {
      set({ loading: false });
      return;
    }

    // For each meeting, fetch motions and action items
    const meetings: Meeting[] = await Promise.all(
      meetingsData.map(async (m) => {
        const { data: motions } = await supabase
          .from('motions')
          .select('*')
          .eq('meeting_id', m.id);

        const { data: actionItems } = await supabase
          .from('action_items')
          .select('*')
          .eq('meeting_id', m.id);

        return {
          id: m.id,
          date: m.date,
          title: m.title,
          status: m.status as Meeting['status'],
          minutesText: m.minutes_text || '',
          motions: (motions || []).map((mo) => ({
            id: mo.id,
            description: mo.description,
            mover: mo.mover,
            seconder: mo.seconder,
            result: mo.result as Motion['result'],
          })),
          actionItems: (actionItems || []).map((ai) => ({
            id: ai.id,
            task: ai.task,
            assignee: ai.assignee,
            status: ai.status as ActionItem['status'],
          })),
          metadata: {
            location: m.location || '',
            attendance: {
              boardMembers: m.board_members || 0,
              residents: m.residents || 0,
            },
          },
        };
      })
    );

    set({
      meetings,
      currentMeetingId: meetings.length > 0 ? meetings[0].id : null,
      loading: false,
    });
  },

  addMotion: async (meetingId, motion) => {
    const { data } = await supabase
      .from('motions')
      .insert({
        meeting_id: meetingId,
        description: motion.description,
        mover: motion.mover,
        seconder: motion.seconder,
        result: motion.result,
      })
      .select()
      .single();

    if (data) {
      set((state) => ({
        meetings: state.meetings.map((m) =>
          m.id === meetingId
            ? {
                ...m,
                motions: [
                  ...m.motions,
                  {
                    id: data.id,
                    description: data.description,
                    mover: data.mover,
                    seconder: data.seconder,
                    result: data.result,
                  },
                ],
              }
            : m
        ),
      }));
    }
  },

  updateMinutesText: (meetingId, text) => {
    // Optimistic local update (debounced save to DB happens in component)
    set((state) => ({
      meetings: state.meetings.map((m) =>
        m.id === meetingId ? { ...m, minutesText: text } : m
      ),
    }));

    // Fire-and-forget save to Supabase
    supabase
      .from('meetings')
      .update({ minutes_text: text })
      .eq('id', meetingId)
      .then();
  },

  addActionItem: async (meetingId, item) => {
    const { data } = await supabase
      .from('action_items')
      .insert({
        meeting_id: meetingId,
        task: item.task,
        assignee: item.assignee,
        status: item.status,
      })
      .select()
      .single();

    if (data) {
      set((state) => ({
        meetings: state.meetings.map((m) =>
          m.id === meetingId
            ? {
                ...m,
                actionItems: [
                  ...m.actionItems,
                  { id: data.id, task: data.task, assignee: data.assignee, status: data.status },
                ],
              }
            : m
        ),
      }));
    }
  },

  removeActionItem: async (meetingId, itemId) => {
    await supabase.from('action_items').delete().eq('id', itemId);

    set((state) => ({
      meetings: state.meetings.map((m) =>
        m.id === meetingId
          ? { ...m, actionItems: m.actionItems.filter((a) => a.id !== itemId) }
          : m
      ),
    }));
  },
}));
