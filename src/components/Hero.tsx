import React from 'react';

interface HeroProps {
  title: string;
  subtitle: string;
  backgroundImage?: string;
}

export default function Hero({ title, subtitle, backgroundImage }: HeroProps) {
  return (
    <section 
      className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-dark via-primary-purple to-primary-dark"
      style={{
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundBlendMode: 'overlay'
      }}
    >
      <div className="absolute inset-0 bg-black/50"></div>
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
          {title}
        </h1>
        <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
          {subtitle}
        </p>
      </div>
    </section>
  );
}
