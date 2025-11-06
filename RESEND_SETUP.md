# Configuração do Resend para Newsletter

## Variáveis de Ambiente Necessárias

Crie um arquivo `.env.local` na raiz do projeto com as seguintes variáveis:

```env
# API Key do Resend (obrigatório)
# Obtenha em: https://resend.com/api-keys
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Email remetente (obrigatório)
# Formato: Nome <email@dominio.com>
# Exemplo: Coffee Music <newsletter@ritmocertoclub.com.br>
RESEND_FROM_EMAIL=Coffee Music <newsletter@ritmocertoclub.com.br>

# Email para receber notificações de novas inscrições (opcional)
RESEND_NOTIFICATION_EMAIL=seu-email@exemplo.com
```

## Como obter a API Key do Resend

1. Acesse https://resend.com
2. Faça login ou crie uma conta
3. Vá em "API Keys" no dashboard
4. Crie uma nova API Key
5. Copie a chave e adicione no arquivo `.env.local`

## Configuração do Domínio

1. No dashboard do Resend, vá em "Domains"
2. Adicione seu domínio (ex: ritmocertoclub.com.br)
3. Configure os registros DNS conforme instruções do Resend
4. Aguarde a verificação do domínio

## Como funciona

Quando um usuário se inscreve na newsletter:
1. O formulário envia o email para `/api/newsletter`
2. A API valida o email
3. Envia um email de boas-vindas para o usuário
4. Opcionalmente, envia uma notificação para você sobre a nova inscrição

