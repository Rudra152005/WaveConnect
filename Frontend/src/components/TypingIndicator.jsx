import React from 'react';
import { motion } from 'framer-motion';

const TypingIndicator = () => {
  const dotVariants = {
    initial: { y: 0 },
    animate: { y: -10 },
  };

  const dotTransition = {
    duration: 0.5,
    repeat: Infinity,
    repeatType: 'reverse',
    ease: 'easeInOut',
  };

  return (
    <div className="flex items-center space-x-1 px-4 py-2">
      <motion.div
        className="w-2 h-2 bg-neon-purple rounded-full"
        variants={dotVariants}
        initial="initial"
        animate="animate"
        transition={{ ...dotTransition, delay: 0 }}
      />
      <motion.div
        className="w-2 h-2 bg-neon-purple rounded-full"
        variants={dotVariants}
        initial="initial"
        animate="animate"
        transition={{ ...dotTransition, delay: 0.2 }}
      />
      <motion.div
        className="w-2 h-2 bg-neon-purple rounded-full"
        variants={dotVariants}
        initial="initial"
        animate="animate"
        transition={{ ...dotTransition, delay: 0.4 }}
      />
    </div>
  );
};

export default TypingIndicator;
