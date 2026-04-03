'use client'
import Link from "next/link"
import "./MenuLateral.css"
import { useEffect, useState } from "react"

export default function MenuLateral() {

    const [nome_usuario, alteraNome_usuario] = useState(null)

    useEffect(()=> {
        alteraNome_usuario(localStorage.getItem("nome_usuario"))
    }, [localStorage.getItem("nome_usuario")])

    return (
        <div className="menulateral">
            <div className="text-center">
                <img src={"https://ui-avatars.com/api/?background=random&name="+nome_usuario} className="rounded-circle" />
                <br/><br/>
                <h2 className="fs-5"> {nome_usuario} </h2>
            </div>
            <hr />
            <div className="list-group list-group-flush fs-5">
                <Link href="/main/feed_candidato" type="button" className="list-group-item list-group-item-action" aria-current="true"> Início </Link>
                <Link href="/main/minhas_candidaturas" type="button" className="list-group-item list-group-item-action"> Minhas candidaturas </Link>
                <Link href="/main/banco_talentos_candidato" type="button" className="list-group-item list-group-item-action"> Banco de talentos </Link>
                <Link href="/main/editar_perfil_candidato" type="button" className="list-group-item list-group-item-action"> Editar perfil </Link>
                <Link href="/main/ajuda_candidato" type="button" className="list-group-item list-group-item-action"> Ajuda </Link>
                <hr/>
                <Link href="/main/feed_empresa" type="button" className="list-group-item list-group-item-action" aria-current="true"> EMPRESA - Início </Link>
                <Link href="/main/banco_talentos_empresa" type="button" className="list-group-item list-group-item-action"> EMPRESA - Ver banco de talentos </Link>
                <Link href="/main/premium" type="button" className="list-group-item list-group-item-action"> EMPRESA - Premium </Link>
                <Link href="/main/editar_perfil_empresa" type="button" className="list-group-item list-group-item-action"> EMPRESA - Editar perfil </Link>
                <Link href="/main/ajuda_empresa" type="button" className="list-group-item list-group-item-action"> EMPRESA - Ajuda </Link>
            </div>

            <div className="text-center menu_lateral_perfil mt-5">
                <button className="btn-padrao"> Sair </button>
            </div>
        </div>
    )
}