import './banco_talentos_emp.css'

export default function bancoTalentosEmp() {

    return(

    <div>

        <div class="titulo">
            <h2>Banco de Talentos</h2>
            <p>Encontre profissionais de São Carlos para sua empresa.</p>
        </div>

        <nav class="navbar mb-4">
            <form class="container-fluid">
                <div class="input-group">
                    <span class="input-group-text">🔍</span>
                    <input type="text" class="form-control" placeholder="Buscar por nome ou área..." />
                </div>
            </form>
        </nav>

        <div class="filtros card_filtros row g-3">
            <div class="col-md-5">
                <label class="form-label">Tipo de contratação</label>
                <select class="form-select">
                    <option value="" selected disabled hidden>Selecione</option>
                    <option value="efetivo">Efetivo</option>
                    <option value="temporario">Temporário</option>
                </select>
            </div>

            <div class="col-md-5">
                <label class="form-label">Turno</label>
                <select class="form-select">
                    <option value="" selected disabled hidden>Selecione</option>
                    <option value="matutino">Matutino</option>
                    <option value="vespertino">Vespertino</option>
                    <option value="noturno">Noturno</option>
                </select>
            </div>
        </div>

        <br />

        <div class="card mb-3">
            <div class="row g-0 align-items-left">

                <div class="col-md-1  p-3">
                    <img src="https://placehold.co/80" class="img_card rounded-circle img-fluid">
                </div>

                <div class="col-md-10">
                    <div class="card-body">
                        <h5 class="card-title"> Nome do candidato / Tipo de contratação </h5>
                        <p class="card-text"> Área de atuação / Turno desejado </p>
                        <button class="botao_perfil" data-bs-toggle="modal" data-bs-target="#modal_perfil"> Ver perfil </button>
                    </div>
                </div>

            </div>
        </div>



        <div class="modal fade" id="modal_perfil">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h2> Nome do candidato </h2>
                        <button class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        Informações do candidato.
                    </div>
                    <div class="modal-footer">
                        <button data-bs-dismiss="modal"> Contratar </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    )

}