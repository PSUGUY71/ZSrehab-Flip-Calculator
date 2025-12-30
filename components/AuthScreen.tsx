import React from 'react';

interface AuthScreenProps {
  authMode: 'LOGIN' | 'SIGNUP';
  authEmail: string;
  authPassword: string;
  authError: string;
  setAuthMode: (mode: 'LOGIN' | 'SIGNUP') => void;
  setAuthEmail: (email: string) => void;
  setAuthPassword: (password: string) => void;
  setAuthError: (error: string) => void;
  handleLogin: (e: React.FormEvent) => void;
  handleSignup: (e: React.FormEvent) => void;
}

export const AuthScreen: React.FC<AuthScreenProps> = ({
  authMode,
  authEmail,
  authPassword,
  authError,
  setAuthMode,
  setAuthEmail,
  setAuthPassword,
  setAuthError,
  handleLogin,
  handleSignup,
}) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 font-sans text-slate-800">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden border border-gray-100">
        <div className="bg-blue-900 p-8 text-center">
          <div className="inline-block bg-white text-blue-900 p-3 rounded-lg font-bold text-3xl mb-4 shadow-lg">ZS</div>
          <h1 className="text-2xl font-bold text-white mb-1">ZSrehab Flip Calculator</h1>
          <div className="text-blue-200 text-sm font-medium">Hideout Version</div>
          <p className="text-blue-300 text-xs mt-1 opacity-80">Real Estate Investment Platform</p>
        </div>
        <div className="p-8">
          <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">
            {authMode === 'LOGIN' ? 'Welcome Back' : 'Create Account'}
          </h2>
          {authError && (
            <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm mb-4 border border-red-100">
              {authError}
            </div>
          )}
          <form onSubmit={authMode === 'LOGIN' ? handleLogin : handleSignup} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-1">Email</label>
              <input
                type="email"
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
                value={authEmail}
                onChange={(e) => setAuthEmail(e.target.value)}
                placeholder="Enter email"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-1">Password</label>
              <input
                type="password"
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
                value={authPassword}
                onChange={(e) => setAuthPassword(e.target.value)}
                placeholder="Enter password"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition shadow-md mt-2"
            >
              {authMode === 'LOGIN' ? 'Log In' : 'Sign Up'}
            </button>
          </form>
          <div className="mt-6 text-center">
            <button
              onClick={() => {
                setAuthMode(authMode === 'LOGIN' ? 'SIGNUP' : 'LOGIN');
                setAuthError('');
                setAuthEmail('');
                setAuthPassword('');
              }}
              className="text-sm text-blue-600 hover:text-blue-800 font-medium"
            >
              {authMode === 'LOGIN' ? "Don't have an account? Sign Up" : 'Already have an account? Log In'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
