/**
 * Script simples para validar a conexão com o Supabase usando a chave anônima.
 * O objetivo é apenas verificar se conseguimos chegar à API do Supabase.
 * Execute com:
 *    node scripts/testSupabaseConnection.js
 *
 * Certifique-se de que o arquivo .env.local possui
 * NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY.
 */

const { createClient } = require('@supabase/supabase-js')
const path = require('path')

// Carrega variáveis de ambiente do arquivo .env.local, se existir
require('dotenv').config({ path: path.resolve(process.cwd(), '.env.local') })

const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!url || !anonKey) {
  console.error('❌ Variáveis NEXT_PUBLIC_SUPABASE_URL ou NEXT_PUBLIC_SUPABASE_ANON_KEY não encontradas.')
  process.exit(1)
}

const supabase = createClient(url, anonKey)

async function main() {
  console.log('🔍 Testando conexão com o Supabase...')

  try {
    // Tentamos realizar um login com credenciais inválidas.
    // Se o Supabase responder com "Invalid login credentials", a conexão está funcionando.
    const { error } = await supabase.auth.signInWithPassword({
      email: 'teste-conexao@example.com',
      password: 'senha-invalida',
    })

    if (!error) {
      console.log('✅ Conexão estabelecida. O Supabase aceitou as credenciais fornecidas.')
      process.exit(0)
    }

    if (typeof error.message === 'string' && error.message.toLowerCase().includes('invalid login credentials')) {
      console.log('✅ Conexão com Supabase funcionando. Credenciais inválidas retornaram mensagem esperada.')
      process.exit(0)
    }

    console.error('❌ Supabase respondeu, mas com erro inesperado:', error)
    process.exit(1)
  } catch (err) {
    console.error('❌ Falha ao conectar-se ao Supabase:', err)
    process.exit(1)
  }
}

main()

