// Usando fetch nativo do Node.js (v18+)

const webhookUrl = 'https://webhook.coruss.com.br/webhook/live_aldeia_v2';

const payload = {
    name: "Teste Webhook Produção Manual",
    email: "teste.webhook.prod@example.com",
    phone: "11999999999",
    occupation: "Pais",
    source: "live-aldeia-singular-TESTE-SCRIPT",
    tags: ["teste-manual", "debug", "verificacao-producao"],
    timestamp: new Date().toISOString(),
    // Formatos de email para facilitar mapeamento
    EMAIL: "teste.webhook.prod@example.com",
    EMAIL_array: [
        {
            VALUE: "teste.webhook.prod@example.com",
            VALUE_TYPE: "WORK"
        }
    ],
    clientEmail: "teste.webhook.prod@example.com",
    customerEmail: "teste.webhook.prod@example.com",
    leadEmail: "teste.webhook.prod@example.com",
    contactEmail: "teste.webhook.prod@example.com"
};

console.log('🚀 Iniciando teste de webhook de PRODUÇÃO...');
console.log('🔗 URL:', webhookUrl);
console.log('📦 Payload:', JSON.stringify(payload, null, 2));

async function runTest() {
    try {
        console.log('⏳ Enviando requisição...');
        const response = await fetch(webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'User-Agent': 'Test-Script/1.0'
            },
            body: JSON.stringify(payload)
        });

        console.log('📊 Status Code:', response.status);
        console.log('📊 Status Text:', response.statusText);

        const responseText = await response.text();
        console.log('⬇️ --- INÍCIO DA RESPOSTA --- ⬇️');
        console.log(responseText);
        console.log('⬆️ --- FIM DA RESPOSTA --- ⬆️');

        if (response.ok) {
            console.log('✅ SUCESSO: Webhook recebeu os dados corretamente!');
        } else {
            console.error('❌ ERRO: Webhook retornou erro.');
        }
    } catch (error) {
        console.error('❌ ERRO DE CONEXÃO:', error.message);
        if (error.cause) console.error('Causa:', error.cause);
    }
}

runTest();
