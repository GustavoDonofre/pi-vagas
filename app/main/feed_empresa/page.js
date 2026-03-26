'use client'
import { useEffect, useState } from 'react'
import './empresa.css'
import supabase from '../conexao/supabase'
import { useParams } from 'next/navigation'

function Empresa() {
    const params = useParams ()

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
    const [editando, alteraEditando] = useState(null)

    async function buscaVagas() {

        const { data, error } = await supabase
            .from('cadastro_vagas')
            .select()

        console.log(error)
        console.log(data)
        alteraVagasExibir(data)

    }

   

    async function buscaTodos() {

        const { data, error } = await supabase
            .from('vaga_candidato')
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
    }
    buscaTodos

    async function VerCandidatos(id_vaga) {
       
        const { data } = await supabase
            .from(vaga_candidato)
            .select('*')
            .eq('id_vaga', id_vaga)

        if (error == null) {
            alteraCanditados(data)
        } else {
            console.log (error)
        }

        console.log(data)
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


    useEffect(() => {
        buscaVagas()
        buscaTodos()
    }, [])


    return (
        <div>

            <div>

                <br />

                <div className="container d-flex justify-content-end">
                    <button className="botaoVaga" data-bs-toggle="modal" data-bs-target="#modalVaga" > Criar vaga </button>
                </div>
                <br />

                {/* barra superior com vagas */}
                <div className="card_info container">
                    <div className="row justify-content-center g-4">
                        <div className="col-md-4">
                            <div className="card p-2 text-center">
                                <p>Vagas ativas</p>
                                <p>0</p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card p-2 text-center">
                                <p>Total de candidatos</p>
                                <p>0</p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card p-2 text-center">
                                <p>Vagas publicadas</p>
                                <p>0</p>
                            </div>
                        </div>
                    </div>
                </div>
                <br />

                <div className='col-12'>
                    <div className='row'>
                        {
                            vagasExibir.length == 0 ? (
                                <p>Nenhum Candidato Inscrito...</p>
                            )
                                :
                                vagasExibir.map(
                                    item =>

                                        <div className="col-6 mb-2">
                                            <div className='card'>
                                                <h5 className="card-header">VAGA</h5>
                                                <div className="card-body">
                                                    <p><strong>Nome: </strong> {item.area}</p>
                                                    <p><strong>Email: </strong></p>
                                                    <h5 className="card-title">Status da vaga</h5>
                                                    <p className="card-text" >Descrição da vaga</p>
                                                    <a className="btn btn-padrao text-light" data-bs-toggle="modal" data-bs-targe="#modalCandidatos" onClick={() => VerCandidatos(item.id)} > ver candidatos </a>
                                                    <div className="text-end">
                                                        <div className="dropdown">
                                                            <button className="btn btn-sm" data-bs-toggle="dropdown">
                                                                ⋮
                                                            </button>
                                                            <ul className="dropdown-menu dropdown-menu-end">
                                                                <li>
                                                                    <a className="dropdown-item" data-bs-toggle="modal" data-bs-target="#modalVaga"> Editar vaga </a>
                                                                </li>

                                                                <li>
                                                                    <a className="dropdown-item text-danger"> Excluir vaga </a>
                                                                </li>
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
                                    <textarea className="form-control" rows="3" value={empresa} onChange={(e) => alteraEmpresa(e.target.value)}></textarea>
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
    )
}

export default Empresa;