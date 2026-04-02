'use client'

import { useEffect, useState } from "react"
import supabase from "./conexao/supabase"

export default function paginainicial() {

    if(typeof window === "undefined") return null
    const id_usuario = localStorage.getItem("id_usuario")

    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")


    const [usuario, setUsuario] = useState(null)

    async function buscaUsuario() {

        const { data, error } = await supabase
            .from("usuarios")
            .select()
            .eq("id", id_usuario)

        console.log(data)
        setUsuario(data[0])

    }


    async function autenticar(e) {
        e.preventDefault()

        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: senha,
        })

        console.log(data)

        if (data.user == null) {
            alert("Dados inválidos")
            return
        }

        console.log('Autenticado com sucesso!')
        localStorage.setItem("id_usuario", data.user.id)

        const resposta = await supabase.from('usuarios').select().eq("id", data.user.id)
        if (resposta.data != null && resposta.data.length > 0)
            localStorage.setItem("nome_usuario", resposta.data[0].nome)

        if (usuario.role == 1) {
            window.location.href = "./main/feed_candidato"
        }

        if (usuario.role == 2 || usuario.role == 0) {
            window.location.href = "./main/feed_empresa"
        }

    }


    useEffect(() => {
        buscaUsuario()
    }, [])

    return (
        <div>

            <div className="row parte_1">

                <div className="mt-5 col-2 mb-5 margem">
                    <h1 className="titulo_pg"> As oportunidades de <p className="destaque_pg">São Carlos</p> agora têm lugar certo.</h1>
                    <p>Encontre vagas efetivas ou freelancer na sua cidade. <br /> Simples, organizado e perto de você.</p>
                </div >

                <div className="mt-5 col-4 mb-5">
                    <img src="/images/conecta-sanca.png" style={{ width: "900px", height: "auto" }} />
                </div >

                <div className="mt-5 col-4 mb-5 d-flex justify-content-end">

                    <form onSubmit={autenticar}> {/* className="d-flex flex-row justify-content-end pe-4 pt-4" */}

                        <div className="login">

                            <div className="card p-5 shadow" style={{ width: "600px", height: "700px" }}>

                                <div className="d-flex flex-row align-items-end justify-content-center">
                                    <img src="/images/conecta_sanca_logo.png" className="img-fluid" style={{ width: "80px" }} />
                                    <p className="fs-4 pb-2"><strong>Conecta Sanca</strong></p>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="exampleInputEmail1" className="form-label">Digite seu Email</label>
                                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={(e) => setEmail(e.target.value)} />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="exampleInputPassword1" className="form-label">Digite sua senha</label>
                                    <input type="password" className="form-control" id="exampleInputPassword1" onChange={(e) => setSenha(e.target.value)} />
                                </div>

                                <div className="mb-3">
                                    <p>Não tem cadastro? clique <a className="link-opacity-70-hover link-warning" href="/main/cadastro">aqui</a></p>
                                </div>

                                <button type="submit" className="btn btn-padrao">Entrar</button>

                            </div>

                        </div>

                    </form>

                </div>

            </div>



            <div className="row mt-5 mb-5">

                <div className="col-12">

                    <h2 className="fw-bold text-center mb-3 mt-4 titulo_2"> Como funciona?</h2>
                    <p className="text-center text-muted mb-5"> Simples pra todo mundo, sem complicação, sem enrolação.</p>

                    <div className="row mt-5 candidatos">
                        <div className="col-4 ">
                            <h5 className="fw-bold mb-4 ms-5"> <i class="bi bi-person-fill"></i> Para Candidatos</h5>
                            <p className="text-muted ms-5"> <i class="bi bi-person-plus"></i> <strong>Crie sua conta</strong> <br /> Cadastro rápido e gratuito em menos de 2 minutos.</p>
                            <p className="text-muted ms-5"> <i class="bi bi-search"></i> <strong>Encontre vagas perto de você</strong> <br /> Vagas locais e organizadas.</p>
                            <p className="text-muted ms-5"> <i class="bi bi-send"></i> <strong>Candidate-se rapidamente</strong> <br /> Envie sua candidatura com poucos cliques.</p>
                        </div>

                        <div className="col-4">
                            <h5 class="fw-bold mb-4"> <i class="bi bi-building"></i> Para Empresas</h5>
                            <p className="text-muted"> <i class="bi bi-building-add"></i> <strong>Cadastre sua empresa</strong> <br /> Crie o perfil do seu negócio de forma simples.</p>
                            <p className="text-muted"> <i class="bi bi-file-earmark-text"></i> <strong>Publique vagas em minutos</strong> <br /> Descreva a vaga e publique rapidamente.</p>
                            <p className="text-muted"> <i class="bi bi-people"></i> <strong>Receba candidatos organizados</strong> <br /> Gerencie candidaturas de um só lugar.</p>
                        </div>
                    </div>

                </div >

            </div>






            <div className="card mt-5 col-8">

                <h2 className="fw-bold text-center mb-3 mt-4">Por que usar o Conecta Sanca?</h2>
                <p className="text-center text-muted">Sua busca por trabalho merece mais organização e confiança.</p>

                <div className="row mt-4">
                    
                    <div className="card col-md-3">
                        <h5 className="ms-5">Vagas organizadas</h5>
                        <p className="text-muted ms-5">Chega de rolar feed infinito. Aqui as vagas estão catalogadas e fáceis de achar.</p>
                    </div>

                    <div className="card col-md-3">
                        <h5>Foco local</h5>
                        <p className="text-muted">Tudo em São Carlos. Vagas perto de você, do seu bairro, da sua cidade.</p>
                    </div>

                    <div className="card col-md-3">
                        <h5>Processo Simplificado</h5>
                        <p className="text-muted">Candidate-se em poucos cliques. Sem burocracia, sem formulários enormes.</p>
                    </div>

                    <div className="card col-md-3">
                        <h5>Mais responsabilidade</h5>
                        <p className="text-muted">Aqui, você encontra perfis verificados e um ambiente mais transparente.</p>
                    </div>

                </div>

            </div >

        </div>
    )
}


