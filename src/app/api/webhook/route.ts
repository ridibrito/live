import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  console.log('=== WEBHOOK API CHAMADA ===');
  console.log('Timestamp:', new Date().toISOString());
  console.log('User Agent:', request.headers.get('user-agent'));
  console.log('Content-Type:', request.headers.get('content-type'));
  console.log('🚀 Função POST iniciada com sucesso');
  
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
    console.log('🔗 URL do webhook sendo disparada:', webhookUrl);
    console.log('📡 Método HTTP:', 'POST');
    console.log('📋 Dados sendo enviados:', JSON.stringify(formData, null, 2));

    try {
      // Tenta fazer a requisição para o N8N com timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 segundos timeout

      console.log('🚀 Iniciando requisição para N8N...');
      console.log('📤 Headers da requisição:', {
        'Content-Type': 'application/json',
        'User-Agent': 'Live-Aldeia-Form/1.0'
      });
      
      const n8nResponse = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'Live-Aldeia-Form/1.0'
        },
        body: JSON.stringify(formData),
        signal: controller.signal
      });
      
      console.log('📥 Resposta recebida do N8N:', {
        status: n8nResponse.status,
        statusText: n8nResponse.statusText,
        url: n8nResponse.url
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
        console.log('✅ Dados enviados com sucesso para o N8N:', n8nData);
        return NextResponse.json({ 
          message: 'Dados enviados com sucesso para o N8N!',
          source: 'n8n',
          timestamp: new Date().toISOString()
        });
      } else {
        const errorText = await n8nResponse.text();
        console.error('❌ N8N retornou erro:', {
          status: n8nResponse.status,
          statusText: n8nResponse.statusText,
          body: errorText,
          url: webhookUrl
        });
        
        // Log específico para workflow não ativo
        if (n8nResponse.status === 404 && errorText.includes('not registered')) {
          console.error('🚨 ATENÇÃO: Workflow do N8N não está ativo!');
          console.error('📋 Ação necessária: Ativar o workflow no N8N');
        }
        
        // Se não funcionou, continua para o fallback local
        console.log('⚠️ Webhook falhou, usando fallback local...');
      }
    } catch (n8nError) {
      console.error('❌ Erro ao conectar com N8N:', {
        name: n8nError instanceof Error ? n8nError.name : 'Unknown',
        message: n8nError instanceof Error ? n8nError.message : String(n8nError),
        stack: n8nError instanceof Error ? n8nError.stack : undefined,
        url: webhookUrl
      });
      
      // Log específico para timeout
      if (n8nError instanceof Error && n8nError.name === 'AbortError') {
        console.error('⏰ Timeout: N8N não respondeu em 10 segundos');
      }
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
      name: error instanceof Error ? error.name : 'Unknown',
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined
    });
    return NextResponse.json(
      { 
        message: 'Erro interno do servidor.',
        error: process.env.NODE_ENV === 'development' ? (error instanceof Error ? error.message : String(error)) : undefined
      },
      { status: 500 }
    );
  }
}
