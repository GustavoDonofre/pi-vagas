import './empresa.css'

export default function Empresa() {
    return (
        <div>

            <div>

                <form classname="container d-flex justify-content-center">
                    <div className="input-group">
                        <span className="input-group-text">🔍</span>
                        <input type="text" className="form-control" placeholder="Buscar nas suas vagas..." />
                    </div>
                </form>

                <br />

                <div className="container d-flex justify-content-end">
                    <button className="botaoVaga" data-bs-toggle="modal" data-bs-target="#modalVaga"> Criar vaga </button>
                </div>

                <div className="modal fade" id="modalVaga">
                    <div className="modal-dialog">
                        <div className="modal-content">

                            <div className="modal-header">
                                <h5 className="modal-title"> Título </h5>
                                <button className="btn-close" data-bs-dismiss="modal"></button>
                            </div>

                            <div className="modal-body">
                                Cadastro de vagas da Gi
                            </div>
                            <p>oiiiiiiii</p>
                        </div>
                    </div>
                </div>

                <br />

                <div className="container d-flex justify-content-center">

                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col"> Vaga </th>
                                <th scope="col"> Status </th>
                                <th scope="col"> Candidatos </th>
                                <th scope="col"> Publicada em </th>
                                <th className="text-end"> Ações </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row"> Nome da vaga </th>
                                <td> Ativa </td>
                                <td> Ex. 12 </td>
                                <td> Data </td>
                                <td className="text-end">
                                    <div className="dropdown">
                                        <button className="btn btn-sm" data-bs-toggle="dropdown">
                                            ⋮
                                        </button>

                                        <ul className="dropdown-menu dropdown-menu-end">
                                            <li>
                                                <a className="dropdown-item" data-bs-toggle="modal" data-bs-target="#modalEditar">
                                                    Editar vaga
                                                </a>
                                            </li>
                                            <li>
                                                <a className="dropdown-item" data-bs-toggle="modal"
                                                    data-bs-target="#modalCandidatos">
                                                    Ver candidatos
                                                </a>
                                            </li>
                                            <li>
                                                <a className="dropdown-item text-danger">
                                                    Excluir vaga
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row"> Nome da vaga </th>
                                <td> Encerrada </td>
                                <td> 3 </td>
                                <td> Data </td>
                                <td className="text-end">
                                    <div className="dropdown">
                                        <button className="btn btn-sm" data-bs-toggle="dropdown">
                                            ⋮
                                        </button>

                                        <ul className="dropdown-menu dropdown-menu-end">
                                            <li>
                                                <a className="dropdown-item" data-bs-toggle="modal" data-bs-target="#modalEditar">
                                                    Editar vaga
                                                </a>
                                            </li>
                                            <li>
                                                <a className="dropdown-item" data-bs-toggle="modal"
                                                    data-bs-target="#modalCandidatos">
                                                    Ver candidatos
                                                </a>
                                            </li>
                                            <li>
                                                <a className="dropdown-item text-danger">
                                                    Excluir vaga
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row"> Nome da vaga </th>
                                <td> Pausada? </td>
                                <td> 8 </td>
                                <td> Data </td>
                                <td className="text-end">
                                    <div className="dropdown">
                                        <button className="btn btn-sm" data-bs-toggle="dropdown">
                                            ⋮
                                        </button>

                                        <ul className="dropdown-menu dropdown-menu-end">
                                            <li>
                                                <a className="dropdown-item" data-bs-toggle="modal" data-bs-target="#modalEditar">
                                                    Editar vaga
                                                </a>
                                            </li>
                                            <li>
                                                <a className="dropdown-item" data-bs-toggle="modal"
                                                    data-bs-target="#modalCandidatos">
                                                    Ver candidatos
                                                </a>
                                            </li>
                                            <li>
                                                <a className="dropdown-item text-danger">
                                                    Excluir vaga
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                </div>

                <div className="modal fade" id="modalEditar">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">

                            <div className="modal-header">
                                <h5 className="modal-title">Editar Vaga</h5>
                                <button className="btn-close" data-bs-dismiss="modal"></button>
                            </div>

                            <div className="modal-body">

                            </div>

                            <div className="modal-footer">
                                <button data-bs-dismiss="modal">Cancelar</button>
                                <button>Salvar alterações</button>
                            </div>

                        </div>
                    </div>
                </div>

                <div className="modal fade" id="modalCandidatos">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">

                            <div className="modal-header">
                                <h5 className="modal-title">Candidatos</h5>
                                <button className="btn-close" data-bs-dismiss="modal"></button>
                            </div>

                            <div className="modal-body">

                            </div>

                        </div>
                    </div>
                </div>


            </div>
        </div>
    )
}