# 🔧 Instruções para Ativar o Webhook no N8N

## ⚠️ **Situação Atual:**
- **Webhook de Produção**: ❌ Não está ativo (404)
- **Webhook de Teste**: ⚠️ Precisa ser executado manualmente
- **Aplicação**: ✅ Configurada para usar webhook de teste

## 🚀 **Para Ativar o Webhook de Produção:**

### 1. **Acesse o N8N:**
- Vá para: `https://editor.coruss.com.br`
- Faça login na sua conta

### 2. **Ative o Workflow:**
- Encontre o workflow `live_aldeia_v2`
- Clique no **toggle** no canto superior direito para ativar
- O workflow deve ficar **verde** (ativo)

### 3. **Verifique o Webhook:**
- URL de Produção: `https://editor.coruss.com.br/webhook/live_aldeia_v2`
- URL de Teste: `https://editor.coruss.com.br/webhook-test/live_aldeia_v2`

## 🧪 **Para Testar o Webhook de Teste:**

### 1. **Execute o Workflow:**
- No N8N, clique no botão **"Execute workflow"**
- Isso ativa o webhook de teste por uma execução

### 2. **Teste Imediatamente:**
- Após clicar em "Execute workflow", teste o formulário
- O webhook funcionará apenas para uma execução

## 📊 **Dados que Serão Enviados:**
```json
{
  "name": "Nome do usuário",
  "email": "email@exemplo.com",
  "phone": "(11) 99999-9999",
  "occupation": "Ocupação",
  "source": "live-aldeia-singular",
  "tags": ["live-aldeia", "formulario-inscricao", "inscrito-para-live"],
  "timestamp": "2025-09-28T20:20:00.000Z",
  "userAgent": "Mozilla/5.0...",
  "ip": "::1"
}
```

## 🔄 **Fluxo de Trabalho:**

### **Para Desenvolvimento/Teste:**
1. Use o webhook de teste
2. Execute manualmente no N8N quando necessário
3. Teste o formulário

### **Para Produção:**
1. Ative o workflow no N8N
2. Use o webhook de produção
3. Sistema funcionará automaticamente

## ⚙️ **Configuração da Aplicação:**
- **Atual**: Webhook de teste
- **Para Produção**: Ativar workflow no N8N
- **Variável de Ambiente**: `N8N_WEBHOOK_URL` (opcional)

---
**Próximo Passo**: Ativar o workflow no N8N para usar em produção! 🚀
