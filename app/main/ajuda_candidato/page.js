import './ajuda_candidato.css'

export default function ajudaCandidato() {
    return (
        <div>

            <div className="introducao">

                <h1> Central de ajuda </h1>
                <p> Tire suas dúvidas sobre como usar a plataforma. </p>

            </div>

            <br />

            <div className="duvidas accordion" id="accordionExample">
                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button className="accordion-button collapsed" data-bs-toggle="collapse" data-bs-target="#collapseOne">
                            Como me candidatar a uma vaga?
                        </button>
                    </h2>
                    <div id="collapseOne" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                            Acesse a página inicial, encontre uma vaga de seu interesse, clique no botão "Ver vaga", aparecera um card com todas as informações a respeito da vaga, no canto inferior direito aparecera o botão "Candidatar-se". Pronto! A empresa receberá suas informações.
                        </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button className="accordion-button collapsed" data-bs-toggle="collapse" data-bs-target="#collapseTwo">
                            O que é o Banco de Talentos?
                        </button>
                    </h2>
                    <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                            É um espaço onde você cadastra suas habilidades e experiências. Empresas podem encontrar seu perfil e entrar em contato com você diretamente.
                        </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button className="accordion-button collapsed" data-bs-toggle="collapse"
                            data-bs-target="#collapseThree">
                            Como saber se fui selecionado?
                        </button>
                    </h2>
                    <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                            Na página "minhas candidaturas" é possivel ver se você foi selecionado para a vaga ou não. A empresa entrará em contato com você pelo telefone ou email cadastrado. Fique atento às suas notificações.
                        </div>
                    </div>
                </div>

                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button className="accordion-button collapsed" data-bs-toggle="collapse"
                            data-bs-target="#collapseFour">
                            Meus dados estão seguros?
                        </button>
                    </h2>
                    <div id="collapseFour" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                            Confia :D
                        </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button className="accordion-button collapsed" data-bs-toggle="collapse"
                            data-bs-target="#collapseFive">
                            A plataforma é gratuita?
                        </button>
                    </h2>
                    <div id="collapseFive" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                            Sim! A plataforma é 100% gratuito para candidatos. Você pode se cadastrar, buscar vagas e se candidatar sem nenhum custo.
                        </div>
                    </div>
                </div>
            </div>

            <br />

            <div class="alert alert-warning card_duvidas" role="alert">
                <h5> Ainda precisa de ajuda? </h5>

                <p> <strong> Fale conosco </strong> <br /> contato@tramposc.com.br </p>

                <p> <strong>  Reportar vaga ou perfil suspeito </strong> <br/> reportar@tramposc.com.br </p>
            </div>

        </div>

    )
}