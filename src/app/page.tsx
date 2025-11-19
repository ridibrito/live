'use client';

import RegistrationFormWrapper from '@/components/RegistrationFormWrapper';
import Section from '@/components/Section';
import Image from 'next/image';
import { useEffect } from 'react';
import {
  CalendarDaysIcon,
  ClockIcon,
  ComputerDesktopIcon,
  QuestionMarkCircleIcon,
  HeartIcon,
  LightBulbIcon,
  DocumentTextIcon,
  UserGroupIcon,
  CheckCircleIcon,
  LinkIcon,
  BookOpenIcon
} from '@heroicons/react/24/outline';

export default function Home() {
  useEffect(() => {
    // Aguardar a hidratação completa
    const timer = setTimeout(() => {
      // Função para rolagem suave e lenta
      const smoothScrollToForm = (e: Event) => {
        e.preventDefault();
        const target = document.getElementById('form');
        if (target) {
          const targetPosition = target.offsetTop - 100; // 100px de margem
          const startPosition = window.pageYOffset;
          const distance = targetPosition - startPosition;
          const duration = 2000; // 2 segundos para rolagem mais lenta
          let start: number | null = null;

          const animation = (currentTime: number) => {
            if (start === null) start = currentTime;
            const timeElapsed = currentTime - start;
            const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
          };

          // Função de easing para movimento suave
          const easeInOutQuad = (t: number, b: number, c: number, d: number) => {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
          };

          requestAnimationFrame(animation);
        }
      };

      // Adicionar event listeners para todos os links que levam ao formulário
      const formLinks = document.querySelectorAll('a[href="#form"]');
      formLinks.forEach(link => {
        link.addEventListener('click', smoothScrollToForm);
      });

      // Cleanup
      return () => {
        formLinks.forEach(link => {
          link.removeEventListener('click', smoothScrollToForm);
        });
      };
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="min-h-screen">
      {/* DOBRA 1: A Promessa e a Ação Imediata */}
      <section id="form" className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-dark via-primary-purple to-primary-dark">
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 container mx-auto px-6 py-20">
          {/* Logo Principal */}
          <div className="flex justify-center mb-12">
            <Image
              src="/horizontal.png"
              alt="Logo Aldeia Singular"
              width={300}
              height={100}
              className="object-contain"
              style={{ height: "auto" }}
              priority
            />
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Conteúdo do Hero */}
            <div className="text-white space-y-8">
              <div className="space-y-6">
                <h1 className="leading-tight mb-6">
                  <span className="block text-xl md:text-2xl font-medium text-white/90 mb-2">Entre Singularidades:</span>
                  <span className="block text-3xl md:text-4xl lg:text-5xl font-bold text-white">AHSD em Crianças com TEA e TDAH</span>
                </h1>
                <p className="text-lg lg:text-xl text-white/90 leading-relaxed">
                  <span className="font-bold">Meu filho tem TDAH, TEA ou Altas Habilidades?</span> Uma conversa acolhedora e esclarecedora para pais que se sentem perdidos no labirinto do diagnóstico e buscam a melhor forma de apoiar suas crianças singulares.
                </p>
              </div>

              {/* Destaque do Evento */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-accent-orange rounded-full flex items-center justify-center mt-1">
                    <CalendarDaysIcon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-black uppercase tracking-wide opacity-80">Quando?</span>
                    <span className="text-base lg:text-lg font-medium">01 de Dezembro (Segunda-feira)</span>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-accent-orange rounded-full flex items-center justify-center mt-1">
                    <ClockIcon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-black uppercase tracking-wide opacity-80">Que Horas?</span>
                    <span className="text-base lg:text-lg font-medium">19h45 (Horário de Brasília)</span>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-accent-orange rounded-full flex items-center justify-center mt-1 flex-shrink-0">
                    <ComputerDesktopIcon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-black uppercase tracking-wide opacity-80">Onde?</span>
                    <span className="text-base lg:text-lg font-medium">Ao vivo, no YouTube. O link exclusivo será enviado por e-mail e WhatsApp para os inscritos.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Formulário de Inscrição */}
            <div className="flex justify-center lg:justify-end">
              <RegistrationFormWrapper />
            </div>
          </div>
        </div>
      </section>

      {/* DOBRA 3: O que você vai descobrir nesta Roda de Conversa */}
      <Section backgroundColor="purple">
        <div className="text-center space-y-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-white">
            O que você vai descobrir nesta Roda de Conversa:
          </h2>

          <div className="max-w-5xl mx-auto space-y-8">
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl text-left">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-accent-orange rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircleIcon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-3">Altas Habilidades são uma Neurodivergência?</h3>
                  <p className="text-white/90">
                    Qual a visão da medicina e da psiquiatria sobre as AHSD e qual a melhor maneira de avaliá-las hoje.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl text-left">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-accent-orange rounded-full flex items-center justify-center flex-shrink-0">
                  <LinkIcon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-3">O que é a &quot;Dupla Condição&quot;?</h3>
                  <p className="text-white/90">
                    Entenda como as Altas Habilidades coexistem com o TDAH e o TEA e os segredos para um diagnóstico diferencial correto.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl text-left">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-accent-orange rounded-full flex items-center justify-center flex-shrink-0">
                  <BookOpenIcon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-3">Diagnóstico na Primeira Consulta: É possível?</h3>
                  <p className="text-white/90">
                    O que um profissional experiente precisa observar na sessão inicial para guiar os pais após a consulta, evitando rótulos apressados.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl text-left">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-accent-orange rounded-full flex items-center justify-center flex-shrink-0">
                  <HeartIcon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-3">Dificuldade Social: TDAH vs. TEA</h3>
                  <p className="text-white/90">
                    &quot;Meu filho tem dificuldade com amigos&quot;. Entenda a diferença crucial do déficit de Cognição Social no TDAH e como ele se distingue do que ocorre no TEA.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <a
              href="#form"
              className="inline-block bg-gradient-to-r from-accent-orange to-accent-yellow text-white font-bold py-4 px-8 rounded-xl text-lg hover:from-orange-600 hover:to-yellow-500 transform hover:scale-105 transition-all duration-200 shadow-lg border-2 border-white"
            >
              Quero garantir meu lugar nesta conversa
            </a>
            <p className="text-white/80 text-sm mt-4">
              Ao se inscrever, você concorda em receber comunicações sobre este e outros eventos da Aldeia Singular.
            </p>
          </div>
        </div>
      </Section>

      {/* DOBRA 4: Nossos Especialistas (Autoridade) */}
      <Section backgroundColor="gray">
        <div className="text-center space-y-12">
          {/* Títulos individuais aplicados abaixo */}

          {/* Dr. Tiago Figueiredo */}
          <h2 className="text-3xl lg:text-4xl font-bold text-primary-dark mb-8">
            Nosso convidado especial
          </h2>
          <div className="max-w-6xl mx-auto">
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
              <div className="grid lg:grid-cols-2 gap-0">
                {/* Lado esquerdo - Texto */}
                <div className="p-8 lg:p-12 flex flex-col justify-center order-2 lg:order-1">
                  <div className="space-y-6">
                    <div className="space-y-4 text-gray-700">
                      <h3 className="text-2xl lg:text-3xl font-bold text-primary-dark mb-2">
                        Dr. Tiago Figueiredo, MD, Ph.D.
                      </h3>
                      <p className="text-lg font-semibold text-accent-orange">
                        Convidado Especial
                      </p>
                      <p className="text-base lg:text-lg leading-relaxed">
                        Médico Psiquiatra, com especialização em Psiquiatria da Infância e Adolescência. Sua jornada acadêmica é profundamente ligada aos temas do nosso encontro: possui Mestrado e Doutorado com pesquisas focadas no TDAH e um Pós-Doutorado em Psicopatologia da Infância e Adolescência e Neurociências pela UFMG.
                      </p>

                      <p className="text-base lg:text-lg leading-relaxed">
                        Fundador da Clínica Cognus, é autor do livro &quot;Cognição Social&quot; e trata diariamente de condições como TDAH e Transtorno do Espectro Autista. Dr. Tiago é uma referência no entendimento das complexas intersecções do neurodesenvolvimento, unindo a prática clínica a um profundo conhecimento científico para guiar famílias com diagnósticos precisos e planos de cuidado humanizados.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Lado direito - Placeholder para foto */}
                <div className="relative bg-gradient-to-br from-primary-purple to-primary-dark p-8 lg:p-12 flex items-center justify-center order-1 lg:order-2">
                  <div className="relative w-full h-full min-h-[300px] flex items-center justify-center">
                    <div className="text-white text-center">
                      <UserGroupIcon className="w-24 h-24 mx-auto mb-4 opacity-50" />
                      <p className="text-sm opacity-75">Foto do Dr. Tiago Figueiredo</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Dra. Angela Virgolim */}
          <h2 className="text-3xl lg:text-4xl font-bold text-primary-dark mb-8 mt-16">
            Quem irá conduzir
          </h2>
          <div className="max-w-6xl mx-auto">
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
              <div className="grid lg:grid-cols-2 gap-0">
                {/* Lado esquerdo - Foto da Angela */}
                <div className="relative bg-gradient-to-br from-primary-purple to-primary-dark p-8 lg:p-12 flex items-center justify-center">
                  <div className="relative">
                    <div className="absolute -inset-4 bg-gradient-to-r from-accent-orange to-accent-yellow rounded-2xl blur-sm opacity-30"></div>
                    <Image
                      src="/angela_site.webp"
                      alt="Angela Virgolim"
                      width={400}
                      height={400}
                      className="relative rounded-2xl shadow-2xl object-cover border-4 border-white"
                    />
                  </div>
                  {/* Decoração de fundo */}
                  <div className="absolute top-4 right-4 w-20 h-20 bg-accent-orange/20 rounded-full"></div>
                  <div className="absolute bottom-4 left-4 w-16 h-16 bg-accent-yellow/20 rounded-full"></div>
                </div>

                {/* Lado direito - Texto */}
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <div className="space-y-6">
                    <div className="space-y-4 text-gray-700">
                      <h3 className="text-2xl lg:text-3xl font-bold text-primary-dark mb-2">
                        Dra. Angela Virgolim
                      </h3>
                      <p className="text-base lg:text-lg leading-relaxed">
                        A Dra. Angela Virgolim é uma das maiores referências no Brasil em Altas Habilidades e Superdotação.
                      </p>
                      <p className="text-base lg:text-lg leading-relaxed">
                        Pesquisadora, psicóloga e autora de 10 obras fundamentais sobre o tema, dedica sua vida a apoiar famílias, educadores e profissionais a compreenderem e acolherem pessoas com AHSD.
                      </p>
                      <p className="text-base lg:text-lg leading-relaxed">
                        Com uma trajetória marcada pela sensibilidade e profundidade científica, Angela criou a Aldeia Singular para acolher, orientar e apoiar uma geração de mães e pais conscientes, fortalecidos e conectados com o potencial de seus filhos AHSD.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <a
              href="#form"
              className="inline-block bg-gradient-to-r from-accent-orange to-accent-yellow text-white font-bold py-4 px-8 rounded-xl text-lg hover:from-orange-600 hover:to-yellow-500 transform hover:scale-105 transition-all duration-200 shadow-lg border-2 border-white"
            >
              QUERO PARTICIPAR DA LIVE
            </a>
          </div>
        </div>
      </Section>

      {/* DOBRA 5: Última Dobra - Chamada Final */}
      <Section backgroundColor="purple">
        <div className="text-center space-y-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-white">
            A transformação que você busca para seu filho começa com o seu fortalecimento e conhecimento.
          </h2>

          <div className="max-w-3xl mx-auto">
            <p className="text-lg lg:text-xl text-white/90 leading-relaxed mb-12">
              Este encontro é o nosso primeiro passo, juntos. Um convite para você respirar fundo, encontrar respostas claras sobre AHSD, TDAH e TEA, e se conectar com quem entende a sua realidade.
            </p>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
              <div className="space-y-6">
                <div className="text-center">
                  <div className="text-5xl font-bold text-accent-orange mb-4">GRATUITO</div>
                  <p className="text-lg text-white/90">Este encontro é totalmente gratuito</p>
                </div>

                <div className="space-y-4 text-left">
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-accent-orange rounded-full flex items-center justify-center">
                      <CheckCircleIcon className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-white/90">Acesso imediato ao grupo do WhatsApp (para receber o link da live)</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-accent-orange rounded-full flex items-center justify-center">
                      <CheckCircleIcon className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-white/90">Uma conversa com dois grandes especialistas no tema</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-accent-orange rounded-full flex items-center justify-center">
                      <CheckCircleIcon className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-white/90">Um espaço seguro e acolhedor para suas dúvidas</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12">
              <a
                href="#form"
                className="inline-block bg-gradient-to-r from-accent-orange to-accent-yellow text-white font-bold py-6 px-12 rounded-xl text-2xl hover:from-orange-600 hover:to-yellow-500 transform hover:scale-105 transition-all duration-200 shadow-2xl border-2 border-white"
              >
                QUERO PARTICIPAR DA LIVE
              </a>
            </div>
          </div>
        </div>
      </Section>

      {/* Footer */}
      <footer className="bg-gray-50 py-12 px-6">
        <div className="max-w-6xl mx-auto text-center space-y-6">
          <div className="space-y-4">
            <p className="text-lg font-semibold text-gray-700">Oferecimento:</p>
            <div className="flex justify-center">
              <Image
                src="/horizontal.png"
                alt="Logo Aldeia Singular"
                width={250}
                height={80}
                className="object-contain"
                style={{ height: "auto" }}
              />
            </div>
            <p className="text-base text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Faça parte da maior comunidade de mães e pais que encontram apoio, clareza e caminhos reais para entender e fortalecer seus filhos com Altas Habilidades e Superdotação.
            </p>
            <a
              href="https://aldeiasingular.com.br"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-gradient-to-r from-accent-orange to-accent-yellow text-white font-bold py-3 px-8 rounded-xl text-base hover:from-orange-600 hover:to-yellow-500 transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              Conheça a Aldeia Singular
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
