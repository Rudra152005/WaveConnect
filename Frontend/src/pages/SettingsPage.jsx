import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, User, Upload, Trash2 } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import api from '../services/api';
import UserAvatar from '../components/UserAvatar';
import ThemeToggle from '../components/ThemeToggle';
import LoadingSpinner from '../components/LoadingSpinner';

const SettingsPage = () => {
  const navigate = useNavigate();
  const { user, updateUser, logout } = useAuthStore();
  
  const [formData, setFormData] = useState({
    username: user?.username || '',
    bio: user?.bio || '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const response = await api.put('/users/profile', formData);
      updateUser(response.data.data.user);
      setMessage({ type: 'success', text: 'Profile updated successfully!' });
    } catch (error) {
      setMessage({ type: 'error', text: error.response?.data?.message || 'Failed to update profile' });
    } finally {
      setLoading(false);
    }
  };

  const handleAvatarUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('avatar', file);

    try {
      const response = await api.post('/users/avatar', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      updateUser(response.data.data.user);
      setMessage({ type: 'success', text: 'Avatar updated successfully!' });
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to upload avatar' });
    }
  };

  const handleDeleteAccount = async () => {
    if (!window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      return;
    }

    try {
      await api.delete('/users/profile');
      logout();
      navigate('/');
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to delete account' });
    }
  };

  return (
    <div className="min-h-screen bg-light-bg dark:bg-dark-bg p-6 lg:p-10">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/chat')}
              className="p-3 rounded-xl hover:bg-gray-200 dark:hover:bg-dark-elevated transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="text-3xl font-bold gradient-text">Settings</h1>
          </div>
          <ThemeToggle />
        </div>

        {/* Message */}
        {message.text && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-4 rounded-xl font-medium ${
              message.type === 'success'
                ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800'
                : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800'
            }`}
          >
            {message.text}
          </motion.div>
        )}

        <div className="grid gap-8">
          {/* Profile Section */}
          <div className="card">
            <h2 className="text-2xl font-bold mb-8 text-[var(--text-primary)]">Profile</h2>
            
            {/* Avatar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-8">
              <UserAvatar user={user} size="xl" />
              <div className="flex flex-col gap-2">
                <label className="btn-primary cursor-pointer inline-flex items-center gap-2 w-fit whitespace-nowrap">
                  <Upload className="w-5 h-5" />
                  Upload Avatar
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarUpload}
                    className="hidden"
                  />
                </label>
                <p className="text-sm text-gray-500">JPG, PNG or GIF. Max 5MB.</p>
              </div>
            </div>

            {/* Profile Form */}
            <form onSubmit={handleUpdateProfile} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold mb-2 text-[var(--text-secondary)]">Username</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="input-field !pl-12"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Bio</label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  rows={3}
                  maxLength={150}
                  placeholder="Tell us about yourself..."
                  className="input-field resize-none"
                />
                <p className="text-sm text-gray-500 mt-1">{formData.bio.length}/150</p>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="btn-primary"
              >
                {loading ? <LoadingSpinner size="sm" /> : 'Save Changes'}
              </motion.button>
            </form>
          </div>

          {/* Theme Section */}
          <div className="card">
            <h2 className="text-xl font-bold mb-4">Appearance</h2>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Theme</p>
                <p className="text-sm text-gray-500">Switch between light and dark mode</p>
              </div>
              <ThemeToggle />
            </div>
          </div>

          {/* Danger Zone */}
          <div className="card border-2 border-red-500/20">
            <h2 className="text-xl font-bold mb-4 text-red-500">Danger Zone</h2>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Delete Account</p>
                <p className="text-sm text-gray-500">Permanently delete your account and all data</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleDeleteAccount}
                className="px-4 py-2 rounded-xl bg-red-500 text-white hover:bg-red-600 transition-colors flex items-center gap-2"
              >
                <Trash2 className="w-5 h-5" />
                Delete
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
