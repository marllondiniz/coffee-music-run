import { NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabaseAdmin'

export async function POST(request: Request) {
  try {
    const { id, email } = await request.json()

    if (!id || !email) {
      return NextResponse.json(
        { error: 'Dados inválidos: id e email são obrigatórios.' },
        { status: 400 }
      )
    }

    const supabaseAdmin = getSupabaseAdmin()
    const { error } = await supabaseAdmin.from('profiles').upsert(
      {
        id,
        email,
        is_complete: false,
      },
      { onConflict: 'id' }
    )

    if (error) {
      console.error('Erro ao criar perfil:', error)
      return NextResponse.json({ error: 'Erro ao criar perfil.' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Erro inesperado ao criar perfil:', error)
    const message = error instanceof Error ? error.message : 'Erro inesperado.'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
