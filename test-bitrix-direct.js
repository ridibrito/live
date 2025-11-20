// Usando fetch nativo do Node.js (v18+)

const bitrixWebhookUrl = 'https://coruss.bitrix24.com.br/rest/1/9bd4ol6adfdgbrby/crm.lead.add';

const payload = {
    fields: {
        "TITLE": "TESTE SCRIPT DIRETO - Live Aldeia Singular",
        "NAME": "Teste Script Direto",
        "EMAIL": [{ "VALUE": "teste.script.direto@example.com", "VALUE_TYPE": "WORK" }],
        "PHONE": [{ "VALUE": "11999999999", "VALUE_TYPE": "WORK" }],
        "COMMENTS": "Ocupação: Teste Script\nOrigem: Script Node.js",
        "SOURCE_ID": "WEB",
        "SOURCE_DESCRIPTION": "Teste de Script Node.js Direto"
    },
    params: { "REGISTER_SONET_EVENT": "Y" }
};

console.log('🚀 Iniciando teste de envio DIRETO para Bitrix24...');
console.log('🔗 URL:', bitrixWebhookUrl);
console.log('📦 Payload:', JSON.stringify(payload, null, 2));

async function runTest() {
    try {
        console.log('⏳ Enviando requisição...');
        const response = await fetch(bitrixWebhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'User-Agent': 'Test-Script/1.0'
            },
            body: JSON.stringify(payload)
        });

        console.log('📊 Status Code:', response.status);

        const responseData = await response.json();
        console.log('⬇️ --- RESPOSTA DO BITRIX --- ⬇️');
        console.log(JSON.stringify(responseData, null, 2));
        console.log('⬆️ --- FIM DA RESPOSTA --- ⬆️');

        if (response.ok && responseData.result) {
            console.log(`✅ SUCESSO: Lead criado com ID: ${responseData.result}`);
        } else {
            console.error('❌ ERRO: Falha ao criar lead.');
        }
    } catch (error) {
        console.error('❌ ERRO DE CONEXÃO:', error.message);
        if (error.cause) console.error('Causa:', error.cause);
    }
}

runTest();
