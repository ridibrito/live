import ProgressBar from '@/components/ProgressBar';
import { CheckCircleIcon } from '@heroicons/react/24/outline';

export default function ObrigadoPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-primary-dark via-primary-purple to-primary-dark flex items-center justify-center px-6">
      <div className="max-w-2xl w-full text-center space-y-8">
        {/* Título Principal */}
        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
            Sua inscrição está <span className="text-accent-orange">confirmada</span>, mas ainda falta um passo!
          </h1>
        </div>

        {/* Subtítulo */}
        <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
          Clique no link abaixo e entre no grupo do WhatsApp para você ficar por dentro de todas as informações e aquecimento para nosso encontro.
        </p>

        {/* Barra de Progresso */}
        <div className="py-8">
          <ProgressBar progress={90} label="Progresso da sua jornada" />
        </div>

        {/* Botão CTA Principal */}
        <div className="space-y-6">
          <a
            href="https://chat.whatsapp.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-gradient-to-r from-accent-orange to-accent-yellow text-white font-bold py-6 px-12 rounded-xl text-2xl hover:from-orange-600 hover:to-yellow-500 transform hover:scale-105 transition-all duration-200 shadow-2xl"
          >
            NÃO QUERO PERDER NADA
          </a>
          
          <p className="text-white/80 text-sm">
            ⚡ Acesso imediato ao grupo exclusivo
          </p>
        </div>

        {/* Informações Adicionais */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mt-12">
          <h3 className="text-xl font-semibold text-white mb-4">O que você vai receber no grupo:</h3>
          <div className="grid md:grid-cols-2 gap-4 text-left">
            <div className="flex items-start space-x-3">
              <CheckCircleIcon className="w-5 h-5 text-accent-orange mt-0.5 flex-shrink-0" />
              <span className="text-white/90">Materiais preparatórios exclusivos</span>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircleIcon className="w-5 h-5 text-accent-orange mt-0.5 flex-shrink-0" />
              <span className="text-white/90">Dicas diárias antes da live</span>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircleIcon className="w-5 h-5 text-accent-orange mt-0.5 flex-shrink-0" />
              <span className="text-white/90">Lembretes da data e horário</span>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircleIcon className="w-5 h-5 text-accent-orange mt-0.5 flex-shrink-0" />
              <span className="text-white/90">Comunidade de apoio</span>
            </div>
          </div>
        </div>

        {/* Rodapé */}
        <div className="pt-8">
          <p className="text-white/60 text-sm">
            Se tiver qualquer dúvida, entre em contato conosco pelo WhatsApp
          </p>
        </div>
      </div>
    </main>
  );
}
