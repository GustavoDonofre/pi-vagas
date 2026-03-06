import './banco_talentos_salvo.css'

export default function bancoTalentosSalvo() {

    const bancoTalentos = [
        {
            curriculo:
            certificacoes:
            portfolio:
            area:
            competencias:
            contratacao:
            turno:
        },
        {

        }
    ];

    return (
        <div>
            <div>

                <div className="titulo">
                    <h2> Banco de Talentos </h2>
                    <br />
                    <p> Cadastre-se para que empresas de São Carlos encontrem você. </p>
                </div>

                <br />

                <div className="alert alert-warning inscricao" role="alert">
                    <p> Você está inscrito no Banco de Talentos! <br /> Empresas podem visualizar seu perfil e entrar em contato. </p>
                </div>

                <br />

                <div>

                    <div class="card w-75 mb-3">
                        <div class="card-body">
                            <h5 class="card-title">Nome candidato</h5>
                            <p class="card-text">Informações</p>
                                <ul>
                                    <li> Currículo: </li>
                                    <li> Certificações (opcional): </li>
                                    <li> Portfolio (opcional): </li>
                                    <li> Área de atuação: </li>
                                    <li> Competências e Habilidades: </li>
                                    <li> Tipo de contratação: </li>
                                    <li> Turno de preferência: </li>
                                </ul>
                            <a href="#" class="btn btn-primary">Button</a>
                        </div>
                    </div>
                </div >
            </div>
        </div >
    )
}
