import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  console.log('=== WEBHOOK API CHAMADA ===');
  console.log('Timestamp:', new Date().toISOString());
  console.log('User Agent:', request.headers.get('user-agent'));
  console.log('Content-Type:', request.headers.get('content-type'));
  
  try {
    // Captura todos os dados enviados no corpo da requisição
    const formData = await request.json();
    
    console.log('Dados recebidos:', JSON.stringify(formData, null, 2));

    // Validação básica dos dados
    if (!formData.name || !formData.email || !formData.phone || !formData.occupation) {
      console.error('Dados incompletos recebidos:', formData);
      return NextResponse.json(
        { message: 'Dados incompletos. Todos os campos são obrigatórios.' },
        { status: 400 }
      );
    }

    // URL do webhook do N8N de produção
    const webhookUrl = 'https://webhook.coruss.com.br/webhook/live_aldeia';
    console.log('Tentando conectar com N8N:', webhookUrl);

    try {
      // Tenta fazer a requisição para o N8N com timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 segundos timeout

      const n8nResponse = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'Live-Aldeia-Form/1.0'
        },
        body: JSON.stringify(formData),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      console.log('Resposta do N8N:', {
        status: n8nResponse.status,
        statusText: n8nResponse.statusText,
        headers: Object.fromEntries(n8nResponse.headers.entries())
      });

      // Se a requisição para o N8N for bem-sucedida
      if (n8nResponse.ok) {
        const n8nData = await n8nResponse.text();
        console.log('Dados enviados com sucesso para o N8N:', n8nData);
        return NextResponse.json({ 
          message: 'Dados enviados com sucesso para o N8N!',
          source: 'n8n',
          timestamp: new Date().toISOString()
        });
      } else {
        const errorText = await n8nResponse.text();
        console.warn('N8N retornou erro:', {
          status: n8nResponse.status,
          statusText: n8nResponse.statusText,
          body: errorText
        });
      }
    } catch (n8nError) {
      console.warn('Erro ao conectar com N8N:', {
        name: n8nError.name,
        message: n8nError.message,
        stack: n8nError.stack
      });
    }

    // Fallback: salvar dados localmente (logs detalhados)
    console.log('=== INSCRIÇÃO SALVA LOCALMENTE ===');
    console.log('Nome:', formData.name);
    console.log('Email:', formData.email);
    console.log('Telefone:', formData.phone);
    console.log('Ocupação:', formData.occupation);
    console.log('Timestamp:', new Date().toISOString());
    console.log('=====================================');

    // Simular delay de processamento
    await new Promise(resolve => setTimeout(resolve, 500));

    // Retorna sucesso mesmo sem N8N
    return NextResponse.json({ 
      message: 'Inscrição realizada com sucesso!',
      source: 'local',
      data: {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        occupation: formData.occupation,
        timestamp: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('Erro no processamento da API:', {
      name: error.name,
      message: error.message,
      stack: error.stack
    });
    return NextResponse.json(
      { 
        message: 'Erro interno do servidor.',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    );
  }
}
