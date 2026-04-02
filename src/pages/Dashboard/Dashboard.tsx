import { useState, useRef } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { supabase } from '../../lib/supabase';

export default function Dashboard() {
  const { meetings, currentMeetingId, updateMinutesText, organizationId, fetchMeetings } = useAppStore();
  const currentMeeting = meetings.find(m => m.id === currentMeetingId);

  const [transcriptFile, setTranscriptFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [processingStatus, setProcessingStatus] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleProcess = async () => {
    if (!transcriptFile || !organizationId) return;

    setProcessing(true);
    setProcessingStatus('Reading file...');

    try {
      // Read file text
      const text = await transcriptFile.text();
      setProcessingStatus('AI Engine processing transcript...');

      // Send to backend
      const res = await fetch('/api/process-transcript', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Processing failed');
      }

      const result = await res.json();
      setProcessingStatus('Saving to database...');

      // Save meeting to Supabase
      const { data: meetingData, error: meetingError } = await supabase
        .from('meetings')
        .insert({
          organization_id: organizationId,
          title: result.title || transcriptFile.name.replace(/\.[^/.]+$/, ''),
          date: result.date || new Date().toLocaleDateString(),
          status: 'Completed',
          minutes_text: result.minutes_text || '',
          location: result.location || '',
          board_members: result.board_members || 0,
          residents: result.residents || 0,
        })
        .select()
        .single();

      if (meetingError) throw new Error(meetingError.message);

      // Save motions
      if (result.motions?.length > 0) {
        await supabase.from('motions').insert(
          result.motions.map((m: { description: string; mover: string; seconder: string; result: string }) => ({
            meeting_id: meetingData.id,
            description: m.description,
            mover: m.mover,
            seconder: m.seconder,
            result: m.result,
          }))
        );
      }

      // Save action items
      if (result.action_items?.length > 0) {
        await supabase.from('action_items').insert(
          result.action_items.map((a: { task: string; assignee: string; status: string }) => ({
            meeting_id: meetingData.id,
            task: a.task,
            assignee: a.assignee,
            status: a.status || 'Pending',
          }))
        );
      }

      setProcessingStatus('Complete!');
      setTranscriptFile(null);
      if (fileInputRef.current) fileInputRef.current.value = '';

      // Refresh meetings from DB
      await fetchMeetings();

    } catch (err) {
      setProcessingStatus(`Error: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setProcessing(false);
      setTimeout(() => setProcessingStatus(''), 5000);
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-8">
      <div className="flex-1 space-y-12">
        {/* Signature Component: Master Summary Bar */}
        <section className="bg-surface-container-lowest rounded-lg p-6 shadow-sm border-l-4 border-primary flex flex-wrap items-center justify-between gap-6">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-widest text-tertiary">Current Project</span>
            <h2 className="text-xl font-bold text-on-surface">{currentMeeting?.title || 'No Project Selected'}</h2>
          </div>
          <div className="flex gap-12">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-tertiary">Status</span>
              <div className="flex items-center gap-2 text-primary font-semibold">
                <span className="material-symbols-outlined text-sm">
                  {currentMeeting?.status === 'Processing' ? 'sync' : currentMeeting?.status === 'Completed' ? 'check_circle' : 'radio_button_unchecked'}
                </span>
                {currentMeeting?.status || 'Awaiting Upload'}
              </div>
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-tertiary">Detected Motions</span>
              <p className="text-2xl font-bold text-on-surface">{String(currentMeeting?.motions.length || 0).padStart(2, '0')}</p>
            </div>
          </div>
        </section>

        {/* Section 1: Input Gate */}
        <section className="space-y-6" id="input-gate">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold tracking-tight text-on-surface">Upload Meeting Files</h3>
            <div className="flex items-center gap-2 text-sm text-tertiary">
              {processing ? (
                <>
                  <span className="material-symbols-outlined animate-spin text-primary">progress_activity</span>
                  {processingStatus}
                </>
              ) : processingStatus ? (
                <>
                  <span className="material-symbols-outlined text-primary">
                    {processingStatus.startsWith('Error') ? 'error' : 'check_circle'}
                  </span>
                  {processingStatus}
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-primary">smart_toy</span>
                  AI Engine Ready
                </>
              )}
            </div>
          </div>
          <div className="bg-surface-container-low rounded-xl p-8 space-y-4 hover:bg-surface-container-high transition-colors group">
            <div className="w-12 h-12 rounded-lg bg-primary-container flex items-center justify-center text-on-primary-container">
              <span className="material-symbols-outlined">description</span>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">Transcript File</label>
              <input
                ref={fileInputRef}
                className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-on-primary hover:file:bg-primary-dim transition-all"
                type="file"
                accept=".txt,.vtt,.srt"
                onChange={(e) => setTranscriptFile(e.target.files?.[0] || null)}
              />
              <p className="mt-2 text-xs text-on-surface-variant">Upload raw Zoom transcript (.txt or .vtt)</p>
              {transcriptFile && (
                <p className="mt-1 text-xs text-primary font-semibold">
                  Selected: {transcriptFile.name} ({(transcriptFile.size / 1024).toFixed(1)} KB)
                </p>
              )}
            </div>
          </div>
          <div className="flex items-end justify-end">
            <button
              onClick={handleProcess}
              disabled={!transcriptFile || processing}
              className="h-12 px-8 bg-gradient-to-br from-primary to-primary-dim text-on-primary font-semibold rounded-lg shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {processing ? 'Processing...' : 'Process Files'}
            </button>
          </div>
        </section>

        {/* Section 2: Extracted Data Preview */}
        <section className="space-y-6" id="preview">
          <h3 className="text-2xl font-bold tracking-tight text-on-surface">Extracted Data Preview</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {/* Metadata Card */}
            <div className="md:col-span-2 bg-surface-container-lowest p-6 rounded-xl shadow-sm border border-outline-variant/15 flex flex-col justify-between min-h-[160px]">
              <div className="flex justify-between items-start">
                <span className="px-3 py-1 bg-primary-container text-on-primary-container text-[10px] font-bold uppercase tracking-widest rounded-full">Metadata</span>
                <span className="material-symbols-outlined text-outline">event</span>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <p className="text-xs text-tertiary">Date &amp; Time</p>
                  <p className="font-semibold">{currentMeeting?.date || '—'}</p>
                </div>
                <div>
                  <p className="text-xs text-tertiary">Location</p>
                  <p className="font-semibold">{currentMeeting?.metadata?.location || '—'}</p>
                </div>
              </div>
            </div>
            {/* Attendance Card */}
            <div className="bg-surface-container-low p-6 rounded-xl min-h-[160px]">
              <div className="flex justify-between items-start mb-4">
                <span className="text-xs font-bold uppercase tracking-widest text-tertiary">Attendance</span>
                <span className="material-symbols-outlined text-outline">group</span>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">{currentMeeting?.metadata?.attendance?.boardMembers || 0} Board Members</p>
                <p className="text-sm font-medium text-on-surface-variant">{currentMeeting?.metadata?.attendance?.residents || 0} Residents</p>
              </div>
            </div>
            {/* Action Items Card */}
            <div className="bg-tertiary-container/30 p-6 rounded-xl min-h-[160px]">
              <div className="flex justify-between items-start mb-4">
                <span className="text-xs font-bold uppercase tracking-widest text-tertiary">Action Items</span>
                <span className="material-symbols-outlined text-tertiary">assignment_turned_in</span>
              </div>
              <p className="text-3xl font-bold text-tertiary">{String(currentMeeting?.actionItems.length || 0).padStart(2, '0')}</p>
              <p className="text-xs text-on-tertiary-fixed-variant">Pending assignment</p>
            </div>
            {/* Motions Table */}
            <div className="md:col-span-4 bg-surface-container-lowest p-8 rounded-xl shadow-sm border border-outline-variant/15">
              <div className="flex items-center justify-between mb-6">
                <h4 className="font-bold text-lg">Key Motions</h4>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-xs font-bold uppercase tracking-widest text-tertiary border-b border-outline-variant/10">
                      <th className="pb-4 font-bold">Motion Description</th>
                      <th className="pb-4 font-bold">Mover</th>
                      <th className="pb-4 font-bold">Seconder</th>
                      <th className="pb-4 font-bold">Result</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm divide-y divide-outline-variant/5">
                    {currentMeeting?.motions.map((motion) => (
                      <tr key={motion.id}>
                        <td className="py-4 pr-4 font-medium">{motion.description}</td>
                        <td className="py-4">{motion.mover}</td>
                        <td className="py-4">{motion.seconder}</td>
                        <td className="py-4 text-emerald-600 font-bold">{motion.result}</td>
                      </tr>
                    ))}
                    {(!currentMeeting?.motions || currentMeeting.motions.length === 0) && (
                      <tr>
                        <td colSpan={4} className="py-8 text-center text-on-surface-variant text-sm">
                          <span className="material-symbols-outlined text-3xl text-outline-variant block mb-2">upload_file</span>
                          Upload a transcript to extract motions
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Edit Mode */}
        <section className="space-y-6" id="edit">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold tracking-tight text-on-surface">Edit Meeting Minutes</h3>
            <div className="flex gap-2">
              <button className="p-2 hover:bg-surface-container-high rounded-lg transition-colors">
                <span className="material-symbols-outlined">format_bold</span>
              </button>
              <button className="p-2 hover:bg-surface-container-high rounded-lg transition-colors">
                <span className="material-symbols-outlined">format_italic</span>
              </button>
              <button className="p-2 hover:bg-surface-container-high rounded-lg transition-colors">
                <span className="material-symbols-outlined">format_list_bulleted</span>
              </button>
            </div>
          </div>
          <div className="relative group">
            <textarea
              className="w-full min-h-[400px] p-8 bg-surface-container-lowest rounded-xl shadow-inner border border-outline-variant/20 focus:ring-4 focus:ring-primary/5 focus:border-primary/40 transition-all font-body leading-relaxed text-on-surface resize-none"
              placeholder="Minutes text will appear here after processing..."
              value={currentMeeting?.minutesText || ''}
              onChange={(e) => currentMeeting && updateMinutesText(currentMeeting.id, e.target.value)}
            />
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-xs bg-surface-container-high px-2 py-1 rounded text-outline font-medium">Auto-saving...</span>
            </div>
          </div>
        </section>

        {/* Section 4: Actions */}
        <section className="bg-surface-container-low p-8 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-8" id="actions">
          <div className="max-w-md">
            <h4 className="font-bold text-lg mb-1">Finalize &amp; Document</h4>
            <p className="text-sm text-on-surface-variant">Review your edits one last time. Final PDF will follow condo template style with motions table and association branding.</p>
          </div>
          <div className="flex flex-wrap gap-4 w-full md:w-auto">
            <button className="flex-1 md:flex-none px-6 py-3 border border-outline-variant text-on-surface-variant font-semibold rounded-lg hover:bg-surface-container-high transition-all flex items-center justify-center gap-2 active:scale-95">
              <span className="material-symbols-outlined">refresh</span>
              Regenerate
            </button>
            <button className="flex-1 md:flex-none px-8 py-3 bg-primary text-on-primary font-bold rounded-lg shadow-xl shadow-primary/20 hover:bg-primary-dim transition-all flex items-center justify-center gap-2 active:scale-95">
              <span className="material-symbols-outlined">picture_as_pdf</span>
              Finalize &amp; Export PDF
            </button>
          </div>
        </section>

        <footer className="pt-8 text-center text-xs text-outline border-t border-outline-variant/10">
          <p>© 2026 Minute Master. Optimized for Professional Board Governance.</p>
        </footer>
      </div>
    </div>
  );
}
