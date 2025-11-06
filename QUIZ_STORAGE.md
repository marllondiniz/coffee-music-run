# Como Salvar Dados do Quiz

Atualmente os dados do quiz são salvos em:
1. **Arquivo JSON local** (pasta `/data`) - backup local
2. **Email via Resend** - notificação quando alguém preenche

## Opções para Melhorar o Armazenamento

### Opção 1: Google Sheets (Recomendado - Mais Simples)
Salva diretamente em uma planilha do Google Sheets que você pode visualizar e gerenciar facilmente.

**Vantagens:**
- ✅ Visual e fácil de usar
- ✅ Gratuito
- ✅ Fácil de compartilhar
- ✅ Filtros e ordenação nativos
- ✅ Exportação para Excel

**Como configurar:**
1. Criar uma planilha no Google Sheets
2. Obter credenciais da API do Google
3. Adicionar variáveis de ambiente

### Opção 2: Banco de Dados (MongoDB/Supabase)
Solução mais robusta com banco de dados.

**Vantagens:**
- ✅ Escalável
- ✅ Consultas avançadas
- ✅ Mais seguro
- ✅ Backup automático

### Opção 3: Melhorar Sistema Atual
Manter arquivos JSON mas melhorar organização e adicionar visualização.

Qual opção você prefere? Posso implementar qualquer uma delas.

