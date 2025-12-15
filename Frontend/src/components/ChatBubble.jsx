import React from 'react';
import { motion } from 'framer-motion';
import { formatDistanceToNow } from 'date-fns';
import { useAuthStore } from '../store/authStore';

const ChatBubble = ({ message }) => {
  const { user: currentUser } = useAuthStore();
  const isOwn = message.sender._id === currentUser?._id;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex ${isOwn ? 'justify-end' : 'justify-start'} mb-4`}
    >
      <div className={`max-w-[70%] ${isOwn ? 'order-2' : 'order-1'}`}>
        <div
          className={`px-4 py-3 shadow-[0_2px_6px_rgba(0,0,0,0.08)] ${
            isOwn
              ? 'bg-[var(--msg-sent-bg)] text-[var(--msg-sent-text)] rounded-[18px_18px_4px_18px]'
              : 'bg-[var(--msg-received-bg)] text-[var(--msg-received-text)] rounded-[18px_18px_18px_4px]'
          }`}
        >
          <p className="text-sm break-words">{message.content}</p>
        </div>
        <div className={`flex items-center gap-2 mt-1 px-2 ${isOwn ? 'justify-end' : 'justify-start'}`}>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {formatDistanceToNow(new Date(message.createdAt), { addSuffix: true })}
          </span>
          {isOwn && message.isRead && (
            <span className="text-xs text-neon-blue">✓✓</span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ChatBubble;
