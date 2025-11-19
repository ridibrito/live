'use client';

import { useEffect } from 'react';
import ProgressBar from '@/components/ProgressBar';
import { CheckCircleIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';

// Tipagem segura do dataLayer (sem "any")
declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

export default function ObrigadoPage() {
  // Dispara o evento de LEAD com pequenas tentativas para garantir que o GTM/Pixel estejam prontos
  useEffect(() => {
    let pushed = false;
    const timers: Array<number | ReturnType<typeof setTimeout>> = [];
    const delays = [0, 600, 1500]; // tenta agora, depois de 600ms e 1500ms

    const tryPush = () => {
      if (typeof window === 'undefined') return;
      window.dataLayer = window.dataLayer ?? [];
      // se já empurramos, não repete
      if (pushed) return;

      // empurra o evento
      window.dataLayer.push({
        event: 'lead_confirmed',
        page_path: window.location.pathname,
        timestamp: Date.now(),
      });
      pushed = true;
      // console.log('✅ lead_confirmed enviado ao dataLayer');
    };

    delays.forEach((ms) => {
      const t = setTimeout(() => {
        if (!pushed) tryPush();
      }, ms);
      timers.push(t);
    });

    return () => {
      timers.forEach((t) => clearTimeout(t as number));
    };
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-primary-dark via-primary-purple to-primary-dark flex items-center justify-center px-6 py-20">
      <div className="max-w-2xl w-full text-center space-y-8">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Image
            src="/horizontal.png"
            alt="Logo Aldeia Singular"
            width={300}
            height={100}
            className="object-contain"
            style={{ height: 'auto' }}
            priority
          />
        </div>

        {/* Título Principal */}
        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
            Sua inscrição está <span className="text-accent-yellow">confirmada</span>, mas ainda falta um passo!
          </h1>
        </div>

        {/* Barra de Progresso */}
        <div className="py-8">
          <ProgressBar progress={90} label="Progresso da sua jornada" />
        </div>

        {/* Subtítulo */}
        <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
          Clique no link abaixo e entre no grupo do WhatsApp para você ficar por dentro de todas as informações e aquecimento para nosso encontro.
        </p>

        {/* Botão CTA Principal */}
        <div className="space-y-6">
          <a
            href="https://chat.whatsapp.com/KJZ2q2IYAPdCPThZtORyPo"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-gradient-to-r from-accent-orange to-accent-yellow text-white font-bold py-4 px-8 rounded-xl text-lg hover:from-orange-600 hover:to-yellow-500 transform hover:scale-105 transition-all duration-200 shadow-2xl border-2 border-white"
          >
            NÃO QUERO PERDER NADA
          </a>
          <p className="text-white/80 text-sm">⚡ Acesso imediato ao grupo exclusivo</p>
        </div>

        {/* Informações Adicionais */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mt-12">
          <h3 className="text-xl font-semibold text-white mb-4">O que você vai receber no grupo:</h3>
          <div className="grid md:grid-cols-2 gap-4 text-left">
            <div className="flex items-start space-x-3">
              <CheckCircleIcon className="w-5 h-5 text-accent-orange mt-0.5 flex-shrink-0" />
              <span className="text-white">Materiais preparatórios exclusivos</span>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircleIcon className="w-5 h-5 text-accent-orange mt-0.5 flex-shrink-0" />
              <span className="text-white">Dicas diárias antes da live</span>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircleIcon className="w-5 h-5 text-accent-orange mt-0.5 flex-shrink-0" />
              <span className="text-white">Lembretes da data e horário</span>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircleIcon className="w-5 h-5 text-accent-orange mt-0.5 flex-shrink-0" />
              <span className="text-white">Comunidade de apoio</span>
            </div>
          </div>
        </div>

        {/* Rodapé */}
        <div className="pt-8 space-y-4">
          <p className="text-white/60 text-sm">
            Se tiver qualquer dúvida, entre em contato conosco pelo WhatsApp
          </p>
          <a
            href="https://wa.me/5561999093760"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-3 bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duração-200 transform hover:scale-105 shadow-lg"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884" />
            </svg>
            <span>Falar no WhatsApp</span>
          </a>
        </div>
      </div>
    </main>
  );
}
