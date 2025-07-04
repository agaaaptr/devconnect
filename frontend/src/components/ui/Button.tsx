import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    const variants = {
      primary: `
        bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 
        text-white shadow-lg hover:shadow-xl 
        border-0 relative overflow-hidden
        before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent
        before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-500
      `,
      secondary: `
        bg-card hover:bg-muted text-foreground shadow-md hover:shadow-lg 
        border border-border hover:border-primary/50
      `,
      outline: `
        border-2 border-transparent bg-transparent text-foreground
        hover:bg-primary/5 hover:text-primary
        relative overflow-hidden
        before:absolute before:inset-0 before:p-0.5 before:bg-gradient-to-r before:from-blue-600 before:to-purple-600 before:rounded-[inherit] before:-z-10
        after:absolute after:inset-0.5 after:bg-background after:rounded-[inherit] after:-z-10
      `,
      ghost: `
        bg-transparent hover:bg-muted text-foreground
        border-0 shadow-none
      `
    };

    const sizes = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg'
    };

    return (
      <button
        className={cn(
          'font-medium rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary focus:ring-offset-background',
          'hover:scale-105 active:scale-95',
          'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100',
          variants[variant],
          sizes[size],
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';

export { Button };