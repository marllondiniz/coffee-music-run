# Configuração do Google Sheets para Quiz PAR-Q

## Como Configurar

### 1. Criar Projeto no Google Cloud Console

1. Acesse [Google Cloud Console](https://console.cloud.google.com/)
2. Crie um novo projeto ou selecione um existente
3. Ative a **Google Sheets API**:
   - Vá em "APIs & Services" > "Library"
   - Procure por "Google Sheets API"
   - Clique em "Enable"

### 2. Criar Credenciais de Serviço

1. Vá em "APIs & Services" > "Credentials"
2. Clique em "Create Credentials" > "Service Account"
3. Preencha os dados:
   - **Service account name**: `coffee-music-quiz` (ou qualquer nome)
   - **Service account ID**: será gerado automaticamente
   - Clique em "Create and Continue"
4. Na próxima tela, clique em "Continue" (não precisa adicionar roles)
5. Clique em "Done"

### 3. Gerar Chave JSON

1. Na lista de Service Accounts, clique no que você acabou de criar
2. Vá na aba "Keys"
3. Clique em "Add Key" > "Create new key"
4. Selecione "JSON" e clique em "Create"
5. Um arquivo JSON será baixado - **GUARDE ESTE ARQUIVO COM SEGURANÇA**

### 4. Criar Planilha no Google Sheets

1. Acesse [Google Sheets](https://sheets.google.com/)
2. Crie uma nova planilha
3. Dê um nome (ex: "Quiz PAR-Q - Coffee Music")
4. **Compartilhe a planilha** com o email do Service Account:
   - Clique em "Compartilhar" (Share)
   - Cole o email do Service Account (está no arquivo JSON baixado, campo `client_email`)
   - Dê permissão de "Editor"
   - Clique em "Enviar"

### 5. Obter ID da Planilha

1. Na URL da planilha, copie o ID (entre `/d/` e `/edit`)
   - Exemplo: `https://docs.google.com/spreadsheets/d/1ABC123...XYZ/edit`
   - O ID é: `1ABC123...XYZ`

### 6. Configurar Variáveis de Ambiente

Adicione ao arquivo `.env.local`:

```env
# Google Sheets API
GOOGLE_SHEETS_CLIENT_EMAIL=seu-service-account@projeto.iam.gserviceaccount.com
GOOGLE_SHEETS_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
GOOGLE_SHEETS_SPREADSHEET_ID=1ABC123...XYZ
```

**Importante:**
- O `GOOGLE_SHEETS_PRIVATE_KEY` deve estar entre aspas e com `\n` para quebras de linha
- Copie o valor completo do campo `private_key` do arquivo JSON baixado

### 7. Estrutura da Planilha

A planilha será criada automaticamente com as seguintes colunas:

| Timestamp | Nome | Idade | Data | Assinatura | Respondeu SIM? | Termo Assinado? | Pergunta 1 | Pergunta 2 | ... | Pergunta 7 |
|-----------|------|-------|------|------------|----------------|-----------------|-------------|------------|-----|------------|

## Como Funciona

Quando alguém preenche o quiz:
1. ✅ Dados são salvos em arquivo JSON local (backup)
2. ✅ Dados são salvos no Google Sheets (visualização)
3. ✅ Email é enviado via Resend (notificação)

## Segurança

- ⚠️ **NUNCA** commite o arquivo JSON de credenciais no Git
- ⚠️ Mantenha as variáveis de ambiente seguras
- ⚠️ O arquivo `.env.local` já está no `.gitignore`

## Testando

Após configurar, preencha um quiz de teste e verifique se os dados aparecem na planilha do Google Sheets.

