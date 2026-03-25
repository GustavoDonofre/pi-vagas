'use client'
import { useEffect, useState } from 'react'
import './empresa.css'
import supabase from '../conexao/supabase'
import { useParams } from 'next/navigation'

function Empresa() {
    const [atuacao, alteraAtucao] = useState("")
    const [descricao, alteraDescricao] = useState("")
    const [salario, alteraSalario] = useState()
    const [tipo_vaga, alteraTipo_vaga] = useState()
    const [modo_trabalho, alteraModo_trabalho] = useState()
    const [periodo, alteraPerido] = useState()

    const [vagas, alteraVagas] = useState ([])
    const [editando, alteraEditando] = useState(null)

   async function buscaVagas() {

        const { data, error } = await supabase
            .from('cadastro_vagas')
            .select()
        alteraVagas(data)
    }

    
    async function buscaTodos() {

        const { data, error } = await supabase
            .from('cadastro_vendas')
            .select(`*,
               id_empresa(*)
               `)

        console.log(data)

        alteraVagas(data)
    }

     async function excluir(id) {
        const opcao = confirm("Tem certeza que deseja excluir?")
        if (opcao == false) {
            return
        }

        const response = await supabase
        .from('cadastro_vagas')
        .delete()
        .eq('id', id)

    } 
     function editar(objeto) {
        alteraEditando(objeto.id)

    }


    function cancelaEdicao() {
        alteraEditando(null)
    }

    async function atualizar() {

        const objeto = {
            
        }
        const { error } = await supabase
            .from('cadastro_vagas')
            .update(objeto)
            .eq('id', editando)

            if (error == null) {
                alert ("Atualização realiza com sucesso!")
                cancelaEdicao ()
                buscaTodos ()
            }else {
                alert ("Dados Inválidos! Verifique os campos e tente novamente...")
            }
    }

    async function Cadastrar(e) {
        e.preventDefault()

        const objeto = {
            empresa: "empresa",
            descricao: "descricao",
            salario: " ",
            vaga: "vaga",
            modo: "modo",
            periodo: "periodo"
        }

        const { error } = await supabase
            .from('cadastro_vagas')
            .insert(objeto)
        console.log(error)

        buscaTodos()
    }




    useEffect(() => {

    }, [])
    return (
        <div>

            <div>

                <br />

                <div className="container d-flex justify-content-end">
                    <button className="botaoVaga" data-bs-toggle="modal" data-bs-target="#modalVaga"> Criar vaga </button>
                </div>
                <br />

                {/* barra superior com vagas */}
                <div class="card_info container">
                    <div class="row justify-content-center g-4">
                        <div class="col-md-4">
                            <div class="card p-2 text-center">
                                <p>Vagas ativas</p>
                                <p>0</p>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="card p-2 text-center">
                                <p>Total de candidatos</p>
                                <p>0</p>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="card p-2 text-center">
                                <p>Vagas publicadas</p>
                                <p>0</p>
                            </div>
                        </div>
                    </div>
                </div>
                <br />

                {/* card com as vagas */}
                <div class="card">
                    <h5 class="card-header">VAGA</h5>
                    <div class="card-body">
                        <h5 class="card-title">Status da vaga</h5>
                        <p class="card-text" >Descrição da vaga</p>
                        <a href="#" class="btn btn-primary">ver candidatos </a>
                        <td className="text-end">
                            <div className="dropdown">
                                <button className="btn btn-sm" data-bs-toggle="dropdown">
                                    ⋮
                                </button>
                                <ul className="dropdown-menu dropdown-menu-end">
                                    <li>
                                        <a className="dropdown-item" data-bs-toggle="modal" data-bs-target="#modalVaga">
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
                    </div>
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

            <div className="modal fade" id="modalVaga">
                <div className="modal-dialog">
                    <div className="modal-content">

                        <div className="modal-header">
                            <h5 className="modal-title"> Nova Vaga </h5>
                            <button className="btn-close" data-bs-dismiss="modal"></button>
                        </div>

                        <div className data-bs-toggle="modal" data-bs-target="#modalVaga">
                            <meta charset="UTF-8" />
                            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                            <title>Gerenciador de Vagas</title>


                            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet" />
                            <link rel="stylesheet" href="./pi_vagas.css" />

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
    )
}

export default Empresa;