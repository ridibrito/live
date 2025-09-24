import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // Captura todos os dados enviados no corpo da requisição
    const formData = await request.json();

    // URL do webhook do N8N
    const webhookUrl = 'https://editor.coruss.com.br/webhook-test/60c76e41-e0d1-4079-a7ee-cf70f9184b59';

    // Faz a requisição para o N8N com os dados do formulário
    const n8nResponse = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    // Se a requisição para o N8N não for bem-sucedida, retorna um erro
    if (!n8nResponse.ok) {
      console.error('Erro ao enviar dados para o N8N:', n8nResponse.statusText);
      return NextResponse.json(
        { message: 'Falha na integração com o N8N.' },
        { status: n8nResponse.status }
      );
    }

    // Se tudo der certo, retorna uma resposta de sucesso
    return NextResponse.json({ message: 'Dados enviados com sucesso para o N8N.' });

  } catch (error) {
    console.error('Erro no processamento da API:', error);
    return NextResponse.json(
      { message: 'Erro interno do servidor.' },
      { status: 500 }
    );
  }
}
