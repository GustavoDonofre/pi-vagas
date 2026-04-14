'use client'
import { useState } from 'react'
import './premium.css'

export default function Premium() {
  const [planoSelecionado, setPlanoSelecionado] = useState('anual')

  return (
    <div className="premium-container">

      {/* HERO */}
      <section className="premium-hero fade-in titulo mb-1">
        <h2>Destaque sua empresa</h2>
        <p>
          Mais visibilidade, mais candidatos e mais resultados.
        </p>
        <button className="btn-padrao">Quero ser Premium</button>
      </section>

      {/* PLANOS */}
      <section className="premium-planos fade-in delay2 text-center titulo-preto">
        <h3 className='m-4'>Escolha seu plano</h3>

        <div className="planos">

          <div
            className={`plano ${planoSelecionado === 'mensal' ? 'ativo' : ''}`}
            onMouseEnter={() => setPlanoSelecionado('mensal')}
          >
            <h4>Mensal</h4>
            <p className="preco">R$ 29,90</p>
            <ul className='text-start'>
              <li>Destaque nas vagas</li>
              <li>Selo Premium</li>
            </ul>
            <button className="btn-secondary mt-5 ">Assinar</button>
          </div>

          <div
            className={`plano ${planoSelecionado === 'semestral' ? 'ativo' : ''}`}
            onMouseEnter={() => setPlanoSelecionado('semestral')}
          >
            <h4>Semestral</h4>
            <p className="preco">R$ 179,90</p>
            <ul className='text-start'>
              <li>Destaque nas vagas</li>
              <li>Selo Premium</li>
              <li>Mais visibilidade</li>
            </ul>
            <button className="btn-secondary mt-4 ">Assinar</button>
          </div>

          <div
            className={`plano destaque ${planoSelecionado === 'anual' ? 'ativo' : ''}`}
            onMouseEnter={() => setPlanoSelecionado('anual')}
          >
            <span className="badge">Mais escolhido</span>
            <h4>Anual</h4>
            <p className="preco">R$ 299,90</p>
            <ul className='text-start'>
              <li>Destaque nas vagas</li>
              <li>Selo Premium</li>
              <li>Mais visibilidade</li>
              <li>Economia de 2 meses</li>
            </ul>
            <button className="btn-padrao mt-auto">Assinar</button>
          </div>

        </div>
      </section>


      {/* BENEFÍCIOS */}
      <section className="premium-beneficios fade-in delay text-center titulo-preto mt-4">
        <h3>Vantagens do Premium</h3>

        <div className="cards">
          {[
            { icon: <i class="bi bi-lightbulb"></i>, title: 'Destaque no topo', desc: 'Apareça primeiro nas buscas' },
            { icon: <i class="bi bi-eye"></i>, title: 'Mais visualizações', desc: 'Atraia mais candidatos' },
            { icon: <i class="bi bi-lightning"></i>, title: 'Respostas rápidas', desc: 'Candidatos mais engajados' },
            { icon: <i class="bi bi-star"></i>, title: 'Selo Premium', desc: 'Mais credibilidade' },
          ].map((item, i) => (
            <div key={i} className="card hover-card">
              <div className="icon-container">{item.icon}</div>
              <h4>{item.title}</h4>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>


    </div>
  )
}