'use client'
import Link from "next/link"
import "./MenuLateral.css"
import * as bootstrap from "bootstrap/dist/js/bootstrap.bundle.min.js";
import { useEffect, useState } from "react"

export default function MenuLateral() {

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
                <img src={"https://ui-avatars.com/api/?background=random&name=" + nomeUsuario} className="rounded-circle" />
                <br /><br />
                <h2 className="fs-5"> {nomeUsuario} </h2>
            </div>
            <hr />
            <div className="col-12 fs-5 text-center">
                {
                    role == "1" ?
                        <div className="row">
                            <button onClick={() => window.location.href = "/main/feed_candidato"} type="button" className="btn btn-lg opcao" aria-current="true" data-bs-toggle="tooltip" title="Início">
                                <i className="bi bi-house"></i>
                            </button>
                            <button onClick={() => window.location.href = "/main/minhas_candidaturas"} type="button" className="btn btn-lg opcao" data-bs-toggle="tooltip" title="Minhas Candidaturas">
                                <i className="bi bi-card-checklist"></i>
                            </button>
                            <button onClick={() => window.location.href = "/main/banco_talentos_candidato"} type="button" className="btn btn-lg opcao" data-bs-toggle="tooltip" title="Banco de Talentos">
                                <i className="bi bi-stars"></i>
                            </button>
                            <button onClick={() => window.location.href = "/main/editar_perfil_candidato"} type="button" className="btn btn-lg opcao" data-bs-toggle="tooltip" title="Editar Perfil">
                                <i className="bi bi-person"></i>
                            </button>
                            <button onClick={() => window.location.href = "/main/ajuda_candidato"} type="button" className="btn btn-lg opcao" data-bs-toggle="tooltip" title="Precisando de Ajuda?">
                                <i className="bi bi-info-circle"></i>
                            </button>
                        </div>
                        : role == "2" ?
                            <div className="row">
                                <button onClick={() => window.location.href = "/main/feed_empresa"} type="button" className="btn btn-lg opcao" aria-current="true" data-bs-toggle="tooltip" title="Início">
                                    <i className="bi bi-house"></i>
                                </button>

                                <button onClick={() => window.location.href = "/main/banco_talentos_empresa"} type="button" className="btn btn-lg opcao" data-bs-toggle="tooltip" title="Ver banco de talentos">
                                    <i className="bi bi-stars"></i>
                                </button>

                                <button onClick={() => window.location.href = "/main/premium"} type="button" className="btn btn-lg opcao" data-bs-toggle="tooltip" title="Premium">
                                    <i className="bi bi-brightness-low"></i>
                                </button>

                                <button onClick={() => window.location.href = "/main/editar_perfil_empresa"} type="button" className="btn btn-lg opcao" data-bs-toggle="tooltip" title="Editar perfil">
                                    <i className="bi bi-building"></i>
                                </button>

                                <button onClick={() => window.location.href = "/main/ajuda_empresa"} type="button" className="btn btn-lg opcao" data-bs-toggle="tooltip" title="Ajuda">
                                    <i className="bi bi-info-circle"></i>
                                </button>
                            </div>
                            : //role == 0?
                            <div className="row">
                                <button onClick={() => window.location.href = "/main/feed_candidato"} type="button" className="btn btn-lg opcao" aria-current="true" data-bs-toggle="tooltip" title="Início">
                                    <i className="bi bi-house"></i>
                                </button>
                                <button onClick={() => window.location.href = "/main/minhas_candidaturas"} type="button" className="btn btn-lg opcao" data-bs-toggle="tooltip" title="Minhas Candidaturas">
                                    <i className="bi bi-card-checklist"></i>
                                </button>
                                <button onClick={() => window.location.href = "/main/banco_talentos_candidato"} type="button" className="btn btn-lg opcao" data-bs-toggle="tooltip" title="Banco de Talentos">
                                    <i className="bi bi-stars"></i>
                                </button>
                                <button onClick={() => window.location.href = "/main/editar_perfil_candidato"} type="button" className="btn btn-lg opcao" data-bs-toggle="tooltip" title="Editar Perfil">
                                    <i className="bi bi-person"></i>
                                </button>
                                <button onClick={() => window.location.href = "/main/ajuda_candidato"} type="button" className="btn btn-lg opcao" data-bs-toggle="tooltip" title="Precisando de Ajuda?">
                                    <i className="bi bi-info-circle"></i>
                                </button>
                                <hr />
                                <button onClick={() => window.location.href = "/main/feed_empresa"} type="button" className="btn btn-lg opcao" aria-current="true" data-bs-toggle="tooltip" title="Início">
                                    <i className="bi bi-house"></i>
                                </button>

                                <button onClick={() => window.location.href = "/main/banco_talentos_empresa"} type="button" className="btn btn-lg opcao" data-bs-toggle="tooltip" title="Ver banco de talentos">
                                    <i className="bi bi-stars"></i>
                                </button>

                                <button onClick={() => window.location.href = "/main/premium"} type="button" className="btn btn-lg opcao" data-bs-toggle="tooltip" title="Premium">
                                    <i className="bi bi-brightness-low"></i>
                                </button>

                                <button onClick={() => window.location.href = "/main/editar_perfil_empresa"} type="button" className="btn btn-lg opcao" data-bs-toggle="tooltip" title="Editar perfil">
                                    <i className="bi bi-building"></i>
                                </button>

                                <button onClick={() => window.location.href = "/main/ajuda_empresa"} type="button" className="btn btn-lg opcao" data-bs-toggle="tooltip" title="Ajuda">
                                    <i className="bi bi-info-circle"></i>
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