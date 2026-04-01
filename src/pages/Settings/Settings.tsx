import { useAppStore } from '../../store/useAppStore';

export default function Settings() {
  const { theme, toggleTheme } = useAppStore();
  return (
    <div className="max-w-5xl mx-auto">
      {/* Master Summary Bar (Signature Component) */}
      <div className="w-full bg-surface-container-lowest p-6 rounded-lg mb-12 flex items-center justify-between shadow-sm relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-full my-4 ml-0"></div>
        <div className="flex items-center gap-12 pl-4">
          <div>
            <p className="text-[10px] uppercase tracking-wider text-outline font-bold font-label mb-1">Active Plan</p>
            <h3 className="text-xl font-bold font-headline text-on-surface">Pro Workspace</h3>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-wider text-outline font-bold font-label mb-1">Storage used</p>
            <h3 className="text-xl font-bold font-headline text-on-surface">42% <span className="text-xs font-normal text-outline">of 10GB</span></h3>
          </div>
        </div>
        <div className="hidden sm:block">
          <button className="text-primary font-semibold text-sm hover:underline">View billing history</button>
        </div>
      </div>

      <div className="space-y-16">
        {/* Profile Section */}
        <section className="scroll-mt-24" id="profile">
          <div className="flex items-start justify-between mb-8">
            <div>
              <h2 className="text-3xl font-extrabold font-headline tracking-tight text-on-surface mb-2">Profile</h2>
              <p className="text-on-surface-variant max-w-md">Update your personal information and how others see you on the platform.</p>
            </div>
          </div>
          <div className="bg-surface-container-low rounded-xl p-8 space-y-8">
            <div className="flex items-center gap-8">
              <div className="relative group">
                <div className="h-24 w-24 rounded-full overflow-hidden bg-surface-container-highest border-4 border-surface-container-lowest">
                  <div className="h-full w-full bg-primary-container flex items-center justify-center">
                    <span className="text-2xl font-bold text-on-primary-container">AS</span>
                  </div>
                </div>
                <button className="absolute bottom-0 right-0 bg-primary text-on-primary p-2 rounded-full shadow-lg hover:scale-105 transition-transform">
                  <span className="material-symbols-outlined text-sm">edit</span>
                </button>
              </div>
              <div>
                <h4 className="font-headline font-bold text-lg mb-1">Avatar</h4>
                <p className="text-sm text-on-surface-variant mb-3">JPG, GIF or PNG. Max size 800K.</p>
                <div className="flex gap-3">
                  <button className="bg-primary-container text-on-primary-container px-4 py-1.5 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity">Upload new</button>
                  <button className="bg-surface-container-highest text-on-surface-variant px-4 py-1.5 rounded-lg text-sm font-semibold hover:bg-slate-200 transition-colors">Remove</button>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-[0.1em] font-bold text-outline font-label">Full Name</label>
                <input className="w-full bg-surface-container-lowest border-none rounded-lg p-3 text-on-surface focus:ring-2 focus:ring-primary/40 transition-all font-body text-sm" placeholder="Your name" type="text" defaultValue="Alex Sterling" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-[0.1em] font-bold text-outline font-label">Email Address</label>
                <input className="w-full bg-surface-container-lowest border-none rounded-lg p-3 text-on-surface focus:ring-2 focus:ring-primary/40 transition-all font-body text-sm" placeholder="email@example.com" type="email" defaultValue="alex@minutemaster.io" />
              </div>
            </div>
          </div>
        </section>

        {/* Appearance Section */}
        <section className="scroll-mt-24" id="appearance">
          <div className="mb-8">
            <h2 className="text-3xl font-extrabold font-headline tracking-tight text-on-surface mb-2">Appearance</h2>
            <p className="text-on-surface-variant">Customize the visual interface of your workspace.</p>
          </div>
          <div className="bg-surface-container-low rounded-xl p-8">
            <div className="flex items-center justify-between">
              <div className="flex gap-4">
                <div className="h-12 w-12 rounded-xl bg-primary-container flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined">dark_mode</span>
                </div>
                <div>
                  <h4 className="font-headline font-bold text-lg">Dark Mode</h4>
                  <p className="text-sm text-on-surface-variant">Switch between light and dark interface themes.</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input className="sr-only peer" type="checkbox" checked={theme === 'dark'} onChange={toggleTheme} />
                <div className="w-14 h-7 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
            {/* Theme Preview Cards (Bento Layout) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
              <div className="border-2 border-primary rounded-xl p-4 bg-surface-container-lowest flex flex-col gap-3 group cursor-pointer transition-all hover:shadow-md">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-primary font-label">LIGHT THEME</span>
                  <span className="material-symbols-outlined text-primary text-sm">check_circle</span>
                </div>
                <div className="h-24 rounded-lg bg-surface flex flex-col p-2 gap-2 overflow-hidden">
                  <div className="h-2 w-1/2 bg-slate-200 rounded"></div>
                  <div className="h-2 w-3/4 bg-slate-100 rounded"></div>
                  <div className="mt-auto h-8 bg-white rounded shadow-sm"></div>
                </div>
              </div>
              <div className="border-2 border-transparent rounded-xl p-4 bg-slate-900 flex flex-col gap-3 group cursor-pointer hover:border-outline-variant transition-all">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-400 font-label">DARK THEME</span>
                </div>
                <div className="h-24 rounded-lg bg-slate-800 flex flex-col p-2 gap-2 overflow-hidden">
                  <div className="h-2 w-1/2 bg-slate-700 rounded"></div>
                  <div className="h-2 w-3/4 bg-slate-600 rounded"></div>
                  <div className="mt-auto h-8 bg-slate-700 rounded shadow-sm"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Account Section */}
        <section className="scroll-mt-24" id="account">
          <div className="mb-8">
            <h2 className="text-3xl font-extrabold font-headline tracking-tight text-on-surface mb-2">Account</h2>
            <p className="text-on-surface-variant">Manage your security settings and authentication methods.</p>
          </div>
          <div className="bg-surface-container-low rounded-xl p-8 space-y-8">
            <div>
              <h4 className="font-headline font-bold text-lg mb-4">Password Management</h4>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                  <label className="text-[10px] uppercase tracking-[0.1em] font-bold text-outline font-label md:col-span-1">Current Password</label>
                  <div className="md:col-span-2">
                    <input className="w-full bg-surface-container-lowest border-none rounded-lg p-3 text-on-surface focus:ring-2 focus:ring-primary/40 transition-all font-body text-sm" type="password" defaultValue="••••••••••••" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                  <label className="text-[10px] uppercase tracking-[0.1em] font-bold text-outline font-label md:col-span-1">New Password</label>
                  <div className="md:col-span-2">
                    <input className="w-full bg-surface-container-lowest border-none rounded-lg p-3 text-on-surface focus:ring-2 focus:ring-primary/40 transition-all font-body text-sm" placeholder="Enter new password" type="password" />
                  </div>
                </div>
              </div>
            </div>
            <div className="pt-6 border-t border-surface-variant/30 flex justify-end gap-3">
              <button className="text-on-surface-variant px-6 py-2 font-semibold text-sm hover:bg-surface-container-high rounded-lg transition-colors">Cancel</button>
              <button className="bg-primary text-on-primary px-6 py-2 rounded-lg font-semibold text-sm shadow-sm hover:bg-primary-dim transition-colors">Update Password</button>
            </div>
          </div>
          {/* Dangerous Zone */}
          <div className="mt-8 p-6 rounded-xl bg-red-50/50 flex items-center justify-between">
            <div>
              <h4 className="font-headline font-bold text-error">Deactivate Account</h4>
              <p className="text-sm text-error/70">Permanently delete your account and all associated data.</p>
            </div>
            <button className="border border-error/20 text-error px-4 py-2 rounded-lg text-sm font-semibold hover:bg-error/5 transition-colors">Delete Account</button>
          </div>
        </section>
      </div>

      {/* Footer Spacing */}
      <div className="h-32"></div>
    </div>
  );
}
