import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Search, Check, UserPlus } from 'lucide-react';
import api from '../services/api';
import UserAvatar from './UserAvatar';
import LoadingSpinner from './LoadingSpinner';

const GroupChatModal = ({ isOpen, onClose, onGroupCreated }) => {
  const [groupName, setGroupName] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [creating, setCreating] = useState(false);

  const handleSearch = async (query) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    try {
      setLoading(true);
      const response = await api.get(`/users/search?q=${query}`);
      setSearchResults(response.data.data.users);
    } catch (error) {
      console.error('Error searching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleUser = (user) => {
    if (selectedUsers.find((u) => u._id === user._id)) {
      setSelectedUsers(selectedUsers.filter((u) => u._id !== user._id));
    } else {
      setSelectedUsers([...selectedUsers, user]);
    }
  };

  const  handleSubmit = async (e) => {
    e.preventDefault();
    if (!groupName || selectedUsers.length < 2) return;

    try {
      setCreating(true);
      const response = await api.post('/chats/group', {
        name: groupName,
        participants: JSON.stringify(selectedUsers.map((u) => u._id)),
      });
      onGroupCreated(response.data.data.chat);
      onClose();
    } catch (error) {
      console.error('Error creating group chat:', error);
    } finally {
      setCreating(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white dark:bg-dark-surface w-full max-w-md rounded-2xl shadow-2xl overflow-hidden border border-gray-200 dark:border-dark-border"
      >
        <div className="p-4 border-b border-gray-200 dark:border-dark-border flex items-center justify-between">
          <h2 className="text-xl font-bold text-[var(--text-primary)]">Create Group Chat</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-elevated text-gray-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2 text-[var(--text-secondary)]">Group Name</label>
            <input
              type="text"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              placeholder="Enter group name..."
              className="input-field"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-[var(--text-secondary)]">Add Members</label>
            <div className="relative mb-3">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Search users..."
                className="input-field !pl-12 !py-2.5 text-sm"
              />
            </div>

            {/* Selected Users Pills */}
            <div className="flex flex-wrap gap-2 mb-2">
              {selectedUsers.map((u) => (
                <div
                  key={u._id}
                  className="flex items-center gap-1 pl-2 pr-1 py-1 rounded-full bg-neon-purple/10 text-neon-purple text-xs font-medium"
                >
                  {u.username}
                  <button
                    onClick={() => toggleUser(u)}
                    className="p-0.5 hover:bg-neon-purple/20 rounded-full"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>

            <div className="h-48 overflow-y-auto border border-gray-100 dark:border-dark-border rounded-xl">
              {loading ? (
                <div className="flex justify-center py-4">
                  <LoadingSpinner size="sm" />
                </div>
              ) : searchResults.length > 0 ? (
                searchResults.map((user) => {
                  const isSelected = selectedUsers.find((u) => u._id === user._id);
                  return (
                    <div
                      key={user._id}
                      onClick={() => toggleUser(user)}
                      className={`flex items-center justify-between p-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-dark-elevated transition-colors ${
                        isSelected ? 'bg-neon-purple/5' : ''
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <UserAvatar user={user} size="sm" />
                        <span className={`text-sm font-medium ${isSelected ? 'text-neon-purple' : 'text-[var(--text-primary)]'}`}>
                          {user.username}
                        </span>
                      </div>
                      {isSelected && <Check className="w-4 h-4 text-neon-purple" />}
                    </div>
                  );
                })
              ) : (
                <p className="text-center text-gray-400 text-sm py-8">
                  {searchQuery ? 'No users found' : 'Search to add members'}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-gray-200 dark:border-dark-border flex justify-end">
          <button
            onClick={handleSubmit}
            disabled={!groupName || selectedUsers.length < 2 || creating}
            className="btn-primary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {creating ? <LoadingSpinner size="sm" /> : <UserPlus className="w-4 h-4" />}
            Create Group
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default GroupChatModal;
