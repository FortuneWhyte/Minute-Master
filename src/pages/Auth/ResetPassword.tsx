import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';

export default function ResetPassword() {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // Supabase will redirect here with a session after the user clicks the reset link
  useEffect(() => {
    supabase.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY') {
        // User arrived from the reset email — ready to set new password
      }
    });
  }, []);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      setSuccess(true);
      setLoading(false);
      setTimeout(() => navigate('/login'), 3000);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center px-4">
        <div className="w-full max-w-md text-center space-y-6">
          <div className="w-16 h-16 mx-auto rounded-full bg-primary-container flex items-center justify-center">
            <span className="material-symbols-outlined text-3xl text-on-primary-container">check_circle</span>
          </div>
          <h2 className="text-2xl font-bold font-headline text-on-surface">Password updated!</h2>
          <p className="text-on-surface-variant text-sm">
            Your password has been reset successfully. Redirecting to sign in...
          </p>
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
            Set your new password
          </p>
        </div>

        <div className="bg-surface-container-lowest rounded-2xl shadow-xl p-8 space-y-6 border border-outline-variant/10">
          <div>
            <h2 className="text-2xl font-bold font-headline text-on-surface">New password</h2>
            <p className="text-sm text-on-surface-variant mt-1">Choose a strong password for your account</p>
          </div>

          {error && (
            <div className="bg-error-container/20 border border-error/30 text-error text-sm p-3 rounded-lg">
              {error}
            </div>
          )}

          <form onSubmit={handleUpdate} className="space-y-5">
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-[0.1em] font-bold text-outline font-label">
                New Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-surface-container-low border-none rounded-lg p-3 pr-12 text-on-surface focus:ring-2 focus:ring-primary/40 transition-all font-body text-sm"
                  placeholder="Min 6 characters"
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-outline hover:text-on-surface transition-colors"
                >
                  <span className="material-symbols-outlined text-lg">
                    {showPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-[0.1em] font-bold text-outline font-label">
                Confirm Password
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full bg-surface-container-low border-none rounded-lg p-3 text-on-surface focus:ring-2 focus:ring-primary/40 transition-all font-body text-sm"
                placeholder="Re-enter password"
                required
                minLength={6}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-br from-primary to-primary-dim text-on-primary font-semibold py-3 rounded-lg shadow-lg shadow-primary/20 hover:scale-[1.01] active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Updating...' : 'Update Password'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
