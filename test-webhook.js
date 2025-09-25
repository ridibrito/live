const https = require('https');

// Dados de teste
const testData = {
  name: "Teste Script",
  email: "teste@teste.com",
  phone: "11999999999",
  occupation: "Desenvolvedor"
};

// Configuração da requisição
const postData = JSON.stringify(testData);

const options = {
  hostname: 'webhook.coruss.com.br',
  port: 443,
  path: '/webhook/live_aldeia_v2',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(postData),
    'User-Agent': 'Test-Script/1.0'
  }
};

console.log('🚀 Testando webhook de produção...');
console.log('📡 URL:', `https://${options.hostname}${options.path}`);
console.log('📋 Dados:', testData);
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
      
      if (res.statusCode === 200) {
        console.log('');
        console.log('✅ SUCESSO! Webhook funcionando perfeitamente!');
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
