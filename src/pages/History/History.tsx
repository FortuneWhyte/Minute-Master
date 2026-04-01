import { useAppStore } from '../../store/useAppStore';
import { useNavigate } from 'react-router-dom';

export default function History() {
  const { meetings, setCurrentMeetingId } = useAppStore();
  const navigate = useNavigate();

  const handleViewMeeting = (id: string) => {
    setCurrentMeetingId(id);
    navigate('/');
  };
  return (
    <>
      {/* Master Summary Bar */}
      <section className="w-full bg-surface-container-lowest rounded-xl shadow-sm mb-12 flex items-center p-6 border-l-4 border-primary">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase font-label">Total Minutes</span>
            <span className="text-3xl font-extrabold text-on-surface tracking-tight font-headline">1,284 <span className="text-sm font-medium text-slate-400 ml-1">mins</span></span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase font-label">Processed Projects</span>
            <span className="text-3xl font-extrabold text-on-surface tracking-tight font-headline">42 <span className="text-sm font-medium text-slate-400 ml-1">items</span></span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase font-label">Success Rate</span>
            <span className="text-3xl font-extrabold text-primary tracking-tight font-headline">98.2%</span>
          </div>
        </div>
      </section>

      {/* Header Section */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tighter text-on-surface font-headline mb-2">Meeting History</h1>
          <p className="text-slate-500 font-body">Review and manage your past processed minutes.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-5 py-2.5 bg-surface-container-low text-on-surface font-medium rounded-lg hover:bg-surface-container-high transition-colors text-sm">
            <span className="material-symbols-outlined text-lg">filter_list</span>
            <span>Status Filter</span>
          </button>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-primary text-on-primary font-medium rounded-lg shadow-sm hover:bg-primary-dim transition-colors text-sm">
            <span className="material-symbols-outlined text-lg">add</span>
            <span>New Process</span>
          </button>
        </div>
      </header>

      {/* Search and Filter Bar */}
      <div className="bg-surface-container-low p-2 rounded-xl mb-6 flex flex-col md:flex-row gap-2">
        <div className="relative flex-grow">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">search</span>
          <input className="w-full bg-surface-container-lowest border-none rounded-lg py-3 pl-12 pr-4 focus:ring-2 focus:ring-primary/20 text-sm text-on-surface" placeholder="Search by project name or date..." type="text" />
        </div>
        <select className="bg-surface-container-lowest border-none rounded-lg py-3 px-6 focus:ring-2 focus:ring-primary/20 text-sm text-on-surface font-medium min-w-[160px]">
          <option>All Status</option>
          <option>Completed</option>
          <option>Processing</option>
          <option>Error</option>
        </select>
      </div>

      {/* History Table / Card List */}
      <div className="space-y-4">
        {/* Table Header (Desktop) */}
        <div className="hidden md:grid grid-cols-12 px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-slate-400 font-label">
          <div className="col-span-2">Date</div>
          <div className="col-span-4">Project Name</div>
          <div className="col-span-2">Status</div>
          <div className="col-span-2">Motions</div>
          <div className="col-span-2 text-right">Actions</div>
        </div>
        {meetings.map((meeting) => (
          <div key={meeting.id} className="grid grid-cols-1 md:grid-cols-12 items-center bg-surface-container-lowest p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow gap-4 md:gap-0">
            <div className="col-span-2 text-sm text-slate-500 font-medium">{meeting.date}</div>
            <div className="col-span-4 font-headline font-bold text-on-surface">{meeting.title}</div>
            <div className="col-span-2">
              <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
                meeting.status === 'Completed' ? 'bg-emerald-100 text-emerald-700' :
                meeting.status === 'Processing' ? 'bg-blue-100 text-blue-700' :
                'bg-red-100 text-red-700'
              }`}>
                <span className={`w-1.5 h-1.5 rounded-full mr-2 ${
                  meeting.status === 'Completed' ? 'bg-emerald-500' :
                  meeting.status === 'Processing' ? 'bg-blue-500' :
                  'bg-red-500'
                }`}></span>
                {meeting.status}
              </span>
            </div>
            <div className="col-span-2 text-sm font-medium text-slate-600">
              {meeting.motions.length > 0 ? `${meeting.motions.length} Motions` : '--'}
            </div>
            <div className="col-span-2 flex justify-end gap-2">
              <button 
                onClick={() => handleViewMeeting(meeting.id)}
                className="p-2 text-primary hover:bg-primary-container/30 rounded-lg transition-colors" 
                title="View"
              >
                <span className="material-symbols-outlined">visibility</span>
              </button>
              <button className="p-2 text-primary hover:bg-primary-container/30 rounded-lg transition-colors disabled:opacity-50" title="Download PDF" disabled={meeting.status !== 'Completed'}>
                <span className="material-symbols-outlined">download</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <footer className="mt-12 flex items-center justify-between border-t border-slate-200 pt-8">
        <span className="text-sm text-slate-500">Showing 1 to 4 of 42 results</span>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-surface-container-low text-on-surface rounded-lg text-sm font-medium hover:bg-surface-container-high disabled:opacity-50" disabled>Previous</button>
          <button className="px-4 py-2 bg-primary text-on-primary rounded-lg text-sm font-medium hover:bg-primary-dim">1</button>
          <button className="px-4 py-2 bg-surface-container-low text-on-surface rounded-lg text-sm font-medium hover:bg-surface-container-high">2</button>
          <button className="px-4 py-2 bg-surface-container-low text-on-surface rounded-lg text-sm font-medium hover:bg-surface-container-high">Next</button>
        </div>
      </footer>
    </>
  );
}
