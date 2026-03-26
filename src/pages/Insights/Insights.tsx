export default function Insights() {
  return (
    <div className="space-y-10">
      {/* Master Summary Bar (Signature Component) */}
      <section className="bg-surface-container-lowest rounded-lg p-6 shadow-sm border-l-4 border-primary flex items-center justify-between">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 w-full">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold mb-1">Total Meetings Processed</span>
            <span className="text-3xl font-extrabold text-primary">1,284</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold mb-1">Total Motions Carried</span>
            <span className="text-3xl font-extrabold text-on-surface">942</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold mb-1">Avg. Action Items / Meeting</span>
            <span className="text-3xl font-extrabold text-on-surface">6.4</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold mb-1">Minutes Time Saved</span>
            <span className="text-3xl font-extrabold text-primary-dim">12,400<span className="text-sm font-medium ml-1">min</span></span>
          </div>
        </div>
      </section>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-12 gap-6">
        {/* Meeting Trends (Line Chart Placeholder) */}
        <div className="col-span-12 lg:col-span-8 bg-surface-container-low rounded-xl p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-lg font-bold text-on-surface">Meeting Frequency</h3>
              <p className="text-sm text-on-surface-variant">Last 6 months processing trends</p>
            </div>
            <div className="flex gap-2">
              <span className="px-3 py-1 bg-surface-container-lowest rounded-full text-xs font-medium border border-outline-variant/15 text-on-surface-variant cursor-pointer hover:bg-primary-container hover:text-on-primary-container transition-colors">Monthly</span>
              <span className="px-3 py-1 bg-primary text-on-primary rounded-full text-xs font-medium cursor-pointer">Weekly</span>
            </div>
          </div>
          <div className="h-64 flex items-end justify-between px-4">
            {/* Custom Mock Line Chart with SVG */}
            <div className="w-full relative h-full flex flex-col justify-end">
              <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20">
                <div className="border-t border-slate-400 w-full h-0"></div>
                <div className="border-t border-slate-400 w-full h-0"></div>
                <div className="border-t border-slate-400 w-full h-0"></div>
                <div className="border-t border-slate-400 w-full h-0"></div>
              </div>
              <svg className="w-full h-full text-primary" preserveAspectRatio="none" viewBox="0 0 800 200">
                <path d="M0,150 C50,140 100,160 150,120 S250,80 300,90 S400,140 450,110 S550,50 600,60 S700,90 800,40" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4"></path>
                <path className="opacity-10" d="M0,150 C50,140 100,160 150,120 S250,80 300,90 S400,140 450,110 S550,50 600,60 S700,90 800,40 V200 H0 Z" fill="currentColor"></path>
              </svg>
              <div className="flex justify-between mt-4 text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">
                <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Insights Card */}
        <div className="col-span-12 lg:col-span-4 bg-primary rounded-xl p-8 text-on-primary relative overflow-hidden flex flex-col justify-between">
          <div className="relative z-10">
            <span className="material-symbols-outlined text-4xl opacity-50 mb-4" style={{ fontVariationSettings: "'FILL' 1" }}>lightbulb</span>
            <h3 className="text-2xl font-bold mb-4 tracking-tight">Key Trend Detected</h3>
            <p className="text-on-primary/80 leading-relaxed font-medium">
              "Board meetings are 15% more efficient since implementing standardized motion formats. This has reduced 'Postponed' outcomes by 8.4%."
            </p>
          </div>
          <div className="mt-8 relative z-10">
            <button className="bg-white/20 hover:bg-white/30 text-white border border-white/30 rounded-lg px-4 py-2 text-xs font-bold transition-all backdrop-blur-sm">View Recommendation</button>
          </div>
          {/* Decorative Graphic */}
          <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
        </div>

        {/* Motion Outcomes (Donut Chart Placeholder) */}
        <div className="col-span-12 md:col-span-5 bg-surface-container-lowest rounded-xl p-8 shadow-sm">
          <h3 className="text-lg font-bold text-on-surface mb-6">Motion Outcomes</h3>
          <div className="flex items-center gap-8">
            <div className="relative w-40 h-40 flex items-center justify-center">
              {/* SVG Donut */}
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                <circle className="stroke-slate-100" cx="18" cy="18" fill="none" r="15.915" strokeWidth="3"></circle>
                <circle className="stroke-primary" cx="18" cy="18" fill="none" r="15.915" strokeDasharray="65 35" strokeDashoffset="0" strokeWidth="4"></circle>
                <circle className="stroke-secondary" cx="18" cy="18" fill="none" r="15.915" strokeDasharray="25 75" strokeDashoffset="-65" strokeWidth="4"></circle>
                <circle className="stroke-error" cx="18" cy="18" fill="none" r="15.915" strokeDasharray="10 90" strokeDashoffset="-90" strokeWidth="4"></circle>
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="text-xl font-extrabold">942</span>
                <span className="text-[8px] uppercase font-bold text-on-surface-variant">Total</span>
              </div>
            </div>
            <div className="space-y-4 flex-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  <span className="text-sm font-medium text-on-surface-variant">Carried</span>
                </div>
                <span className="text-sm font-bold">65%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-secondary"></div>
                  <span className="text-sm font-medium text-on-surface-variant">Postponed</span>
                </div>
                <span className="text-sm font-bold">25%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-error"></div>
                  <span className="text-sm font-medium text-on-surface-variant">Defeated</span>
                </div>
                <span className="text-sm font-bold">10%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Item Efficiency (Progress bars) */}
        <div className="col-span-12 md:col-span-7 bg-surface-container-low rounded-xl p-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-on-surface">Efficiency by Project</h3>
            <span className="material-symbols-outlined text-slate-400">filter_list</span>
          </div>
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                <span>Core Product Infrastructure</span>
                <span>88% Complete</span>
              </div>
              <div className="h-2 w-full bg-white dark:bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-primary w-[88%] rounded-full"></div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                <span>Global Expansion Strategy</span>
                <span>42% Complete</span>
              </div>
              <div className="h-2 w-full bg-white dark:bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-primary-dim w-[42%] rounded-full"></div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                <span>Internal HR Policy Audit</span>
                <span>71% Complete</span>
              </div>
              <div className="h-2 w-full bg-white dark:bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-primary w-[71%] rounded-full"></div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                <span>Quarterly Investor Prep</span>
                <span>15% Complete</span>
              </div>
              <div className="h-2 w-full bg-white dark:bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-error w-[15%] rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Table Section (Editorial Style) */}
      <section className="bg-surface-container-lowest rounded-xl p-1 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-outline-variant/15 flex items-center justify-between">
          <h3 className="font-bold text-lg">Top Performance Metrics</h3>
          <button className="text-primary font-bold text-sm flex items-center gap-2 hover:underline">
            Export Report <span className="material-symbols-outlined text-sm">download</span>
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low/50">
                <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-bold text-on-surface-variant">Meeting Type</th>
                <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-bold text-on-surface-variant">Processing Speed</th>
                <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-bold text-on-surface-variant">Accuracy Score</th>
                <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-bold text-on-surface-variant">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-5 font-bold text-slate-900">Weekly Sync</td>
                <td className="px-6 py-5 text-slate-600">0.8s / min transcript</td>
                <td className="px-6 py-5">
                  <div className="flex items-center gap-2">
                    <span className="font-bold">98.2%</span>
                    <div className="flex text-amber-400"><span className="material-symbols-outlined text-xs" style={{ fontVariationSettings: "'FILL' 1" }}>star</span></div>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <span className="px-2 py-1 bg-primary-container text-on-primary-container rounded text-[10px] font-bold">OPTIMAL</span>
                </td>
              </tr>
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-5 font-bold text-slate-900">Board Meeting</td>
                <td className="px-6 py-5 text-slate-600">1.2s / min transcript</td>
                <td className="px-6 py-5">
                  <div className="flex items-center gap-2">
                    <span className="font-bold">96.5%</span>
                    <div className="flex text-amber-400"><span className="material-symbols-outlined text-xs" style={{ fontVariationSettings: "'FILL' 1" }}>star</span></div>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <span className="px-2 py-1 bg-primary-container text-on-primary-container rounded text-[10px] font-bold">OPTIMAL</span>
                </td>
              </tr>
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-5 font-bold text-slate-900">Project Kickoff</td>
                <td className="px-6 py-5 text-slate-600">0.6s / min transcript</td>
                <td className="px-6 py-5">
                  <div className="flex items-center gap-2">
                    <span className="font-bold">99.1%</span>
                    <div className="flex text-amber-400"><span className="material-symbols-outlined text-xs" style={{ fontVariationSettings: "'FILL' 1" }}>star</span></div>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <span className="px-2 py-1 bg-primary-container text-on-primary-container rounded text-[10px] font-bold">OPTIMAL</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
