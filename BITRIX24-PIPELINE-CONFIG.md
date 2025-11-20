# 🔧 Configuração de Pipeline no Bitrix24

## ❓ Problema: Leads não estão aparecendo

Se os leads não estão aparecendo no Bitrix24, pode ser que estejam sendo criados em um **pipeline diferente** do que você está visualizando.

## 📊 Como Descobrir Qual Pipeline Está Sendo Usado

### 1. Verificar nos Logs do Servidor

Após criar um lead, os logs mostrarão:

```
📋 Configuração do Pipeline:
  categoryId: Padrão (não especificado)
  statusId: NEW

✅ Lead criado com sucesso no Bitrix24! ID: 12345

📊 Informações do Lead criado:
  leadId: 12345
  categoryId: 0 (ou outro número)
  statusId: NEW
  stageId: NEW
```

### 2. Verificar no Bitrix24

1. **Acesse**: CRM → Leads
2. **Procure pelo lead** criado (use o ID retornado nos logs)
3. **Veja qual pipeline** ele está usando (geralmente aparece no topo da página ou na visualização de lista)

### 3. Listar Todos os Pipelines Disponíveis

Você pode usar a API do Bitrix24 para listar os pipelines:

```bash
curl "https://seu-portal.bitrix24.com.br/rest/USER_ID/TOKEN/crm.category.list.json?entityTypeId=1"
```

Onde `entityTypeId=1` significa Leads.

## ⚙️ Como Configurar o Pipeline

### Opção 1: Usar Pipeline Padrão (Atual)

Se não especificar nenhum pipeline, o Bitrix24 usará o **pipeline padrão** configurado na sua conta.

**Vantagem**: Funciona automaticamente  
**Desvantagem**: Pode não ser o pipeline que você quer usar

### Opção 2: Especificar Pipeline Específico

#### 1. Descobrir o ID do Pipeline

**Método 1: Via Interface do Bitrix24**
1. Acesse **CRM → Leads**
2. Clique no dropdown de pipelines (geralmente no topo)
3. Veja o ID na URL ou inspecione o elemento HTML

**Método 2: Via API**
```bash
curl "https://seu-portal.bitrix24.com.br/rest/USER_ID/TOKEN/crm.category.list.json?entityTypeId=1"
```

Procure por algo como:
```json
{
  "result": [
    {
      "ID": "0",
      "NAME": "Padrão"
    },
    {
      "ID": "1",
      "NAME": "Pipeline de Vendas"
    }
  ]
}
```

#### 2. Configurar Variável de Ambiente

**Desenvolvimento Local** (`.env.local`):
```bash
BITRIX24_WEBHOOK_URL=https://seu-portal.bitrix24.com.br/rest/USER_ID/TOKEN
BITRIX24_LEAD_CATEGORY_ID=0
BITRIX24_LEAD_STATUS_ID=NEW
```

**Produção (Vercel)**:
1. Acesse **Settings** → **Environment Variables**
2. Adicione:
   - `BITRIX24_LEAD_CATEGORY_ID` = `0` (ou o ID do seu pipeline)
   - `BITRIX24_LEAD_STATUS_ID` = `NEW` (ou outro status)

## 📋 Status IDs Comuns

- `NEW` - Novo (padrão)
- `IN_PROCESS` - Em processo
- `CONVERTED` - Convertido
- `JUNK` - Lixo

**Nota**: Os status disponíveis dependem do seu pipeline. Verifique no Bitrix24 quais status estão disponíveis.

## 🔍 Verificar Onde os Leads Estão Sendo Criados

### 1. Verificar Todos os Pipelines

No Bitrix24:
1. **CRM → Leads**
2. **Veja o dropdown de pipelines** no topo
3. **Verifique cada pipeline** para encontrar seus leads

### 2. Buscar por Email

1. **CRM → Leads**
2. **Use a busca** e procure pelo email do lead
3. **Veja em qual pipeline** ele aparece

### 3. Usar Filtros

1. **CRM → Leads**
2. **Adicione filtros**:
   - Data de criação: Hoje
   - Fonte: WEB
   - Descrição: "Live Aldeia Singular"
3. **Verifique em qual pipeline** os resultados aparecem

## 🎯 Exemplo de Configuração

### Pipeline Padrão (ID: 0)
```bash
BITRIX24_LEAD_CATEGORY_ID=0
BITRIX24_LEAD_STATUS_ID=NEW
```

### Pipeline de Vendas (ID: 1)
```bash
BITRIX24_LEAD_CATEGORY_ID=1
BITRIX24_LEAD_STATUS_ID=NEW
```

### Sem Pipeline Específico (Usa Padrão)
```bash
# Não defina BITRIX24_LEAD_CATEGORY_ID
BITRIX24_LEAD_STATUS_ID=NEW
```

## 📊 Logs Esperados

### Com Pipeline Configurado:
```
📋 Configuração do Pipeline:
  categoryId: 0
  statusId: NEW
  note: Pipeline específico configurado

✅ Lead criado com sucesso no Bitrix24! ID: 12345

📊 Informações do Lead criado:
  leadId: 12345
  categoryId: 0
  statusId: NEW
  stageId: NEW
  title: Inscrição Live Aldeia Singular
```

### Sem Pipeline Configurado:
```
📋 Configuração do Pipeline:
  categoryId: Padrão (não especificado)
  statusId: NEW
  note: Usando pipeline padrão do Bitrix24

✅ Lead criado com sucesso no Bitrix24! ID: 12345

📊 Informações do Lead criado:
  leadId: 12345
  categoryId: 0
  statusId: NEW
  stageId: NEW
```

## ✅ Checklist

- [ ] Verificar logs do servidor para ver qual pipeline está sendo usado
- [ ] Verificar no Bitrix24 em qual pipeline os leads estão aparecendo
- [ ] Descobrir o ID do pipeline desejado
- [ ] Configurar `BITRIX24_LEAD_CATEGORY_ID` (se necessário)
- [ ] Configurar `BITRIX24_LEAD_STATUS_ID` (se necessário)
- [ ] Testar criação de lead
- [ ] Verificar se o lead aparece no pipeline correto

## 🚨 Troubleshooting

### Leads não aparecem em nenhum pipeline

1. **Verifique se o lead foi criado**:
   - Veja os logs: deve aparecer `✅ Lead criado com sucesso`
   - Anote o `leadId` retornado

2. **Busque pelo ID do lead**:
   - No Bitrix24, use a busca e procure pelo ID
   - Ou use a API: `crm.lead.get.json?id=LEAD_ID`

3. **Verifique permissões do webhook**:
   - O webhook precisa ter permissão para criar leads
   - Verifique em: Configurações → Desenvolvimento → Webhooks

### Leads aparecem em pipeline diferente

1. **Configure o pipeline correto**:
   - Descubra o ID do pipeline desejado
   - Configure `BITRIX24_LEAD_CATEGORY_ID`

2. **Verifique se a variável está sendo lida**:
   - Reinicie o servidor após adicionar variável de ambiente
   - Verifique os logs: deve mostrar o `categoryId` configurado

---

**Status**: Código atualizado com suporte a pipeline ✅ | Configuração opcional ⏳

