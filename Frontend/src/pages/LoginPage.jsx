import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, LogIn, Github, Chrome, ArrowLeft } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import api from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider, githubProvider } from '../config/firebase';

const LoginPage = () => {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await api.post('/auth/login', formData);
      const { user, accessToken, refreshToken } = response.data.data;

      setAuth(user, accessToken, refreshToken);
      navigate('/chat');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (provider, providerName) => {
    try {
      setLoading(true);
      setError('');

      // Check if Firebase is configured
      if (!auth || !provider) {
        setError('Firebase is not configured. Please restart the dev server after creating the .env file.');
        setLoading(false);
        return;
      }

      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Extract user data from Firebase
      const userData = {
        username: user.displayName || user.email.split('@')[0],
        email: user.email,
        avatar: user.photoURL,
        firebaseUid: user.uid,
      };

      // Send to backend to create/login user
      const response = await api.post('/auth/social-login', userData);
      const { user: dbUser, accessToken, refreshToken } = response.data.data;

      setAuth(dbUser, accessToken, refreshToken);
      navigate('/chat');
    } catch (err) {
      console.error(`${providerName} login error:`, err);
      if (err.code === 'auth/popup-closed-by-user') {
        setError('Login cancelled');
      } else if (err.code === 'auth/configuration-not-found') {
        setError('Firebase not configured. Please add your Firebase credentials to .env file.');
      } else {
        setError(err.response?.data?.message || `${providerName} login failed. Please try again.`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050505] relative overflow-hidden px-4">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-black to-[#050505] -z-10" />
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-purple-500/10 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-blue-500/10 blur-[140px] rounded-full pointer-events-none" />

      {/* Back Button */}
      <Link
        to="/"
        className="absolute top-8 left-8 text-gray-400 hover:text-white transition-colors flex items-center gap-2 z-20"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="text-sm font-medium">Back to Home</span>
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Glass Card */}
        <div className="bg-[#0f0f13]/70 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl relative overflow-hidden">
          {/* Glow Effect */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-50" />

          {/* Logo */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
            <p className="text-gray-400">Sign in to continue to your workspace</p>
          </div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center"
            >
              {error}
            </motion.div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3">Email address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@company.com"
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl !pl-16 pr-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl !pl-16 pr-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all"
                />
              </div>
            </div>

            <div className="flex items-center justify-end">
              <Link to="/forgot-password" className="text-sm text-purple-400 hover:text-purple-300 transition-colors">
                Forgot password?
              </Link>
            </div>

            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold shadow-lg shadow-purple-500/20 hover:shadow-purple-500/30 transition-all flex items-center justify-center gap-2 group"
            >
              {loading ? (
                <LoadingSpinner size="sm" />
              ) : (
                <>
                  <span>Sign In</span>
                  <LogIn className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </>
              )}
            </motion.button>
          </form>

          {/* Social Divider */}
          <div className="flex items-center gap-3 my-10">
            <div className="h-px flex-1 bg-white/10" />
            <span className="text-gray-500 text-xs uppercase">Or continue with</span>
            <div className="h-px flex-1 bg-white/10" />
          </div>

          {/* Social Buttons */}
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => handleSocialLogin(githubProvider, 'GitHub')}
              disabled={loading}
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Github className="w-5 h-5" />
              <span className="text-sm font-medium">GitHub</span>
            </button>
            <button
              onClick={() => handleSocialLogin(googleProvider, 'Google')}
              disabled={loading}
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Chrome className="w-5 h-5" />
              <span className="text-sm font-medium">Google</span>
            </button>
          </div>

          {/* Register Link */}
          <p className="text-center mt-10 text-sm text-gray-400">
            Don't have an account?{' '}
            <Link to="/register" className="text-purple-400 hover:text-purple-300 font-medium hover:underline transition-all">
              Create free account
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
