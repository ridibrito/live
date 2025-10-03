import { NextRequest, NextResponse } from 'next/server';

// Suporte a CORS para produção
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}

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
      ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown',
      // Incluir UTMs se enviados
      utms: body.utms || {},
      utm_source: body.utms?.utm_source || '',
      utm_medium: body.utms?.utm_medium || '',
      utm_campaign: body.utms?.utm_campaign || '',
      utm_term: body.utms?.utm_term || '',
      utm_content: body.utms?.utm_content || '',
    };

    // Enviar dados para o webhook do N8N
    // URLs para tentar (produção e teste como fallback)
    const webhookUrls = [
      'https://editor.coruss.com.br/webhook/live_aldeia_v2', // Produção
      'https://editor.coruss.com.br/webhook-test/live_aldeia_v2' // Teste como fallback
    ];
    
    let webhookSuccess = false;
    let lastError = null;

    // Tentar cada URL de webhook até encontrar uma que funcione
    for (const webhookUrl of webhookUrls) {
      try {
        console.log('🔄 Tentando enviar dados para webhook N8N:', {
          url: webhookUrl,
          data: webhookData,
          timestamp: new Date().toISOString()
        });

        const webhookResponse = await fetch(webhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'User-Agent': 'Live-Aldeia-Singular/1.0',
          },
          body: JSON.stringify(webhookData),
        });

        const responseText = await webhookResponse.text();
        
        console.log('📊 Resposta do webhook N8N:', {
          status: webhookResponse.status,
          statusText: webhookResponse.statusText,
          response: responseText,
          url: webhookUrl,
          timestamp: new Date().toISOString()
        });
        
        if (webhookResponse.ok) {
          console.log('✅ Dados enviados com sucesso para o webhook N8N:', {
            status: webhookResponse.status,
            response: responseText,
            url: webhookUrl,
            data: webhookData,
            timestamp: new Date().toISOString()
          });
          webhookSuccess = true;
          break; // Sair do loop se conseguir enviar
        } else {
          console.error('❌ Erro ao enviar para webhook N8N:', {
            status: webhookResponse.status,
            statusText: webhookResponse.statusText,
            response: responseText,
            url: webhookUrl,
            timestamp: new Date().toISOString()
          });
          lastError = { status: webhookResponse.status, response: responseText, url: webhookUrl };
        }
      } catch (webhookError) {
        const errorMessage = webhookError instanceof Error ? webhookError.message : String(webhookError);
        const errorStack = webhookError instanceof Error ? webhookError.stack : undefined;
        
        console.error('❌ Erro de conexão com webhook N8N:', {
          error: errorMessage,
          stack: errorStack,
          url: webhookUrl,
          timestamp: new Date().toISOString()
        });
        lastError = { error: errorMessage, url: webhookUrl };
      }
    }

    // Se nenhum webhook funcionou, logar o erro final
    if (!webhookSuccess) {
      console.error('❌ Nenhum webhook N8N funcionou. Último erro:', lastError);
      console.log('📝 Dados processados localmente (nenhum webhook disponível):', webhookData);
      
      // Salvar dados em arquivo local como backup (opcional)
      console.log('💾 DADOS PARA BACKUP MANUAL:', JSON.stringify(webhookData, null, 2));
    }

    return NextResponse.json(
      { 
        success: true, 
        message: 'Inscrição realizada com sucesso',
        data: webhookData
      },
      { 
        status: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        }
      }
    );

  } catch (error) {
    console.error('Erro na API route:', error);
    
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { 
        status: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        }
      }
    );
  }
}
