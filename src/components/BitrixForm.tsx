'use client';

import { useEffect, useState, useRef } from 'react';

export default function BitrixForm() {
  const [isLoading, setIsLoading] = useState(true);
  const [shouldLoad, setShouldLoad] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Intersection Observer para lazy loading
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !shouldLoad) {
            setShouldLoad(true);
          }
        });
      },
      {
        rootMargin: '100px', // Começa a carregar 100px antes de aparecer
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, [shouldLoad]);

  useEffect(() => {
    if (!shouldLoad) return;

    // Carregar o script do Bitrix24
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://cdn.bitrix24.com.br/b30486581/crm/form/loader_58.js?${Math.floor(Date.now() / 180000)}`;
    script.setAttribute('data-b24-form', 'inline/58/80lp05');
    script.setAttribute('data-skip-moving', 'true');

    // Quando o script carregar, remover o loading
    script.onload = () => {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000); // Pequeno delay para garantir que o form renderizou
    };

    script.onerror = () => {
      setIsLoading(false);
    };

    if (containerRef.current) {
      containerRef.current.appendChild(script);
    }

    return () => {
      // Cleanup se necessário
      if (script && script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [shouldLoad]);

  return (
    <div ref={containerRef} className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-6">
      {isLoading && (
        <div className="animate-pulse space-y-6">
          {/* Skeleton do título */}
          <div className="h-8 bg-gradient-to-r from-orange-200 to-yellow-200 rounded-lg w-3/4"></div>
          
          {/* Skeleton dos campos */}
          <div className="space-y-4">
            <div>
              <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
              <div className="h-12 bg-gray-100 rounded-lg"></div>
            </div>
            <div>
              <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
              <div className="h-12 bg-gray-100 rounded-lg"></div>
            </div>
            <div>
              <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
              <div className="h-12 bg-gray-100 rounded-lg"></div>
            </div>
          </div>

          {/* Skeleton do botão */}
          <div className="h-14 bg-gradient-to-r from-orange-300 to-yellow-300 rounded-lg"></div>

          {/* Mensagem de carregamento */}
          <div className="text-center">
            <p className="text-sm text-gray-500">Carregando formulário...</p>
          </div>
        </div>
      )}
      
      {/* O formulário do Bitrix24 será injetado aqui */}
      <div className={isLoading ? 'hidden' : 'block'}>
        {/* O script do Bitrix24 renderizará o formulário aqui */}
      </div>
    </div>
  );
}

