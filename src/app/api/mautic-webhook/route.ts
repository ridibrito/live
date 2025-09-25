import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

export const dynamic = 'force-dynamic';

const mauticWebhookSchema = z.object({
  event: z.string(),
  timestamp: z.string(),
  contact: z.object({
    id: z.number(),
    email: z.string().email(),
    firstname: z.string().optional(),
    lastname: z.string().optional(),
    phone: z.string().optional(),
    occupation: z.string().optional(),
    tags: z.array(z.string()).optional(),
  }).optional(),
  form: z.object({
    id: z.number(),
    name: z.string(),
  }).optional(),
});

export async function POST(request: NextRequest) {
  const ts = new Date().toISOString();
  console.log('=== MAUTIC WEBHOOK RECEBIDO ===', { ts });
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

  const parsed = mauticWebhookSchema.safeParse(payload);
  if (!parsed.success) {
    console.error('❌ Validação falhou:', parsed.error.flatten());
    return NextResponse.json(
      { message: 'Dados inválidos', issues: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const data = parsed.data;

  console.log('✅ Webhook Mautic processado:', {
    event: data.event,
    timestamp: data.timestamp,
    contactId: data.contact?.id,
    contactEmail: data.contact?.email,
    formId: data.form?.id,
    formName: data.form?.name
  });

  // Processar diferentes tipos de eventos
  switch (data.event) {
    case 'form.submitted':
      console.log('📝 Formulário submetido:', {
        form: data.form?.name,
        contact: data.contact?.email,
        tags: data.contact?.tags
      });
      break;

    case 'contact.identified':
      console.log('👤 Contato identificado:', {
        id: data.contact?.id,
        email: data.contact?.email,
        name: `${data.contact?.firstname} ${data.contact?.lastname}`.trim()
      });
      break;

    default:
      console.log('📋 Evento não tratado:', data.event);
  }

  // Simular processamento adicional (opcional)
  // Aqui você pode:
  // - Enviar para outros sistemas
  // - Processar dados
  // - Enviar notificações
  // - etc.

  return NextResponse.json({
    ok: true,
    message: 'Webhook processado com sucesso',
    event: data.event,
    timestamp: ts,
    contactId: data.contact?.id
  });
}
