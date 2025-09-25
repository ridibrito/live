'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  phone: z.string().min(10, 'Telefone deve ter pelo menos 10 dígitos'),
  occupation: z.string().min(2, 'Ocupação deve ter pelo menos 2 caracteres'),
});

type FormData = z.infer<typeof formSchema>;

export default function RegistrationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    
    try {
      // Simular delay de processamento
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('Formulário enviado com sucesso:', data);
      console.log('📝 Dados que serão processados pelo Mautic:', {
        name: data.name,
        email: data.email,
        phone: data.phone,
        occupation: data.occupation,
        source: 'live-aldeia-singular',
        tags: ['live-aldeia', 'formulario-inscricao']
      });
      
      // Redirecionar para página de agradecimento
      router.push('/obrigado');
    } catch (error) {
      console.error('Erro ao processar formulário:', error);
      alert('Erro ao processar formulário. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-2xl max-w-md w-full mx-4">
      <h2 className="text-xl lg:text-2xl font-bold text-[#F5AF21] mb-6 text-center">
        Garanta sua vaga gratuita
      </h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Nome Completo *
          </label>
          <input
            {...register('name')}
            type="text"
            id="name"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-orange focus:border-transparent outline-none transition-all"
            placeholder="Seu nome completo"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Seu melhor e-mail *
          </label>
          <input
            {...register('email')}
            type="email"
            id="email"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-orange focus:border-transparent outline-none transition-all"
            placeholder="seu@email.com"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
            Seu número de telefone (WhatsApp) *
          </label>
          <input
            {...register('phone')}
            type="tel"
            id="phone"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-orange focus:border-transparent outline-none transition-all"
            placeholder="(11) 99999-9999"
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="occupation" className="block text-sm font-medium text-gray-700 mb-1">
            Sua principal ocupação? *
          </label>
          <input
            {...register('occupation')}
            type="text"
            id="occupation"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-orange focus:border-transparent outline-none transition-all"
            placeholder="Ex: Professor, Advogado, Empresário, Cuidador..."
          />
          {errors.occupation && (
            <p className="text-red-500 text-sm mt-1">{errors.occupation.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-accent-orange to-accent-yellow text-white font-bold py-4 px-6 rounded-lg hover:from-orange-600 hover:to-yellow-500 transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          {isSubmitting ? 'INSCREVENDO...' : 'QUERO ME INSCREVER AGORA'}
        </button>
      </form>
    </div>
  );
}
