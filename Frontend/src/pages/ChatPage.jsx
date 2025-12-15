import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Plus, LogOut, Settings as SettingsIcon } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useChatStore } from '../store/chatStore';
import { initializeSocket, disconnectSocket, joinChat, sendMessage as sendSocketMessage } from '../services/socket';
import api from '../services/api';
import UserAvatar from '../components/UserAvatar';
import ChatBubble from '../components/ChatBubble';
import MessageInput from '../components/MessageInput';
import ThemeToggle from '../components/ThemeToggle';
import LoadingSpinner from '../components/LoadingSpinner';
import GroupChatModal from '../components/GroupChatModal';
import { Users } from 'lucide-react';

const ChatPage = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const { chats, activeChat, messages, setChats, setActiveChat, setMessages, addMessage } = useChatStore();
  
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const [showGroupModal, setShowGroupModal] = useState(false);

  useEffect(() => {
    // Initialize socket connection
    initializeSocket();
    
    // Fetch user chats
    fetchChats();

    return () => {
      disconnectSocket();
    };
  }, []);

  useEffect(() => {
    if (activeChat) {
      fetchMessages(activeChat._id);
      joinChat(activeChat._id);
    }
  }, [activeChat]);

  const fetchChats = async () => {
    try {
      const response = await api.get('/chats');
      setChats(response.data.data.chats);
    } catch (error) {
      console.error('Error fetching chats:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMessages = async (chatId) => {
    try {
      const response = await api.get(`/messages/${chatId}`);
      setMessages(response.data.data.messages);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const handleSearch = async (query) => {
    setSearchQuery(query);
    if (query.trim()) {
      try {
        const response = await api.get(`/users/search?q=${query}`);
        setSearchResults(response.data.data.users);
        setShowSearch(true);
      } catch (error) {
        console.error('Error searching users:', error);
      }
    } else {
      setSearchResults([]);
      setShowSearch(false);
    }
  };

  const handleCreateChat = async (participantId) => {
    try {
      const response = await api.post('/chats', { participantId });
      const newChat = response.data.data.chat;
      
      // Check if chat already exists in list
      const existingChat = chats.find(c => c._id === newChat._id);
      if (!existingChat) {
        setChats([newChat, ...chats]);
      }
      
      setActiveChat(newChat);
      setShowSearch(false);
      setSearchQuery('');
    } catch (error) {
      console.error('Error creating chat:', error);
    }
  };

  const handleSendMessage = async (content) => {
    if (!activeChat) return;

    try {
      const response = await api.post('/messages', {
        chatId: activeChat._id,
        content,
      });
      
      const newMessage = response.data.data.message;
      addMessage(newMessage);
      
      // Send via socket
      sendSocketMessage(activeChat._id, newMessage);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const handleLogout = () => {
    logout();
    disconnectSocket();
    navigate('/');
  };

  const getOtherParticipant = (chat) => {
    return chat.participants.find(p => p._id !== user._id);
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-light-bg dark:bg-dark-bg">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="h-screen flex bg-[var(--chat-bg)] transition-colors duration-300">
      {/* Sidebar */}
      <div className="w-full md:w-96 bg-[var(--chat-surface)] border-r border-[var(--chat-border)] flex flex-col">
        {/* Sidebar Header */}
        <div className="p-4 border-b border-[var(--chat-border)]">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <UserAvatar user={user} size="md" showOnline />
              <div>
                <h2 className="font-semibold text-[var(--chat-text-primary)]">{user?.username}</h2>
                <p className="text-xs text-[var(--status-online)]">Online</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <button
                onClick={() => setShowGroupModal(true)}
                title="Create Group"
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-elevated transition-colors"
              >
                <Users className="w-5 h-5" />
              </button>
              <button
                onClick={() => navigate('/settings')}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-elevated transition-colors"
              >
                <SettingsIcon className="w-5 h-5" />
              </button>
              <button
                onClick={handleLogout}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-elevated transition-colors text-red-500"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Search */}
          <div className="relative py-2">
            <div className="flex items-center gap-2 w-full px-4 py-3 rounded-2xl bg-[var(--chat-input-bg)] border border-transparent focus-within:border-neon-purple/50 focus-within:ring-2 focus-within:ring-neon-purple/20 transition-all duration-200">
              <Search className="w-5 h-5 text-[var(--chat-text-muted)] shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Search users..."
                className="flex-1 bg-transparent border-none outline-none text-[var(--chat-text-primary)] placeholder-[var(--chat-text-muted)]"
              />
            </div>
          </div>
        </div>

        {/* Search Results or Chat List */}
        <div className="flex-1 overflow-y-auto">
          {showSearch ? (
            <div className="p-2">
              <h3 className="px-3 py-2 text-sm font-semibold text-gray-500">Search Results</h3>
              {searchResults.map((searchUser) => (
                <motion.div
                  key={searchUser._id}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => handleCreateChat(searchUser._id)}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-dark-elevated cursor-pointer transition-colors"
                >
                  <UserAvatar user={searchUser} size="md" showOnline />
                  <div className="flex-1">
                    <h4 className="font-medium">{searchUser.username}</h4>
                    <p className="text-sm text-gray-500">{searchUser.email}</p>
                  </div>
                  <Plus className="w-5 h-5 text-neon-purple" />
                </motion.div>
              ))}
              {searchResults.length === 0 && (
                <p className="text-center text-gray-500 py-8">No users found</p>
              )}
            </div>
          ) : (
            <div className="p-2">
              {chats.length === 0 ? (
                <div className="text-center py-12 px-4">
                  <p className="text-gray-500 mb-2">No chats yet</p>
                  <p className="text-sm text-gray-400">Search for users to start chatting</p>
                </div>
              ) : (
                chats.map((chat) => {
                  const isGroup = chat.isGroupChat;
                  const otherUser = !isGroup ? getOtherParticipant(chat) : null;
                  const chatName = isGroup ? chat.chatName : otherUser?.username;

                  return (
                    <motion.div
                      key={chat._id}
                      whileHover={{ scale: 1.02 }}
                      onClick={() => setActiveChat(chat)}
                      className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-colors ${
                        activeChat?._id === chat._id
                          ? 'bg-gradient-to-r from-neon-purple/20 to-neon-pink/20'
                          : 'hover:bg-gray-100 dark:hover:bg-dark-elevated'
                      }`}
                    >
                      {isGroup ? (
                        <div className="w-12 h-12 rounded-full bg-neon-purple/20 flex items-center justify-center text-neon-purple font-bold">
                          <Users className="w-6 h-6" />
                        </div>
                      ) : (
                        <UserAvatar user={otherUser} size="md" showOnline />
                      )}
                      
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium truncate text-[var(--chat-text-primary)]">{chatName}</h4>
                        <p className="text-sm text-[var(--chat-text-secondary)] truncate">
                          {chat.lastMessage?.content || 'No messages yet'}
                        </p>
                      </div>
                    </motion.div>
                  );
                })
              )}
            </div>
          )}
        </div>
      </div>

      {/* Chat Window */}
      <div className="flex-1 flex flex-col relative">
        {activeChat ? (
          <>
            {/* Chat Header */}
            <div className="p-4 bg-[var(--chat-surface)] border-b border-[var(--chat-border)]">
              <div className="flex items-center gap-3">
                {activeChat.isGroupChat ? (
                   <div className="w-12 h-12 rounded-full bg-neon-purple/20 flex items-center justify-center text-neon-purple font-bold">
                     <Users className="w-6 h-6" />
                   </div>
                ) : (
                  <UserAvatar user={getOtherParticipant(activeChat)} size="md" showOnline />
                )}
                <div>
                  <h3 className="font-semibold text-[var(--chat-text-primary)]">
                    {activeChat.isGroupChat ? activeChat.chatName : getOtherParticipant(activeChat)?.username}
                  </h3>
                  {!activeChat.isGroupChat && (
                    <p className="text-sm text-[var(--chat-text-secondary)]">
                      {getOtherParticipant(activeChat)?.isOnline ? 'Online' : 'Offline'}
                    </p>
                  )}
                  {activeChat.isGroupChat && (
                    <p className="text-sm text-[var(--chat-text-secondary)]">
                      {activeChat.participants.length} members
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 pb-32 bg-[var(--chat-bg)]">
              {messages.length === 0 ? (
                <div className="h-full flex items-center justify-center text-gray-500">
                  <p>No messages yet. Start the conversation!</p>
                </div>
              ) : (
                messages.map((message) => (
                  <ChatBubble key={message._id} message={message} />
                ))
              )}
            </div>

            {/* Message Input */}
            <MessageInput onSendMessage={handleSendMessage} />
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-gray-50 dark:bg-dark-bg">
            <div className="text-center">
              <div className="text-6xl mb-4">💬</div>
              <h3 className="text-2xl font-bold gradient-text mb-2">WaveConnect</h3>
              <p className="text-gray-500">Select a chat to start messaging</p>
            </div>
          </div>
        )}
      </div>

      <AnimatePresence>
        {showGroupModal && (
          <GroupChatModal
            isOpen={showGroupModal}
            onClose={() => setShowGroupModal(false)}
            onGroupCreated={(newChat) => {
              setChats([newChat, ...chats]);
              setActiveChat(newChat);
              setShowGroupModal(false);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatPage;
