"use client"
import { useState } from "react";
import "./cadastro_empresa.css"

export default function CadastroEmpresa() {

    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [endereco, setEndereco] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmaSenha, setConfirmaSenha] = useState("");
    const [cnpj, setCnpj] = useState("");
    const [area, setArea] = useState("");
    const [tel, setTel] = useState("");
    const [tel2, setTel2] = useState("");
    const [premium, setPremium] = useState("");

    function salvar(e) {
        e.preventDefault()

        const empresa = {
            nome: nome,
            email: email,
            endereco: endereco,
            senha: senha,
            cnpj: cnpj,
            area: area,
            telefone: tel,
            telefone2: tel2,
            premium: premium
        }

        console.log(empresa)
    }



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
                    <form onSubmit={salvar} className="form_cadastro row g-3">
                        {/* Nome */}
                        <div className="col-12 mb-3">
                            <label htmlFor="nomeEmpresa" className="form-label">
                                Nome da empresa *
                            </label>
                            <input type="text" onChange={e => setNome(e.target.value)} id="nomeEmpresa" className="form-control" />
                        </div>

                        {/* Email */}
                        <div className="col-md-6 mb-3">
                            <label htmlFor="emailEmpresa" className="form-label">
                                Email *
                            </label>
                            <input type="email" id="emailEmpresa" onChange={e => setEmail(e.target.value)} className="form-control" />
                        </div>

                        {/* Endereço */}
                        <div className="col-md-6 mb-3">
                            <label htmlFor="enderecoEmpresa" className="form-label">
                                Endereço *
                            </label>
                            <input type="text" id="enderecoEmpresa" onChange={e => setEndereco(e.target.value)} className="form-control" />
                        </div>

                        {/* Senha */}
                        <div className="col-md-6 mb-3">
                            <label htmlFor="senhaEmpresa" className="form-label">
                                Senha *
                            </label>
                            <input type="password" onChange={e => setSenha(e.target.value)} id="senhaEmpresa" className="form-control" />
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
                                onChange={e => setConfirmaSenha(e.target.value)}
                            />
                        </div>

                        {/* CNPJ */}
                        <div className="col-md-6 mb-3">
                            <label htmlFor="cnpjEmpresa" className="form-label">
                                CNPJ *
                            </label>
                            <input type="text" id="cnpjEmpresa" onChange={e => setCnpj(e.target.value)} className="form-control" />
                        </div>

                        {/* Área */}
                        <div className="col-md-6 mb-3">
                            <label htmlFor="areaAtuacao" className="form-label">
                                Área de atuação *
                            </label>
                            <input type="text" id="areaAtuacao" onChange={e => setArea(e.target.value)} className="form-control" />
                        </div>

                        {/* Telefone */}
                        <div className="col-md-6 mb-3">
                            <label htmlFor="telefone" className="form-label">
                                Telefone *
                            </label>
                            <input type="text" id="telefone" onChange={e => setTel(e.target.value)} className="form-control" />
                        </div>

                        {/* Outro contato */}
                        <div className="col-md-6 mb-3">
                            <label htmlFor="outroContato" className="form-label">
                                Outro contato
                            </label>
                            <input type="text" id="outroContato" onChange={e => setTel2(e.target.value)} className="form-control" />
                        </div>

                        {/* Premium */}
                        <div className="col-12 mb-4">
                            <div className="form-check">
                                <input
                                    type="checkbox"
                                    id="premium"
                                    className="form-check-input"
                                    onChange={e => setPremium(e.target.checked)}
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