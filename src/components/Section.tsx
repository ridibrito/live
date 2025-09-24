import React from 'react';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  backgroundColor?: 'white' | 'gray' | 'purple';
}

export default function Section({ children, className = '', backgroundColor = 'white' }: SectionProps) {
  const bgClasses = {
    white: 'bg-white',
    gray: 'bg-gray-50',
    purple: 'bg-gradient-to-br from-primary-purple to-primary-dark text-white'
  };

  return (
    <section className={`py-16 px-6 ${bgClasses[backgroundColor]} ${className}`}>
      <div className="max-w-6xl mx-auto">
        {children}
      </div>
    </section>
  );
}
