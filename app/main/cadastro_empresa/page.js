export default function cadastroEmpresa() {
    <div>

        <div className="vh-100 d-flex justify-content-center align-items-center">
            <div className="border rounded shadow bg-white p-4" style="width:100%; max-width:500px;">

                <form className="text-center" onsubmit="cadastrar(event)">

                    <img src="https://placehold.co/40" className="mb-3 rounded mx-auto d-block"/>

                        <h2 className="mb-4">Cadastro para empresas</h2>

                        <div className="mb-3 text-start">
                            <label htmlFor="nomeEmpresa">Digite o nome da sua empresa: *</label>
                            <input type="text" id="nomeEmpresa" className="form-control" />
                        </div>

                        <div className="mb-3 text-start">
                            <label htmlFor="emailEmpresa">Digite o Email da sua empresa: *</label>
                            <input type="email" id="emailEmpresa" className="form-control" />
                        </div>

                        <div className="mb-3 text-start">
                            <label htmlFor="enderecoEmpresa">Digite o endereço da sua empresa: *</label>
                            <input type="text" id="enderecoEmpresa" className="form-control" />
                        </div>

                        <div className="mb-3 text-start">
                            <label htmlFor="senhaEmpresa">Digite sua senha: *</label>
                            <input type="password" id="senhaEmpresa" className="form-control" />
                        </div>

                        <div className="mb-3 text-start">
                            <label htmlFor="senhaEmpresaNovamente">Digite sua senha novamente: *</label>
                            <input type="password" id="senhaEmpresaNovamente" className="form-control" />
                        </div>

                        <div className="mb-3 text-start">
                            <label htmlFor="cnpjEmpresa">Digite o CNPJ da sua empresa: *</label>
                            <input type="text" id="cnpjEmpresa" className="form-control" />
                        </div>

                        <div className="mb-3 text-start">
                            <label htmlFor="areaAtuacao">Área de atuação: *</label>
                            <input type="text" id="areaAtuacao" className="form-control" />
                        </div>

                        <div className="mb-3 text-start">
                            <label htmlFor="telefone">Telefone da empresa: *</label>
                            <input type="text" id="telefone" className="form-control" />
                        </div>

                        <div className="mb-3 text-start">
                            <label htmlFor="outroContato">Outro contato:</label>
                            <input type="text" id="outroContato" className="form-control" />
                        </div>

                        <div className="form-check text-start mb-3">
                            <input type="checkbox" id="premium" className="form-check-input" />
                            <label htmlFor="premium" className="form-check-label">
                                <strong>Você tem interesse em se tornar premium?</strong>
                            </label>
                            <small className="text-muted d-block">
                                O premium aumenta a quantidade de postagens e vagas anunciadas
                            </small>
                        </div>

                        <div className="d-flex justify-content-between">
                            <button type="reset" className="btn btn-outline-dark">
                                Cancelar
                            </button>

                            <button type="submit" className="btn btn-primary">
                                Salvar
                            </button>
                        </div>

                </form>

            </div>
        </div>
    </div>
}
