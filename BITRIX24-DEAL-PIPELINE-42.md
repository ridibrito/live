# 🔧 Integração Bitrix24 - Deals no Pipeline 42

## ✅ Configuração Implementada

O código foi atualizado para criar **Deals (Negócios)** diretamente no **Pipeline 42** do Bitrix24, conforme a URL fornecida: `https://coruss.bitrix24.com.br/crm/deal/kanban/category/42/`

## 📋 Fluxo Implementado

Seguindo o padrão do `form.md`, o código agora:

1. **Cria Contact (Contato)** com os dados do formulário
2. **Cria Deal (Negócio)** no Pipeline 42 vinculado ao Contact

### Por que Contact + Deal?

- ✅ Evita duplicidade de contatos
- ✅ Deal precisa estar vinculado a um Contact (`CONTACT_ID`)
- ✅ Mantém o pipeline organizado
- ✅ Segue as melhores práticas do Bitrix24

## ⚙️ Configuração

### Variáveis de Ambiente Necessárias

#### Obrigatória:
```bash
BITRIX24_WEBHOOK_URL=https://coruss.bitrix24.com.br/rest/USER_ID/TOKEN
```

#### Opcionais (com valores padrão):
```bash
# Pipeline do Deal (padrão: 42)
BITRIX24_DEAL_CATEGORY_ID=42

# Stage inicial do Deal (padrão: NEW)
BITRIX24_DEAL_STAGE_ID=NEW

# ID do responsável pelo Deal (opcional)
BITRIX24_ASSIGNED_BY_ID=1
```

### Configuração Local (`.env.local`)

```bash
BITRIX24_WEBHOOK_URL=https://coruss.bitrix24.com.br/rest/USER_ID/TOKEN
BITRIX24_DEAL_CATEGORY_ID=42
BITRIX24_DEAL_STAGE_ID=NEW
```

### Configuração Produção (Vercel)

1. Acesse **Settings** → **Environment Variables**
2. Adicione:
   - `BITRIX24_WEBHOOK_URL` = `https://coruss.bitrix24.com.br/rest/USER_ID/TOKEN`
   - `BITRIX24_DEAL_CATEGORY_ID` = `42` (opcional, já é o padrão)
   - `BITRIX24_DEAL_STAGE_ID` = `NEW` (opcional, já é o padrão)

## 📊 Dados Criados

### Contact (Contato)
- **NAME**: Primeiro nome
- **LAST_NAME**: Sobrenome
- **EMAIL**: Email normalizado
- **PHONE**: Telefone normalizado (apenas números)
- **POST**: Ocupação
- **COMMENTS**: Informações adicionais
- **SOURCE_ID**: WEB
- **UTM_***: Parâmetros UTM (se presentes)

### Deal (Negócio) - Pipeline 42
- **TITLE**: "Inscrição Live Aldeia Singular - [Nome]"
- **CATEGORY_ID**: 42 (Pipeline configurado)
- **STAGE_ID**: NEW (ou configurado via variável)
- **CONTACT_ID**: ID do Contact criado
- **CURRENCY_ID**: BRL
- **SOURCE_ID**: WEB
- **COMMENTS**: Informações do formulário
- **UTM_***: Parâmetros UTM (se presentes)

## 🔍 Verificação

### 1. Verificar nos Logs

Após criar uma inscrição, os logs mostrarão:

```
🚀 Iniciando criação de Contact e Deal no Bitrix24
📋 Configuração do Pipeline:
  dealCategoryId: 42
  dealStageId: NEW
  note: Deal será criado no pipeline 42

👤 Criando contato...
✅ Contato criado com sucesso! ID: 12345

💼 Criando deal no pipeline 42 ...
✅ Deal criado com sucesso no pipeline 42! ID: 67890

📊 Informações do Deal criado:
  dealId: 67890
  categoryId: 42
  stageId: NEW
  title: Inscrição Live Aldeia Singular - Nome do Cliente
```

### 2. Verificar no Bitrix24

1. **Acesse**: `https://coruss.bitrix24.com.br/crm/deal/kanban/category/42/`
2. **Procure pelo Deal** criado:
   - Título: "Inscrição Live Aldeia Singular - [Nome]"
   - Stage: NEW (ou o stage configurado)
