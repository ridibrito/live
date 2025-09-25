import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

export const dynamic = 'force-dynamic'; // garante que não será estático

const formSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  occupation: z.string().min(2),
  // campos opcionais que você pode enviar do front
  utm_source: z.string().nullable().optional(),
  utm_medium: z.string().nullable().optional(),
  utm_campaign: z.string().nullable().optional(),
  gclid: z.string().nullable().optional(),
  page: z.string().nullable().optional(),
  referrer: z.string().nullable().optional(),
  submittedAt: z.string().nullable().optional(),
});

export async function POST(request: NextRequest) {
  const ts = new Date().toISOString();
  console.log('=== WEBHOOK API CHAMADA ===', { ts });
  console.log('UA:', request.headers.get('user-agent'));
  console.log('CT:', request.headers.get('content-type'));

  let rawBody = '';
  try {
    rawBody = await request.text();
    // Evite logar corpo inteiro em produção
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

  // Normalização simples: manter apenas dígitos no phone
  const data = {
    ...parsed.data,
    phone: parsed.data.phone.replace(/\D/g, ''),
  };

  const webhookUrl = process.env.N8N_WEBHOOK_URL; // ex.: https://webhook.coruss.com.br/webhook/live_aldeia
  if (!webhookUrl) {
    console.error('❌ N8N_WEBHOOK_URL não configurada');
    return NextResponse.json(
      { message: 'Configuração ausente (N8N_WEBHOOK_URL)' },
      { status: 500 }
    );
  }

  const controller = new AbortController();
  const TIMEOUT_MS = 30000; // 30s
  const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    console.log('🔗 Disparando para N8N:', webhookUrl);
    const n8nResponse = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
      signal: controller.signal,
    });

    const n8nText = await n8nResponse.text();

    console.log('📥 Resposta N8N:', {
      status: n8nResponse.status,
      statusText: n8nResponse.statusText,
      len: n8nText.length,
    });

    if (!n8nResponse.ok) {
      // log específico útil quando workflow não está ativo
      if (n8nResponse.status === 404 && n8nText.includes('not registered')) {
        console.error('🚨 Workflow do N8N não está ativo!');
      }
      // Retorne erro para o front (ou 200 com ok:false se preferir)
      return NextResponse.json(
        {
          ok: false,
          message: 'Falha ao enviar ao N8N',
          status: n8nResponse.status,
          body: process.env.NODE_ENV !== 'production' ? n8nText : undefined,
        },
        { status: 502 }
      );
    }

    // Sucesso
    return NextResponse.json({
      ok: true,
      message: 'Dados enviados com sucesso para o N8N!',
      source: 'n8n',
      timestamp: ts,
    });
  } catch (err: unknown) {
    // Timeout e outros erros de rede
    const isAbort = err instanceof Error && err.name === 'AbortError';
    console.error(isAbort ? '⏰ Timeout de 30s' : '❌ Erro ao contatar N8N', err);

    // Aqui você decide: 502 para o front (recomendo) ou fallback local
    return NextResponse.json(
      {
        ok: false,
        message: isAbort ? 'Timeout ao enviar para o N8N' : 'Erro de rede ao enviar para o N8N',
      },
      { status: 502 }
    );
  } finally {
    clearTimeout(timeoutId);
  }
}
