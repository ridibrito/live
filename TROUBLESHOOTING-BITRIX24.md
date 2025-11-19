# 🔧 Troubleshooting: Erro 404 no Bitrix24

## ❌ Erro Atual
```
status: 404
response: { raw: '<html>...404 Not Found...</html>' }
```

## 🔍 Possíveis Causas

### 1. URL do Webhook Incorreta

O erro 404 significa que a URL não foi encontrada. Verifique:

#### Formato Correto da URL:
```
https://seu-portal.bitrix24.com.br/rest/1/codigo-webhook
```

**Importante**: A URL deve conter:
- ✅ `https://` (protocolo)
- ✅ `seu-portal.bitrix24.com.br` (domínio do seu portal)
- ✅ `/rest/1/` (caminho da API REST)
- ✅ `codigo-webhook` (código único do webhook)

#### Formato INCORRETO:
```
❌ https://seu-portal.bitrix24.com.br/webhook/codigo-webhook
❌ https://seu-portal.bitrix24.com.br/api/codigo-webhook
❌ https://seu-portal.bitrix24.com.br/codigo-webhook
```

### 2. Como Obter a URL Correta

1. **Acesse seu portal Bitrix24**
2. **Vá em**: Configurações → Desenvolvimento → Webhooks
3. **Crie um novo webhook** ou use um existente
4. **Copie a URL completa** que aparece no formato:
   ```
   https://seu-portal.bitrix24.com.br/rest/1/xxxxxxxxxxxxxxxxxxxx
   ```
5. **Cole no arquivo `.env.local`**:
   ```bash
   BITRIX24_WEBHOOK_URL=https://seu-portal.bitrix24.com.br/rest/1/xxxxxxxxxxxxxxxxxxxx
   ```

### 3. Verificar Permissões do Webhook

O webhook precisa ter permissão para:
- ✅ Criar leads (`crm.lead.add`)
- ✅ Ler leads (opcional)

### 4. Verificar se o Webhook Está Ativo

- O webhook deve estar **ativo** no Bitrix24
- Verifique se não foi desativado ou expirado

## 🧪 Teste Manual da URL

Você pode testar a URL diretamente no navegador ou com curl:

```bash
# Substitua pela sua URL completa
curl "https://seu-portal.bitrix24.com.br/rest/1/seu-codigo-webhook/crm.lead.add?fields[TITLE]=Teste"
```

Se retornar JSON (mesmo que com erro), a URL está correta.
Se retornar 404, a URL está incorreta.

## 📋 Checklist

- [ ] URL começa com `https://`
- [ ] URL contém `/rest/1/`
- [ ] URL termina com o código do webhook (sem `/crm.lead.add`)
- [ ] Webhook está ativo no Bitrix24
- [ ] Webhook tem permissão para criar leads
- [ ] Variável `BITRIX24_WEBHOOK_URL` está no `.env.local`
- [ ] Servidor foi reiniciado após adicionar a variável

## 🔄 Próximos Passos

1. **Verifique a URL no `.env.local`**
2. **Confirme o formato correto** (deve ter `/rest/1/`)
3. **Reinicie o servidor**: `npm run dev`
4. **Teste o formulário novamente**
5. **Verifique os logs** - agora mostrarão a URL completa sendo usada

## 📊 Logs Esperados (Após Correção)

```
🔄 Tentando POST para Bitrix24:
  url: https://seu-portal.bitrix24.com.br/rest/1/codigo-webhook/crm.lead.add
  email: cliente@exemplo.com

📊 Resposta POST do Bitrix24:
  status: 200
  response: { result: 12345 }

✅ Lead criado com sucesso no Bitrix24 (POST):
  leadId: 12345
  email: cliente@exemplo.com
```

---

**Se ainda houver erro 404 após verificar tudo acima, compartilhe:**
- A URL completa (você pode mascarar parte do código do webhook)
- Os logs completos do servidor

