const https = require('https');

// Dados de teste
const testData = {
  name: "Teste Mautic",
  email: "teste@mautic.com",
  phone: "11999999999",
  occupation: "Desenvolvedor"
};

// Configuração do Mautic
const mauticUrl = 'email.coruss.com.br';
const mauticUsername = 'contato@coruss.com.br';
const mauticPassword = '@Aldeia2026';

// Dados para o Mautic
const mauticData = {
  firstname: testData.name.split(' ')[0] || testData.name,
  lastname: testData.name.split(' ').slice(1).join(' ') || '',
  email: testData.email,
  phone: testData.phone,
  occupation: testData.occupation,
  tags: ['live-aldeia', 'formulario-inscricao', 'inscrito-para-live', 'teste'],
  source: 'live-aldeia-singular',
  sourceId: 'teste-script'
};

const postData = JSON.stringify(mauticData);

const options = {
  hostname: mauticUrl,
  port: 443,
  path: '/api/contacts/new',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(postData),
    'Authorization': `Basic ${Buffer.from(`${mauticUsername}:${mauticPassword}`).toString('base64')}`,
    'User-Agent': 'Test-Script/1.0'
  }
};

console.log('🚀 Testando integração com Mautic...');
console.log('📡 URL:', `https://${options.hostname}${options.path}`);
console.log('📋 Dados:', mauticData);
console.log('');

const req = https.request(options, (res) => {
  console.log('📥 Status:', res.statusCode);
  console.log('📥 Headers:', res.headers);
  
  let data = '';
  
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    console.log('');
    console.log('📄 Resposta:');
    try {
      const jsonResponse = JSON.parse(data);
      console.log(JSON.stringify(jsonResponse, null, 2));
      
      if (res.statusCode === 200 || res.statusCode === 201) {
        console.log('');
        console.log('✅ SUCESSO! Lead criado no Mautic!');
        if (jsonResponse.contact?.id) {
          console.log('🆔 ID do Lead:', jsonResponse.contact.id);
        }
      } else {
        console.log('');
        console.log('❌ ERRO! Status:', res.statusCode);
      }
    } catch (e) {
      console.log('📄 Resposta (texto):', data);
    }
  });
});

req.on('error', (e) => {
  console.error('❌ Erro na requisição:', e.message);
});

req.write(postData);
req.end();
