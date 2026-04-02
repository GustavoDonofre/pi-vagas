import "./ajuda_emp.css"

export default function AjudaEmpresa() {

    if(typeof window === "undefined") return null

    return (
        <div>

            <div className="introducao">

                <h1> Central de ajuda </h1>
                <p> Tire suas dúvidas sobre como usar a plataforma. </p>

            </div>

            <div className="duvidas accordion" id="accordionExample">
                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button className="accordion-button collapsed" data-bs-toggle="collapse" data-bs-target="#collapseOne">
                            Como criar uma vaga?
                        </button>
                    </h2>
                    <div id="collapseOne" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                            No início do menu lateral, clique no botão "Criar Vaga". Preencha as informações da vaga e clique em "Publicar". Sua vaga ficará visível para todos os candidatos.
                        </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button className="accordion-button collapsed" data-bs-toggle="collapse" data-bs-target="#collapseTwo">
                            Como gerencio minhas vagas?
                        </button>
                    </h2>
                    <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                            Na página inicial do painel, você vê todas as suas vagas publicadas. Use o menu de ações (três pontinhos) para editar, pausar ou excluir uma vaga.
                        </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button className="accordion-button collapsed" data-bs-toggle="collapse"
                            data-bs-target="#collapseThree">
                            O que é o Banco de Talentos?
                        </button>
                    </h2>
                    <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                            É um espaço onde candidatos disponíveis se cadastram para encontrar uma nova oportunidade. Você pode buscar profissionais por área, tipo de contratação, e entrar em contato diretamente.
                        </div>
                    </div>
                </div>

                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button className="accordion-button collapsed" data-bs-toggle="collapse"
                            data-bs-target="#collapseFour">
                            A plataforma é gratuita?
                        </button>
                    </h2>
                    <div id="collapseFour" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                            Parcialmente! Você pode publicar vagas e acessar o Banco de Talentos sem custo. Mas --bla bla bla a combinar--
                        </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button className="accordion-button collapsed" data-bs-toggle="collapse"
                            data-bs-target="#collapseFive">
                            Como entro em contato com o candidato?
                        </button>
                    </h2>
                    <div id="collapseFive" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                            Ao visualizar o perfil completo de um candidato no Banco de Talentos ou na lista de candidatos de uma vaga, você terá acesso ao telefone e email dele.
                        </div>
                    </div>
                </div>
            </div>

            <br />

            <div class="alert alert-warning card_duvidas" role="alert">
                <h5> Ainda precisa de ajuda? </h5>

                <p> <strong> Fale conosco </strong> <br /> contato@conecta_sanca.com.br </p>

                <p> <strong>  Reportar vaga ou perfil suspeito </strong> <br/> reportar@tramposc.com.br </p>
            </div>

        </div>
    )
}