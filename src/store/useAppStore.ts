import { create } from 'zustand';

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
    }
  }
}

interface AppState {
  theme: ThemeType;
  sidebarOpen: boolean;
  meetings: Meeting[];
  currentMeetingId: string | null;
  toggleTheme: () => void;
  setSidebarOpen: (open: boolean) => void;
  setCurrentMeetingId: (id: string | null) => void;
  addActionItem: (meetingId: string, item: Omit<ActionItem, 'id'>) => void;
  removeActionItem: (meetingId: string, itemId: string) => void;
  addMotion: (meetingId: string, motion: Omit<Motion, 'id'>) => void;
  updateMinutesText: (meetingId: string, text: string) => void;
}

const DUMMY_MEETINGS: Meeting[] = [
  {
    id: '1',
    date: 'Oct 24, 2023',
    title: 'Harborview Condominiums AGM',
    status: 'Completed',
    motions: [
      { id: 'm1', description: 'Approval of 2022 AGM Minutes as distributed', mover: 'Jane Cooper', seconder: 'Robert Fox', result: 'Carried' },
      { id: 'm2', description: 'Appointment of Auditor for the 2023 Fiscal Year', mover: 'Cody Fisher', seconder: 'Esther Howard', result: 'Carried' },
    ],
    actionItems: [
      { id: 'a1', task: 'Follow up on roof repairs', assignee: 'Jane Cooper', status: 'Pending' },
      { id: 'a2', task: 'Send out budget to residents', assignee: 'Robert Fox', status: 'Pending' },
      { id: 'a3', task: 'Get contractor quotes', assignee: 'John Doe', status: 'Pending' },
      { id: 'a4', task: 'Review new policy', assignee: 'Alice', status: 'Pending' },
      { id: 'a5', task: 'Update community board', assignee: 'Bob', status: 'Pending' },
    ],
    minutesText: `1. CALL TO ORDER\nThe meeting was called to order at 7:05 PM by the Chair, Mr. Henderson.\n\n2. PROOF OF NOTICE\nThe Secretary confirmed that notice of the meeting was mailed to all owners of record on October 1st, 2023.\n\n3. APPROVAL OF AGENDA\nIT WAS MOVED by Jane Cooper and SECONDED by Robert Fox that the agenda be approved as presented. CARRIED.\n\n4. CHAIR'S REPORT\nMr. Henderson discussed the recent roof repairs and the upcoming landscaping project for the North Wing. He noted that the budget remains on track despite increased utility costs.\n\n5. NEW BUSINESS: POOL DECK RENOVATIONS\nExtensive discussion regarding the tile selection for the pool area. The board reviewed three quotes from local contractors.`,
    metadata: {
      location: 'Zoom / Amenity Room',
      attendance: { boardMembers: 14, residents: 22 }
    }
  },
  {
    id: '2',
    date: 'Oct 20, 2023',
    title: 'Sunset Terrace Monthly',
    status: 'Processing',
    motions: [],
    actionItems: [],
    minutesText: '',
  },
  {
    id: '3',
    date: 'Oct 15, 2023',
    title: 'Riverside Heights Budget Meeting',
    status: 'Completed',
    motions: Array.from({length: 12}).map((_, i) => ({ id: `rm${i}`, description: `Budget Item ${i}`, mover: 'User', seconder: 'User', result: 'Carried' })),
    actionItems: [],
    minutesText: 'Budget approved.',
  },
  {
    id: '4',
    date: 'Oct 12, 2023',
    title: 'Oakwood Strategic Planning',
    status: 'Error',
    motions: [],
    actionItems: [],
    minutesText: '',
  }
];

export const useAppStore = create<AppState>((set) => ({
  theme: 'light',
  sidebarOpen: false,
  meetings: DUMMY_MEETINGS,
  currentMeetingId: '1',
  
  toggleTheme: () => set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  setCurrentMeetingId: (id) => set({ currentMeetingId: id }),
  
  addActionItem: (meetingId, item) => set((state) => ({
    meetings: state.meetings.map(m => m.id === meetingId ? {
      ...m, actionItems: [...m.actionItems, { ...item, id: Math.random().toString() }]
    } : m)
  })),
  
  removeActionItem: (meetingId, itemId) => set((state) => ({
    meetings: state.meetings.map(m => m.id === meetingId ? {
      ...m, actionItems: m.actionItems.filter(a => a.id !== itemId)
    } : m)
  })),

  addMotion: (meetingId, motion) => set((state) => ({
    meetings: state.meetings.map(m => m.id === meetingId ? {
      ...m, motions: [...m.motions, { ...motion, id: Math.random().toString() }]
    } : m)
  })),

  updateMinutesText: (meetingId, text) => set((state) => ({
    meetings: state.meetings.map(m => m.id === meetingId ? {
      ...m, minutesText: text
    } : m)
  }))
}));
