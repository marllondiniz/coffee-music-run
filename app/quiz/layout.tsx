import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Questionário PAR-Q — Coffee Music & Run',
  description: 'Questionário de Prontidão para Atividade Física (PAR-Q) - Coffee Music & Run',
}

export default function QuizLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

