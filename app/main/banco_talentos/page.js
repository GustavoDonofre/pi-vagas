import './banco_talentos.css'

export default function bancoTalentos() {
    return (
        <div>
            <div>
                <h1> Página de Banco de Talentos (candidatos) da Isabely </h1>

                <div className="titulo">
                    <h2> Banco de Talentos </h2>
                    <br />
                    <p> Cadastre-se para que empresas de São Carlos encontrem você. </p>
                </div>

                <br />

                <div className="alert alert-warning inscricao" role="alert">
                    <p> Você ainda não está inscrito <br /> Preencha o formulário abaixo para se cadastrar. </p>
                </div>

                <br />

                <div>

                    <form className="form_banco_talentos row g-3">

                        <div>
                            <label for="input_curriculo" className="form-label"> Currículo </label>
                            <input required type="file" accept=".pdf,.doc,.docx" className="input_curriculo form-control" />
                            <p className="text-body-tertiary"> PDF ou DOC, até 5 MB </p>
                        </div>

                        <div>
                            <label for="input_certificacoes" className="form-label"> Certificações (opcional) </label>
                            <input type="file" accept=".pdf,.doc,.docx" className="input_certificacoes form-control" multiple />
                        </div>

                        <div>
                            <label for="input_portfolio" className=" form-label"> Portfolio (opcional) </label>
                            <input type="url" placeholder="Behance, GitHub ou site pessoal." className="input_portfolio form-control" />
                        </div>

                        <div>
                            <label className="form-label"> Área de atuação </label>
                            <textarea className="form-control" placeholder="Ex: atendimento, vendas, administrativo, TI..."></textarea>
                        </div>

                        <div>
                            <label className="form-label"> Competências e Habilidades </label>
                            <textarea className="form-control" placeholder="Ex: comunicação, organização, Excel, redes sociais..."></textarea>
                        </div>

                        <div className="col-md-6">
                            <label className="form-label"> Tipo de contratação </label>
                            <select className="form-select" required>
                                <option value="" selected disabled hidden> Selecione </option>
                                <option value="efetivo"> Efetivo </option>
                                <option value="temporario"> Temporário </option>
                            </select>
                        </div>

                        <div className="col-md-6">
                            <label className="form-label"> Turno de preferência </label>
                            <select className="form-select" required>
                                <option value="" selected disabled hidden> Selecione </option>
                                <option value="matutino"> Matutino </option>
                                <option value="vespertino"> Vespertino </option>
                                <option value="noturno"> Noturno </option>
                            </select>
                        </div>

                        <button type="submit" className="botao_inscrever btn btn-light"> Salvar inscrição </button>

                    </form >

                </div >
            </div>
        </div >
    )
}
