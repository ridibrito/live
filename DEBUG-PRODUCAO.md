# 🔍 Debug: Problema em Produção

## ⚠️ **Problema Identificado:**
- **Localhost**: ✅ Funcionando perfeitamente
- **Produção**: ❌ Não chega no N8N
- **URL Produção**: `live.aldeiasingular.com.br`

## 🔧 **Soluções Implementadas:**

### 1. **URL Absoluta:**
- **Antes**: `/api/webhook-n8n` (relativa)
- **Agora**: `${window.location.origin}/api/webhook-n8n` (absoluta)
- **Resultado**: Funciona em qualquer domínio

### 2. **Logs Detalhados:**
- ✅ Log da URL da API
- ✅ Log dos dados enviados
- ✅ Log da resposta da API
- ✅ Log de erros detalhados

## 🧪 **Para Testar em Produção:**

### **1. Abrir Console do Navegador:**
1. Acesse: `https://live.aldeiasingular.com.br`
2. Abra F12 > Console
3. Preencha o formulário
4. Verifique os logs:
   - `🔄 Enviando dados para API: https://live.aldeiasingular.com.br/api/webhook-n8n`
   - `📊 Resposta da API: {status: 200, ok: true, ...}`
   - `✅ Formulário enviado com sucesso: {...}`

### **2. Verificar Network:**
1. F12 > Network
2. Preencha o formulário
3. Procure por requisição POST para `/api/webhook-n8n`
4. Verifique:
   - Status da resposta
   - Headers
   - Payload

### **3. Verificar Logs do Vercel:**
1. Dashboard Vercel > Functions > Logs
2. Procure por logs com timestamp atual
3. Verifique se aparecem:
   - `🔄 Tentando enviar dados para webhook N8N`
   - `📊 Resposta do webhook N8N`
   - `✅ Dados enviados com sucesso` OU `❌ Erro`

## 🔍 **Possíveis Causas:**

### **1. URL Relativa (RESOLVIDO):**
- ✅ Agora usa URL absoluta

### **2. CORS:**
- ✅ CORS configurado na API

### **3. Domínio Diferente:**
- ✅ URL dinâmica baseada no domínio atual

### **4. Cache do Navegador:**
- 🔄 Limpar cache e testar

### **5. Deploy Incompleto:**
- 🔄 Verificar se o deploy foi completo

## 📊 **Logs Esperados:**

### **No Console do Navegador:**
```
🔄 Enviando dados para API: https://live.aldeiasingular.com.br/api/webhook-n8n {name: "...", email: "...", ...}
📊 Resposta da API: {status: 200, ok: true, result: {...}, url: "..."}
✅ Formulário enviado com sucesso: {...}
```

### **No Vercel Logs:**
```
🔄 Tentando enviar dados para webhook N8N: {url: "https://editor.coruss.com.br/webhook/live_aldeia_v2", ...}
📊 Resposta do webhook N8N: {status: 200, response: "Workflow was started", ...}
✅ Dados enviados com sucesso para o webhook N8N: {...}
```

## 🚀 **Próximos Passos:**

1. **Fazer deploy** das alterações
2. **Testar em produção** com console aberto
3. **Verificar logs** do Vercel
4. **Verificar execuções** no N8N

---
**Agora deve funcionar em produção!** 🎉