3. **Verifique o Contact vinculado**:
   - Clique no Deal
   - Veja o Contact vinculado na aba de detalhes

### 3. Verificar Contact

1. **Acesse**: CRM → Contatos
2. **Procure pelo email** ou nome do inscrito
3. **Verifique se o Deal está vinculado** ao Contact

## 🎯 Onde Encontrar os Dados

### Deals (Negócios)
- **URL**: `https://coruss.bitrix24.com.br/crm/deal/kanban/category/42/`
- **Menu**: CRM → Negócios → Pipeline 42
- **Visualização**: Kanban (padrão)

### Contacts (Contatos)
- **URL**: `https://coruss.bitrix24.com.br/crm/contact/`
- **Menu**: CRM → Contatos
- **Busca**: Por email ou nome

## 📋 Campos Enviados

### Contact
```json
{
  "NAME": "Primeiro Nome",
  "LAST_NAME": "Sobrenome",
  "EMAIL": [{"VALUE": "email@exemplo.com", "VALUE_TYPE": "WORK"}],
  "PHONE": [{"VALUE": "11999999999", "VALUE_TYPE": "WORK"}],
  "POST": "Ocupação",
  "COMMENTS": "Ocupação: ...\nOrigem: Live Aldeia Singular",
  "SOURCE_ID": "WEB",
  "SOURCE_DESCRIPTION": "Formulário de Inscrição - Live Aldeia Singular"
}
```

### Deal (Pipeline 42)
```json
{
  "TITLE": "Inscrição Live Aldeia Singular - Nome",
  "CATEGORY_ID": 42,
  "STAGE_ID": "NEW",
  "CONTACT_ID": 12345,
  "CURRENCY_ID": "BRL",
  "SOURCE_ID": "WEB",
  "SOURCE_DESCRIPTION": "Formulário de Inscrição - Live Aldeia Singular",
  "COMMENTS": "Ocupação: ...\nOrigem: Live Aldeia Singular"
}
```

## ✅ Checklist

- [x] Código atualizado para criar Contact + Deal
- [x] Pipeline 42 configurado como padrão
- [x] Logs detalhados implementados
- [ ] **Configurar `BITRIX24_WEBHOOK_URL`** (obrigatório)
- [ ] **Testar criação de inscrição**
- [ ] **Verificar Deal no pipeline 42**
- [ ] **Verificar Contact criado**

## 🚨 Troubleshooting

### Deal não aparece no pipeline 42

1. **Verifique os logs**:
   - Deve aparecer `✅ Deal criado com sucesso no pipeline 42!`
   - Anote o `dealId` retornado

2. **Verifique o `CATEGORY_ID`**:
   - Nos logs, deve mostrar `categoryId: 42`
   - Se mostrar outro número, verifique a variável `BITRIX24_DEAL_CATEGORY_ID`

3. **Busque pelo Deal no Bitrix24**:
   - Use o `dealId` retornado nos logs
   - Ou busque pelo título: "Inscrição Live Aldeia Singular - [Nome]"

### Contact não foi criado

1. **Verifique os logs**:
   - Deve aparecer `✅ Contato criado com sucesso!`
   - Anote o `contactId` retornado

2. **Verifique permissões do webhook**:
   - Precisa ter `crm.contact.add` e `crm.deal.add`
   - Verifique em: Configurações → Desenvolvimento → Webhooks

### Erro ao criar Deal

1. **Verifique se o Contact foi criado**:
   - O Deal precisa de um `CONTACT_ID` válido
   - Se o Contact falhou, o Deal também falhará

2. **Verifique o Stage ID**:
   - O `STAGE_ID` deve existir no pipeline 42
   - Stages comuns: NEW, IN_PROCESS, WON, LOST
   - Verifique no Bitrix24 quais stages estão disponíveis no pipeline 42

---

**Status**: Código atualizado ✅ | Pipeline 42 configurado ✅ | Aguardando teste ⏳

**URL do Pipeline**: `https://coruss.bitrix24.com.br/crm/deal/kanban/category/42/`

