import { useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [sent, setSent] = useState(false);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin + '/reset-password',
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      setSent(true);
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center px-4">
        <div className="w-full max-w-md text-center space-y-6">
          <div className="w-16 h-16 mx-auto rounded-full bg-primary-container flex items-center justify-center">
            <span className="material-symbols-outlined text-3xl text-on-primary-container">mark_email_read</span>
          </div>
          <h2 className="text-2xl font-bold font-headline text-on-surface">Check your email</h2>
          <p className="text-on-surface-variant text-sm">
            We've sent a password reset link to <strong className="text-on-surface">{email}</strong>.
            Click the link in the email to set a new password.
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
            Reset your password
          </p>
        </div>

        <div className="bg-surface-container-lowest rounded-2xl shadow-xl p-8 space-y-6 border border-outline-variant/10">
          <div>
            <h2 className="text-2xl font-bold font-headline text-on-surface">Forgot password?</h2>
            <p className="text-sm text-on-surface-variant mt-1">Enter your email and we'll send you a reset link</p>
          </div>

          {error && (
            <div className="bg-error-container/20 border border-error/30 text-error text-sm p-3 rounded-lg">
              {error}
            </div>
          )}

          <form onSubmit={handleReset} className="space-y-5">
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
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-br from-primary to-primary-dim text-on-primary font-semibold py-3 rounded-lg shadow-lg shadow-primary/20 hover:scale-[1.01] active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Sending...' : 'Send Reset Link'}
            </button>
          </form>

          <div className="text-center text-sm text-on-surface-variant">
            Remember your password?{' '}
            <Link to="/login" className="text-primary font-semibold hover:underline">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
