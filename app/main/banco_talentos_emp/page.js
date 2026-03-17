import './banco_talentos_emp.css'

export default function bancoTalentosEmp() {

    return (

        <div>
            <div class="titulo">
                <h2>Banco de Talentos</h2>
                <p>Encontre profissionais de São Carlos para sua empresa.</p>
            </div>

            <form className="container-fluid d-flex justify-content-center">
                <div className="input-group">
                    <span className="input-group-text">🔍</span>
                    <input type="text" className="form-control" placeholder="Buscar candidatos..." />
                </div>
            </form>

            <br />

            <div className="card_filtros">
                <div className="row g-3">

                    <div className="col-md-6">
                        <label className="form-label"> Turno </label>
                        <select className="form-select">
                            <option value="" selected disabled hidden> Todos </option>
                            <option value="matutino"> Matutino </option>
                            <option value="vespertino"> Vespertino </option>
                            <option value="noturno"> Noturno </option>
                        </select>
                    </div>

                    <div className="col-md-6">
                        <label className="form-label"> Tipo de contratação </label>
                        <select className="form-select">
                            <option value="" selected disabled hidden> Todos </option>
                            <option value="efetivo"> Efetivo </option>
                            <option value="temporario"> Temporário </option>
                        </select>
                    </div>

                </div>

            </div>

            <br />

            <div className="card">

                <div className="perfil">
                    <div className="col-12">
                        <div className="row">
                            <div className="col-1">
                                <div>
                                    <img src="https://placehold.co/70" className="rounded-circle img-fluid" />
                                </div>
                            </div>

                            <div className="col-11">
                                <div className="col-4">
                                    <div className="topo">
                                        <h5 className="nome">Nome Candidato</h5>
                                        <p className="contratacao">Tipo de contratação</p>
                                    </div>
                                </div>
                                <div className="row">

                                <div className="col-8">
                                    <div className="info">
                                        <p>Area</p>
                                        <p>|</p>
                                        <p>Turno</p>
                                    </div>
                                </div>
                                <div className="col-4 d-flex justify-content-end">
                                    <button className="btn-padrao" data-bs-toggle="modal" data-bs-target="#modal_perfil">Ver perfil</button>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


            </div>

            <div className="modal fade" id="modal_perfil">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h2> Nome da empresa </h2>
                            <button className="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div className="modal-body">

                            <p> Importar dados candidato </p>
                            <p> Importar dados do cadastro do banco de talentos </p>

                        </div>
                        <div className="modal-footer">
                            <button className="btn-padrao" data-bs-dismiss="modal"> Candidatar-se </button>
                        </div>
                    </div>
                </div>
            </div>

        </div>

    )

}