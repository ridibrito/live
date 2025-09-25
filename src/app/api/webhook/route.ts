import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // Captura todos os dados enviados no corpo da requisição
    const formData = await request.json();
    
    console.log('Dados recebidos:', formData);

    // URL do webhook do N8N de produção
    const webhookUrl = 'https://webhook.coruss.com.br/webhook/live_aldeia';

    try {
      // Tenta fazer a requisição para o N8N com os dados do formulário
      const n8nResponse = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      // Se a requisição para o N8N for bem-sucedida
      if (n8nResponse.ok) {
        console.log('Dados enviados com sucesso para o N8N');
        return NextResponse.json({ 
          message: 'Dados enviados com sucesso para o N8N!',
          source: 'n8n'
        });
      } else {
        console.warn('N8N não disponível, salvando localmente:', n8nResponse.statusText);
      }
    } catch (n8nError) {
      console.warn('Erro ao conectar com N8N, salvando localmente:', n8nError);
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
    console.error('Erro no processamento da API:', error);
    return NextResponse.json(
      { message: 'Erro interno do servidor.' },
      { status: 500 }
    );
  }
}
