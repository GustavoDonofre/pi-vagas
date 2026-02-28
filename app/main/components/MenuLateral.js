import Link from "next/link"
import "./MenuLateral.css"

export default function MenuLateral() {
    return (
        <div class="menulateral">
            <div class="text-center">
                <img src="https://placehold.co/50" class="rounded-circle" />
                <h2 class="fs-5"> Nome do candidato </h2>
            </div>
            <hr />
            <div class="list-group list-group-flush fs-5">
                <Link href="/main/feed" type="button" class="list-group-item list-group-item-action" aria-current="true"> Início </Link>
                <Link href="/main/banco_talentos" type="button" class="list-group-item list-group-item-action"> Banco de talentos </Link>
                <Link href="/" type="button" class="list-group-item list-group-item-action"> Minhas candidaturas </Link>
                <Link href="/" type="button" class="list-group-item list-group-item-action"> Editar perfil </Link>
                <Link href="/" type="button" class="list-group-item list-group-item-action"> Configurações </Link>
                <Link href="/" type="button" class="list-group-item list-group-item-action"> Ajuda </Link>
            </div>

            <div class="text-center  menu_lateral_perfil">
                <button class="btn btn-primary"> Sair </button>
            </div>
        </div>
    )
}