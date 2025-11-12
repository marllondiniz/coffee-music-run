import { getEvents } from '@/lib/queries'
import { type DestaqueCard } from './HighlightCardList'
import { ClubClient } from './ClubClient'

const destaqueCards: DestaqueCard[] = [
  {
    id: 'cupons-parceiros',
    titulo: 'Cupons exclusivos',
    descricao: 'Aproveite códigos especiais em marcas parceiras para potencializar seu ritmo.',
    icone: '🎟️',
    status: 'ativo',
    ctaLabel: 'Copiar código',
    ctaType: 'copy',
    code: 'RITMOCERTO10',
  },
  {
    id: 'aula-experimental',
    titulo: 'Aula experimental',
    descricao: 'Conheça o clube em um treino guiado e personalizado para novos membros.',
    icone: '🏃‍♀️',
    status: 'ativo',
    ctaLabel: 'Agendar',
    ctaType: 'link',
    href: '/eventos?tipo=experimental',
  },
  {
    id: 'experiencia-exclusiva',
    titulo: 'Experiência exclusiva',
    descricao: 'Vivências imersivas com especialistas em bem-estar, música e performance.',
    icone: '✨',
    status: 'ativo',
    ctaLabel: 'Saiba mais',
    ctaType: 'link',
    href: '/clube/experiencias',
  },
  {
    id: 'evento-exclusivo',
    titulo: 'Evento exclusivo',
    descricao: 'Encontros especiais para fortalecer a comunidade e celebrar conquistas.',
    icone: '🎉',
    status: 'ativo',
    ctaLabel: 'Participar',
    ctaType: 'link',
    href: '/eventos',
  },
]

export default async function ClubePage() {
  const eventos = await getEvents()
  const proximoEvento = eventos[0]

  const cards = destaqueCards.map((card) => {
    if (card.id === 'evento-exclusivo' && proximoEvento) {
      return {
        ...card,
        descricao: `Próximo encontro: ${proximoEvento.titulo}`,
      }
    }
    return card
  })

  const proximoEventoDesc = proximoEvento
    ? `Próximo encontro: ${proximoEvento.titulo} • ${new Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit',
      })
        .format(new Date(proximoEvento.data_horario))
        .replace('.', '')} • ${proximoEvento.local_nome}`
    : null

  return <ClubClient cards={cards} proximoEventoDesc={proximoEventoDesc} />
}


