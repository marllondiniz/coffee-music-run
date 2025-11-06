'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Header } from '../(components)/Header'
import { Footer } from '../(components)/Footer'

export default function QuizPage() {
  const [answers, setAnswers] = useState<{ [key: number]: 'sim' | 'nao' | null }>({
    1: null,
    2: null,
    3: null,
    4: null,
    5: null,
    6: null,
    7: null,
  })

  const [formData, setFormData] = useState({
    nome: '',
    data: '',
    assinatura: '',
    idade: '',
  })

  const [termoData, setTermoData] = useState({
    nome: '',
    data: '',
    assinatura: '',
  })

  const hasYesAnswer = Object.values(answers).some(answer => answer === 'sim')

  const handleAnswer = (question: number, answer: 'sim' | 'nao') => {
    setAnswers(prev => ({ ...prev, [question]: answer }))
  }

  const allAnswered = Object.values(answers).every(answer => answer !== null)

  return (
    <main className="min-h-screen">
      <Header />
      <div className="pt-32 pb-20 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-orbitron font-bold text-neutral-100 mb-4">
              Questionário de Prontidão para Atividade Física (PAR-Q)
            </h1>
            
            <div className="bg-neutral-900/50 border border-white/10 rounded-xl p-6 md:p-8 mb-8">
              <p className="text-neutral-300 font-space leading-relaxed">
                Este questionário tem como objetivo identificar a necessidade de avaliação médica antes de iniciar atividade física. 
                Se você responder <strong className="text-white">"SIM"</strong> a uma ou mais perguntas, você deve consultar seu médico{' '}
                <strong className="text-white">ANTES</strong> de aumentar seu nível atual de atividade física. 
                Informe ao seu médico este questionário e quais perguntas você respondeu "SIM".
              </p>
            </div>

            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-orbitron font-bold text-neutral-100 mb-6">
                  Por favor, assinale "SIM" ou "NÃO" às seguintes perguntas:
                </h2>

                <div className="space-y-6">
                  {[
                    {
                      id: 1,
                      question: 'Algum médico já disse que você possui algum problema de coração e que só deveria realizar atividade física supervisionado por profissionais de saúde?'
                    },
                    {
                      id: 2,
                      question: 'Você sente dores no peito quando pratica atividade física?'
                    },
                    {
                      id: 3,
                      question: 'No último mês, você sentiu dores no peito quando praticou atividade física?'
                    },
                    {
                      id: 4,
                      question: 'Você apresenta desequilíbrio devido à tontura e/ou perda de consciência?'
                    },
                    {
                      id: 5,
                      question: 'Você possui algum problema ósseo ou articular que poderia ser piorado pela atividade física?'
                    },
                    {
                      id: 6,
                      question: 'Você toma atualmente algum medicamento para pressão arterial e/ou problema de coração?'
                    },
                    {
                      id: 7,
                      question: 'Sabe de alguma outra razão pela qual você não deve praticar atividade física?'
                    },
                  ].map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="bg-neutral-900/50 border border-white/10 rounded-xl p-6"
                    >
                      <p className="text-neutral-200 font-space mb-4">
                        <span className="font-bold text-white">{item.id}.</span> {item.question}
                      </p>
                      <div className="flex gap-4">
                        <motion.button
                          onClick={() => handleAnswer(item.id, 'sim')}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className={`px-6 py-3 rounded-lg font-orbitron font-bold text-sm uppercase transition-all ${
                            answers[item.id] === 'sim'
                              ? 'bg-red-600 text-white border-2 border-red-500'
                              : 'bg-neutral-800 text-neutral-300 border-2 border-white/20 hover:border-white/40'
                          }`}
                        >
                          Sim
                        </motion.button>
                        <motion.button
                          onClick={() => handleAnswer(item.id, 'nao')}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className={`px-6 py-3 rounded-lg font-orbitron font-bold text-sm uppercase transition-all ${
                            answers[item.id] === 'nao'
                              ? 'bg-green-600 text-white border-2 border-green-500'
                              : 'bg-neutral-800 text-neutral-300 border-2 border-white/20 hover:border-white/40'
                          }`}
                        >
                          Não
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </section>

              {allAnswered && (
                <motion.section
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-neutral-900/50 border border-white/10 rounded-xl p-6 md:p-8"
                >
                  <h2 className="text-2xl font-orbitron font-bold text-neutral-100 mb-6">
                    Dados Pessoais
                  </h2>
                  
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-neutral-300 font-space mb-2">
                          Nome completo *
                        </label>
                        <input
                          type="text"
                          value={formData.nome}
                          onChange={(e) => setFormData(prev => ({ ...prev, nome: e.target.value }))}
                          className="w-full px-4 py-3 bg-neutral-800 border border-white/10 rounded-lg text-neutral-100 font-space focus:outline-none focus:border-white/30"
                          placeholder="Digite seu nome completo"
                        />
                      </div>
                      <div>
                        <label className="block text-neutral-300 font-space mb-2">
                          Idade *
                        </label>
                        <input
                          type="number"
                          value={formData.idade}
                          onChange={(e) => setFormData(prev => ({ ...prev, idade: e.target.value }))}
                          className="w-full px-4 py-3 bg-neutral-800 border border-white/10 rounded-lg text-neutral-100 font-space focus:outline-none focus:border-white/30"
                          placeholder="Digite sua idade"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-neutral-300 font-space mb-2">
                        Data *
                      </label>
                      <input
                        type="date"
                        value={formData.data}
                        onChange={(e) => setFormData(prev => ({ ...prev, data: e.target.value }))}
                        className="w-full px-4 py-3 bg-neutral-800 border border-white/10 rounded-lg text-neutral-100 font-space focus:outline-none focus:border-white/30"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-neutral-300 font-space mb-2">
                        Assinatura (digite seu nome completo) *
                      </label>
                      <input
                        type="text"
                        value={formData.assinatura}
                        onChange={(e) => setFormData(prev => ({ ...prev, assinatura: e.target.value }))}
                        className="w-full px-4 py-3 bg-neutral-800 border border-white/10 rounded-lg text-neutral-100 font-space focus:outline-none focus:border-white/30"
                        placeholder="Digite seu nome completo para assinar"
                      />
                    </div>
                  </div>
                </motion.section>
              )}

              {hasYesAnswer && allAnswered && (
                <motion.section
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-red-900/20 border-2 border-red-500/50 rounded-xl p-6 md:p-8"
                >
                  <div className="mb-6">
                    <p className="text-red-300 font-space mb-4">
                      <strong className="text-red-200">Atenção:</strong> Você respondeu "SIM" a uma ou mais perguntas. 
                      Por favor, leia e assine o Termo de Responsabilidade abaixo.
                    </p>
                  </div>

                  <h2 className="text-2xl font-orbitron font-bold text-neutral-100 mb-6">
                    Termo de Responsabilidade para Prática de Atividade Física
                  </h2>
                  
                  <div className="bg-neutral-900/50 border border-white/10 rounded-xl p-6 mb-6">
                    <p className="text-neutral-300 font-space leading-relaxed">
                      Estou ciente de que é recomendável conversar com um médico antes de aumentar meu nível atual de atividade física, 
                      por ter respondido <strong className="text-white">"SIM"</strong> a uma ou mais perguntas do{' '}
                      <strong className="text-white">"Questionário de Prontidão para Atividade Física" (PAR-Q)</strong>. 
                      Assumo plena responsabilidade por qualquer atividade física praticada sem o atendimento a essa recomendação.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-neutral-300 font-space mb-2">
                        Nome completo *
                      </label>
                      <input
                        type="text"
                        value={termoData.nome}
                        onChange={(e) => setTermoData(prev => ({ ...prev, nome: e.target.value }))}
                        className="w-full px-4 py-3 bg-neutral-800 border border-white/10 rounded-lg text-neutral-100 font-space focus:outline-none focus:border-white/30"
                        placeholder="Digite seu nome completo"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-neutral-300 font-space mb-2">
                        Data *
                      </label>
                      <input
                        type="date"
                        value={termoData.data}
                        onChange={(e) => setTermoData(prev => ({ ...prev, data: e.target.value }))}
                        className="w-full px-4 py-3 bg-neutral-800 border border-white/10 rounded-lg text-neutral-100 font-space focus:outline-none focus:border-white/30"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-neutral-300 font-space mb-2">
                        Assinatura (digite seu nome completo) *
                      </label>
                      <input
                        type="text"
                        value={termoData.assinatura}
                        onChange={(e) => setTermoData(prev => ({ ...prev, assinatura: e.target.value }))}
                        className="w-full px-4 py-3 bg-neutral-800 border border-white/10 rounded-lg text-neutral-100 font-space focus:outline-none focus:border-white/30"
                        placeholder="Digite seu nome completo para assinar"
                      />
                    </div>
                  </div>
                </motion.section>
              )}

              {allAnswered && !hasYesAnswer && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-green-900/20 border-2 border-green-500/50 rounded-xl p-6 md:p-8"
                >
                  <p className="text-green-300 font-space text-lg">
                    ✅ Parabéns! Você respondeu "NÃO" a todas as perguntas. Você está apto para participar das atividades físicas do evento.
                  </p>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </main>
  )
}

