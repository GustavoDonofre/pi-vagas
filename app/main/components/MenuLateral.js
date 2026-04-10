'use client'
import Link from "next/link"
import "./MenuLateral.css"
import * as bootstrap from "bootstrap/dist/js/bootstrap.bundle.min.js";
import { useEffect, useState } from "react"
import { PegaFotoPerfilPeloIDUsuario } from "../conexao/bucket";

export default function MenuLateral() {

    const id_usuario = localStorage.getItem("id_usuario")
    const nome_usuario = localStorage.getItem("nome_usuario")

    // const [nome_usuario, alteraNome_usuario] = useState(null)
    const [nomeUsuario, setNomeUsuario] = useState(null)
    const [role, setRole] = useState(null)


    function buscarInfo() {
        setNomeUsuario(localStorage.getItem("nome_usuario"))
        setRole(localStorage.getItem("role"))
    }

    useEffect(() => {
        buscarInfo()

        if (typeof window !== "undefined") { // garante que estamos no cliente
            const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
            tooltipTriggerList.forEach((el) => {
                new bootstrap.Tooltip(el); // inicializa cada tooltip
            });
        }
    }, [])

    // useEffect(()=> {
    //     alteraNome_usuario(localStorage.getItem("nome_usuario"))
    // }, [localStorage.getItem("nome_usuario")])

    return (
        <div className="menulateral">
            <div className="text-center">
                {
                    <img src={PegaFotoPerfilPeloIDUsuario(id_usuario)} style={{ width: "100px" }} className="rounded-circle"
                        onError={(e) => {
                            e.target.onerror = null
                            e.target.src = "https://ui-avatars.com/api/?background=random&name=" + nome_usuario
                            e.target.style.width = "100px"
                        }} />
                }
                <br /><br />
                <h2 className="fs-5"> {nomeUsuario} </h2>
            </div>
            <hr />
            <div className="col-12 fs-1">
                {
                    role == "1" ?
                        <div className="d-flex flex-column align-items-start gap-2">
                            <button onClick={() => window.location.href = "/main/feed_candidato"} type="button" className="btn btn-lg opcao w-100 text-start" aria-current="true">
                                <span style={{ fontSize: "15px" }}><i className="bi bi-house"></i> - Início</span>
                            </button>
                            <button onClick={() => window.location.href = "/main/minhas_candidaturas"} type="button" className="btn btn-lg opcao w-100 text-start">
                                <span style={{ fontSize: "15px" }}><i className="bi bi-card-checklist"></i> - Minhas candidaturas</span>
                            </button>
                            <button onClick={() => window.location.href = "/main/banco_talentos_candidato"} type="button" className="btn btn-lg opcao w-100 text-start">
                                <span style={{ fontSize: "15px" }}><i className="bi bi-stars"></i> - Banco de Talentos</span>
                            </button>
                            <button onClick={() => window.location.href = "/main/editar_perfil_candidato"} type="button" className="btn btn-lg opcao w-100 text-start">
                                <span style={{ fontSize: "15px" }}><i className="bi bi-person"></i> - Perfil</span>
                            </button>
                            <button onClick={() => window.location.href = "/main/ajuda_candidato"} type="button" className="btn btn-lg opcao w-100 text-start">
                                <span style={{ fontSize: "15px" }}><i className="bi bi-info-circle"></i> - Ajuda</span>
                            </button>
                        </div>
                        : role == "2" ?
                            <div className="d-flex flex-column align-items-start gap-2">
                                <button onClick={() => window.location.href = "/main/feed_empresa"} type="button" className="btn btn-lg opcao w-100 text-start" aria-current="true">
                                    <span style={{ fontSize: "15px" }}><i className="bi bi-house"></i> - Início</span>
                                </button>

                                <button onClick={() => window.location.href = "/main/banco_talentos_empresa"} type="button" className="btn btn-lg opcao w-100 text-start">
                                    <span style={{ fontSize: "15px" }}><i className="bi bi-stars"></i> - Banco de talentos</span>
                                </button>

                                <button onClick={() => window.location.href = "/main/premium"} type="button" className="btn btn-lg opcao w-100 text-start">
                                    <span style={{ fontSize: "15px" }}><i className="bi bi-brightness-low"></i> - Premium</span>
                                </button>

                                <button onClick={() => window.location.href = "/main/editar_perfil_empresa"} type="button" className="btn btn-lg opcao w-100 text-start">
                                    <span style={{ fontSize: "15px" }}><i className="bi bi-building"></i> - Perfil</span>
                                </button>

                                <button onClick={() => window.location.href = "/main/ajuda_empresa"} type="button" className="btn btn-lg opcao w-100 text-start">
                                    <span style={{ fontSize: "15px" }}><i className="bi bi-info-circle"></i> - Ajuda</span>
                                </button>
                            </div>
                            : //role == 0?
                            <div className="d-flex flex-column align-items-start gap-2">
                                <button onClick={() => window.location.href = "/main/feed_candidato"} type="button" className="btn btn-lg opcao w-100 text-start" aria-current="true">
                                    <span style={{ fontSize: "15px" }}><i className="bi bi-house"></i> - Início</span>
                                </button>
                                <button onClick={() => window.location.href = "/main/minhas_candidaturas"} type="button" className="btn btn-lg opcao w-100 text-start">
                                    <span style={{ fontSize: "15px" }}><i className="bi bi-card-checklist"></i> - Minhas candidaturas</span>
                                </button>
                                <button onClick={() => window.location.href = "/main/banco_talentos_candidato"} type="button" className="btn btn-lg opcao w-100 text-start">
                                    <span style={{ fontSize: "15px" }}><i className="bi bi-stars"></i> - Banco de Talentos</span>
                                </button>
                                <button onClick={() => window.location.href = "/main/editar_perfil_candidato"} type="button" className="btn btn-lg opcao w-100 text-start">
                                    <span style={{ fontSize: "15px" }}><i className="bi bi-person"></i> - Perfil</span>
                                </button>
                                <button onClick={() => window.location.href = "/main/ajuda_candidato"} type="button" className="btn btn-lg opcao w-100 text-start">
                                    <span style={{ fontSize: "15px" }}><i className="bi bi-info-circle"></i> - Ajuda</span>
                                </button>
                                <hr />
                                <button onClick={() => window.location.href = "/main/feed_empresa"} type="button" className="btn btn-lg opcao w-100 text-start">
                                    <span style={{ fontSize: "15px" }}><i className="bi bi-house"></i> - Início</span>
                                </button>

                                <button onClick={() => window.location.href = "/main/banco_talentos_empresa"} type="button" className="btn btn-lg opcao w-100 text-start">
                                    <span style={{ fontSize: "15px" }}><i className="bi bi-stars"></i> - Banco de talentos</span>
                                </button>

                                <button onClick={() => window.location.href = "/main/premium"} type="button" className="btn btn-lg opcao w-100 text-start">
                                    <span style={{ fontSize: "15px" }}><i className="bi bi-brightness-low"> - Premium</i></span>
                                </button>

                                <button onClick={() => window.location.href = "/main/editar_perfil_empresa"} type="button" className="btn btn-lg opcao w-100 text-start">
                                    <span style={{ fontSize: "15px" }}><i className="bi bi-building"></i> - Perfil</span>
                                </button>

                                <button onClick={() => window.location.href = "/main/ajuda_empresa"} type="button" className="btn btn-lg opcao w-100 text-start">
                                    <span style={{ fontSize: "15px" }}><i className="bi bi-info-circle"></i> - Ajuda</span>
                                </button>
                            </div>
                }
            </div>

            <div className="text-center  mt-5">
                <button className="btn-acao" onClick={() => window.location.href = './'}> Sair </button>
            </div>
        </div>
    )
}