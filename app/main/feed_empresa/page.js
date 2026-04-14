'use client'
import { useEffect, useState } from 'react'
import './empresa.css'
import supabase from '../conexao/supabase'
import { useParams } from 'next/navigation'
import { PegaCurriculoPeloIDUsuario } from '../conexao/bucket'
import 'bootstrap/js/dist/dropdown.js'
import { Router } from 'next/router'
import { Tiro_Bangla } from 'next/font/google'

function Empresa() {
    const params = useParams()

    const [empresa, alteraEmpresa] = useState("")
    const [titulo, alteraTitulo] = useState("")
    const [area, alteraArea] = useState("")
    const [descricao, alteraDescricao] = useState("")
    const [salario, alteraSalario] = useState()
    const [efetivo, alteraEfetivo] = useState()
    const [presencial, alteraPresencial] = useState()
    const [turno, alteraTurno] = useState()

    const [candidatos, alteraCanditados] = useState([])

    const [vagas, alteraVagas] = useState([])

    const [quantidadeCandidatos, alteraQuantidadeCandidatos] = useState(0);
    const [vagasExibir, alteraVagasExibir] = useState([])
    const [vagasAtivasExibir, alteraVagasAtivas] = useState([])
    const [inscricoesExibir, alteraInscricoesExibir] = useState([])
    const [editando, alteraEditando] = useState(null)

    const id_empresa = localStorage.getItem("id_usuario")
    const [id_vaga, alteraId_vaga] = useState([])

    async function buscaTodasVagas() {

        const { data, error } = await supabase
            .from('cadastro_vagas')
            .select()

        console.log(data)
        alteraId_vaga(data.id)

    }
    async function buscaVagasIdEmpresa() {

        const { data, error } = await supabase
            .from('cadastro_vagas')
            .select()
            .eq("id_empresa", id_empresa)
            .eq("ativo", true)

        alteraVagasAtivas(data)
        alteraVagasExibir(data)

    }

    async function buscaInscricoes() {

        const { data, error } = await supabase
            .from('inscricoes')
            .select('*, id_candidato(*), id_vaga(*)')
            .eq('id_vaga', id_vaga.id)


        console.log(id_vaga.id)
        console.log(error)
        console.log(data)
        alteraInscricoesExibir(data.lenght)

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

    function editar(id) {

        { window.location.href = "/main/vagas?editando=" + id }

        alteraEditando(objeto.id)

        alteraTitulo(objeto.titulo)
        alteraArea(objeto.area)
        alteraDescricao(objeto.descricao)
        alteraSalario(objeto.salario)
        alteraEfetivo(objeto.efetivo)
        alteraPresencial(objeto.presencial)
        alteraTurno(objeto.turno)

    }


    function cancelaEdicao() {
        alteraEditando(null)

        alteraTitulo("")
        alteraArea("")
        alteraDescricao("")
        alteraSalario("")
        alteraEfetivo("")
        alteraPresencial("")
        alteraTurno("")

    }

    async function atualizar() {

        const objeto = {
            empresa: id_empresa,
            titulo: titulo,
            area: area,
            descricao: descricao,
            salario: salario,
            efetivo: vagas,
            presencial: presencial,
            turno: turno
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
            id_empresa: id_empresa,
            titulo: titulo,
            area: area,
            descricao: descricao,
            salario: salario,
            efetivo: vagas,
            presencial: presencial,
            turno: turno
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
            .from('cadastro_vagas')
            .update({ ativo: false })
            .eq('id', id_vaga)

        if (error) {
            alert("erro ao encerrar vaga")
            console.log(error)
        } else {
            alert("Vaga encerrada com sucesso!")
            alteraVagasAtivas()
            window.location.reload()
        }
    }

    const vagasAtivas = vagasExibir.filter(v => v.ativo !== false).length

    const vagasPublicadas = vagasExibir.length

    const totalCandidatos = inscricoesExibir.length

    useEffect(() => {
        buscaVagasIdEmpresa()
        buscaTodos()
        buscaTodasVagas()
        buscaInscricoes()
    }, [])

    useEffect(() => {
        if (vagasAtivasExibir == null)
            return

        buscaQuantidadeVaga()
        async function buscaQuantidadeVaga() {

            const ids = vagasAtivasExibir.map(vaga => vaga.id)
            console.log(ids)

            const { data, error } = await supabase
                .from('inscricoes')
                .select()
                .in("id_vaga", ids)

            alteraQuantidadeCandidatos(data.length)

        }

    }, [vagasAtivasExibir])


    return (

        <div>

            <div className="titulo">
                <h2> Bem-Vindo </h2>
                <br />
                <p> Publique vagas e descubra novos talentos. </p>
            </div>

            <div>

                <br />


                <br />


                {/* barra superior com vagas */}
                <div className='col-12'>
                    <div className="row">
                        <div className="col-2 d-flex align-items-center justify-content-start">
                            <button className="btn-padrao" onClick={() => window.location.href = "/main/vagas"} > Criar vaga </button>
                        </div>
                        <div className="card card_menor col-3 rounded-4 shadow-sm p-2 text-center">
                            <h5>Vagas ativas</h5>
                            <h5>{vagasAtivas}</h5>
                        </div>
                        <div className="card card_menor col-3 rounded-4 p-2 shadow-sm text-center">
                            <h5>Total de candidatos</h5>
                            <h5>{quantidadeCandidatos}</h5>
                        </div>
                        <div className="card card_menor col-3 rounded-4 shadow-sm p-2 text-center">
                            <h5>Vagas publicadas</h5>
                            <h5>{vagasPublicadas}</h5>
                        </div>

                    </div>
                </div>
                <br />

                <div className='col-12'>
                    <div className='row me-5'>
                        {
                            vagasExibir.length == 0 ? (
                                <p>Nenhuma vaga cadastrada...</p>
                            )
                                :
                                vagasExibir.map(
                                    item =>
                                        <div className="col-md-6">
                                            <div className='card shadow-sm' style={{ borderRadius: "15px" }}>
                                                <h5 className="card-header text-center fw-bold">{item.titulo}</h5>
                                                <div className="card-body">
                                                    <p> <label className='text-muted small'><i className="bi bi-tags"></i> Área: </label> {item.area} </p>
                                                    <p> <label className='text-muted small'><i className="bi bi-card-text me-1"></i> Descrição da vaga: </label> {item.descricao}</p>
                                                    <p> <label className='text-muted small'><i className="bi bi-cash-coin me-2 text-success"></i> Salário:</label> R$ {item.salario}</p>
                                                    <p> <label className='text-muted small'><i className="bi bi-file-earmark-check me-2 text-warning"></i> Contrato: </label> {item.efetivo}</p>
                                                    <p> <label className='text-muted small'><i className="bi bi-geo-alt me-2 text-danger"></i> Modo: </label> {item.presencial}</p>
                                                    <p> <label className='text-muted small'><i className="bi bi-hourglass me-2 text-success"></i>Turno: </label> {item.turno}</p>
                                                    <div className='col-12 d-flex justify-content-end'>
                                                        <div className="btn-group dropend text-end">
                                                            <button type="button" className="btn-padrao" data-bs-toggle="dropdown" aria-expanded="false">
                                                                Ações
                                                            </button>
                                                            <ul className="dropdown-menu">
                                                                <li> <a className="dropdown-item" data-bs-toggle="modal" data-bs-target="#modalCandidatos" onClick={() => VerCandidatos(item.id)}> <i class="bi bi-person me-2"></i> Ver candidatos</a></li>
                                                                <li><a className="dropdown-item" data-bs-toggle="modal" data-bs-target="#modalVaga" onClick={() => editar(item.id)}> <i class="bi bi-pencil me-2"></i> Editar vaga</a></li>
                                                                <li><a className="dropdown-item" onClick={() => encerrarVaga(item.id)}><i class="bi bi-trash me-2"></i>Encerrar Vaga</a></li>
                                                            </ul>
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
                                            <label className="form-label">{id_empresa}</label>
                                            <input type="text" className="form-control" placeholder="Nome da empresa" value={empresa} onChange={(e) => alteraEmpresa(e.target.value)} />
                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label">Área de Atuação</label>
                                            <select className="form-select" value={area} onChange={(e) => alteraArea(e.target.value)}>
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
                                            <select className="form-select" value={efetivo} onChange={(e) => alteraEfetivo(e.target.value)}>
                                                <option selected disabled>Selecione</option>
                                                <option value={true}>Efetiva</option>
                                                <option value={false}>Freelancer</option>
                                            </select>
                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label">Modo de Trabalho</label>
                                            <select className="form-select" value={presencial} onChange={(e) => alteraModo_trabalho(e.target.value)}>
                                                <option selected disabled>Selecione</option>
                                                <option>Remoto</option>
                                                <option>Híbrido</option>
                                                <option>Presencial</option>
                                            </select>
                                        </div>

                                        <div className="mb-4">
                                            <label className="form-label">Período</label>
                                            <select className="form-select" value={turno} onChange={(e) => alteraPerido(e.target.value)}>
                                                <option selected disabled>Selecione</option>
                                                <option>Matutino</option>
                                                <option>Vespertino</option>
                                                <option>Noturno</option>
                                            </select>
                                        </div>

                                        {
                                            editando != null ?
                                                <div>
                                                    <button onClick={atualizar}>Atualizar</button>
                                                    <button onClick={() => cancelaEdicao()}>Cancelar</button>
                                                </div>
                                                :
                                                <button type="submit" className="btn btn-warning">Cadastrar Vaga</button>
                                        }




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