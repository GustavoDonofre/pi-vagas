'use client'
import { useEffect, useRef } from 'react'

// ── dados ──────────────────────────────────────────────────────────────────
const STATS = [
    { num: '3x', label: 'mais visualizações' },
    { num: '+58%', label: 'candidaturas recebidas' },
    { num: '2 dias', label: 'tempo médio de resposta' },
]

const BENEFITS = [
    {
        title: 'Destaque no topo',
        desc: 'Suas vagas aparecem antes das demais nas buscas.',
        icon: (
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M9 2L10.8 7H16L11.6 10.2L13.4 15L9 11.8L4.6 15L6.4 10.2L2 7H7.2L9 2Z" fill="#FF6B00" />
            </svg>
        ),
    },
    {
        title: 'Selo de empresa verificada',
        desc: 'Mais credibilidade para atrair candidatos.',
        icon: (
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <circle cx="9" cy="7" r="3" fill="#FF6B00" />
                <path d="M2 15C2 12 5 10 9 10s7 2 7 5" stroke="#FF6B00" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
        ),
    },
    {
        title: 'Vagas ativas por mais tempo',
        desc: 'Publicações com duração estendida automaticamente.',
        icon: (
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <rect x="2" y="5" width="14" height="10" rx="2" fill="#FF6B00" fillOpacity=".2" />
                <path d="M2 8h14M6 5V3M12 5V3" stroke="#FF6B00" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
        ),
    },
    {
        title: 'Painel de métricas',
        desc: 'Visualizações, cliques e candidaturas em tempo real.',
        icon: (
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M3 10L7 14L15 5" stroke="#FF6B00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
    },
]

// ── componente ─────────────────────────────────────────────────────────────
export default function Premium() {
    const observerRef = useRef(null)

    // Intersection Observer para animações de entrada
    useEffect(() => {
        observerRef.current = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add(styles.visible)
                        observerRef.current.unobserve(entry.target)
                    }
                })
            },
            { threshold: 0.12 }
        )

        document.querySelectorAll(`.${styles.fadeUp}`).forEach((el) => {
            observerRef.current.observe(el)
        })

        return () => observerRef.current?.disconnect()
    }, [])

    return (
        <div>

            {/* ── HERO ── */}
            <section className={`${styles.hero} ${styles.fadeUp}`}>
                <span className={styles.heroBadge}>Plano Premium para Empresas</span>
                <h1>Sua empresa no topo.<br />Os melhores talentos na fila.</h1>
                <p>
                    Destaque suas vagas, apareça primeiro nas buscas e atraia
                    candidatos mais qualificados.
                </p>
                <button className={styles.btnHero}>Começar agora</button>
                <div className={styles.heroSub}>Sem contrato. Cancele quando quiser.</div>
            </section>

            {/* ── STATS ── */}
            <div className={`row g-3 mb-4 ${styles.fadeUp}`}>
                {STATS.map((s) => (
                    <div key={s.label} className="col-4">
                        <div className={styles.statCard}>
                            <div className={styles.statNum}>{s.num}</div>
                            <div className={styles.statLabel}>{s.label}</div>
                        </div>
                    </div>
                ))}
            </div>

            {/* ── BENEFÍCIOS ── */}
            <h2 className={`${styles.secTitle} ${styles.fadeUp}`}>
                Tudo que você ganha sendo Premium
            </h2>
            <p className={`${styles.secSub} ${styles.fadeUp}`}>
                Ferramentas para acelerar suas contratações.
            </p>
            <div className={`row g-3 mb-4 ${styles.fadeUp}`}>
                {BENEFITS.map((b) => (
                    <div key={b.title} className="col-6">
                        <div className={styles.benefitCard}>
                            <div className={styles.benefitIcon}>{b.icon}</div>
                            <div>
                                <div className={styles.benefitTitle}>{b.title}</div>
                                <div className={styles.benefitDesc}>{b.desc}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* ── PLANOS ── */}
            <h2 className={`${styles.secTitle} ${styles.fadeUp}`}>Escolha seu plano</h2>
            <div className={`row g-3 mb-4 ${styles.fadeUp}`}>

                {/* MENSAL */}
                <div className="col-6">
                    <div className={styles.planoCard}>
                        <div className={styles.planoName}>Mensal</div>
                        <div className={styles.planoPrice}>
                            R$ 29<span>,90/mês</span>
                        </div>
                        <div className={styles.planoBilling}>Cobrado mensalmente</div>

                        <div className={styles.compareBox}>
                            <div className={styles.compareTitle}>Comparando com o anual</div>
                            <div className={styles.compareRow}>
                                <span className={styles.compareLabel}>Gasto em 12 meses</span>
                                <span className={`${styles.compareVal} ${styles.neg}`}>R$ 358,80</span>
                            </div>
                            <hr className={styles.compareDivider} />
                            <div className={styles.compareRow}>
                                <span className={styles.compareLabel}>Você pagaria a mais</span>
                                <span className={`${styles.compareVal} ${styles.neg}`}>+ R$ 60,00</span>
                            </div>
                            <div className={styles.compareNote}>Assine o anual e economize 2 meses</div>
                        </div>

                        <hr className={styles.dividerFeatures} />
                        <ul className={styles.planoFeatures}>
                            <li><span className={styles.check}>✓</span>Vagas em destaque</li>
                            <li><span className={styles.check}>✓</span>Selo verificado</li>
                            <li><span className={styles.check}>✓</span>Métricas básicas</li>
                            <li className={styles.disabled}><span className={styles.cross}>✗</span>Suporte prioritário</li>
                            <li className={styles.disabled}><span className={styles.cross}>✗</span>Relatórios avançados</li>
                            <li className={styles.disabled}><span className={styles.cross}>✗</span>Vagas ilimitadas</li>
                        </ul>
                        <button className={`${styles.btnPlano} ${styles.secondary}`}>
                            Assinar mensal
                        </button>
                    </div>
                </div>

                {/* ANUAL */}
                <div className="col-6">
                    <div className={`${styles.planoCard} ${styles.featured}`}>
                        <span className={styles.planoPopular}>Mais escolhido</span>
                        <div className={styles.planoName} style={{ marginTop: '10px' }}>Anual</div>
                        <div className={styles.planoPrice}>
                            R$ 24<span>,90/mês</span>
                        </div>
                        <div className={styles.planoEcon}>Economize R$ 60 por ano</div>

                        <div className={styles.totalBox}>
                            <div className={styles.totalRow}>
                                <span className={styles.totalLabel}>Total anual</span>
                                <span className={styles.totalValue}>R$ 298,80</span>
                            </div>
                            <hr className={styles.totalDivider} />
                            <div className={styles.totalRow}>
                                <span className={styles.totalLabel}>Você economiza</span>
                                <span className={styles.totalSaving}>R$ 60,00</span>
                            </div>
                            <div className={styles.totalParcelas}>À vista ou 12x de R$ 24,90</div>
                        </div>

                        <hr className={styles.dividerFeatures} />
                        <ul className={styles.planoFeatures}>
                            <li><span className={styles.check}>✓</span>Vagas em destaque</li>
                            <li><span className={styles.check}>✓</span>Selo verificado</li>
                            <li><span className={styles.check}>✓</span>Métricas avançadas</li>
                            <li><span className={styles.check}>✓</span>Suporte prioritário</li>
                            <li><span className={styles.check}>✓</span>Relatórios avançados</li>
                            <li><span className={styles.check}>✓</span>Vagas ilimitadas</li>
                        </ul>
                        <button className={`${styles.btnPlano} ${styles.primary}`}>
                            Assinar anual
                        </button>
                    </div>
                </div>

            </div>

            {/* ── CTA FINAL ── */}
            <div className={`${styles.ctaFinal} ${styles.fadeUp}`}>
                <h2>Pronto para contratar mais rápido?</h2>
                <p>Junte-se a centenas de empresas que já usam o Premium.</p>
                <button className={styles.btnCtaFinal}>Ativar Premium agora</button>
            </div>

        </div>
    )
}