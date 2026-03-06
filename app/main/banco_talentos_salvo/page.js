import './banco_talentos_salvo.css'

export default function bancoTalentosSalvo() {

    return (

        <div>

            <div className="titulo">
                <h2> Banco de Talentos </h2>
                <br />
                <p> Cadastre-se para que empresas de São Carlos encontrem você. </p>
            </div>

            <br />

            <div className="alert alert-success inscricao" role="alert">
                <p> Você está inscrito no Banco de Talentos! <br /> Empresas podem visualizar seu perfil e entrar em contato. </p>
            </div>

            <br />

            <div>

                <div className="card card_salvo p-4">
                    <h5 className="mb-4"> Seus dados cadastrados </h5>

                    <div className="row">

                        <div className="col-md-6 mb-3">
                            <p className="text-muted mb-1"> Curriculo </p>
                            <p> - </p>
                        </div>

                        <div className="col-md-6 mb-3">
                            <p className="text-muted mb-1"> Certificações </p>
                            <p> - </p>
                        </div>

                        <div className="col-md-6 mb-3">
                            <p className="text-muted mb-1"> Portfolio </p>
                            <p> - </p>
                        </div>

                        <div className="col-md-6 mb-3">
                            <p className="text-muted mb-1"> Área </p>
                            <p> - </p>
                        </div>

                        <div className="col-md-6 mb-3">
                            <p className="text-muted mb-1"> Competencias </p>
                            <p> - </p>
                        </div>

                        <div className="col-md-6 mb-3">  </div>
                        <p className="text-muted mb-1"> Contratação </p>
                        <p> - </p>

                        <div className="col-md-6 mb-3">
                            <p className="text-muted mb-1"> Turno </p>
                            <p> - </p>
                        </div>

                    </div>

                    <button className='botao_editar'> Editar </button>

                </div>
            </div>
        </div >
    )
}
