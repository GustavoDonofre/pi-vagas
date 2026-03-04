import "./cadastro_empresa.css"

export default function CadastroEmpresa() {
    return (
        <div>
            <div className="col-12">
                <div className="d-flex justify-content-center py-4">
                    <div className="titulo">
                        <img src="https://placehold.co/40"
                            className="mb-3 rounded mx-auto d-block" />

                        <h1>Cadastro para empresas</h1>
                    </div>

                    <br />
                </div>
                <div className="col-12">
                    <form className="form_cadastro row g-3">
                        {/* Nome */}
                        <div className="col-12 mb-3">
                            <label htmlFor="nomeEmpresa" className="form-label">
                                Nome da empresa *
                            </label>
                            <input type="text" id="nomeEmpresa" className="form-control" />
                        </div>

                        {/* Email */}
                        <div className="col-md-6 mb-3">
                            <label htmlFor="emailEmpresa" className="form-label">
                                Email *
                            </label>
                            <input type="email" id="emailEmpresa" className="form-control" />
                        </div>

                        {/* Endereço */}
                        <div className="col-md-6 mb-3">
                            <label htmlFor="enderecoEmpresa" className="form-label">
                                Endereço *
                            </label>
                            <input type="text" id="enderecoEmpresa" className="form-control" />
                        </div>

                        {/* Senha */}
                        <div className="col-md-6 mb-3">
                            <label htmlFor="senhaEmpresa" className="form-label">
                                Senha *
                            </label>
                            <input type="password" id="senhaEmpresa" className="form-control" />
                        </div>

                        {/* Confirmar Senha */}
                        <div className="col-md-6 mb-3">
                            <label htmlFor="senhaEmpresaNovamente" className="form-label">
                                Confirmar senha *
                            </label>
                            <input
                                type="password"
                                id="senhaEmpresaNovamente"
                                className="form-control"
                            />
                        </div>

                        {/* CNPJ */}
                        <div className="col-md-6 mb-3">
                            <label htmlFor="cnpjEmpresa" className="form-label">
                                CNPJ *
                            </label>
                            <input type="text" id="cnpjEmpresa" className="form-control" />
                        </div>

                        {/* Área */}
                        <div className="col-md-6 mb-3">
                            <label htmlFor="areaAtuacao" className="form-label">
                                Área de atuação *
                            </label>
                            <input type="text" id="areaAtuacao" className="form-control" />
                        </div>

                        {/* Telefone */}
                        <div className="col-md-6 mb-3">
                            <label htmlFor="telefone" className="form-label">
                                Telefone *
                            </label>
                            <input type="text" id="telefone" className="form-control" />
                        </div>

                        {/* Outro contato */}
                        <div className="col-md-6 mb-3">
                            <label htmlFor="outroContato" className="form-label">
                                Outro contato
                            </label>
                            <input type="text" id="outroContato" className="form-control" />
                        </div>

                        {/* Premium */}
                        <div className="col-12 mb-4">
                            <div className="form-check">
                                <input
                                    type="checkbox"
                                    id="premium"
                                    className="form-check-input"
                                />
                                <label htmlFor="premium" className="form-check-label">
                                    <strong>Deseja se tornar premium?</strong>
                                </label>
                                <small className="text-muted d-block">
                                    Premium aumenta a quantidade de postagens e vagas.
                                </small>
                            </div>
                        </div>

                        {/* Botões */}
                        <div className="col-12 d-flex justify-content-between">
                            <button type="reset" className="btn btn-outline-dark">
                                Cancelar
                            </button>

                            <button type="submit" className="btn btn-padrao">
                                Salvar
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
}