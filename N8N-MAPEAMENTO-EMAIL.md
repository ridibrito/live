# 🔧 Instruções: Mapeamento do Email no N8N

## ✅ Situação Atual

O código está enviando os dados **corretamente** para o N8N no webhook:
- **URL**: `https://webhook.coruss.com.br/webhook/live_aldeia_v2`
- **Email está sendo enviado em múltiplos formatos** para facilitar o mapeamento

## 📋 Formatos de Email Enviados ao N8N

O código envia o email em **10 formatos diferentes** para garantir compatibilidade:

```json
{
  "email": "cliente@exemplo.com",           // Formato padrão
  "EMAIL": "cliente@exemplo.com",          // Maiúsculas (formato Bitrix24)
  "EMAIL_array": [                         // Array Bitrix24 (RECOMENDADO)
    {
      "VALUE": "cliente@exemplo.com",
      "VALUE_TYPE": "WORK"
    }
  ],
  "clientEmail": "cliente@exemplo.com",
  "customerEmail": "cliente@exemplo.com",
  "leadEmail": "cliente@exemplo.com",
  "contactEmail": "cliente@exemplo.com",
  "email[0][VALUE]": "cliente@exemplo.com",
  "EMAIL[0][VALUE]": "cliente@exemplo.com",
  "EMAIL[0][VALUE_TYPE]": "WORK"
}
```

## 🔍 Verificar Mapeamento no N8N

### 1. Acessar o Workflow no N8N

1. Acesse: `https://editor.coruss.com.br`
2. Encontre o workflow: `live_aldeia_v2`
3. Abra o workflow para edição

### 2. Localizar o Nó do Bitrix24

1. Procure pelo nó que cria o lead no Bitrix24
2. Geralmente é um nó tipo **"Bitrix24"** ou **"HTTP Request"**

### 3. Verificar o Mapeamento do Campo Email

No nó do Bitrix24, verifique qual campo está sendo usado para o email:

#### ✅ Formato Correto (Recomendado):

Use o campo `EMAIL_array` que já está no formato correto do Bitrix24:

```json
{
  "fields": {
    "EMAIL": {{ $json.EMAIL_array }}
  }
}
```

Ou mapeie manualmente:

```json
{
  "fields": {
    "EMAIL": [
      {
        "VALUE": "{{ $json.email }}",
        "VALUE_TYPE": "WORK"
      }
    ]
  }
}
```

#### ❌ Formato Incorreto (Evitar):

```json
{
  "fields": {
    "EMAIL": "{{ $json.email }}"  // ❌ Bitrix24 espera array, não string
  }
}
```

### 4. Verificar Outros Campos

Certifique-se de que os outros campos também estão mapeados:

- `NAME`: `{{ $json.name }}`
- `PHONE`: Array no formato `[{VALUE: "...", VALUE_TYPE: "WORK"}]`
- `TITLE`: `{{ $json.name }}` ou `Lead: {{ $json.name }}`
- `COMMENTS`: `{{ $json.occupation }}`

## 🎯 Formato Esperado pelo Bitrix24

O Bitrix24 espera o email como um **array**:

```json
{
  "fields": {
    "EMAIL": [
      {
        "VALUE": "cliente@exemplo.com",
        "VALUE_TYPE": "WORK"
      }
    ]
  }
}
```

## 📊 Logs para Debug

Os logs do servidor mostram todos os formatos de email sendo enviados:

```
📤 Dados preparados para envio ao N8N:
  - email: cliente@exemplo.com
  - EMAIL: cliente@exemplo.com
  - EMAIL_array: [{"VALUE":"cliente@exemplo.com","VALUE_TYPE":"WORK"}]

🔄 Tentando enviar dados para webhook N8N:
  - url: https://webhook.coruss.com.br/webhook/live_aldeia_v2
  - email: cliente@exemplo.com
  - EMAIL_array: [{"VALUE":"cliente@exemplo.com","VALUE_TYPE":"WORK"}]

✅ Dados enviados com sucesso para o webhook N8N
```

## 🔧 Como Corrigir no N8N

### Opção 1: Usar EMAIL_array (Mais Fácil)

No nó do Bitrix24, mapeie diretamente:

```
EMAIL → {{ $json.EMAIL_array }}
```

### Opção 2: Construir o Array Manualmente

No nó do Bitrix24, construa o array:

```json
{
  "fields": {
    "EMAIL": [
      {
        "VALUE": "{{ $json.email }}",
        "VALUE_TYPE": "WORK"
      }
    ]
  }
}
```

### Opção 3: Usar Função Set (N8N)

Use a função `set` para construir o objeto:

```javascript
{
  EMAIL: [
    {
      VALUE: $json.email,
      VALUE_TYPE: 'WORK'
    }
  ]
}
```

## ✅ Checklist

- [ ] Workflow `live_aldeia_v2` está ativo no N8N
- [ ] Nó do Bitrix24 está mapeando o campo EMAIL
- [ ] EMAIL está sendo mapeado como **array** (não string)
- [ ] Array contém `VALUE` e `VALUE_TYPE`
- [ ] Teste o workflow após ajustar o mapeamento

## 🧪 Teste

1. **Ajuste o mapeamento no N8N**
2. **Teste o formulário** no site
3. **Verifique os logs** do servidor
4. **Confirme no Bitrix24** se o email foi salvo

---

**Status**: Código enviando corretamente ✅ | Verificar mapeamento no N8N ⏳

