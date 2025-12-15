import React, { useState } from 'react';

const UserAvatar = ({ user, size = 'md', showOnline = false }) => {
  const [imageError, setImageError] = useState(false);
  const sizes = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-12 h-12 text-sm',
    lg: 'w-16 h-16 text-lg',
    xl: 'w-24 h-24 text-2xl',
  };

  const getInitials = (name) => {
    if (!name) return '?';
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const gradients = [
    'from-neon-pink to-neon-purple',
    'from-neon-blue to-neon-purple',
    'from-neon-purple to-neon-pink',
    'from-neon-green to-neon-blue',
  ];

  const gradientIndex = user?.username
    ? user.username.charCodeAt(0) % gradients.length
    : 0;

  return (
    <div className="relative inline-block">
      {user?.avatar && !imageError ? (
        <img
          src={user.avatar.startsWith('/uploads') ? `http://localhost:5000${user.avatar}` : user.avatar}
          alt={user.username}
          onError={() => setImageError(true)}
          className={`${sizes[size]} rounded-full object-cover border-2 border-neon-purple`}
        />
      ) : (
        <div
          className={`${sizes[size]} rounded-full flex items-center justify-center font-bold text-white bg-gradient-to-br ${gradients[gradientIndex]}`}
        >
          {getInitials(user?.username)}
        </div>
      )}
      
      {showOnline && user?.isOnline && (
        <div className="absolute bottom-0 right-0 w-3 h-3 bg-neon-green rounded-full border-2 border-white dark:border-dark-bg" />
      )}
    </div>
  );
};

export default UserAvatar;
