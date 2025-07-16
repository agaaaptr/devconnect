import React, { useEffect, useState } from 'react';
import { XCircle, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ToastProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
  duration?: number; // in milliseconds
}

const Toast: React.FC<ToastProps> = ({ message, type, onClose, duration = 3000 }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show toast with a slight delay for animation
    const showTimer = setTimeout(() => {
      setIsVisible(true);
    }, 50);

    // Hide toast after duration
    const hideTimer = setTimeout(() => {
      setIsVisible(false);
      // Call onClose after animation completes
      const closeTimer = setTimeout(() => onClose(), 300);
      return () => clearTimeout(closeTimer);
    }, duration);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, [duration, onClose]);

  const Icon = type === 'success' ? CheckCircle : XCircle;
  const iconColor = type === 'success' ? 'text-primary' : 'text-red-500'; // Using red-500 for error icon

  return (
    <div
      className={cn(
        'fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg flex items-center space-x-3 transition-all duration-300 ease-in-out',
        'max-w-xs w-full md:max-w-sm', // Responsive width
        'bg-card text-foreground', // Changed background to card, text to foreground
        isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
      )}
    >
      <Icon className={cn('h-6 w-6', iconColor)} /> {/* Apply iconColor here */}
      <span className="flex-1 text-sm font-medium">{message}</span>
      <button onClick={onClose} className="p-1 rounded-full hover:bg-white/20 transition-colors">
        <XCircle className="h-4 w-4" />
      </button>
    </div>
  );
};

export default Toast;
