import React, { useState, useRef } from 'react';
import { Send, Smile } from 'lucide-react';
import EmojiPicker from 'emoji-picker-react';
import { motion, AnimatePresence } from 'framer-motion';

const MessageInput = ({ onSendMessage, onTyping }) => {
  const [message, setMessage] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const inputRef = useRef(null);
  const typingTimeoutRef = useRef(null);

  const handleInputChange = (e) => {
    setMessage(e.target.value);
    
    // Trigger typing indicator
    if (onTyping) {
      onTyping(true);
      
      // Clear previous timeout
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
      
      // Set new timeout to stop typing indicator
      typingTimeoutRef.current = setTimeout(() => {
        onTyping(false);
      }, 1000);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (message.trim()) {
      onSendMessage(message.trim());
      setMessage('');
      
      if (onTyping) {
        onTyping(false);
      }
      
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    }
  };

  const handleEmojiClick = (emojiData) => {
    setMessage((prev) => prev + emojiData.emoji);
    inputRef.current?.focus();
  };

  return (
    <div className="absolute bottom-6 left-4 right-4 z-10 max-w-4xl mx-auto w-full">
      <AnimatePresence>
        {showEmojiPicker && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute bottom-full mb-4 left-0 shadow-2xl rounded-2xl overflow-hidden z-50"
          >
            <EmojiPicker
              onEmojiClick={handleEmojiClick}
              theme="auto"
              height={350}
              searchDisabled={false}
              skinTonesDisabled
            />
          </motion.div>
        )}
      </AnimatePresence>

      <form 
        onSubmit={handleSubmit} 
        className="flex items-center gap-3 p-2 pl-3 bg-[var(--chat-surface)] rounded-full border border-[var(--chat-border)] shadow-xl focus-within:shadow-2xl focus-within:border-neon-purple/30 transition-all duration-300 backdrop-blur-sm"
      >
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          type="button"
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          className="p-2.5 rounded-full hover:bg-[var(--chat-bg)] text-[var(--chat-text-secondary)] hover:text-neon-purple transition-all duration-200"
        >
          <Smile className="w-6 h-6" />
        </motion.button>

        <input
          ref={inputRef}
          type="text"
          value={message}
          onChange={handleInputChange}
          placeholder="Type a message..."
          className="flex-1 bg-transparent border-none outline-none text-[var(--chat-text-primary)] placeholder-[var(--chat-text-muted)] font-medium py-2"
        />

        <motion.button
          whileHover={{ scale: 1.05, rotate: -10 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          disabled={!message.trim()}
          className="p-3 rounded-full bg-gradient-to-tr from-neon-purple to-neon-pink text-white shadow-lg shadow-neon-purple/20 disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center transform"
        >
          <Send className="w-5 h-5 ml-0.5" />
        </motion.button>
      </form>
    </div>
  );
};

export default MessageInput;
