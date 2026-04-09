  'use client'

import './premium.css'


function Premium() {
    return (
        <div>

            <div className="premium-container">

                {/* HERO */}
                <section className="premium-hero">
                    <h1>Destaque sua empresa 🚀</h1>
                    <p>
                        Alcance mais candidatos, aumente sua visibilidade e encontre os melhores talentos mais rápido.
                    </p>
                    <button className="btn-primary">Quero ser Premium</button>
                </section>


                {/* PLANOS */}
                <section className="premium-planos">
                    <h2>Escolha seu plano</h2>

                    <div className="planos">
                        <div className="plano">
                            <h3>Mensal</h3>
                            <p className="preco">R$ 29,90</p>
                            <ul>
                                <li>Destaque nas vagas</li>
                                <li>Selo Premium</li>
                                <li>Mais visibilidade</li>
                            </ul>
                            <button className="btn-secondary">Assinar</button>
                        </div>

                        <div className="plano destaque">
                            <h3>Anual</h3>
                            <p className="preco">R$ 299,90</p>
                            <ul>
                                <li>Destaque nas vagas</li>
                                <li>Selo Premium</li>
                                <li>Mais visibilidade</li>
                                <li>Economia de 2 meses</li>
                            </ul>
                            <button className="btn-primary">Melhor opção</button>
                        </div>
                    </div>
                </section>

                {/* BENEFÍCIOS */}
                <section className="premium-beneficios">
                    <h2>Vantagens do plano Premium</h2>

                    <div className="cards">
                        <div className="card">
                            <h3>🔝 Destaque no topo</h3>
                            <p>Sua vaga aparece primeiro para todos os candidatos.</p>
                        </div>

                        <div className="card">
                            <h3>👀 Mais visualizações</h3>
                            <p>Maior exposição para atrair mais candidatos qualificados.</p>
                        </div>

                        <div className="card">
                            <h3>⚡ Respostas mais rápidas</h3>
                            <p>Receba candidaturas com mais rapidez.</p>
                        </div>

                        <div className="card">
                            <h3>⭐ Selo Premium</h3>
                            <p>Sua empresa ganha destaque e credibilidade.</p>
                        </div>
                    </div>
                </section>

                

                {/* CTA FINAL */}
                <section className="premium-cta">
                    <h2>Pronto para crescer?</h2>
                    <p>Coloque sua empresa em destaque agora mesmo.</p>
                    <button className="btn-primary">Começar agora</button>
                </section>

            </div>
        </div>
            )
}

export default Premium;