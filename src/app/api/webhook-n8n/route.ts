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

/**
 * Helper para chamadas REST ao Bitrix24
 * Segue o padrão do form.md para integração direta
 */
const callBitrix = async <T,>(
  endpoint: string,
  payload: Record<string, unknown>
): Promise<T> => {
  const bitrixWebhookUrl = process.env.BITRIX24_WEBHOOK_URL;
  
  if (!bitrixWebhookUrl) {
    throw new Error('BITRIX24_WEBHOOK_URL não configurada nas variáveis de ambiente');
  }

  // A URL base já contém /rest/USER_ID/TOKEN, então apenas adicionamos o endpoint
  const url = `${bitrixWebhookUrl}/${endpoint}`;
  
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 30000);

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Live-Aldeia-Singular/1.0',
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    const data = await response.json();
    
    if (!response.ok || data.error) {
      throw new Error(data.error_description || data.error || `Erro ao executar ${endpoint}`);
    }
    
    return data.result as T;
  } catch (error) {
    clearTimeout(timeoutId);
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error(`Timeout ao executar ${endpoint} após 30 segundos`);
    }
    throw error;
  }
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Log detalhado dos dados recebidos
    console.log('📥 Dados recebidos do formulário:', {
      name: body.name,
      email: body.email,
      phone: body.phone,
      occupation: body.occupation,
      occupationType: typeof body.occupation,
      occupationLength: body.occupation?.length,
      bodyKeys: Object.keys(body),
      timestamp: new Date().toISOString()
    });

    // Validação de campos obrigatórios
    const occupationValue = body.occupation?.trim() || '';
    if (!body.name || !body.email || !body.phone || !occupationValue) {
      console.error('❌ Validação falhou - dados obrigatórios ausentes:', {
        hasName: !!body.name,
        hasEmail: !!body.email,
        hasPhone: !!body.phone,
        hasOccupation: !!occupationValue,
        occupationRaw: body.occupation,
        occupationTrimmed: occupationValue,
        bodyComplete: JSON.stringify(body)
      });
      return NextResponse.json(
        { error: 'Dados obrigatórios não fornecidos', missingFields: {
          name: !body.name,
          email: !body.email,
          phone: !body.phone,
          occupation: !occupationValue
        }},
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

    // Normalizar dados
    const normalizedEmail = body.email.trim().toLowerCase();
    const normalizedPhone = body.phone.replace(/\D/g, '');
    const normalizedOccupation = occupationValue.trim(); // Garantir que está normalizado

    // Separar nome em primeiro nome e sobrenome (se houver espaço)
    const nameParts = body.name.trim().split(/\s+/);
    const firstName = nameParts[0] || body.name;
    const lastName = nameParts.slice(1).join(' ') || '';

    console.log('🚀 Iniciando criação de Contact e Deal no Bitrix24');
    console.log('📋 Dados normalizados:', {
      firstName,
      lastName,
      email: normalizedEmail,
      phone: normalizedPhone,
      occupation: normalizedOccupation,
      occupationLength: normalizedOccupation.length
    });

    let contactId: number | null = null;
    let dealId: number | null = null;
    let error: string | null = null;
    let pipelineInfo: { categoryId?: number; stageId?: string } = {};

    // Pipeline 42 para Deals (conforme URL fornecida)
    const dealCategoryId = process.env.BITRIX24_DEAL_CATEGORY_ID 
      ? parseInt(process.env.BITRIX24_DEAL_CATEGORY_ID, 10) 
      : 42; // Pipeline padrão: 42

    // Stage inicial do Deal (opcional via variável de ambiente)
    const dealStageId = process.env.BITRIX24_DEAL_STAGE_ID || 'NEW';

    console.log('📋 Configuração do Pipeline:', {
      dealCategoryId: dealCategoryId,
      dealStageId: dealStageId,
      note: `Deal será criado no pipeline ${dealCategoryId}`
    });

    try {
      // 1. Criar Contact (Contato) seguindo o padrão do form.md
      console.log('👤 Criando contato...');
      contactId = await callBitrix<number>('crm.contact.add.json', {
        fields: {
          NAME: firstName,
          LAST_NAME: lastName,
          EMAIL: [{ VALUE: normalizedEmail, VALUE_TYPE: 'WORK' }],
          PHONE: [{ VALUE: normalizedPhone, VALUE_TYPE: 'WORK' }],
          POST: normalizedOccupation, // Usar ocupação normalizada
          COMMENTS: `Ocupação: ${normalizedOccupation}\nOrigem: Live Aldeia Singular\nFonte: Formulário de Inscrição`,
          SOURCE_ID: 'WEB',
          SOURCE_DESCRIPTION: 'Formulário de Inscrição - Live Aldeia Singular',
          UTM_SOURCE: body.utms?.utm_source || '',
          UTM_MEDIUM: body.utms?.utm_medium || '',
          UTM_CAMPAIGN: body.utms?.utm_campaign || '',
          UTM_TERM: body.utms?.utm_term || '',
          UTM_CONTENT: body.utms?.utm_content || '',
          OPENED: 'Y'
        },
        params: { REGISTER_SONET_EVENT: 'Y' }
      });

      console.log('✅ Contato criado com sucesso! ID:', contactId);

      // 2. Criar Deal (Negócio) no pipeline 42 seguindo o padrão do form.md
      console.log('💼 Criando deal no pipeline', dealCategoryId, '...');
      dealId = await callBitrix<number>('crm.deal.add.json', {
        fields: {
          TITLE: body.name, // Nome do negócio igual ao nome do contato
          STAGE_ID: dealStageId,
          CATEGORY_ID: dealCategoryId,
          CURRENCY_ID: 'BRL',
          ADDITIONAL_INFO: `Ocupação: ${normalizedOccupation}`, // Campo específico para ocupação normalizada
          COMMENTS: `Ocupação: ${normalizedOccupation}\nOrigem: Live Aldeia Singular\nFonte: Formulário de Inscrição`,
          SOURCE_ID: 'WEB',
          SOURCE_DESCRIPTION: 'Formulário de Inscrição - Live Aldeia Singular',
          CONTACT_IDS: [contactId], // Usar CONTACT_IDS (array) - CONTACT_ID está deprecated
          ASSIGNED_BY_ID: process.env.BITRIX24_ASSIGNED_BY_ID 
            ? parseInt(process.env.BITRIX24_ASSIGNED_BY_ID, 10) 
            : undefined, // Opcional: ID do responsável
          OPENED: 'Y',
          UTM_SOURCE: body.utms?.utm_source || '',
          UTM_MEDIUM: body.utms?.utm_medium || '',
          UTM_CAMPAIGN: body.utms?.utm_campaign || '',
          UTM_TERM: body.utms?.utm_term || '',
          UTM_CONTENT: body.utms?.utm_content || ''
        },
        params: { REGISTER_SONET_EVENT: 'Y' }
      });

      console.log('✅ Deal criado com sucesso no pipeline', dealCategoryId, '! ID:', dealId);

      // Buscar informações do deal criado para verificar pipeline e stage
      try {
        const dealInfo = await callBitrix<{
          CATEGORY_ID?: string;
          STAGE_ID?: string;
          TITLE?: string;
        }>('crm.deal.get.json', {
          id: dealId
        });

        pipelineInfo = {
          categoryId: dealInfo.CATEGORY_ID ? parseInt(dealInfo.CATEGORY_ID, 10) : undefined,
          stageId: dealInfo.STAGE_ID
        };

        console.log('📊 Informações do Deal criado:', {
          dealId: dealId,
          categoryId: pipelineInfo.categoryId || 'N/A',
          stageId: pipelineInfo.stageId || 'N/A',
          title: dealInfo.TITLE
        });
      } catch (infoError) {
        console.warn('⚠️ Não foi possível buscar informações do deal:', infoError);
      }

    } catch (bitrixError: unknown) {
      const errorMessage = bitrixError instanceof Error ? bitrixError.message : String(bitrixError);
      console.error('❌ Erro ao criar lead no Bitrix24:', errorMessage);
      error = errorMessage;
      
      // Log detalhado para debug
      console.error('❌ Detalhes do erro:', {
        error: errorMessage,
        timestamp: new Date().toISOString(),
        data: {
          name: body.name,
          email: normalizedEmail,
          phone: normalizedPhone
        }
      });
    }

    // Retornar sucesso mesmo se houver erro no Bitrix24 (para não bloquear o usuário)
    // O erro será logado para análise posterior
    return NextResponse.json(
      { 
        success: true, 
        message: 'Inscrição processada',
        bitrixSuccess: dealId !== null && contactId !== null,
        contactId: contactId,
        dealId: dealId,
        pipeline: pipelineInfo.categoryId 
          ? `Pipeline ID: ${pipelineInfo.categoryId}` 
          : `Pipeline ${dealCategoryId}`,
        stage: pipelineInfo.stageId || dealStageId,
        error: error || undefined
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
    console.error('❌ Erro na API route:', error);
    
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
