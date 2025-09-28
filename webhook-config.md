# Configuração do Webhook N8N

## Problema Identificado
Os dados não estão chegando no N8N porque o webhook `https://webhook.coruss.com.br/webhook/live_aldeia_v2` está retornando erro 404.

## Soluções Implementadas

### 1. Logs Detalhados
A API agora registra logs detalhados de todas as tentativas de envio para o webhook.

### 2. Múltiplas URLs de Teste
A API tenta automaticamente diferentes URLs de webhook:
- `https://webhook.coruss.com.br/webhook/live_aldeia_v2`
- `https://webhook.coruss.com.br/webhook/live_aldeia_v1`
- `https://webhook.coruss.com.br/webhook/live_aldeia`
- `https://webhook.coruss.com.br/webhook/aldeia_live`

### 3. URL Personalizada via Variável de Ambiente
Para usar uma URL específica, crie um arquivo `.env.local` na raiz do projeto com:
```
N8N_WEBHOOK_URL=https://webhook.coruss.com.br/webhook/SUA_URL_CORRETA
```

## Próximos Passos

1. **Verificar no N8N:**
   - O workflow está ativo?
   - O webhook está configurado corretamente?
   - A URL está correta?

2. **Testar com URL Correta:**
   - Obter a URL correta do webhook no N8N
   - Configurar no arquivo `.env.local`
   - Reiniciar o servidor

3. **Monitorar Logs:**
   - Verificar os logs do servidor para ver as tentativas de envio
   - Os dados estão sendo processados localmente mesmo com erro no webhook

## Dados que Seriam Enviados
```json
{
  "name": "Nome do usuário",
  "email": "email@exemplo.com",
  "phone": "(11) 99999-9999",
  "occupation": "Ocupação",
  "source": "live-aldeia-singular",
  "tags": ["live-aldeia", "formulario-inscricao", "inscrito-para-live"],
  "timestamp": "2025-09-28T13:40:46.880Z",
  "userAgent": "Mozilla/5.0...",
  "ip": "::1"
}
```
