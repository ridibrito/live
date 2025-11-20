// Usando fetch nativo do Node.js (v18+)

const webhookBaseUrl = 'https://coruss.bitrix24.com.br/rest/1/9bd4ol6adfdgbrby/';

const testData = {
    name: "Teste Fluxo Completo",
    email: "teste.fluxo.v2@example.com",
    phone: "11988888888",
    occupation: "Pais"
};

async function callBitrix(method, params) {
    const url = `${webhookBaseUrl}${method}`;
    console.log(`\n📞 Chamando ${method}...`);

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(params)
        });

        const data = await response.json();
        if (data.error) {
            throw new Error(`Erro Bitrix: ${data.error_description || data.error}`);
        }
        return data.result;
    } catch (error) {
        console.error(`❌ Erro em ${method}:`, error.message);
        throw error;
    }
}

async function runTest() {
    try {
        console.log('🚀 Iniciando teste de criação de Contato + Negócio...');

        // 1. Verificar se contato já existe
        console.log('🔍 Buscando contato por email...');
        const contacts = await callBitrix('crm.contact.list', {
            filter: { "EMAIL": testData.email },
            select: ["ID", "NAME", "LAST_NAME"]
        });

        let contactId;

        if (contacts && contacts.length > 0) {
            contactId = contacts[0].ID;
            console.log(`✅ Contato existente encontrado: ID ${contactId} (${contacts[0].NAME})`);
        } else {
            // 2. Criar contato se não existir
            console.log('🆕 Criando novo contato...');
            contactId = await callBitrix('crm.contact.add', {
                fields: {
                    "NAME": testData.name,
                    "OPENED": "Y",
                    "EMAIL": [{ "VALUE": testData.email, "VALUE_TYPE": "WORK" }],
                    "PHONE": [{ "VALUE": testData.phone, "VALUE_TYPE": "WORK" }],
                    "SOURCE_ID": "WEB",
                    "SOURCE_DESCRIPTION": "Teste Script Node.js"
                },
                params: { "REGISTER_SONET_EVENT": "Y" }
            });
            console.log(`✅ Novo contato criado: ID ${contactId}`);
        }

        // 3. Criar Negócio (Deal) vinculado ao Contato
        console.log('💼 Criando Negócio (Deal)...');
        const dealId = await callBitrix('crm.deal.add', {
            fields: {
                "TITLE": "Inscrição Live - " + testData.name,
                "CONTACT_ID": contactId,
                "OPENED": "Y",
                "COMMENTS": `Ocupação: ${testData.occupation}`,
                "SOURCE_ID": "WEB",
                "SOURCE_DESCRIPTION": "Teste Script Node.js"
                // "CATEGORY_ID": 0 // Pipeline padrão (Geral)
            },
            params: { "REGISTER_SONET_EVENT": "Y" }
        });

        console.log(`✅✅✅ SUCESSO TOTAL!`);
        console.log(`👤 Contato ID: ${contactId}`);
        console.log(`🤝 Negócio ID: ${dealId}`);

    } catch (error) {
        console.error('❌ Falha no teste:', error.message);
    }
}

runTest();
