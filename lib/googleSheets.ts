import { google } from 'googleapis'

/**
 * Salva dados do quiz no Google Sheets
 * Requer variáveis de ambiente:
 * - GOOGLE_SHEETS_CLIENT_EMAIL
 * - GOOGLE_SHEETS_PRIVATE_KEY
 * - GOOGLE_SHEETS_SPREADSHEET_ID
 */
export async function saveQuizToGoogleSheets(quizData: {
  timestamp: string
  nome: string
  idade: string
  data: string
  assinatura: string
  answers: { [key: number]: 'sim' | 'nao' }
  hasYesAnswer: boolean
  termoAssinado: boolean
  running: {
    runsFrequently: string
    weeklyFrequency: string
    runningExperience: string
    longestDistance: string
    hasRunningInjury: string
    injuryDetails: string
  }
}) {
  try {
    // Verificar se as variáveis de ambiente estão configuradas
    const hasClientEmail = !!process.env.GOOGLE_SHEETS_CLIENT_EMAIL
    const hasPrivateKey = !!process.env.GOOGLE_SHEETS_PRIVATE_KEY
    const hasSpreadsheetId = !!process.env.GOOGLE_SHEETS_SPREADSHEET_ID

    if (!hasClientEmail || !hasPrivateKey || !hasSpreadsheetId) {
      console.warn('Diagnóstico Google Sheets envs', {
        hasClientEmail,
        hasPrivateKey,
        hasSpreadsheetId,
      })
    }

    if (
      !process.env.GOOGLE_SHEETS_CLIENT_EMAIL ||
      !process.env.GOOGLE_SHEETS_PRIVATE_KEY ||
      !process.env.GOOGLE_SHEETS_SPREADSHEET_ID
    ) {
      console.log('Google Sheets não configurado - pulando salvamento')
      return { success: false, message: 'Google Sheets não configurado' }
    }

    // Configurar autenticação
    const auth = new google.auth.JWT({
      email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
      key: process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    })

    const sheets = google.sheets({ version: 'v4', auth })
    const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID

    // Preparar dados para inserção - garantir exatamente 7 respostas (perguntas 1 a 7)
    const answersForSheet = Array.from({ length: 7 }, (_, i) => {
      const questionNum = i + 1
      const answer = quizData.answers[questionNum]
      return answer === 'sim' ? 'SIM' : answer === 'nao' ? 'NÃO' : ''
    })

    const formatYesNo = (value: string) => {
      if (value === 'sim') return 'SIM'
      if (value === 'nao') return 'NÃO'
      return value || ''
    }

    const row = [
      quizData.timestamp,
      quizData.nome,
      quizData.idade || '',
      quizData.data,
      quizData.assinatura,
      quizData.hasYesAnswer ? 'SIM' : 'NÃO',
      quizData.termoAssinado ? 'SIM' : 'NÃO',
      ...answersForSheet, // Exatamente 7 respostas (Perguntas 1 a 7)
      formatYesNo(quizData.running?.runsFrequently),
      quizData.running?.weeklyFrequency || '',
      quizData.running?.runningExperience || '',
      quizData.running?.longestDistance || '',
      formatYesNo(quizData.running?.hasRunningInjury),
      quizData.running?.injuryDetails || '',
    ]

    // Verificar se a planilha tem cabeçalhos, se não tiver, criar
    try {
      const headerResponse = await sheets.spreadsheets.values.get({
        spreadsheetId,
        range: 'A1:Z1',
      })

      const headers = headerResponse.data.values?.[0]

      if (!headers || headers.length === 0) {
        // Criar cabeçalhos
        const headerRow = [
          'Timestamp',
          'Nome',
          'Idade',
          'Data',
          'Assinatura',
          'Respondeu SIM?',
          'Termo Assinado?',
          'Pergunta 1',
          'Pergunta 2',
          'Pergunta 3',
          'Pergunta 4',
          'Pergunta 5',
          'Pergunta 6',
          'Pergunta 7',
          'Corre com frequência?',
          'Frequência semanal',
          'Tempo de prática',
          'Maior distância percorrida',
          'Lesão relacionada à corrida?',
          'Detalhes da lesão',
        ]

        await sheets.spreadsheets.values.append({
          spreadsheetId,
          range: 'A1',
          valueInputOption: 'RAW',
          requestBody: {
            values: [headerRow],
          },
        })
      }
    } catch (headerError) {
      console.error('Erro ao verificar/criar cabeçalhos:', headerError)
    }

    // Adicionar nova linha
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'A:Z',
      valueInputOption: 'RAW',
      requestBody: {
        values: [row],
      },
    })

    console.log('Quiz salvo no Google Sheets com sucesso')
    return { success: true, message: 'Dados salvos no Google Sheets' }
  } catch (error: any) {
    console.error('Erro ao salvar no Google Sheets:', error)
    console.error('Detalhes do erro:', {
      message: error?.message,
      code: error?.code,
      response: error?.response?.data,
      status: error?.response?.status,
    })
    return {
      success: false,
      message: error?.message || 'Erro ao salvar no Google Sheets',
      details: error?.response?.data || error,
    }
  }
}

