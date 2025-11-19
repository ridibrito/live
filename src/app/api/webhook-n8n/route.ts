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
    
    // Log detalhado dos dados recebidos
    console.log('📥 Dados recebidos do formulário:', {
      name: body.name,
      email: body.email,
      phone: body.phone,
      occupation: body.occupation,
      hasEmail: !!body.email,
      emailType: typeof body.email,
      emailValue: body.email,
      timestamp: new Date().toISOString()
    });
    
    // Validar se os dados necessários estão presentes
    if (!body.name || !body.email || !body.phone || !body.occupation) {
      console.error('❌ Validação falhou - dados obrigatórios ausentes:', {
        hasName: !!body.name,
        hasEmail: !!body.email,
        hasPhone: !!body.phone,
        hasOccupation: !!body.occupation
      });
      return NextResponse.json(
        { error: 'Dados obrigatórios não fornecidos' },
        { status: 400 }
      );
    }

    // Validar formato do email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      console.error('❌ Email inválido:', body.email);
      return NextResponse.json(
        { error: 'Email inválido' },
        { status: 400 }
      );
    }

    // Normalizar email e telefone
    const normalizedEmail = body.email.trim().toLowerCase();
    // Remover formatação do telefone (apenas números)
    const normalizedPhone = body.phone.replace(/\D/g, '');
    
    // Preparar os dados para envio ao webhook do N8N
    // O N8N vai fazer o mapeamento para o Bitrix24
    // Enviar email em múltiplos formatos para facilitar o mapeamento no N8N
    const webhookData = {
      name: body.name,
      email: normalizedEmail, // Campo padrão
      phone: normalizedPhone,
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
      // Formatos de email para facilitar mapeamento no N8N para Bitrix24
      // Formato simples
      EMAIL: normalizedEmail,
      // Formato array Bitrix24 (para mapeamento direto)
      EMAIL_array: [
        {
          VALUE: normalizedEmail,
          VALUE_TYPE: 'WORK'
        }
      ],
      // Formatos alternativos
      clientEmail: normalizedEmail,
      customerEmail: normalizedEmail,
      leadEmail: normalizedEmail,
      contactEmail: normalizedEmail,
      // Formato com índice
      'email[0][VALUE]': normalizedEmail,
      'EMAIL[0][VALUE]': normalizedEmail,
      'EMAIL[0][VALUE_TYPE]': 'WORK',
    };

    // Log detalhado dos dados que serão enviados
    console.log('📤 Dados preparados para envio ao N8N:', {
      name: webhookData.name,
      email: webhookData.email,
      EMAIL: webhookData.EMAIL,
      EMAIL_array: webhookData.EMAIL_array,
      phone: webhookData.phone,
      occupation: webhookData.occupation,
      timestamp: webhookData.timestamp
    });
    
    // Log completo do payload JSON para facilitar verificação no N8N
    console.log('📋 PAYLOAD COMPLETO ENVIADO AO N8N:', JSON.stringify(webhookData, null, 2));
    console.log('📧 TODOS OS FORMATOS DE EMAIL DISPONÍVEIS:', {
      'email': webhookData.email,
      'EMAIL': webhookData.EMAIL,
      'EMAIL_array': webhookData.EMAIL_array,
      'clientEmail': webhookData.clientEmail,
      'customerEmail': webhookData.customerEmail,
      'leadEmail': webhookData.leadEmail,
      'contactEmail': webhookData.contactEmail,
      'email[0][VALUE]': webhookData['email[0][VALUE]'],
      'EMAIL[0][VALUE]': webhookData['EMAIL[0][VALUE]'],
      'EMAIL[0][VALUE_TYPE]': webhookData['EMAIL[0][VALUE_TYPE]']
    });

    // Enviar dados para o webhook do N8N
    // TEMPORÁRIO: Usando URL de teste para verificar campos
    const webhookUrls = [
      'https://webhook.coruss.com.br/webhook/live_aldeia_v2' // URL de teste (temporária)
    ];
    
    console.log('🚀 INICIANDO ENVIO PARA WEBHOOK N8N');
    console.log('📋 URLs para tentar:', webhookUrls);
    console.log('📊 Total de URLs:', webhookUrls.length);
    
    let webhookSuccess = false;
    let lastError = null;

    // Tentar cada URL de webhook até encontrar uma que funcione
    console.log('🔄 Iniciando loop de tentativas de webhook...');
    for (const webhookUrl of webhookUrls) {
      console.log(`🔄 Tentativa ${webhookUrls.indexOf(webhookUrl) + 1}/${webhookUrls.length} - URL: ${webhookUrl}`);
      try {
        console.log('🔄 Tentando enviar dados para webhook N8N:', {
          url: webhookUrl,
          email: webhookData.email,
          EMAIL: webhookData.EMAIL,
          EMAIL_array: webhookData.EMAIL_array,
          timestamp: new Date().toISOString()
        });

        console.log('📤 Enviando requisição HTTP para webhook N8N...');
        console.log('🔗 URL:', webhookUrl);
        console.log('📦 Payload completo:', JSON.stringify(webhookData, null, 2));
        
        // Criar um AbortController para timeout de 30 segundos
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 30000);
        
        try {
          const webhookResponse = await fetch(webhookUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'User-Agent': 'Live-Aldeia-Singular/1.0',
            },
            body: JSON.stringify(webhookData),
            signal: controller.signal,
          });
          
          clearTimeout(timeoutId);

          const responseText = await webhookResponse.text();
          
          console.log('📊 Resposta do webhook N8N:', {
            status: webhookResponse.status,
            statusText: webhookResponse.statusText,
            ok: webhookResponse.ok,
            response: responseText,
            url: webhookUrl,
            emailEnviado: webhookData.email,
            EMAILEnviado: webhookData.EMAIL,
            EMAIL_arrayEnviado: JSON.stringify(webhookData.EMAIL_array),
            headers: Object.fromEntries(webhookResponse.headers.entries()),
            timestamp: new Date().toISOString()
          });
          
          if (webhookResponse.ok) {
            console.log('✅ Dados enviados com sucesso para o webhook N8N:', {
              status: webhookResponse.status,
              response: responseText,
              url: webhookUrl,
              email: webhookData.email,
              EMAIL: webhookData.EMAIL,
              EMAIL_array: webhookData.EMAIL_array,
              dataCompleto: webhookData,
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
              emailTentado: webhookData.email,
              timestamp: new Date().toISOString()
            });
            lastError = { status: webhookResponse.status, response: responseText, url: webhookUrl };
          }
        } catch (fetchError) {
          clearTimeout(timeoutId);
          if (fetchError.name === 'AbortError') {
            console.error('⏱️ TIMEOUT: Requisição ao webhook N8N demorou mais de 30 segundos');
            lastError = { error: 'Timeout após 30 segundos', url: webhookUrl };
          } else {
            throw fetchError; // Re-throw para ser capturado pelo catch externo
          }
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

    // Se nenhum webhook funcionou, logar o erro final mas ainda retornar sucesso
    // para não interromper o fluxo do usuário
    if (!webhookSuccess) {
      console.error('❌ Nenhum webhook N8N funcionou. Último erro:', lastError);
      console.error('❌ DETALHES DO ERRO:', JSON.stringify(lastError, null, 2));
      console.log('📝 Dados processados localmente (nenhum webhook disponível):', {
        ...webhookData,
        emailConfirmado: webhookData.email,
        EMAILConfirmado: webhookData.EMAIL
      });
      
      // Salvar dados em arquivo local como backup (opcional)
      console.log('💾 DADOS PARA BACKUP MANUAL:', JSON.stringify(webhookData, null, 2));
      console.log('📧 EMAIL NO BACKUP:', webhookData.email);
      
      // Retornar sucesso mesmo com erro no webhook para não interromper o fluxo
      // O erro será investigado pelos logs do servidor
      return NextResponse.json(
        { 
          success: true, 
          message: 'Inscrição realizada com sucesso (webhook N8N não respondeu - verificar logs)',
          webhookSuccess: false,
          webhookError: lastError,
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
    }

    console.log('✅✅✅ WEBHOOK N8N CHAMADO COM SUCESSO! ✅✅✅');
    console.log('📋 Dados enviados:', JSON.stringify(webhookData, null, 2));
    
    return NextResponse.json(
      { 
        success: true, 
        message: 'Inscrição realizada com sucesso',
        webhookSuccess: webhookSuccess,
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
