import { useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [orgName, setOrgName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { organization_name: orgName },
        emailRedirectTo: window.location.origin + '/login',
      },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      setSuccess(true);
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center px-4">
        <div className="w-full max-w-md text-center space-y-6">
          <div className="w-16 h-16 mx-auto rounded-full bg-primary-container flex items-center justify-center">
            <span className="material-symbols-outlined text-3xl text-on-primary-container">mark_email_read</span>
          </div>
          <h2 className="text-2xl font-bold font-headline text-on-surface">Check your email</h2>
          <p className="text-on-surface-variant text-sm">
            We've sent a confirmation link to <strong className="text-on-surface">{email}</strong>.
            Click the link to activate your account.
          </p>
          <Link to="/login" className="inline-block text-primary font-semibold hover:underline text-sm">
            Back to Sign In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-extrabold font-headline tracking-tight text-on-surface">
            Minute Master
          </h1>
          <p className="text-on-surface-variant text-sm">
            Create your workspace
          </p>
        </div>

        <div className="bg-surface-container-lowest rounded-2xl shadow-xl p-8 space-y-6 border border-outline-variant/10">
          <div>
            <h2 className="text-2xl font-bold font-headline text-on-surface">Get started</h2>
            <p className="text-sm text-on-surface-variant mt-1">Set up your organization account</p>
          </div>

          {error && (
            <div className="bg-error-container/20 border border-error/30 text-error text-sm p-3 rounded-lg">
              {error}
            </div>
          )}

          <form onSubmit={handleSignup} className="space-y-5">
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-[0.1em] font-bold text-outline font-label">
                Organization Name
              </label>
              <input
                type="text"
                value={orgName}
                onChange={(e) => setOrgName(e.target.value)}
                className="w-full bg-surface-container-low border-none rounded-lg p-3 text-on-surface focus:ring-2 focus:ring-primary/40 transition-all font-body text-sm"
                placeholder="e.g. Charan Property Management"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-[0.1em] font-bold text-outline font-label">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-surface-container-low border-none rounded-lg p-3 text-on-surface focus:ring-2 focus:ring-primary/40 transition-all font-body text-sm"
                placeholder="you@company.com"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-[0.1em] font-bold text-outline font-label">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-surface-container-low border-none rounded-lg p-3 text-on-surface focus:ring-2 focus:ring-primary/40 transition-all font-body text-sm"
                placeholder="Min 6 characters"
                required
                minLength={6}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-br from-primary to-primary-dim text-on-primary font-semibold py-3 rounded-lg shadow-lg shadow-primary/20 hover:scale-[1.01] active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>

          <div className="text-center text-sm text-on-surface-variant">
            Already have an account?{' '}
            <Link to="/login" className="text-primary font-semibold hover:underline">
              Sign in
            </Link>
          </div>
        </div>

        <p className="text-center text-xs text-outline">
          © 2026 Minute Master. Optimized for Professional Board Governance.
        </p>
      </div>
    </div>
  );
}
