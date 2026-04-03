"use client"
import { useState } from "react";

import './cadastro.css'
import supabase from "../conexao/supabase";

export default function CadastroUsuario() {
    //area obriatoria para todos
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [endereco, setEndereco] = useState("");
    const [area, setArea] = useState("");
    const [tel, setTel] = useState("");

    //Area empresa 
    const [razaoSocial, setRazaoSocial] = useState("");
    const [senhaEmpresa, setSenhaEmpresa] = useState("");
    const [confirmaSenhaEmpresa, setConfirmaSenhaEmpresa] = useState("");
    const [cnpj, setCnpj] = useState("");
    const [premium, setPremium] = useState(false);

    //Area usuario
    const [senhaCandidato, setSenhaCandidato] = useState("");
    const [confirmaSenhaCandidato, setConfirmaSenhaCandidato] = useState("");
    const [dataNasc, setDataNasc] = useState("");
    const [cpf, setCpf] = useState("");


    const [cadastro, setCadastro] = useState(false);

    async function cadastrar(e) {
        e.preventDefault()
        if (cadastro == false) { //candidato

            //CADASTRO SUPABASE
            const { data, error } = await supabase.auth.signUp({
                email: email,
                password: senhaCandidato,
            })
            console.log("DATA:", data)
            console.log("ERROR:", error)

            if (error) {
                console.log(error)
                alert('Dados inválidos! tente novamente')
                return
            }

            //CADASTRAR NA MINHA TABELA
            const obj = {
                id: data.user.id,
                nome: nome,
                email: email,
                endereco: endereco,
                data_nasc: dataNasc,
                cpf: cpf.replace(/\D/g, ""),
                area_atuacao: area,
                contato: tel,
                role: 1
            }

            const response = await supabase
                .from('usuarios')
                .insert(obj)

            console.log(response)

            if (response.status == 201) {
                alert('Candidato cadastrado com sucesso!!')
                window.location.href = "./"
                return
            } else {
                console.log(response.error)
                alert('Verifique os campos de candidato e tente novamente...')
            }


            //TODO: jogar autenticacao novamente para logar automaticamente no feed de cada um
        }

        if (cadastro == true) { // empresa
            //CADASTRO SUPABASE
            const { data, error } = await supabase.auth.signUp({
                email: email,
                password: senhaEmpresa,
            })
            console.log("DATA:", data)
            console.log("ERROR:", error)

            if (error) {
                console.log(error)
                alert('Dados inválidos! tente novamente')
                return
            }

            //CADASTRAR NA MINHA TABELA
            const obj = {
                id: data.user.id,
                nome: nome,
                razao_social: razaoSocial,
                email: email,
                endereco: endereco,
                cnpj: cnpj.replace(/\D/g, ""),
                area_atuacao: area,
                contato: tel,
                role: 2
            }

            const response = await supabase
                .from('usuarios')
                .insert(obj)

            if (response.status == 201) {
                alert('Empresa cadastrada com sucesso!!')
                window.location.href = "./"
                return
            } else {
                console.log(response.error)
                alert('Verifique os campos da sua empresa e tente novamente...')
                return
            }


            //TODO: jogar autenticacao novamente para logar automaticamente no feed de cada um
        }
    }


    // async function salvar(e) {
    //     e.preventDefault()

    //     console.log(cadastro)

    //     if (cadastro == true) {
    //         const empresa = {
    //             nome: nome,
    //             razao_social: razaoSocial,
    //             email: email,
    //             senha: senhaEmpresa,
    //             cnpj: cnpj.replace(/\D/g, ""),
    //             area: area,
    //             telefone: tel,
    //             endereco: endereco,
    //             premium: premium
    //         }

    //         const { data, error } = await supabase
    //             .from('empresas')
    //             .insert(empresa);


    //         return alert("Empresa Cadastrada! faça o login!")
    //     } else {
    //         const usuario = {
    //             nome: nome,
    //             email: email,
    //             endereco: endereco,
    //             senha: senhaUsuario,
    //             cpf: cpf.replace(/\D/g, ""),
    //             area: area,
    //             telefone: tel,
    //         }

    //         const { data, error } = await supabase
    //             .from('usuarios')
    //             .insert(usuario);

    //         return alert("Usuario Cadastrado! faça o login!")
    //     }
    // }





    return (
        <div>
            {/* <div className="d-flex justify-content-center py-4">
                </div> */}

            <form onSubmit={cadastrar} className="form_cadastro row g-3">
                <div className="card-header bg-padrao rounded">
                    <nav className="nav nav-underline text-white">
                        <div className="container-fluid">
                            <div id="navbarNav">
                                <ul className="navbar-nav d-flex flex-row">
                                    <li className="nav-item pe-2">
                                        <a className="nav-link active" aria-current="page" href="#secao-candidato" data-bs-toggle="tab" role="tab" onClick={() => setCadastro(false)}>Candidato</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="#secao-empresa" data-bs-toggle="tab" role="tab" onClick={() => setCadastro(true)}>Empresa</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                </div>
                <div className="card-body">
                    <div className="tab-content">
                        {/* CANDIDATO */}
                        <div id="secao-candidato" className="tab-pane fade show active">
                            <div className="row">
                                <div className="titulo pb-3">
                                    <h3>Cadastro para candidatos</h3>
                                </div>
                                {/* Nome */}
                                <div className="col-12 mb-3">
                                    <label htmlFor="nomeEmpresa" className="form-label">
                                        Seu nome *
                                    </label>
                                    <input type="text" onChange={e => setNome(e.target.value)} id="nomeEmpresa" className="form-control" />
                                </div>

                                {/* Email */}
                                <div className="col-6 mb-3">
                                    <label htmlFor="emailUsuario" className="form-label">
                                        Seu melhor email *
                                    </label>
                                    <input type="email" id="emailUsuario" onChange={e => setEmail(e.target.value)} className="form-control" />
                                </div>

                                {/* Endereço */}
                                <div className="col-6 mb-3">
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
                                    <input type="password" onChange={e => setSenhaCandidato(e.target.value)} id="senhaEmpresa" className="form-control" />
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
                                        onChange={e => setConfirmaSenhaCandidato(e.target.value)}
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
                            </div>
                        </div>

                        {/* EMPRESA */}
                        <div id="secao-empresa" className="tab-pane fade">
                            <div className="row">
                                <div className="titulo pb-3">
                                    <h3>Cadastro para empresas</h3>
                                </div>
                                {/* Razão social */}
                                <div className="col-12 mb-3">
                                    <label htmlFor="razao-social" className="form-label">
                                        Razão social*
                                    </label>
                                    <input type="text" onChange={e => setRazaoSocial(e.target.value)} id="nomeEmpresa" className="form-control" />
                                </div>

                                {/* Nome */}
                                <div className="col-12 mb-3">
                                    <label htmlFor="nomeEmpresa" className="form-label">
                                        Apelido*
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
                                    <input type="password" onChange={e => setSenhaEmpresa(e.target.value)} id="senhaEmpresa" className="form-control" />
                                </div>

                                {/* Confirmar Senha */}
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="senhaEmpresaNovamente" onChange={e => setConfirmaSenhaEmpresa(e.target.value)} className="form-label">
                                        Confirmar senha *
                                    </label>
                                    <input
                                        type="password"
                                        id="senhaEmpresaNovamente"
                                        className="form-control"
                                        onChange={e => setConfirmaSenhaEmpresa(e.target.value)}
                                    />
                                </div>

                                {/* Telefone */}
                                <div className="col-6 mb-3">
                                    <label htmlFor="telefone" className="form-label">
                                        Telefone *
                                    </label>
                                    <input type="text" id="telefone" onChange={e => setTel(e.target.value)} className="form-control" />
                                </div>

                                {/* CNPJ */}
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="cnpjEmpresa" className="form-label">
                                        CNPJ *
                                    </label>
                                    <input type="text" id="cnpjEmpresa" onChange={e => setCnpj(e.target.value)} className="form-control" />
                                </div>

                                {/* Área */}
                                <div className="col-6 mb-3">
                                    <label htmlFor="areaAtuacao" className="form-label">
                                        Área de atuação *
                                    </label>
                                    <input type="text" id="areaAtuacao" onChange={e => setArea(e.target.value)} className="form-control" />
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
                                        <small className="text-muted d-block" onChange={e => setPremium(e.target.value)}>
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
                            </div>
                        </div>
                    </div>
                </div>


            </form >
        </div >
    );
}
