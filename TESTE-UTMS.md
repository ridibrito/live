# 🎯 Sistema de Captura de UTMs - Live Aldeia Singular

## 📋 Visão Geral

Sistema implementado para capturar, armazenar e enviar parâmetros UTM (rastreamento de origem de tráfego) para o webhook do N8N.

## ✅ Funcionalidades Implementadas

### 1. **Captura Automática de UTMs**
- ✅ Captura automática dos parâmetros UTM da URL
- ✅ Suporte a todos os parâmetros padrão:
  - `utm_source` - Origem do tráfego
  - `utm_medium` - Tipo de mídia
  - `utm_campaign` - Nome da campanha
  - `utm_term` - Termos de pesquisa
  - `utm_content` - Conteúdo específico

### 2. **Persistência de Dados**
- ✅ Armazenamento no `localStorage` do navegador
- ✅ Recuperação automática caso o usuário navegue sem UTMs
- ✅ Logs detalhados no console para debug

### 3. **Integração com Webhook**
- ✅ Envio de UTMs junto com dados do formulário
- ✅ Estrutura organizada (objeto `utms` + campos individuais)
- ✅ Compatível com automações do N8N

## 🚀 Como Testar

### Opção 1: Página HTML de Teste (Recomendado)

1. **Abra a página de teste:**
   ```
   http://localhost:3000/test-utms.html
   ```
   (Alternativamente: abra o arquivo `test-utms.html` diretamente no navegador)

2. **Escolha um dos links de teste** - Cada um simula uma origem diferente:
   - 🔵 Facebook Orgânico
   - 📸 Instagram Pago
   - 🔍 Google Ads
   - 📧 Email Marketing
   - 💚 WhatsApp

3. **Abra o Console do navegador** (F12 → Console)

4. **Observe os logs:**
   ```
   📊 UTMs capturados: { utm_source: "facebook", ... }
   ```

5. **Preencha e envie o formulário**

6. **Verifique no N8N** se os dados chegaram com os UTMs

### Opção 2: Script Automatizado

1. **Execute o script de teste:**
   ```bash
   node test-utms.js
   ```

2. **O script irá:**
   - ✅ Verificar se o servidor está rodando
   - ✅ Executar 6 testes diferentes
   - ✅ Simular diferentes origens de tráfego
   - ✅ Mostrar resumo dos resultados

### Opção 3: Teste Manual com URL

Acesse diretamente com UTMs na URL:
```
http://localhost:3000/?utm_source=teste&utm_medium=manual&utm_campaign=debug
```

## 📊 Estrutura de Dados Enviada ao Webhook

```json
{
  "name": "Nome do Usuário",
  "email": "email@exemplo.com",
  "phone": "(11) 98765-4321",
  "occupation": "Ocupação",
  "source": "live-aldeia-singular",
  "tags": ["live-aldeia", "formulario-inscricao", "inscrito-para-live"],
  "timestamp": "2024-10-03T...",
  "userAgent": "Mozilla/5.0...",
  "ip": "192.168.1.1",
  
  // UTMs como objeto (facilita manipulação)
  "utms": {
    "utm_source": "facebook",
    "utm_medium": "social",
    "utm_campaign": "live_aldeia_2024",
    "utm_term": "cuidador_idosos",
    "utm_content": "post_organico"
  },
  
  // UTMs como campos individuais (facilita mapeamento)
  "utm_source": "facebook",
  "utm_medium": "social",
  "utm_campaign": "live_aldeia_2024",
  "utm_term": "cuidador_idosos",
  "utm_content": "post_organico"
}
```

## 🔍 Verificação no Console do Navegador

Ao acessar a página com UTMs, você verá:

```javascript
// Quando capturar da URL
📊 UTMs capturados: {
  utm_source: "facebook",
  utm_medium: "social",
  utm_campaign: "live_aldeia_2024",
  utm_content: "post_organico",
  utm_term: "cuidador_idosos"
}

// Ao enviar o formulário
🔄 Enviando dados para API: http://localhost:3000/api/webhook-n8n {
  name: "...",
  email: "...",
  phone: "...",
  occupation: "...",
  utms: { ... }
}

// Resposta da API
📊 Resposta da API: {
  status: 200,
  ok: true,
  result: { success: true, message: "Inscrição realizada com sucesso" }
}
```

## 📦 Arquivos Modificados/Criados

### Modificados:
- ✅ `src/components/RegistrationForm.tsx` - Captura e envio de UTMs
- ✅ `src/app/api/webhook-n8n/route.ts` - Inclusão de UTMs no webhook

### Criados:
- ✅ `test-utms.html` - Página de teste visual
- ✅ `test-utms.js` - Script de teste automatizado
- ✅ `TESTE-UTMS.md` - Este documento

## 🎯 Exemplos de Uso Real

### Campanha Facebook:
```
https://seusite.com/?utm_source=facebook&utm_medium=social&utm_campaign=live_aldeia_2024&utm_content=post1
```

### Campanha Google Ads:
```
https://seusite.com/?utm_source=google&utm_medium=cpc&utm_campaign=live_aldeia_2024&utm_term=cuidador+idosos
```

### Email Marketing:
```
https://seusite.com/?utm_source=mailchimp&utm_medium=email&utm_campaign=live_aldeia_2024&utm_content=convite
```

## 🛠️ Configuração no N8N

No seu workflow do N8N, você pode acessar os UTMs de duas formas:

### 1. Como objeto:
```javascript
{{ $json.utms.utm_source }}
{{ $json.utms.utm_campaign }}
```

### 2. Como campos individuais:
```javascript
{{ $json.utm_source }}
{{ $json.utm_campaign }}
```

## 🔄 Fluxo de Funcionamento

1. **Usuário acessa** a página com UTMs na URL
2. **Sistema captura** os parâmetros automaticamente
3. **Sistema salva** no localStorage (persistência)
4. **Usuário preenche** o formulário
5. **Sistema envia** dados + UTMs para a API
6. **API processa** e envia para webhook N8N
7. **N8N recebe** todos os dados incluindo UTMs

## ⚙️ Configurações Atuais

- ✅ Webhook de TESTE ativo: `https://editor.coruss.com.br/webhook-test/live_aldeia_v2`
- ⚠️ Webhook de PRODUÇÃO comentado temporariamente
- 📝 UTMs salvos no localStorage do navegador
- 🔄 Hot reload ativo (mudanças aplicadas automaticamente)

## 📝 Notas Importantes

1. **Persistência**: UTMs ficam salvos mesmo se o usuário navegar sem parâmetros
2. **Privacidade**: Dados armazenados apenas no navegador do usuário
3. **Debug**: Todos os logs no console (remover em produção se necessário)
4. **Compatibilidade**: Funciona em todos os navegadores modernos

## 🎉 Próximos Passos

Após validar a captura de UTMs:
1. Testar diferentes origens de tráfego
2. Verificar dados no N8N
3. Ajustar automação conforme necessário
4. Ativar webhook de produção
5. (Opcional) Remover logs de console para produção

---

**Status**: ✅ Sistema implementado e pronto para testes
**Webhook Ativo**: 🧪 Modo TESTE
**Última atualização**: 03/10/2024

