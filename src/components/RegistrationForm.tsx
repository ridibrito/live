'use client';

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter, useSearchParams } from 'next/navigation';

const formSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  phone: z.string()
    .min(14, 'Telefone deve ter pelo menos 10 dígitos')
    .regex(/^\(\d{2}\) \d{4,5}-\d{4}$/, 'Formato de telefone inválido'),
  occupation: z.string().min(2, 'Ocupação deve ter pelo menos 2 caracteres'),
});

type FormData = z.infer<typeof formSchema>;

export default function RegistrationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [phoneValue, setPhoneValue] = useState('');
  const [utmParams, setUtmParams] = useState<Record<string, string>>({});
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  // Capturar UTMs da URL quando o componente montar
  useEffect(() => {
    const utms: Record<string, string> = {};
    const utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];
    
    utmKeys.forEach(key => {
      const value = searchParams.get(key);
      if (value) {
        utms[key] = value;
      }
    });

    if (Object.keys(utms).length > 0) {
      console.log('📊 UTMs capturados:', utms);
      setUtmParams(utms);
      
      // Salvar UTMs no localStorage para persistência
      localStorage.setItem('utmParams', JSON.stringify(utms));
    } else {
      // Tentar recuperar UTMs do localStorage se não houver na URL
      const savedUtms = localStorage.getItem('utmParams');
      if (savedUtms) {
        try {
          const parsed = JSON.parse(savedUtms);
          console.log('📊 UTMs recuperados do localStorage:', parsed);
          setUtmParams(parsed);
        } catch (e) {
          console.error('Erro ao recuperar UTMs do localStorage:', e);
        }
      }
    }
  }, [searchParams]);

  // Função para formatar o telefone
  const formatPhone = (value: string) => {
    // Remove todos os caracteres não numéricos
    const numbers = value.replace(/\D/g, '');
    
    // Aplica a máscara baseada no tamanho
    if (numbers.length <= 2) {
      return numbers;
    } else if (numbers.length <= 6) {
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
    } else if (numbers.length <= 10) {
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 6)}-${numbers.slice(6)}`;
    } else {
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
    }
  };

  // Função para lidar com mudanças no telefone
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value);
    setPhoneValue(formatted);
    setValue('phone', formatted);
  };

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    
    try {
      // Enviar dados para a API route que processará o webhook
      // Usar URL absoluta para funcionar em produção
      const apiUrl = `${window.location.origin}/api/webhook-n8n`;
      
      // Incluir UTMs nos dados
      const dataWithUtms = {
        ...data,
        utms: utmParams,
      };
      
      console.log('🔄 Enviando dados para API:', apiUrl);
      console.log('📋 Dados do formulário:', {
        name: data.name,
        email: data.email,
        phone: data.phone,
        occupation: data.occupation,
        occupationType: typeof data.occupation,
        occupationLength: data.occupation?.length,
        dataComplete: dataWithUtms
      });
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataWithUtms),
      });

      const result = await response.json();
      
      console.log('📊 Resposta da API:', {
        status: response.status,
        ok: response.ok,
        result: result,
        url: apiUrl
      });

      if (!response.ok) {
        console.error('❌ Erro na API:', result);
        throw new Error(result.error || 'Erro ao processar inscrição');
      }

      console.log('✅ Formulário enviado com sucesso:', result);
      
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
        Inscreva-se gratuitamente
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
            value={phoneValue}
            onChange={handlePhoneChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-orange focus:border-transparent outline-none transition-all"
            placeholder="(11) 99999-9999"
            maxLength={15}
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
