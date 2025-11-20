# 🔧 Integração Direta com Bitrix24 - Padrão form.md

## ✅ Implementação

O código foi refatorado para seguir o padrão de integração direta com Bitrix24 usado em outras aplicações da Coruss, conforme documentado em `form.md`.

## 📋 Mudanças Implementadas

### 1. Helper Function `callBitrix`

Criada função helper reutilizável para chamadas REST ao Bitrix24:

```typescript
const callBitrix = async <T,>(
  endpoint: string,
  payload: Record<string, unknown>
): Promise<T>
```

**Características:**
- ✅ Centraliza tratamento de erros
- ✅ Timeout de 30 segundos
- ✅ Validação de variável de ambiente
- ✅ Tratamento de erros específicos do Bitrix24

### 2. Variável de Ambiente

A URL do webhook agora é configurada via variável de ambiente:

```bash
BITRIX24_WEBHOOK_URL=https://seu-portal.bitrix24.com.br/rest/USER_ID/TOKEN
```

### 3. Separação de Nome

O nome completo agora é separado em `NAME` (primeiro nome) e `LAST_NAME` (sobrenome) para relatórios mais limpos no Bitrix24.

### 4. Formato de Dados

Os dados são enviados no formato correto que o Bitrix24 espera:

```json
{
  "fields": {
    "TITLE": "Inscrição Live Aldeia Singular",
    "NAME": "Primeiro Nome",
    "LAST_NAME": "Sobrenome",
    "EMAIL": [
      {
        "VALUE": "email@exemplo.com",
        "VALUE_TYPE": "WORK"
      }
    ],
    "PHONE": [
      {
        "VALUE": "11999999999",
        "VALUE_TYPE": "WORK"
      }
    ],
    "COMMENTS": "Ocupação: Profissão\nOrigem: Live Aldeia Singular",
    "SOURCE_ID": "WEB",
    "SOURCE_DESCRIPTION": "Formulário de Inscrição - Live Aldeia Singular",
    "STATUS_ID": "NEW",
    "OPENED": "Y",
    "HAS_PHONE": "Y",
    "HAS_EMAIL": "Y"
  }
}
```

## ⚙️ Configuração Necessária

### 1. Obter Webhook REST do Bitrix24

1. Acesse seu portal Bitrix24
2. Vá em **Configurações** → **Desenvolvimento** → **Webhooks**
3. Clique em **Adicionar webhook de saída**
4. Configure as permissões necessárias:
   - ✅ `crm.lead.add` (obrigatório)
   - ✅ `crm.lead.get` (opcional, para verificação)
5. Copie a URL base (formato: `https://seu-portal.bitrix24.com.br/rest/USER_ID/TOKEN`)

### 2. Configurar Variável de Ambiente

#### Desenvolvimento Local:

1. Crie um arquivo `.env.local` na raiz do projeto:
```bash
BITRIX24_WEBHOOK_URL=https://seu-portal.bitrix24.com.br/rest/USER_ID/TOKEN
```

2. Reinicie o servidor de desenvolvimento:
```bash
npm run dev
```

#### Produção (Vercel):

1. Acesse o dashboard do Vercel
2. Vá em **Settings** → **Environment Variables**
3. Adicione a variável:
   - **Nome**: `BITRIX24_WEBHOOK_URL`
   - **Valor**: `https://seu-portal.bitrix24.com.br/rest/USER_ID/TOKEN`
4. Selecione os ambientes (Production, Preview, Development)
5. Clique em **Save**

## 🔍 Verificação

### Testar a Integração

1. Preencha o formulário no site
2. Verifique os logs do servidor - você deve ver:
   ```
   ✅ Lead criado com sucesso no Bitrix24! ID: 12345
   ```
3. Confirme no Bitrix24 se o lead foi criado:
   - Vá em **CRM** → **Leads**
   - Procure pelo lead com o nome e email do teste
   - Verifique se o email está preenchido corretamente

## 📊 Logs Esperados

### Sucesso:
```
📥 Dados recebidos do formulário: { name: '...', email: '...', ... }
🚀 Iniciando criação de lead no Bitrix24
📋 Dados normalizados: { firstName: '...', lastName: '...', ... }
✅ Lead criado com sucesso no Bitrix24! ID: 12345
```

### Erro:
```
📥 Dados recebidos do formulário: { name: '...', email: '...', ... }
🚀 Iniciando criação de lead no Bitrix24
❌ Erro ao criar lead no Bitrix24: [mensagem de erro]
❌ Detalhes do erro: { error: '...', timestamp: '...', data: {...} }
```

## 🎯 Benefícios da Refatoração

1. **Código mais limpo**: Helper function reutilizável
2. **Melhor tratamento de erros**: Mensagens específicas e logs detalhados
3. **Configuração centralizada**: Variável de ambiente única
4. **Padrão consistente**: Segue o mesmo padrão usado em outras aplicações
5. **Manutenibilidade**: Fácil de atualizar e debugar

## 🔄 Próximos Passos (Opcional)

Conforme sugerido no `form.md`, futuras melhorias podem incluir:

- [ ] Extrair lógica para hook reutilizável (`useBitrixLead()`)
- [ ] Adicionar deduplicação (buscar lead existente antes de criar)
- [ ] Implementar métricas (enviar eventos ao analytics)
- [ ] Criar Contact e Deal além do Lead (se necessário)

## ✅ Checklist

- [x] Helper function `callBitrix` implementada
- [x] Variável de ambiente `BITRIX24_WEBHOOK_URL` configurada
- [x] Separação de nome em `NAME` e `LAST_NAME`
- [x] Formato correto de EMAIL e PHONE como arrays
- [x] Tratamento de erros melhorado
- [x] Logs detalhados para debug
- [ ] **Configurar variável de ambiente** (ação necessária)
- [ ] **Testar integração** (ação necessária)

---

**Status**: Código refatorado ✅ | Configuração de ambiente pendente ⏳

