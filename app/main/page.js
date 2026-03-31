'use client'

import { useEffect, useState } from "react"
import supabase from "./conexao/supabase"

export default function paginainicial() {

    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")

    const id_usuario = localStorage.getItem("id_usuario")

    const [usuario, setUsuario] = useState(null) // [] serve para pegar lista

    async function buscaUsuario() {

        const { data, error } = await supabase
            .from("usuarios")
            .select()
            .eq("id", id_usuario) //exatamente aquele dado, na coluna "id"

        // console.log(data) -> para ver se esta vindo os dados solicitados
        setUsuario(data[0]) //salva os dados na variavel. data (lista de usuarios) + [0] para pegar UM objeto. pq 0? pq pega o primeiro item com aquele id. lembrando q o id é unico ent é como se so tivesse ele

    }


    async function autenticar(e) {
        e.preventDefault()

        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: senha,
        })

        if (data.user == null) {
            alert("Dados inválidos")
            return
        }

        alert('Autenticado com sucesso!')
        localStorage.setItem("id_usuario", data.user.id)

        if (usuario.role == 1) {
            window.location.href="./feed_empresa"
        }

        if (usuario.role == 2 || usuario.role == 0) {
            window.location.href="./feed_empresa"
        }

    }


    useEffect(() => {
        buscaUsuario()
    }, [])

    return (
        <div className="col-12">
            <div className="row">

                {/* <div className="col-md-8">
========
{/* <p></p>
            <br /><br /><br /><br /><br /><br /><br /><br /><br />

            <div className="col-md-8">
>>>>>>>> 5236227dac0be05ea4a4d424731e59b080cd1742:app/main/components/backup_paginainicial.js
                <div className="col-md-8 my-6 container-fluid">
                    <h1 className="hero-title" />
                    As oportunidades de São Carlos agora têm
                    <span className="highlight">lugar certo!</span>
                </div>
                <p div className="mt-3 text-muted">
                    💼 Encontre vagas de freelancer, bicos e trabalhos temporários. <br />
                    📍 Participe do banco de talentos da sua cidade.<br />
                    Simples, organizado e perto de você.
                </p>
            </div> */}




                <div className="row">
                    <div className="card mt-5 col-8 mb-5">
                        <h2 className="fw-bold text-center mb-3 mt-4"> Como funciona?</h2>
                        <p className="text-center text-muted"> Simples pra todo mundo, sem complicação, sem enrolação.</p>

                        <div className="row mt-4">
                            <div className="col-md-6">
                                <h5 className="ms-5">🙍‍♂️ Para Candidatos</h5>
                                <p className="text-muted ms-5">⌨️ <strong>Crie sua conta</strong> <br/> Cadastro rápido e gratuito em menos de 2 minutos.</p>
                                <p className="text-muted ms-5">🔍 <strong>Encontre vagas perto de você</strong> <br/> Vagas locais e organizadas.</p>
                                <p className="text-muted ms-5">📤 <strong>Candidate-se rapidamente</strong> <br/> Envie sua candidatura com poucos cliques.</p>
                            </div>

                            <div className="col-md-6">
                                <h5>🏢 Para Empresas</h5>
                                <p className="text-muted">🖱️ <strong>Cadastre sua empresa</strong> <br/> Crie o perfil do seu negócio de forma simples.</p>
                                <p className="text-muted">🖱️ <strong>Publique vagas em minutos</strong> <br/> Descreva a vaga e publique rapidamente.</p>
                                <p className="text-muted">🖱️ <strong>Receba candidatos organizados</strong> <br/> Gerencie candidaturas de um só lugar.</p>
                            </div>
                        </div>
                    </div >

                    <form className="d-flex flex-row justify-content-end col-4 pe-4 pt-4">
                        <div className="login">
                            <div className="card p-4 shadow" style={{ width: "450px" }}>
                                <div className="d-flex flex-row align-items-end justify-content-center">
                                    <img src="/images/conecta_sanca_logo.png" className="img-fluid" style={{ width: "80px" }}></img>
                                    <p className="fs-4 pb-2"><strong>Conecta Sanca</strong></p>
                                </div>
                                <div className="mb-3">

                                    <label htmlFor="exampleInputEmail1" className="form-label">Digite seu Email</label>
                                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onClick={(e) => setEmail(e.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputPassword1" className="form-label">Digite sua senha</label>
                                    <input type="password" className="form-control" id="exampleInputPassword1" onChange={(e) => setSenha(e.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <p>Não tem cadastro? clique <a className="link-opacity-70-hover link-warning" href="/main/cadastro">aqui</a></p>
                                </div>
                                <button type="submit" className="btn btn-padrao" onClick={autenticar}>Entrar</button>
                            </div>
                        </div>
                    </form>

                </div>    

                 <div className="card mt-5 col-8">
                    <h2 className="fw-bold text-center mb-3 mt-4">Por que usar o Conecta Sanca?</h2>
                    <p className="text-center text-muted">Sua busca por trabalho merece mais organização e confiança.</p>

                    <div className="row mt-4">
                        <div className="col-md-3">
                            <h5 className="ms-5">Vagas organizadas</h5>
                            <p className="text-muted ms-5">Chega de rolar feed infinito. Aqui as vagas estão catalogadas e fáceis de achar.</p>
                        </div>

                        <div className="col-md-3">
                            <h5>Foco local</h5>
                            <p className="text-muted">Tudo em São Carlos. Vagas perto de você, do seu bairro, da sua cidade.</p>
                        </div>

                        <div className="col-md-3">
                            <h5>Processo Simplificado</h5>
                            <p className="text-muted">Candidate-se em poucos cliques. Sem burocracia, sem formulários enormes.</p>
                        </div>

                        <div className="col-md-3">
                            <h5>Mais responsabilidade</h5>
                            <p className="text-muted">Aqui, você encontra perfis verificados e um ambiente mais transparente.</p>
                        </div>

                    </div>
                </div >

                


            </div>
        </div>

    )
}


