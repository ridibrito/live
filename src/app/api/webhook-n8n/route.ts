import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validar se os dados necessários estão presentes
    if (!body.name || !body.email || !body.phone || !body.occupation) {
      return NextResponse.json(
        { error: 'Dados obrigatórios não fornecidos' },
        { status: 400 }
      );
    }

    // Preparar os dados para envio ao webhook do N8N
    const webhookData = {
      name: body.name,
      email: body.email,
      phone: body.phone,
      occupation: body.occupation,
      source: 'live-aldeia-singular',
      tags: ['live-aldeia', 'formulario-inscricao', 'inscrito-para-live'],
      timestamp: new Date().toISOString(),
      userAgent: request.headers.get('user-agent') || '',
      ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown'
    };

    // Enviar dados para o webhook do N8N
    // Verificar se há uma URL personalizada via variável de ambiente
    const customWebhookUrl = process.env.N8N_WEBHOOK_URL;
    // URL do webhook em produção (workflow ativo)
    const webhookUrl = customWebhookUrl || 'https://editor.coruss.com.br/webhook/live_aldeia_v2';
    
    try {
      console.log('🔄 Enviando dados para webhook N8N em produção:', {
        url: webhookUrl,
        data: webhookData
      });

      const webhookResponse = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(webhookData),
      });

      const responseText = await webhookResponse.text();
      
      if (webhookResponse.ok) {
        console.log('✅ Dados enviados com sucesso para o webhook N8N:', {
          status: webhookResponse.status,
          response: responseText,
          url: webhookUrl,
          data: webhookData
        });
      } else {
        console.error('❌ Erro ao enviar para webhook N8N:', {
          status: webhookResponse.status,
          statusText: webhookResponse.statusText,
          response: responseText,
          url: webhookUrl
        });
        console.log('📝 Dados processados localmente (webhook com erro):', webhookData);
      }
    } catch (webhookError) {
      console.error('❌ Erro de conexão com webhook N8N:', {
        error: webhookError,
        url: webhookUrl
      });
      console.log('📝 Dados processados localmente (erro de conexão):', webhookData);
    }

    return NextResponse.json(
      { 
        success: true, 
        message: 'Inscrição realizada com sucesso',
        data: webhookData
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Erro na API route:', error);
    
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
