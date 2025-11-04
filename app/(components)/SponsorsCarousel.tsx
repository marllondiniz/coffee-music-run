'use client'

const SPONSORS = Array.from({ length: 6 }).map((_, i) => ({
  id: i,
  name: `Patrocinador ${i + 1}`,
}))

export function SponsorsCarousel() {
  // Duplicar os patrocinadores para criar efeito infinito
  const duplicatedSponsors = [...SPONSORS, ...SPONSORS]

  return (
    <div className="relative w-full overflow-hidden py-6 md:py-8 lg:py-10">
      {/* Gradientes laterais para fade */}
      <div className="absolute inset-y-0 left-0 w-20 md:w-32 lg:w-40 bg-gradient-to-r from-neutral-950 to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-20 md:w-32 lg:w-40 bg-gradient-to-l from-neutral-950 to-transparent z-10 pointer-events-none" />
      
      <div className="flex animate-scroll-infinite">
        {/* Primeira renderização */}
        <div className="flex gap-6 md:gap-8 lg:gap-12 flex-shrink-0">
          {duplicatedSponsors.map((sponsor, index) => (
            <div
              key={`first-${sponsor.id}-${index}`}
              className="flex-shrink-0 px-6 md:px-8 lg:px-10 py-4 md:py-5 lg:py-6 bg-neutral-900/80 backdrop-blur-sm border border-white/10 rounded-xl hover:border-white/20 transition-all duration-300 shadow-lg min-w-[200px] md:min-w-[250px] lg:min-w-[280px] flex items-center justify-center"
            >
              <span className="text-neutral-300 font-space text-sm md:text-base lg:text-lg whitespace-nowrap">
                {sponsor.name}
              </span>
            </div>
          ))}
        </div>
        
        {/* Segunda renderização para loop infinito */}
        <div className="flex gap-6 md:gap-8 lg:gap-12 flex-shrink-0 ml-6 md:ml-8 lg:ml-12">
          {duplicatedSponsors.map((sponsor, index) => (
            <div
              key={`second-${sponsor.id}-${index}`}
              className="flex-shrink-0 px-6 md:px-8 lg:px-10 py-4 md:py-5 lg:py-6 bg-neutral-900/80 backdrop-blur-sm border border-white/10 rounded-xl hover:border-white/20 transition-all duration-300 shadow-lg min-w-[200px] md:min-w-[250px] lg:min-w-[280px] flex items-center justify-center"
            >
              <span className="text-neutral-300 font-space text-sm md:text-base lg:text-lg whitespace-nowrap">
                {sponsor.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
