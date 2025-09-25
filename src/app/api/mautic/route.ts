import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

export const dynamic = 'force-dynamic';

const formSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  occupation: z.string().min(2),
});

export async function POST(request: NextRequest) {
  const ts = new Date().toISOString();
  console.log('=== MAUTIC API CHAMADA ===', { ts });
  console.log('UA:', request.headers.get('user-agent'));
  console.log('CT:', request.headers.get('content-type'));

  let rawBody = '';
  try {
    rawBody = await request.text();
    if (process.env.NODE_ENV !== 'production') {
      console.log('📥 Raw body (truncado):', rawBody.slice(0, 500));
    }
  } catch (e) {
    console.error('❌ Falha ao ler body:', e);
    return NextResponse.json({ message: 'Body inválido' }, { status: 400 });
  }

  // Parse + validação
  let payload: unknown;
  try {
    payload = JSON.parse(rawBody);
  } catch (e) {
    console.error('❌ JSON inválido:', e);
    return NextResponse.json({ message: 'JSON inválido' }, { status: 400 });
  }

  const parsed = formSchema.safeParse(payload);
  if (!parsed.success) {
    console.error('❌ Validação falhou:', parsed.error.flatten());
    return NextResponse.json(
      { message: 'Dados inválidos', issues: parsed.error.flatten() },
      { status: 400 }
    );
  }

  // Normalização do telefone
  const data = {
    ...parsed.data,
    phone: parsed.data.phone.replace(/\D/g, ''),
  };

  // Configuração do Mautic
  const mauticUrl = 'https://email.coruss.com.br';
  const publicKey = '1_1yfuhaq4q3y8sckok8ossgo440c404okcws08kgggw80kowwsg';
  const secretKey = '2892h1bx7askcog880844os4ossk80k0o4cwkccck4o8ss8o4o';

  // Dados para o Mautic
  const mauticData = {
    firstname: data.name.split(' ')[0] || data.name,
    lastname: data.name.split(' ').slice(1).join(' ') || '',
    email: data.email,
    phone: data.phone,
    occupation: data.occupation,
    // Campos customizados do Mautic
    tags: ['live-aldeia', 'formulario-inscricao'],
    ipAddress: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown',
    userAgent: request.headers.get('user-agent') || 'unknown',
    source: 'live-aldeia-singular',
    sourceId: 'formulario-inscricao'
  };

  const controller = new AbortController();
  const TIMEOUT_MS = 30000; // 30s
  const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    console.log('🔗 Enviando para Mautic:', `${mauticUrl}/api/contacts/new`);
    console.log('📋 Dados:', JSON.stringify(mauticData, null, 2));

    const mauticResponse = await fetch(`${mauticUrl}/api/contacts/new`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${Buffer.from(`${publicKey}:${secretKey}`).toString('base64')}`,
        'User-Agent': 'Live-Aldeia-Form/1.0'
      },
      body: JSON.stringify(mauticData),
      signal: controller.signal,
    });

    const mauticText = await mauticResponse.text();

    console.log('📥 Resposta Mautic:', {
      status: mauticResponse.status,
      statusText: mauticResponse.statusText,
      len: mauticText.length,
    });

    if (!mauticResponse.ok) {
      console.error('❌ Mautic retornou erro:', {
        status: mauticResponse.status,
        statusText: mauticResponse.statusText,
        body: mauticText
      });

      return NextResponse.json(
        {
          ok: false,
          message: 'Falha ao enviar para Mautic',
          status: mauticResponse.status,
          body: process.env.NODE_ENV !== 'production' ? mauticText : undefined,
        },
        { status: 502 }
      );
    }

    // Sucesso
    let mauticResult;
    try {
      mauticResult = JSON.parse(mauticText);
    } catch {
      mauticResult = { message: 'Lead criado com sucesso' };
    }

    console.log('✅ Lead criado no Mautic:', mauticResult);

    return NextResponse.json({
      ok: true,
      message: 'Lead enviado para Mautic com sucesso!',
      source: 'mautic',
      timestamp: ts,
      mauticId: mauticResult.contact?.id || 'unknown'
    });

  } catch (err: unknown) {
    const isAbort = err instanceof Error && err.name === 'AbortError';
    console.error(isAbort ? '⏰ Timeout de 30s' : '❌ Erro ao contatar Mautic', err);

    return NextResponse.json(
      {
        ok: false,
        message: isAbort ? 'Timeout ao enviar para Mautic' : 'Erro de rede ao enviar para Mautic',
      },
      { status: 502 }
    );
  } finally {
    clearTimeout(timeoutId);
  }
}
