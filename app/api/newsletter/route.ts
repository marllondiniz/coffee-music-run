import { Resend } from 'resend'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    // Verificar se a API key está configurada
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY não configurada')
      return NextResponse.json(
        { error: 'Configuração do servidor incompleta. Entre em contato com o suporte.' },
        { status: 500 }
      )
    }

    const resend = new Resend(process.env.RESEND_API_KEY)
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json(
        { error: 'Email é obrigatório' },
        { status: 400 }
      )
    }

    // Validar formato do email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Email inválido' },
        { status: 400 }
      )
    }

    // Adicionar contato ao Resend
    try {
      await resend.contacts.create({
        email: email,
        audienceId: "6ed286d1-f405-4419-87f4-1e8c5bc7a5bf",
      })
    } catch (contactError: any) {
      // Se o contato já existir, não é um erro crítico
      if (contactError?.message?.includes('already exists') || contactError?.message?.includes('duplicate')) {
        console.log('Contato já existe no Resend')
      } else {
        console.error('Erro ao adicionar contato:', contactError)
        // Continuar mesmo se falhar ao adicionar contato
      }
    }

    // Enviar email de confirmação para o usuário
    const fromEmail = process.env.RESEND_FROM_EMAIL || 'Coffee Music <no-reply@ritmocertoclub.com.br>'
        const notificationFromEmail = process.env.RESEND_FROM_EMAIL || 'Coffee Music <no-reply@ritmocertoclub.com.br>'
    
    const siteBaseUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') || 'https://ritmocertoclub.com.br'
    const bannerImageUrl = `${siteBaseUrl}/banner-bemvindo.png`
    
    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: email,
      subject: 'Bem-vindo à Newsletter Coffee Music & Run! 🎵☕',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Bem-vindo à Newsletter</title>
          </head>
          <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="text-align: center; margin-bottom: 0;">
              <img src="${bannerImageUrl}" alt="Coffee Music & Run - Bem-vindo" style="max-width: 100%; height: auto; border-radius: 10px; display: block; margin: 0 auto;" />
            </div>
            <div style="background: #fff; padding: 30px; border-radius: 0 0 10px 10px;">
              <h2 style="color: #000; margin-top: 0;">Bem-vindo à nossa comunidade! 🎉</h2>
              <p>Olá!</p>
              <p>Obrigado por se inscrever na newsletter do <strong>Coffee Music & Run</strong>!</p>
              <p>Você agora receberá todas as novidades sobre:</p>
              <ul style="margin: 20px 0;">
                <li>📅 Próximos eventos</li>
                <li>🎵 Lançamentos e novidades</li>
                <li>🎁 Ofertas exclusivas</li>
                <li>🏃 Dicas e conteúdos da comunidade</li>
              </ul>
              <p>Fique ligado e prepare-se para fechar o ano no <strong>ritmo certo</strong>!</p>
              <p style="margin-top: 30px;">Até breve!<br><strong>Equipe Coffee Music & Run</strong></p>
            </div>
            <div style="text-align: center; margin-top: 20px; color: #666; font-size: 12px;">
              <p>Você recebeu este email porque se inscreveu na newsletter do Coffee Music & Run.</p>
            </div>
          </body>
        </html>
      `,
    })

    if (error) {
      console.error('Erro ao enviar email:', error)
      return NextResponse.json(
        { error: 'Erro ao processar inscrição. Tente novamente.' },
        { status: 500 }
      )
    }

    // Opcional: Enviar notificação para você sobre nova inscrição
    if (process.env.RESEND_NOTIFICATION_EMAIL) {
      try {
        await resend.emails.send({
          from: notificationFromEmail,
          to: process.env.RESEND_NOTIFICATION_EMAIL,
          subject: 'Nova inscrição na Newsletter',
          html: `
            <p>Nova inscrição na newsletter:</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Data:</strong> ${new Date().toLocaleString('pt-BR')}</p>
          `,
        })
      } catch (notifError) {
        // Não falhar o registro se a notificação falhar
        console.error('Erro ao enviar notificação:', notifError)
      }
    }

    return NextResponse.json(
      { success: true, message: 'Email enviado com sucesso!' },
      { status: 200 }
    )
  } catch (error: any) {
    console.error('Erro na API:', error)
    return NextResponse.json(
      { error: error?.message || 'Erro ao processar solicitação. Tente novamente.' },
      { status: 500 }
    )
  }
}

