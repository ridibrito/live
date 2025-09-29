'use client';

import RegistrationForm from '@/components/RegistrationForm';
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
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight">
                  A jornada de criar um filho com Altas Habilidades pode e deve ser mais leve. <span className="text-[#F5AF21] underline decoration-[#F5AF21] decoration-2 underline-offset-4">Chegou a hora de cuidar de quem cuida.</span>
                </h1>
                <p className="text-lg lg:text-xl text-white/90 leading-relaxed">
                Encontro online e gratuito pensado para descobrir caminhos para fortalecer seu filho e se fortalecer como mães e pais de filhos com Altas Habilidades e Superdotação .                </p>
              </div>
              
              {/* Destaque do Evento */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-accent-orange rounded-full flex items-center justify-center">
                    <CalendarDaysIcon className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-base lg:text-lg"><span className="font-black">Quando?</span> Dia 09 de Outubro, quinta-feira.</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-accent-orange rounded-full flex items-center justify-center">
                    <ClockIcon className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-base lg:text-lg"><span className="font-black">Que horas?</span> Às 19h45 (horário de Brasília).</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-accent-orange rounded-full flex items-center justify-center">
                    <ComputerDesktopIcon className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-base lg:text-lg"><span className="font-black">Onde?</span> Online e Ao Vivo.</span>
                </div>
              </div>
            </div>
            
            {/* Formulário de Inscrição */}
            <div className="flex justify-center lg:justify-end">
              <RegistrationForm />
            </div>
          </div>
        </div>
      </section>

      {/* DOBRA 2: Conexão com a Dor (Empatia) */}
      <Section backgroundColor="gray">
        <div className="text-center space-y-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-primary-dark">
            Mamãe e Papai, se vocês...
          </h2>
          
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex items-start space-x-4 p-6 bg-white rounded-xl shadow-md">
              <div className="w-8 h-8 bg-accent-orange rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <QuestionMarkCircleIcon className="w-5 h-5 text-white" />
              </div>
              <p className="text-base lg:text-lg text-gray-700 text-left">
                Sentem-se perdidos, tentando entender se os comportamentos intensos e a curiosidade insaciável do seu filho são, de fato, sinais de Altas Habilidades.
              </p>
            </div>

            <div className="flex items-start space-x-4 p-6 bg-white rounded-xl shadow-md">
              <div className="w-8 h-8 bg-accent-orange rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <HeartIcon className="w-5 h-5 text-white" />
              </div>
              <p className="text-base lg:text-lg text-gray-700 text-left">
                Percebem a falta de apoio da escola e até da família, ouvindo que é &quot;apenas uma fase&quot; ou &quot;coisa de criança inteligente&quot;.
              </p>
            </div>

            <div className="flex items-start space-x-4 p-6 bg-white rounded-xl shadow-md">
              <div className="w-8 h-8 bg-accent-orange rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <LightBulbIcon className="w-5 h-5 text-white" />
              </div>
              <p className="text-base lg:text-lg text-gray-700 text-left">
                Buscam conhecimento confiável, mas se deparam com um oceano de informações confusas e mitos que mais atrapalham do que ajudam.
              </p>
            </div>

            <div className="flex items-start space-x-4 p-6 bg-white rounded-xl shadow-md">
              <div className="w-8 h-8 bg-accent-orange rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <DocumentTextIcon className="w-5 h-5 text-white" />
              </div>
              <p className="text-base lg:text-lg text-gray-700 text-left">
                Se perguntam, no silêncio do fim do dia, se estão fazendo o suficiente e como podem verdadeiramente ajudar seu filho a florescer sem se sentirem esgotados.
              </p>
            </div>

            <div className="flex items-start space-x-4 p-6 bg-white rounded-xl shadow-md">
              <div className="w-8 h-8 bg-accent-orange rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <UserGroupIcon className="w-5 h-5 text-white" />
              </div>
              <p className="text-base lg:text-lg text-gray-700 text-left">
                Anseiam por conversar com outros pais que entendem exatamente o que vocês estão sentindo, sem julgamentos ou conselhos vazios.
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-2xl lg:text-3xl font-bold text-accent-orange mb-8">
              ... então este encontro foi desenhado para vocês.
            </p>
            <a 
              href="#form" 
              className="inline-block bg-gradient-to-r from-accent-orange to-accent-yellow text-white font-bold py-4 px-8 rounded-xl text-lg hover:from-orange-600 hover:to-yellow-500 transform hover:scale-105 transition-all duration-200 shadow-lg border-2 border-white"
            >
              QUERO PARTICIPAR DA LIVE
            </a>
          </div>
        </div>
      </Section>

      {/* DOBRA 3: Apresentação da Solução (O Conteúdo) */}
      <Section backgroundColor="purple">
        <div className="text-center space-y-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-white">
            Do que conversaremos no nosso encontro?
          </h2>
          
          <div className="max-w-5xl mx-auto space-y-8">
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl text-left">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-accent-orange rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircleIcon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-3">Clareza para o Caminho</h3>
                  <p className="text-white/90">
                    Como identificar os sinais das Altas Habilidades com segurança e acolher essa descoberta em família, transformando dúvida em confiança.
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
                  <h3 className="text-xl font-bold text-white mb-3">Construindo Pontes</h3>
                  <p className="text-white/90">
                    Estratégias para criar uma rede de apoio eficaz, dialogando com a escola e envolvendo a família na jornada de desenvolvimento do seu filho.
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
                  <h3 className="text-xl font-bold text-white mb-3">Conhecimento que Liberta</h3>
                  <p className="text-white/90">
                    Vamos desmistificar os maiores mitos sobre a Superdotação  e focar no que a ciência e a prática nos ensinam sobre o bem-estar emocional e intelectual dessas crianças.
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
                  <h3 className="text-xl font-bold text-white mb-3">Ferramentas para o Coração</h3>
                  <p className="text-white/90">
                    Como lidar com a intensidade emocional, a sensibilidade e os desafios do dia a dia de forma afetuosa e prática, cuidando da saúde mental de todos.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl text-left">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-accent-orange rounded-full flex items-center justify-center flex-shrink-0">
                  <UserGroupIcon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-3">O Poder do &quot;Nós&quot;</h3>
                  <p className="text-white/90">
                    A importância vital de se conectar. Falaremos sobre como encontrar e nutrir uma comunidade de apoio que entende, acolhe e fortalece.
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
              QUERO PARTICIPAR DA LIVE
            </a>
          </div>
        </div>
      </Section>

      {/* DOBRA 4: Quem Guia a Jornada (Autoridade e Conexão) */}
      <Section backgroundColor="gray">
        <div className="text-center space-y-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-primary-dark">
            Quem te guia nessa jornada
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
                    {/* Citação destacada */}
                    <div className="bg-gradient-to-r from-accent-orange to-accent-yellow p-6 rounded-2xl text-white">
                      <p className="text-lg lg:text-xl font-semibold italic leading-relaxed">
                        &quot;Para que uma criança com potencial brilhante possa florescer, quem cuida dela precisa estar forte, informado e, acima de tudo, amparado.&quot;
                      </p>
                      <p className="text-right mt-4 font-medium">— Angela Virgolim</p>
                    </div>
                    
                    {/* Biografia */}
                    <div className="space-y-4 text-gray-700">
                      <p className="text-base lg:text-lg leading-relaxed">
                        A jornada de Angela Virgolim começa no mesmo lugar que a sua: no amor que observa, no cuidado que busca respostas. Antes de ser autora e uma referência nacional e mundial no tema de Altas Habilidades e Superdotação , ela é mineira de Araxá, esposa, mãe e avó de Altas Habilidades.
                      </p>
                      
                      <p className="text-base lg:text-lg leading-relaxed">
                      Essa fascinação pela "faísca" única em cada criança a levou a uma busca que uniu o acadêmico e o afetivo. Por 30 anos, foi professora e mentora na Universidade de Brasília (UnB) e atravessou o mundo para obter seu PhD em Psicologia pela Universidade de Connecticut, onde se especializou diretamente com o maior nome da área, o Dr. Joseph Renzulli.
                      </p>
                      
                      <p className="text-base lg:text-lg leading-relaxed">
                      Foi nesse percurso, trabalhando com preparação e capacitação de professores na UnB, que mais tarde teve enfoque para os pais, e na sua jornada com o Instituto Virgolim, com um contato mais direto com as famílias, Angela percebeu algo fundamental: o conhecimento técnico, por si só, não bastava. A maior angústia das mães e dos pais era a solidão e a incerteza.                      </p>
                    </div>
                    
                    {/* Credenciais */}
                    <div className="grid grid-cols-2 gap-3 pt-6">
                      <div className="bg-primary-purple text-white p-4 rounded-xl text-center">
                        <div className="text-2xl font-bold">30+</div>
                        <div className="text-sm">anos na UnB</div>
                      </div>
                      <div className="bg-accent-orange text-white p-4 rounded-xl text-center">
                        <div className="text-2xl font-bold">PhD</div>
                        <div className="text-sm">Psicologia</div>
                      </div>
                      <div className="bg-accent-yellow text-white p-4 rounded-xl text-center">
                        <div className="text-2xl font-bold">1º</div>
                        <div className="text-sm">Prêmio Jabuti</div>
                      </div>
                      <div className="bg-primary-dark text-white p-4 rounded-xl text-center">
                        <div className="text-2xl font-bold">1000+</div>
                        <div className="text-sm">famílias</div>
                      </div>
                    </div>
                    
                    {/* Missão final */}
                    <div className="bg-gray-50 p-6 rounded-2xl border-l-4 border-accent-orange">
                      <p className="text-base lg:text-lg text-gray-700 leading-relaxed font-medium">
                        Mesmo após presidir o Conselho Brasileiro para Superdotação  (ConBraSD), ela fundou o Instituto Virgolim: um espaço de acolhimento pensado para transformar décadas de ciência em um apoio real para a sua jornada, garantindo que você não precise mais caminhar só.
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

      {/* DOBRA 5: Chamada Final para Ação (Urgência e Reforço) */}
      <Section backgroundColor="purple">
        <div className="text-center space-y-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-white">
            Sua jornada não precisa mais ser solitária.
          </h2>
          
          <div className="max-w-3xl mx-auto">
            <p className="text-lg lg:text-xl text-white/90 leading-relaxed mb-12">
              Este encontro é o nosso primeiro passo, juntos. Um convite para você respirar fundo, encontrar respostas e se conectar com quem entende a sua realidade. A transformação que você busca para seu filho começa com o seu fortalecimento.
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
                    <span className="text-white/90">Acesso imediato ao grupo do WhatsApp</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-accent-orange rounded-full flex items-center justify-center">
                      <CheckCircleIcon className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-white/90">Material exclusivo preparatório</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-accent-orange rounded-full flex items-center justify-center">
                      <CheckCircleIcon className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-white/90">Comunidade de pais que te entendem</span>
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
      </main>
  );
}
