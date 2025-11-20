# Integração de formulários com Bitrix24

Este guia descreve o fluxo que usamos na Coruss para transformar envios de formulário em leads completos no Bitrix24 (empresa → contato → negócio). Pode ser reaproveitado em outras aplicações que precisem criar registros via webhook REST.

---

## 1. Pré-requisitos

1. **Webhook REST ativo**  
   - Bitrix24 → *Aplicativos* → *Webhooks* → *Adicionar webhook de saída*.  
   - Copie a URL base (`https://SEU_DOMINIO.bitrix24.com.br/rest/USER_ID/TOKEN`).

2. **Permissões necessárias**  
   - `crm.company.add`, `crm.contact.add`, `crm.deal.add` (pelo menos).

3. **Variáveis sensíveis**  
   - Salve a URL do webhook em variável de ambiente (`BITRIX_WEBHOOK_URL`).  
   - Nunca exponha o token em código público.

4. **Dados mínimos do formulário**  
   - Nome completo, empresa, email, telefone/WhatsApp.  
   - Campos adicionais (cargo, nº de funcionários, faturamento, objetivo, orçamento) ajudam na qualificação do deal.

---

## 2. Fluxo recomendado

```
Validar campos ➜ Criar empresa (Company) ➜ Criar contato (Contact) ➜ Criar negócio (Deal)
```

Motivos:
- Empresas evitam duplicidade de contatos.
- Contatos herdam o `COMPANY_ID`.
- Negócios precisam de `CONTACT_ID` (e opcionalmente `COMPANY_ID`) para manter o pipeline organizado.

---

## 3. Helper para chamadas REST

```ts
const callBitrix = async <T,>(
  endpoint: string,
  payload: Record<string, unknown>
): Promise<T> => {
  const response = await fetch(`${BITRIX_WEBHOOK_URL}/${endpoint}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  const data = await response.json();
  if (!response.ok || data.error) {
    throw new Error(data.error_description || `Erro ao executar ${endpoint}`);
  }
  return data.result as T;
};
```

- Mantém o código enxuto.
- Centraliza o tratamento de erros e autenticação.

---

## 4. Passo a passo dos envios

### 4.1 Criar a empresa (`crm.company.add`)

```ts
const companyId = await callBitrix<number>("crm.company.add.json", {
  fields: {
    TITLE: formData.empresa,
    COMPANY_TYPE: "CUSTOMER",
    EMPLOYEES: formData.funcionarios,
    PHONE: [{ VALUE: formData.whatsapp, VALUE_TYPE: "WORK" }],
    EMAIL: [{ VALUE: formData.email, VALUE_TYPE: "WORK" }],
    COMMENTS: `Objetivo: ${objetivo}\nInvestimento: ${orcamento}\nFaturamento: ${faturamento}`,
    CURRENCY_ID: "BRL"
  }
});
```

**Boas práticas**
- Normalize telefones e e-mails antes de enviar.
- Use `COMMENTS` para registrar contexto que não tenha campo próprio.
- Se a empresa for opcional, guarde o `companyId` apenas quando existir.

### 4.2 Criar o contato (`crm.contact.add`)

```ts
const contactId = await callBitrix<number>("crm.contact.add.json", {
  fields: {
    NAME: primeiroNome,
    LAST_NAME: sobrenome,
    EMAIL: [{ VALUE: formData.email, VALUE_TYPE: "WORK" }],
    PHONE: phoneField,
    POST: formData.cargo,
    COMPANY_ID: companyId,
    COMMENTS: `Cargo: ${formData.cargo}\nObjetivo: ${objetivo}\nFonte: Formulário Dev`
  }
});
```

**Boas práticas**
- Separe primeiro nome / sobrenome para relatórios limpos.
- Vincule o `COMPANY_ID` quando existir.
- Armazene a origem (ex.: “Formulário Dev”) para facilitar filtros.

### 4.3 Criar o negócio (`crm.deal.add`)

```ts
const dealId = await callBitrix<number>("crm.deal.add.json", {
  fields: {
    TITLE: `Projeto Dev - ${formData.empresa}`,
    STAGE_ID: "NEW",
    CURRENCY_ID: "BRL",
    OPPORTUNITY: valorEstimado,
    COMMENTS: resumoDoLead,
    SOURCE_ID: "WEB",
    SOURCE_DESCRIPTION: "Formulário Dev - Coruss",
    CONTACT_ID: contactId,
    COMPANY_ID: companyId,
    ASSIGNED_BY_ID: 1,
    OPENED: "Y",
    HAS_PHONE: formData.whatsapp ? "Y" : "N",
    HAS_EMAIL: "Y"
  }
});
```

**Boas práticas**
- Defina `OPPORTUNITY` com base em faixas de orçamento.
- Preencha `SOURCE_ID/SOURCE_DESCRIPTION` para medir performance do formulário.
- `ASSIGNED_BY_ID` deve ser o ID do responsável no Bitrix.

---

## 5. Tratamento de erros e UX

1. **Validação pré-envio**  
   - Campos obrigatórios + máscaras para telefone/email.
   - Bloqueie `handleSubmit` enquanto um envio estiver em andamento (`isSubmitting`).

2. **Retentativas**  
   - Se o webhook retornar erro transitório (timeout/429), tente novamente com backoff.
   - Em falhas definitivas, mostre mensagem amigável e ofereça canal alternativo (WhatsApp).

3. **Logs**  
   - Registre IDs retornados (`companyId`, `contactId`, `dealId`) para auditoria.
   - Evite logar dados sensíveis em produção.

4. **Feedback ao usuário**  
   - Mostre loaders e modais de sucesso/erro.
   - Limpe o formulário apenas após o Bitrix confirmar a criação do negócio.

---

## 6. Checklist rápido

- [ ] Webhook REST criado com permissões certas.  
- [ ] Variáveis de ambiente configuradas (`BITRIX_WEBHOOK_URL`).  
- [ ] Função helper para chamadas HTTP.  
- [ ] Validação de campos no front-end.  
- [ ] Sequência empresa → contato → negócio implementada.  
- [ ] Tratamento de erros e mensagens amigáveis.  
- [ ] Teste manual executado (verifique os registros no Bitrix24).  

---

## 7. Próximos passos sugeridos

- Extrair a lógica para um hook ou serviço reutilizável (`useBitrixLead()`).
- Adicionar deduplicação (buscar empresa/contato existentes antes de criar).
- Implementar métricas (ex.: enviar eventos ao analytics quando o lead é criado).

Com isso, qualquer formulário React/Next pode enviar leads completos para o Bitrix24 reutilizando os mesmos padrões adotados no projeto atual. Boa integração! 💡

