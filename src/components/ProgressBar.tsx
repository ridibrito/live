import React, { useState, useEffect } from 'react';

interface ProgressBarProps {
  progress?: number;
  label?: string;
  animated?: boolean;
  duration?: number;
}

export default function ProgressBar({ 
  progress = 90, 
  label = "Progresso da sua jornada", 
  animated = true,
  duration = 3000 
}: ProgressBarProps) {
  const [animatedProgress, setAnimatedProgress] = useState(0);

  useEffect(() => {
    if (animated) {
      const startTime = Date.now();
      const targetProgress = progress;
      
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progressRatio = Math.min(elapsed / duration, 1);
        
        // Usar easing function para suavizar a animação
        const easeOutCubic = 1 - Math.pow(1 - progressRatio, 3);
        const currentProgress = Math.round(targetProgress * easeOutCubic);
        
        setAnimatedProgress(currentProgress);
        
        if (progressRatio < 1) {
          requestAnimationFrame(animate);
        }
      };
      
      // Iniciar animação após um pequeno delay
      const timeoutId = setTimeout(() => {
        requestAnimationFrame(animate);
      }, 500);
      
      return () => clearTimeout(timeoutId);
    } else {
      setAnimatedProgress(progress);
    }
  }, [progress, animated, duration]);

  return (
    <div className="w-full max-w-md mx-auto">
      {label && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-white">{label}</span>
          <span className="text-sm font-medium text-white">{animatedProgress}%</span>
        </div>
      )}
      <div className="w-full bg-gray-200/30 rounded-full h-3 overflow-hidden backdrop-blur-sm">
        <div 
          className="h-full bg-gradient-to-r from-accent-orange to-accent-yellow rounded-full transition-all duration-300 ease-out relative overflow-hidden"
          style={{ width: `${animatedProgress}%` }}
        >
          {/* Efeito de brilho animado */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" />
        </div>
      </div>
    </div>
  );
}
