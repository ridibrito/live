/**
 * Script de Teste para Captura de UTMs
 * Live Aldeia Singular
 * 
 * Execute com: node test-utms.js
 */

const testCases = [
  {
    name: 'Facebook Orgânico',
    data: {
      name: 'Maria Silva',
      email: 'maria.teste@email.com',
      phone: '(11) 98765-4321',
      occupation: 'Cuidadora de Idosos',
      utms: {
        utm_source: 'facebook',
        utm_medium: 'social',
        utm_campaign: 'live_aldeia_2024',
        utm_content: 'post_organico',
        utm_term: 'cuidador_idosos'
      }
    }
  },
  {
    name: 'Instagram Pago',
    data: {
      name: 'João Santos',
      email: 'joao.teste@email.com',
      phone: '(21) 99876-5432',
      occupation: 'Enfermeiro',
      utms: {
        utm_source: 'instagram',
        utm_medium: 'paid',
        utm_campaign: 'live_aldeia_2024',
        utm_content: 'stories_anuncio',
        utm_term: 'cuidador_profissional'
      }
    }
  },
  {
    name: 'Google Ads',
    data: {
      name: 'Ana Paula',
      email: 'ana.teste@email.com',
      phone: '(31) 91234-5678',
      occupation: 'Terapeuta Ocupacional',
      utms: {
        utm_source: 'google',
        utm_medium: 'cpc',
        utm_campaign: 'live_aldeia_2024',
        utm_content: 'anuncio_search',
        utm_term: 'aldeia_singular'
      }
    }
  },
  {
    name: 'Email Marketing',
    data: {
      name: 'Carlos Eduardo',
      email: 'carlos.teste@email.com',
      phone: '(48) 98765-1234',
      occupation: 'Psicólogo Geriátrico',
      utms: {
        utm_source: 'email',
        utm_medium: 'newsletter',
        utm_campaign: 'live_aldeia_2024',
        utm_content: 'convite_especial'
      }
    }
  },
  {
    name: 'WhatsApp',
    data: {
      name: 'Patricia Alves',
      email: 'patricia.teste@email.com',
      phone: '(85) 97654-3210',
      occupation: 'Assistente Social',
      utms: {
        utm_source: 'whatsapp',
        utm_medium: 'referral',
        utm_campaign: 'live_aldeia_2024',
        utm_content: 'compartilhamento_direto'
      }
    }
  },
  {
    name: 'Sem UTMs (Teste Negativo)',
    data: {
      name: 'Roberto Lima',
      email: 'roberto.teste@email.com',
      phone: '(62) 96543-2109',
      occupation: 'Familiar Cuidador',
      utms: {}
    }
  }
];

async function testarWebhook(testCase) {
  console.log(`\n🧪 Testando: ${testCase.name}`);
  console.log('📋 Dados:', JSON.stringify(testCase.data, null, 2));
  
  try {
    const response = await fetch('http://localhost:3000/api/webhook-n8n', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Test-Script/1.0'
      },
      body: JSON.stringify(testCase.data)
    });

    const result = await response.json();
    
    if (response.ok) {
      console.log(`✅ SUCESSO (${response.status}):`, result);
      
      // Verificar se UTMs foram incluídos corretamente
      if (testCase.data.utms && Object.keys(testCase.data.utms).length > 0) {
        console.log('📊 UTMs enviados:', testCase.data.utms);
      } else {
        console.log('ℹ️ Teste sem UTMs (esperado)');
      }
    } else {
      console.log(`❌ ERRO (${response.status}):`, result);
    }
    
    return { success: response.ok, testCase: testCase.name, status: response.status };
  } catch (error) {
    console.error(`❌ ERRO DE CONEXÃO:`, error.message);
    return { success: false, testCase: testCase.name, error: error.message };
  }
}

async function executarTestes() {
  console.log('🚀 Iniciando Testes de Captura de UTMs');
  console.log('📡 URL de destino: http://localhost:3000/api/webhook-n8n');
  console.log('=' .repeat(60));
  
  const resultados = [];
  
  for (const testCase of testCases) {
    const resultado = await testarWebhook(testCase);
    resultados.push(resultado);
    
    // Aguardar 1 segundo entre cada teste
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  console.log('\n' + '=' .repeat(60));
  console.log('📊 RESUMO DOS TESTES:');
  console.log('=' .repeat(60));
  
  const sucessos = resultados.filter(r => r.success).length;
  const falhas = resultados.filter(r => !r.success).length;
  
  console.log(`\n✅ Sucessos: ${sucessos}`);
  console.log(`❌ Falhas: ${falhas}`);
  console.log(`📋 Total: ${resultados.length}`);
  
  if (falhas > 0) {
    console.log('\n⚠️ Testes com falha:');
    resultados.filter(r => !r.success).forEach(r => {
      console.log(`   - ${r.testCase} (${r.status || r.error})`);
    });
  }
  
  console.log('\n' + '=' .repeat(60));
  console.log('🏁 Testes concluídos!');
  
  if (sucessos === resultados.length) {
    console.log('🎉 Todos os testes passaram com sucesso!');
  } else {
    console.log('⚠️ Alguns testes falharam. Verifique os logs acima.');
  }
}

// Verificar se o servidor está rodando
async function verificarServidor() {
  try {
    const response = await fetch('http://localhost:3000');
    return response.ok;
  } catch (error) {
    return false;
  }
}

// Executar
(async () => {
  console.log('🔍 Verificando se o servidor está rodando...\n');
  
  const servidorAtivo = await verificarServidor();
  
  if (!servidorAtivo) {
    console.error('❌ ERRO: Servidor não está rodando em http://localhost:3000');
    console.log('💡 Execute: npm run dev');
    process.exit(1);
  }
  
  console.log('✅ Servidor ativo!\n');
  await executarTestes();
})();

