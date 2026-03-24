import Link from "next/link"
import "./MenuLateral.css"

export default function MenuLateral() {
    return (
        <div className="menulateral">
            <div className="text-center">
                <img src="https://placehold.co/50" className="rounded-circle" />
                <h2 className="fs-5"> Nome do candidato </h2>
            </div>
            <hr />
            <div className="list-group list-group-flush fs-5">
                <Link href="/main/feed_candidato" type="button" className="list-group-item list-group-item-action" aria-current="true"> USUARIO - Início </Link>
                <Link href="/main/banco_talentos_candidato" type="button" className="list-group-item list-group-item-action"> USUARIO - Banco de talentos </Link>
                <Link href="/main/minhas_candidaturas" type="button" className="list-group-item list-group-item-action"> USUARIO - Minhas candidaturas </Link>
                <Link href="/main/editar_perfil_candidato" type="button" className="list-group-item list-group-item-action"> USUARIO - Editar perfil </Link>
                <Link href="/main/ajuda_candidato" type="button" className="list-group-item list-group-item-action"> USUARIO - Ajuda </Link>
                <hr/>
                <Link href="/main/feed" type="button" className="list-group-item list-group-item-action" aria-current="true"> EMPRESA - Início </Link>
                <Link href="/main/banco_talentos" type="button" className="list-group-item list-group-item-action"> EMPRESA - Ver banco de talentos </Link>
                <Link href="/main/premium" type="button" className="list-group-item list-group-item-action"> EMPRESA - Premium </Link>
                <Link href="/" type="button" className="list-group-item list-group-item-action"> EMPRESA - Editar perfil </Link>
                <Link href="/main/ajuda_emp" type="button" className="list-group-item list-group-item-action"> EMPRESA - Ajuda </Link>
            </div>

            <div className="text-center menu_lateral_perfil mt-5">
                <button className="btn-padrao"> Sair </button>
            </div>
        </div>
    )
}