# 🔧 CORREÇÃO URGENTE: Email não está chegando no Bitrix24

## ❌ Problema Identificado

O N8N está recebendo os dados com sucesso, mas o **email não está sendo mapeado corretamente** para o Bitrix24.

**Erro do Bitrix24**: `"A mensagem não foi enviada. O e-mail do cliente não está especificado"`

## ✅ Solução: Corrigir Mapeamento no N8N

### Passo 1: Acessar o Nó do Bitrix24

1. Abra o workflow `live_aldeia_v2` no N8N
2. Localize o nó que faz a chamada ao Bitrix24 (geralmente chamado "Bitrix24" ou "HTTP Request")
3. Clique no nó para editá-lo

### Passo 2: Verificar o Campo EMAIL

No nó do Bitrix24, procure pelo campo **EMAIL** e verifique como está mapeado.

#### ❌ ERRADO (Causa do Problema):

Se estiver assim:
```
EMAIL: {{ $json.email }}
```
ou
```
EMAIL: {{ $json.EMAIL }}
```

**Isso está ERRADO!** O Bitrix24 espera um **array**, não uma string.

#### ✅ CORRETO (Solução):

Você tem **3 opções** para corrigir:

---

### **Opção 1: Usar EMAIL_array (MAIS FÁCIL - RECOMENDADO)**

O código já está enviando o email no formato correto como `EMAIL_array`. Use diretamente:

**No campo EMAIL do Bitrix24, mapeie:**
```
{{ $json.EMAIL_array }}
```

**Resultado esperado:**
```json
{
  "fields": {
    "EMAIL": [
      {
        "VALUE": "contato@coruss.com.br",
        "VALUE_TYPE": "WORK"
      }
    ]
  }
}
```

---

### **Opção 2: Construir Array Manualmente com Expressão**

Se o nó do Bitrix24 usar expressões JavaScript, construa o array assim:

**No campo EMAIL, use:**
```javascript
[{
  "VALUE": "{{ $json.email }}",
  "VALUE_TYPE": "WORK"
}]
```

Ou se usar a sintaxe de expressão do N8N:
```javascript
[{
  VALUE: $json.email,
  VALUE_TYPE: 'WORK'
}]
```

---

### **Opção 3: Usar Nó "Set" Antes do Bitrix24**

Se preferir, adicione um nó **"Set"** antes do Bitrix24 para preparar os dados:

1. Adicione um nó **"Set"** entre o webhook e o Bitrix24
2. Configure assim:

**Campo**: `emailFormatted`  
**Valor**: 
```json
[{
  "VALUE": "{{ $json.email }}",
  "VALUE_TYPE": "WORK"
}]
```

3. No nó do Bitrix24, mapeie:
```
EMAIL: {{ $json.emailFormatted }}
```

---

## 📋 Verificar Todos os Campos

Além do EMAIL, certifique-se de que os outros campos também estão corretos:

### ✅ Campos Obrigatórios:

| Campo Bitrix24 | Mapeamento N8N | Formato |
|----------------|----------------|---------|
| `NAME` | `{{ $json.name }}` | String |
| `EMAIL` | `{{ $json.EMAIL_array }}` | **Array** |
| `PHONE` | Array similar ao EMAIL | **Array** |
| `TITLE` | `{{ $json.name }}` ou `Lead: {{ $json.name }}` | String |

### 📞 Formato do PHONE (se necessário):

O telefone também deve ser um array:
```json
{
  "PHONE": [
    {
      "VALUE": "61983555195",
      "VALUE_TYPE": "WORK"
    }
  ]
}
```

**No N8N, você pode criar um campo `PHONE_array` similar ao EMAIL_array ou mapear manualmente.**

---

## 🧪 Como Testar

1. **Ajuste o mapeamento** do campo EMAIL no nó do Bitrix24
2. **Salve o workflow** no N8N
3. **Teste o formulário** no site
4. **Verifique no Bitrix24** se o lead foi criado **COM o email preenchido**

---

## 🔍 Verificar Dados Recebidos no N8N

Para confirmar que os dados estão chegando corretamente:

1. No N8N, clique no nó **Webhook** (primeiro nó)
2. Execute o workflow manualmente ou aguarde um teste
3. Veja os dados recebidos - você deve ver:
   - `email`: "contato@coruss.com.br"
   - `EMAIL`: "contato@coruss.com.br"
   - `EMAIL_array`: `[{"VALUE":"contato@coruss.com.br","VALUE_TYPE":"WORK"}]`

---

## ⚠️ Erro Comum

**NÃO faça isso:**
```json
{
  "EMAIL": "{{ $json.email }}"  // ❌ String - Bitrix24 não aceita!
}
```

**FAÇA isso:**
```json
{
  "EMAIL": {{ $json.EMAIL_array }}  // ✅ Array - Formato correto!
}
```

ou

```json
{
  "EMAIL": [{
    "VALUE": "{{ $json.email }}",
    "VALUE_TYPE": "WORK"
  }]
}
```

---

## 📊 Dados Disponíveis no N8N

O código está enviando o email em **10 formatos diferentes**. Use qualquer um, mas **prefira EMAIL_array**:

- ✅ `EMAIL_array` - **RECOMENDADO** (já está no formato correto)
- `email` - String simples
- `EMAIL` - String em maiúsculas
- `clientEmail`, `customerEmail`, `leadEmail`, `contactEmail` - Alternativas
- `EMAIL[0][VALUE]`, `EMAIL[0][VALUE_TYPE]` - Campos individuais

---

## ✅ Checklist Final

- [ ] Workflow está ativo no N8N
- [ ] Nó do Bitrix24 está mapeando o campo EMAIL
- [ ] EMAIL está sendo mapeado como **ARRAY** (não string)
- [ ] Array contém `VALUE` e `VALUE_TYPE`
- [ ] Teste realizado e email apareceu no Bitrix24

---

**Status**: N8N recebendo dados ✅ | Mapeamento EMAIL precisa ser corrigido ⚠️

**Ação Necessária**: Ajustar mapeamento do campo EMAIL no nó do Bitrix24 para usar formato array

