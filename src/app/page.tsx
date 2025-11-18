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
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight">
                  Entre Singularidades: AHSD em Crianças com TEA e TDAH
                </h1>
                <p className="text-lg lg:text-xl text-white/90 leading-relaxed">
                  Meu filho tem TDAH, TEA ou Altas Habilidades? Uma conversa acolhedora e esclarecedora para pais que se sentem perdidos no labirinto do diagnóstico e buscam a melhor forma de apoiar suas crianças singulares.
                </p>
              </div>
              
              {/* Destaque do Evento */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-accent-orange rounded-full flex items-center justify-center">
                    <CalendarDaysIcon className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-base lg:text-lg"><span className="font-black">Quando?</span> 01 de Dezembro (Segunda-feira).</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-accent-orange rounded-full flex items-center justify-center">
                    <ClockIcon className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-base lg:text-lg"><span className="font-black">Que horas?</span> 19h45 (Horário de Brasília).</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-accent-orange rounded-full flex items-center justify-center">
                    <ComputerDesktopIcon className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-base lg:text-lg"><span className="font-black">Onde?</span> Ao vivo, no YouTube. O link exclusivo será enviado por e-mail e WhatsApp para os inscritos.</span>
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

      {/* DOBRA 2: A Dor (Conexão e Empatia) */}
      <Section backgroundColor="gray">
        <div className="text-center space-y-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-primary-dark">
            A Dor (Conexão e Empatia)
          </h2>
          
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="p-6 bg-white rounded-xl shadow-md">
              <p className="text-base lg:text-lg text-gray-700 text-left leading-relaxed">
                &quot;Ele é tão inteligente, mas não para quieto.&quot; &quot;Ele tem uma memória incrível para temas específicos, mas não consegue fazer amigos.&quot; &quot;A escola me chamou de novo. Disseram que ele pode ter TDAH, mas eu sinto que é mais do que isso.&quot;
              </p>
            </div>

            <div className="p-6 bg-white rounded-xl shadow-md">
              <p className="text-base lg:text-lg text-gray-700 text-left leading-relaxed">
                Se essas frases ressoam com você, você entende a angústia que é tentar decifrar uma criança que parece viver em vários mundos ao mesmo tempo.
              </p>
            </div>

            <div className="p-6 bg-white rounded-xl shadow-md">
              <p className="text-base lg:text-lg text-gray-700 text-left leading-relaxed">
                A intensidade, a sensibilidade, a dificuldade social, a inquietação... Onde termina a Alta Habilidade e começa o TDAH? Como a rigidez do TEA se parece (ou não) com o hiperfoco da Superdotação?
              </p>
            </div>

            <div className="p-6 bg-white rounded-xl shadow-md">
              <p className="text-base lg:text-lg text-gray-700 text-left leading-relaxed">
                A verdade é que, muitas vezes, esses caminhos se cruzam. A &quot;Dupla Condição&quot; (ou Dupla Excepcionalidade) é real, mas é complexa, pouco discutida e, frequentemente, leva a diagnósticos confusos ou incompletos. Isso gera ansiedade para os pais e frustração para a criança, que não se sente compreendida em sua totalidade.
              </p>
            </div>

            <div className="p-6 bg-white rounded-xl shadow-md border-l-4 border-accent-orange">
              <p className="text-base lg:text-lg text-gray-700 text-left leading-relaxed font-medium">
                Viemos trazer luz, ciência e acolhimento para essa jornada.
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-xl lg:text-2xl font-bold text-primary-dark mb-4">
              Convidamos você para a Roda de Conversa Entre Singularidades: AHSD em Crianças com TEA e TDAH
            </p>
            <p className="text-lg lg:text-xl text-gray-700 mb-8">
              Junte-se à Dra. Angela Virgolim e ao nosso convidado especial, Dr. Tiago Figueiredo, em um encontro ao vivo, gratuito e online. Vamos mergulhar fundo nas múltiplas formas de expressão do potencial e nos desafios do diagnóstico.
            </p>
            <a 
              href="#form" 
              className="inline-block bg-gradient-to-r from-accent-orange to-accent-yellow text-white font-bold py-4 px-8 rounded-xl text-lg hover:from-orange-600 hover:to-yellow-500 transform hover:scale-105 transition-all duration-200 shadow-lg border-2 border-white"
            >
              Quero garantir meu lugar nesta conversa
            </a>
          </div>
        </div>
      </Section>

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
          <h2 className="text-3xl lg:text-4xl font-bold text-primary-dark">
            Nossos Especialistas
          </h2>
          
          {/* Dra. Angela Virgolim */}
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
                      Essa fascinação pela &quot;faísca&quot; única em cada criança a levou a uma busca que uniu o acadêmico e o afetivo. Por 30 anos, foi professora e mentora na Universidade de Brasília (UnB) e atravessou o mundo para obter seu PhD em Psicologia pela Universidade de Connecticut, onde se especializou diretamente com o maior nome da área, o Dr. Joseph Renzulli.
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

          {/* Dr. Tiago Figueiredo */}
          <div className="max-w-6xl mx-auto mt-12">
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
              Comunidade que acolhe e fortalece mães e pais de crianças e adolescentes com Altas Habilidades e Superdotação, identificados ou em processo de identificação.
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
