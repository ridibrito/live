# 🔍 Debug: Webhook N8N em Produção

## ⚠️ **Problema Identificado:**
- **Formulário**: ✅ Funcionando (dados do Ricardo enviados)
- **API**: ✅ Funcionando (resposta de sucesso)
- **Webhook N8N**: ❌ Não está recebendo dados da aplicação
- **Teste Direto**: ✅ Funcionando (quando testado manualmente)

## 🔧 **Soluções Implementadas:**

### 1. **Logs Detalhados:**
- ✅ Adicionados logs completos de todas as tentativas
- ✅ Timestamps para rastreamento
- ✅ Detalhes de erro e resposta

### 2. **Múltiplas URLs:**
- ✅ Tenta webhook de produção primeiro
- ✅ Fallback para webhook de teste
- ✅ Logs de cada tentativa

### 3. **Headers Melhorados:**
- ✅ User-Agent personalizado
- ✅ Timeout configurado
- ✅ Logs de resposta detalhados

## 📊 **Para Verificar os Logs:**

### **1. Logs do Vercel:**
1. Acesse o dashboard do Vercel
2. Vá para Functions > Logs
3. Procure por logs com timestamp `2025-09-28T20:30:24.713Z`
4. Verifique se aparecem os logs:
   - `🔄 Tentando enviar dados para webhook N8N`
   - `📊 Resposta do webhook N8N`
   - `✅ Dados enviados com sucesso` OU `❌ Erro ao enviar`

### **2. Logs do N8N:**
1. Acesse: `https://editor.coruss.com.br`
2. Vá para o workflow `live_aldeia_v2`
3. Verifique a aba "Executions"
4. Procure por execuções com timestamp `2025-09-28T20:30:24.713Z`

## 🧪 **Teste Manual:**

### **1. Teste da API em Produção:**
```bash
curl -X POST https://sua-url-de-producao.com/api/webhook-n8n \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Teste Debug",
    "email": "debug@exemplo.com",
    "phone": "(11) 99999-9999",
    "occupation": "Testador Debug"
  }'
```

### **2. Verificar Resposta:**
- Deve retornar `200 OK`
- Verificar logs do Vercel
- Verificar execuções no N8N

## 🔍 **Possíveis Causas:**

### **1. Timeout:**
- A aplicação pode estar com timeout
- Solução: Logs detalhados implementados

### **2. CORS:**
- Problema de CORS entre domínios
- Solução: CORS configurado

### **3. Firewall/Proxy:**
- Vercel pode estar bloqueando requisições
- Solução: User-Agent personalizado

### **4. Rate Limiting:**
- N8N pode estar limitando requisições
- Solução: Múltiplas URLs

## 📝 **Próximos Passos:**

1. **Fazer deploy** das alterações
2. **Testar formulário** em produção
3. **Verificar logs** do Vercel
4. **Verificar execuções** no N8N
5. **Analisar erros** específicos

## 🎯 **Status Atual:**
- ✅ **Logs Detalhados**: Implementados
- ✅ **Múltiplas URLs**: Configurado
- ✅ **Headers Melhorados**: Adicionados
- ⏳ **Aguardando Deploy**: Para testar

---
**Faça o deploy e teste novamente!** 🚀
