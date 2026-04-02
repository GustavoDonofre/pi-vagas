'use client'
import { useEffect, useState } from 'react'
import './empresa.css'
import supabase from '../conexao/supabase'
import { useParams } from 'next/navigation'
import { PegaCurriculoPeloIDUsuario } from '../conexao/bucket'

function Empresa() {
    const params = useParams()

    const [empresa, alteraEmpresa] = useState("")
    const [atuacao, alteraAtucao] = useState("")
    const [descricao, alteraDescricao] = useState("")
    const [salario, alteraSalario] = useState()
    const [tipo_vaga, alteraTipo_vaga] = useState()
    const [modo_trabalho, alteraModo_trabalho] = useState()
    const [periodo, alteraPerido] = useState()

    const [candidatos, alteraCanditados] = useState([])

    const [vagas, alteraVagas] = useState([])

    const [vagasExibir, alteraVagasExibir] = useState([])
    const [inscricoesExibir, alteraInscricoesExibir] = useState([])
    const [editando, alteraEditando] = useState(null)

    async function buscaVagas() {

        const { data, error } = await supabase
            .from('cadastro_vagas')
            .select()

        alteraVagasExibir(data)

    }

    async function buscaInscricoes() {

        const { data, error } = await supabase
            .from('inscricoes')
            .select('*, id_candidato, id_vaga')

        alteraInscricoesExibir(data)

    }

    async function buscaTodos() {

        const { data, error } = await supabase
            .from('vaga_candidato')
            .select(`*,
               id_empresa(*)
               `)

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

        alteraAtucao(objeto.atuacao)
        alteraDescricao(objeto.descricao)
        alteraSalario(objeto.salario)
        alteraTipo_vaga(objeto.tipo_vaga)
        alteraModo_trabalho(objeto.modo_trabalho)
        alteraPerido(objeto.periodo)

    }


    function cancelaEdicao() {
        alteraEditando(null)
    }

    async function atualizar() {

        const objeto = {
            empresa: empresa,
            descricao: descricao,
            salario: "",
            vagas: vagas,
            modo: modo_trabalho,
            periodo: periodo
        }
        const { error } = await supabase
            .from('cadastro_vagas')
            .update(objeto)
            .eq('id', editando)

        if (error == null) {
            alert("Atualização realiza com sucesso!")
            cancelaEdicao()
            buscaTodos()
        } else {
            alert("Dados Inválidos! Verifique os campos e tente novamente...")
        }

        buscaTodos()
    }

    async function VerCandidatos(id_vaga) {
        console.log("vaga: " + id_vaga)
        const { data, error } = await supabase
            .from('inscricoes')
            .select('*, usuarios!vaga_candidato_id_candidato_fkey(*)')
            .eq('id_vaga', id_vaga)

        console.log(data)
        if (!error) {
            alteraCanditados(data)
        } else {
            console.log(error)
        }
    }

    async function Cadastrar(e) {
        e.preventDefault()

        const objeto = {
            empresa: empresa,
            descricao: descricao,
            salario: "",
            vagas: vagas,
            modo: modo_trabalho,
            periodo: periodo
        }

        const { error } = await supabase
            .from('cadastro_vagas')
            .insert(objeto)
        console.log(error)

        buscaTodos()
    }

    async function encerrarVaga(id_vaga) {
        const confirmar = confirm("Deseja encerrar essa vaga?")

        if (!confirmar) return

        const { error } = await supabase
            .from('incricoes')
            .update({ ativo: 'true' })
            .eq('id_vaga', id_vaga)

        if (error) {
            alert("erro ao encerrar vaga")
            console.log(error)
        } else {
            alert("Vaga encerrada com sucesso!")
            buscaVagas()
        }
    }

    const vagasAtivas = vagasExibir.filter(v => v.status !== 'encerrada').length

    const vagasPublicadas = vagasExibir.length

    const totalCandidatos = inscricoesExibir.length

    useEffect(() => {
        buscaVagas()
        buscaTodos()
        buscaInscricoes()
    }, [])


    return (

        <div>

            <div>

                <br />


                <br />

                {/* barra superior com vagas */}
                <div className='col-12'>
                    <div className="card_info container">
                        <div className="row justify-content-center g-4">
                            <div className="col-md-4">
                                <div className="card p-2 text-center">
                                    <p>Vagas ativas</p>
                                    <p>{vagasAtivas}</p>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="card p-2 text-center">
                                    <p>Total de candidatos</p>
                                    <p>{totalCandidatos}</p>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="card p-2 text-center">
                                    <p>Vagas publicadas</p>
                                    <p>{vagasPublicadas}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="d-flex justify-content-end pt-2">
                        <button className="botaoVaga btn-padrao" onClick={() => window.location.href = "/main/vagas"} > Criar vaga </button>

                    </div>
                </div>
                <br />

                <div className='col-12'>
                    <div className='row'>
                        {
                            vagasExibir.length == 0 ? (
                                <p>Nenhuma vaga cadastrada...</p>
                            )
                                :
                                vagasExibir.map(
                                    item =>

                                        <div className="col-md-6 mb-4">
                                            <div className='card shadow-sm h-100 border-0'>
                                                <h5 className="card-header d-flex justify-content-between align-items-center fw-bold">VAGA</h5>
                                                <div className= "card-body">


                                                    <p><strong>{item.area} </strong></p>
                                                    <p><strong>    </strong></p>
                                                    <p className="card-text" >Descrição da vaga</p>
                                                    <a className="btn btn-padrao text-light" data-bs-toggle="modal" data-bs-target="#modalCandidatos" onClick={() => VerCandidatos(item.id)} > ver candidatos </a>
                                                    <div className="text-end">
                                                        <div className="dropdown">
                                                            <button className="btn btn-sm" data-bs-toggle="dropdown">
                                                                ⋮
                                                            </button>

                                                            <div className="position-relative">
                                                                <h5 className="card-title">Status da vaga</h5>

                                                            </div>
                                                            <div>
                                                                <a className="btn btn-padrao btn-sm" data-bs-toggle="modal" data-bs-target="#modalCandidatos" onClick={() => encerrarVaga(item.id)} > Encerrar Vaga </a>

                                                                <ul className="dropdown-menu dropdown-menu-end">
                                                                    <li>
                                                                        <button className="dropdown-item" data-bs-toggle="modal" data-bs-target="#modalVaga" onClick={() => editar(item.Cadastrar)}> ✏️ Editar vaga </button>
                                                                    </li>
                                                                    <li>
                                                                        <button className="dropdown-item text-danger" onClick={() => excluir(item.id)} >🗑️ Excluir vaga </button>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                )
                        }

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
                                {/* CONTEUDO */}

                                {
                                    candidatos.length == 0 ?
                                        <p>Nenhum candidato inscrito... </p>
                                        :
                                        (
                                            <div>
                                                {candidatos.map((usuario, index) => (
                                                    <div className='card mb-3' item={index}>
                                                        <div className="card-body">
                                                            <h6 className="card-title"><i class="bi bi-person"></i> Nome: {usuario.usuarios.nome}</h6>
                                                            <p className="card-text" ><i class="bi bi-envelope"></i> Email: {usuario.usuarios.email}</p>
                                                            <p className='card-text'><i class="bi bi-telephone"></i>Telefone: {usuario.usuarios.contato}</p>
                                                            <a target='_blank' href={PegaCurriculoPeloIDUsuario(usuario.usuarios.id)} class="btn btn-padrao"><i class="bi bi-file-earmark"></i> Ver Currículo</a>
                                                            <hr />
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )
                                }

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

                                <div data-bs-toggle="modal" data-bs-target="#modalVaga">
                                    <title>Gerenciador de Vagas</title>


                                    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet" />
                                    <link rel="stylesheet" href="./pi_vagas.css" />

                                    <h1 className="text-center mb-4">Cadastro de Vagas</h1>

                                    <form onSubmit={Cadastrar}>

                                        <div className="mb-3">
                                            <label className="form-label">Empresa</label>
                                            <input type="text" className="form-control" placeholder="Nome da empresa" value={empresa} onChange={(e) => alteraEmpresa(e.target.value)} />
                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label">Área de Atuação</label>
                                            <select className="form-select" value={atuacao} onChange={(e) => alteraAtucao(e.target.value)}>
                                                <option selected disabled>Selecione</option>
                                                <option>T.I</option>
                                                <option>Barman</option>
                                                <option>Atendimento ao Cliente</option>
                                            </select>
                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label">Descrição da Vaga</label>
                                            <textarea className="form-control" rows="3" value={descricao} onChange={(e) => alteraDescricao(e.target.value)}></textarea>
                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label">Salário</label>
                                            <div className="input-group">
                                                <span className="input-group-text">R$</span>
                                                <input type="number" className="form-control" placeholder="0,00" value={salario} onChange={(e) => alteraSalario(e.target.value)} />
                                            </div>
                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label">Tipo de Vaga</label>
                                            <select className="form-select" value={tipo_vaga} onChange={(e) => alteraTipo_vaga(e.target.value)}>
                                                <option selected disabled>Selecione</option>
                                                <option>Efetiva</option>
                                                <option>Freelancer</option>
                                            </select>
                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label">Modo de Trabalho</label>
                                            <select className="form-select" value={modo_trabalho} onChange={(e) => alteraModo_trabalho(e.target.value)}>
                                                <option selected disabled>Selecione</option>
                                                <option>Remoto</option>
                                                <option>Híbrido</option>
                                                <option>Presencial</option>
                                            </select>
                                        </div>

                                        <div className="mb-4">
                                            <label className="form-label">Período</label>
                                            <select className="form-select" value={periodo} onChange={(e) => alteraPerido(e.target.value)}>
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
        </div>

    )
}

export default Empresa;