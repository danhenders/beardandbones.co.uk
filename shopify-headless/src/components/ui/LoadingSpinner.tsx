'use client';

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  color?: 'primary' | 'accent' | 'white';
}

export default function LoadingSpinner({ 
  size = 'medium', 
  color = 'accent' 
}: LoadingSpinnerProps) {
  // Size classes
  const sizeClasses = {
    small: 'h-4 w-4 border-2',
    medium: 'h-8 w-8 border-2',
    large: 'h-12 w-12 border-3',
  };
  
  // Color classes
  const colorClasses = {
    primary: 'border-t-primary',
    accent: 'border-t-accent',
    white: 'border-t-white',
  };
  
  return (
    <div 
      className={`animate-spin rounded-full border-transparent ${sizeClasses[size]} ${colorClasses[color]}`}
      role="status"
      aria-label="Loading"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
} 