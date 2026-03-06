import './empresa.css'

export default function Empresa() {
    return (
        <div>

            <div>

                <div classname="container d-flex justify-content-center">
                    <div className="input-group">
                        <span className="input-group-text">🔍</span>
                        <input type="text" className="form-control" placeholder="Buscar nas suas vagas..." />
                    </div>
                </div>

                <br />

                <div className="container d-flex justify-content-end">
                    <button className="botaoVaga" data-bs-toggle="modal" data-bs-target="#modalVaga"> Criar vaga </button>
                </div>

                <div className="modal fade" id="modalVaga">
                    <div className="modal-dialog">
                        <div className="modal-content">

                            <div className="modal-header">
                                <h5 className="modal-title"> Nova Vaga </h5>
                                <button className="btn-close" data-bs-dismiss="modal"></button>
                            </div>

                            <div class data-bs-toggle="modal" data-bs-target="#modalVaga"> 
                                <meta charset="UTF-8" />
                                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                                <title>Gerenciador de Vagas</title>


                                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet" />
                                <link rel="stylesheet" href="./pi_vagas.css" />


                                <div className="container d-flex justify-content-center align-items-center min-vh-100">
                                    <div className="card shadow-lg p-4 col-md-6">

                                        <h1 className="text-center mb-4">Cadastro de Vagas</h1>

                                        <form>

                                            <div className="mb-3">
                                                <label className="form-label">Empresa</label>
                                                <input type="text" className="form-control" placeholder="Nome da empresa" />
                                            </div>

                                            <div className="mb-3">
                                                <label className="form-label">Área de Atuação</label>
                                                <select className="form-select">
                                                    <option selected disabled>Selecione</option>
                                                    <option>T.I</option>
                                                    <option>Barman</option>
                                                    <option>Atendimento ao Cliente</option>
                                                </select>
                                            </div>

                                            <div className="mb-3">
                                                <label className="form-label">Descrição da Vaga</label>
                                                <textarea className="form-control" rows="3"></textarea>
                                            </div>

                                            <div className="mb-3">
                                                <label className="form-label">Salário</label>
                                                <div className="input-group">
                                                    <span className="input-group-text">R$</span>
                                                    <input type="number" className="form-control" placeholder="0,00" />
                                                </div>
                                            </div>

                                            <div className="mb-3">
                                                <label className="form-label">Tipo de Vaga</label>
                                                <select className="form-select">
                                                    <option selected disabled>Selecione</option>
                                                    <option>Efetiva</option>
                                                    <option>Freelancer</option>
                                                </select>
                                            </div>

                                            <div className="mb-3">
                                                <label className="form-label">Modo de Trabalho</label>
                                                <select className="form-select">
                                                    <option selected disabled>Selecione</option>
                                                    <option>Remoto</option>
                                                    <option>Híbrido</option>
                                                    <option>Presencial</option>
                                                </select>
                                            </div>

                                            <div className="mb-4">
                                                <label className="form-label">Período</label>
                                                <select className="form-select">
                                                    <option selected disabled>Selecione</option>
                                                    <option>Matutino</option>
                                                    <option>Vespertino</option>
                                                    <option>Noturno</option>
                                                </select>
                                            </div>

                                            <button type="submit" className="btn btn-warning">Cadastrar Vaga</button>

                                        </form>

                                    </div>
                                </div>

                            </div>
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