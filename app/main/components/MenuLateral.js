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
                <Link href="/main/feed" type="button" className="list-group-item list-group-item-action" aria-current="true"> Início </Link>
                <Link href="/main/banco_talentos" type="button" className="list-group-item list-group-item-action"> Banco de talentos </Link>
                <Link href="/" type="button" className="list-group-item list-group-item-action"> Minhas candidaturas </Link>
                <Link href="/" type="button" className="list-group-item list-group-item-action"> Editar perfil </Link>
                <Link href="/" type="button" className="list-group-item list-group-item-action"> Ajuda </Link>
            </div>

            <div className="text-center  menu_lateral_perfil">
                <button className="btn btn-primary"> Sair </button>
            </div>
        </div>
    )
}