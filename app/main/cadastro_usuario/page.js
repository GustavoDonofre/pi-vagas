"use client"
import { useState } from "react";
import "./cadastro_usuario.css";

export default function CadastroUsuario() {

    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [endereco, setEndereco] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmaSenha, setConfirmaSenha] = useState("");
    const [cpf, setCpf] = useState("");
    const [area, setArea] = useState("");
    const [tel, setTel] = useState("");

    function salvar(e) {
        e.preventDefault()

        const usuario = {
            nome: nome,
            email: email,
            endereco: endereco,
            senha: senha,
            cpf: cpf,
            area: area,
            telefone: tel,
        }

        console.log(usuario);
    }



    return (
        <div>
            <div className="col-12">
                <div className="d-flex justify-content-center py-4">
                    <div className="titulo">
                        <img src="https://placehold.co/40"
                            className="mb-3 rounded mx-auto d-block" />

                        <h1>Cadastro para usuários</h1>
                    </div>

                    <br />
                </div>
                <div className="col-12">
                    <form onSubmit={salvar} className="form_cadastro row g-3">
                        {/* Nome */}
                        <div className="col-12 mb-3">
                            <label htmlFor="nomeEmpresa" className="form-label">
                                Seu nome *
                            </label>
                            <input type="text" onChange={e => setNome(e.target.value)} id="nomeEmpresa" className="form-control" />
                        </div>

                        {/* Email */}
                        <div className="col-md-6 mb-3">
                            <label htmlFor="emailEmpresa" className="form-label">
                                Seu melhor email *
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

                        {/* Data de nacimento */}
                        <div className="col-md-6 mb-3">
                            <label htmlFor="telefone" className="form-label">Data de nascimento *</label>
                            <input type="date" id="telefone" onChange={e => setDataNasc(e.target.value)} className="form-control" />
                        </div>

                        {/* CPF */}
                        <div className="col-md-6 mb-3">
                            <label htmlFor="cpfEmpresa" className="form-label">
                                Digite seu CPF *
                            </label>
                            <input type="text" id="cnpjEmpresa" onChange={e => setCpf(e.target.value)} className="form-control" />
                        </div>

                        {/* Senha */}
                        <div className="col-12 mb-3">
                            <label htmlFor="senhaEmpresa" className="form-label">
                                Digite sua senha *
                            </label>
                            <input type="password" onChange={e => setSenha(e.target.value)} id="senhaEmpresa" className="form-control" />
                        </div>

                        {/* Confirmar Senha */}
                        <div className="col-12 mb-3">
                            <label htmlFor="senhaEmpresaNovamente" className="form-label">
                                Confirme sua senha *
                            </label>
                            <input
                                type="password"
                                id="senhaEmpresaNovamente"
                                className="form-control"
                                onChange={e => setConfirmaSenha(e.target.value)}
                            />
                        </div>

                        {/* Área */}
                        <div className="col-md-8 mb-3">
                            <label htmlFor="areaAtuacao" className="form-label">
                                Diga qual sua Área de atuação *
                            </label>
                            <input type="text" id="areaAtuacao" onChange={e => setArea(e.target.value)} className="form-control" />
                        </div>

                        {/* Telefone */}
                        <div className="col-md-8 mb-3">
                            <label htmlFor="telefone" className="form-label">
                                Diga seu telefone *
                            </label>
                            <input type="text" id="telefone" placeholder="EX:(XX) XXXXX-XXXX" onChange={e => setTel(e.target.value)} className="form-control" />
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
