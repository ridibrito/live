# 🚀 Configuração Completa para Produção

## ⚠️ **Problemas Identificados e Soluções:**

### 1. **CORS (Cross-Origin Resource Sharing)**
- **Problema**: Em produção, o navegador pode bloquear requisições
- **Solução**: ✅ Adicionado suporte CORS na API
- **Arquivos**: `src/app/api/webhook-n8n/route.ts` e `vercel.json`

### 2. **Configuração do Vercel**
- **Problema**: `vercel.json` estava configurado para `/api/webhook` (antigo)
- **Solução**: ✅ Atualizado para `/api/webhook-n8n`
- **Arquivo**: `vercel.json`

### 3. **Headers de Produção**
- **Problema**: Faltavam headers CORS nas respostas
- **Solução**: ✅ Adicionados headers em todas as respostas

## 🔧 **Alterações Realizadas:**

### **1. API Route (`src/app/api/webhook-n8n/route.ts`):**
```typescript
// Suporte a CORS
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}

// Headers CORS em todas as respostas
headers: {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
}
```

### **2. Vercel Config (`vercel.json`):**
```json
{
  "functions": {
    "src/app/api/webhook-n8n/route.ts": {
      "maxDuration": 30
    }
  },
  "headers": [
    {
      "source": "/api/webhook-n8n",
      "headers": [
        {
          "key": "Access-Control-Allow-Origin",
          "value": "*"
        },
        {
          "key": "Access-Control-Allow-Methods",
          "value": "POST, OPTIONS"
        },
        {
          "key": "Access-Control-Allow-Headers",
          "value": "Content-Type"
        }
      ]
    }
  ]
}
```

## 🌐 **Variáveis de Ambiente (Opcional):**

### **Para Vercel/Produção:**
```bash
# URL do Webhook N8N (opcional)
N8N_WEBHOOK_URL=https://editor.coruss.com.br/webhook/live_aldeia_v2

# Ambiente
NODE_ENV=production
```

### **Como Configurar no Vercel:**
1. Acesse o dashboard do Vercel
2. Vá para Settings > Environment Variables
3. Adicione as variáveis se necessário

## 🧪 **Teste em Produção:**

### **1. Teste da API:**
```bash
curl -X POST https://sua-url-de-producao.com/api/webhook-n8n \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Teste Produção",
    "email": "teste@exemplo.com",
    "phone": "(11) 99999-9999",
    "occupation": "Testador"
  }'
```

### **2. Teste do Formulário:**
- Acesse a URL de produção
- Preencha o formulário
- Verifique se os dados chegam no N8N

## 📊 **Logs de Produção:**
- **Vercel**: Dashboard > Functions > Logs
- **N8N**: Verificar execuções do workflow
- **Console**: Logs detalhados da API

## 🎯 **Status Final:**
- ✅ **CORS**: Configurado
- ✅ **Vercel**: Atualizado
- ✅ **API**: Pronta para produção
- ✅ **Webhook N8N**: Funcionando
- ✅ **Formulário**: Com máscara de telefone

---
**Sistema pronto para produção!** 🚀
