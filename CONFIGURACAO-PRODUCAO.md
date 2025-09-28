# 🚀 Configuração para Produção - Live Aldeia Singular

## ✅ Status Atual
- **Formulário**: ✅ Pronto para produção
- **API**: ✅ Configurada para webhook em produção
- **Webhook N8N**: ✅ Funcionando em produção
- **Integração**: ✅ Completa e operacional

## 🔗 URL do Webhook em Produção
```
https://editor.coruss.com.br/webhook/live_aldeia_v2
```

## 📊 Dados Enviados para o N8N
```json
{
  "name": "Nome do usuário",
  "email": "email@exemplo.com",
  "phone": "(11) 99999-9999",
  "occupation": "Ocupação",
  "source": "live-aldeia-singular",
  "tags": ["live-aldeia", "formulario-inscricao", "inscrito-para-live"],
  "timestamp": "2025-09-28T13:56:03.760Z",
  "userAgent": "Mozilla/5.0...",
  "ip": "::1"
}
```

## 🎯 Fluxo de Produção
1. **Usuário acessa** a página da live
2. **Preenche o formulário** com dados pessoais
3. **Clica em "QUERO ME INSCREVER AGORA"**
4. **API processa** e valida os dados
5. **Envia para N8N** via webhook em produção
6. **N8N executa** o workflow automaticamente
7. **Usuário é redirecionado** para página de agradecimento

## 🛠️ Configurações Técnicas
- **API Route**: `/api/webhook-n8n`
- **Método**: POST
- **Validação**: Zod schema
- **Webhook**: URL em produção configurada
- **Logs**: Detalhados para monitoramento

## 📝 Logs de Produção
Os logs mostrarão:
- ✅ Sucesso: "Dados enviados com sucesso para o webhook N8N"
- ❌ Erro: "Erro ao enviar para webhook N8N" (com detalhes)
- 📊 Dados: Todos os dados enviados para backup

## 🚀 Deploy
O sistema está pronto para deploy em produção. Todas as configurações estão otimizadas para o ambiente de produção.

---
**Status**: ✅ PRONTO PARA PRODUÇÃO
