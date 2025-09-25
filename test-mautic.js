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
const publicKey = '1_1yfuhaq4q3y8sckok8ossgo440c404okcws08kgggw80kowwsg';
const secretKey = '2892h1bx7askcog880844os4ossk80k0o4cwkccck4o8ss8o4o';

// Dados para o Mautic
const mauticData = {
  firstname: testData.name.split(' ')[0] || testData.name,
  lastname: testData.name.split(' ').slice(1).join(' ') || '',
  email: testData.email,
  phone: testData.phone,
  occupation: testData.occupation,
  tags: ['live-aldeia', 'formulario-inscricao', 'teste'],
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
    'Authorization': `Basic ${Buffer.from(`${publicKey}:${secretKey}`).toString('base64')}`,
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
