'use client'

import { useEffect, useState } from 'react'
import supabase from '../conexao/supabase'
import './feed_candidato.css'
import { PegaFotoPerfilPeloIDUsuario } from '../conexao/bucket'

export default function Feed() {

    const id_candidato = localStorage.getItem("id_usuario")
    const [feedCandidato, alteraFeedCandidato] = useState([])

    const [busca, alteraBusca] = useState("")
    const [turno, alteraTurno] = useState("")
    const [tipo, alteraTipo] = useState("")


    async function buscarVagas() {

        const { data: inscricoes } = await supabase
            .from('inscricoes')
            .select('id_vaga')
            .eq('id_candidato', id_candidato)

        const idsInscritos = inscricoes?.map(vaga => vaga.id_vaga) || []

        let query = supabase
            .from('cadastro_vagas')
            .select(`*, id_empresa(*)`)
            .eq('ativo', true)

        if (idsInscritos.length > 0) {
            query = query.not('id', 'in', `(${idsInscritos.join(',')})`)
        }
        console.log(busca);
        console.log(turno);
        console.log(tipo);

        if (turno && turno !== "Todos") {
            query = query.eq('turno', turno)
        }

        if (tipo && tipo !== "Todos") {
            query = query.eq('efetivo', tipo)
        }

        const { data, error } = await query

        if (error) {
            console.error("Erro ao buscar vagas:", error)
        } if (busca) {
            const termo = busca.toLowerCase()
            const filtrados = data.filter(item => {
                return (
                    item.titulo?.toLowerCase().includes(termo) ||
                    item.descricao?.toLowerCase().includes(termo) ||
                    item.area?.toLowerCase().includes(termo) ||
                    item.turno?.toLowerCase().includes(termo) ||
                    item.id_empresa?.nome?.toLowerCase().includes(termo) // BUSCA NO NOME DA EMPRESA
                )
            })
            alteraFeedCandidato(filtrados)
        } else {
            alteraFeedCandidato(data)
        }
    }

    async function confirmacao(id) {

        const opcao = confirm("Tem certeza que deseja se candidatar a vaga?")

        if (opcao == false) {
            return

        } else {
            alert("Candidatura realizada com sucesso!")

            const obj = {
                id_vaga: id,
                id_candidato: id_candidato
            }

            const response = await supabase
                .from('inscricoes')
                .insert([obj])

            buscarVagas()
        }

    }

    function formataData(data) {
        let data_formatada = new Date(data)
        data_formatada = data_formatada.toLocaleDateString();

        return data_formatada;
    }

    useEffect(() => {
        buscarVagas()
    }, [busca, turno, tipo]) // Sempre que um desses mudar, a função será executada


    return (

        <div>

            <div className="titulo">
                <h2> Bem-Vindo </h2>
                <br />
                <p> Explore vagas recentemente publicadas por empresas e candidate-se às que combinam com seu perfil. </p>
            </div>

            <br />

            {/* Filtros */}
            <div className="card_filtros">

                {/* Barra de pesquisa */}
                <div className="row">
                    <form className="col-4">
                        <label className="form-label"> Barra de pesquisa </label>
                        <div className="input-group">
                            <span className="input-group-text">🔍</span>
                            <input type="text" className="form-control" placeholder="Buscar vagas..." value={busca} onChange={(e) => alteraBusca(e.target.value)} />
                        </div>
                    </form>

                    <div className="col-4">
                        <label className="form-label"> Turno </label>
                        <select className="form-select" value={turno} onChange={(e) => alteraTurno(e.target.value)}>
                            <option value=""> Todos </option>
                            <option value="matutino"> Matutino </option>
                            <option value="vespertino"> Vespertino </option>
                            <option value="noturno"> Noturno </option>
                        </select>
                    </div>

                    <div className="col-4">
                        <label className="form-label"> Tipo de contratação </label>
                        <select className="form-select" value={tipo} onChange={(e) => alteraTipo(e.target.value)}>
                            <option value=""> Todos </option>
                            <option value="efetiva"> Efetivo </option>
                            <option value="freelancer"> Temporário </option>
                        </select>
                    </div>

                </div>

            </div>

            <br />
            <br />

            {
                feedCandidato.length == 0 ?
                    <h4>Sem registros no momento...</h4>
                    :
                    <div className="row justify-content-center">
                        {
                            feedCandidato.map(item =>

                                <div className="col-5">
                                    <div className="card">
                                        <div className="perfil">
                                            <div className="col-12">
                                                <div className="row">
                                                    <div className="col-1">
                                                        <img
                                                            src={PegaFotoPerfilPeloIDUsuario(item.id_empresa.id)}
                                                            style={{ width: "80px" }}
                                                            className="rounded-circle"
                                                            onError={(e) => {
                                                                e.target.onerror = null
                                                                e.target.src = "https://ui-avatars.com/api/?background=random&name=" + item.id_empresa.nome
                                                                e.target.style.width = "90px"
                                                            }}
                                                        />
                                                    </div>

                                                    <div className="col-11">

                                                        <div className="col-6">
                                                            <div className="topo">
                                                                <h5 className="nome">{item.id_empresa.nome}</h5>
                                                                <p className="contratacao">{item.turno}</p>
                                                            </div>
                                                        </div>

                                                        <div className="row">

                                                            <div className="col-8">
                                                                <div className="info">
                                                                    <p>{item.titulo}</p>
                                                                    <p>|</p>
                                                                    <p>{item.efetivo}</p>
                                                                </div>
                                                            </div>

                                                            <div className="col-4 d-flex justify-content-end">
                                                                <button className="btn-padrao" data-bs-toggle="modal" data-bs-target={`#modal_perfil_${item.id}`}> Ver vaga </button>
                                                            </div>

                                                        </div>

                                                    </div>

                                                </div>
                                            </div>
                                        </div>

                                    </div>

                                    {/* Modal */}
                                    <div className="modal fade" id={`modal_perfil_${item.id}`}>
                                        <div className="modal-dialog">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <button className="btn-close" data-bs-dismiss="modal"></button>
                                                </div>
                                                <div className="modal-body">

                                                    <div className="d-flex justify-content-center">
                                                        <img
                                                            src={PegaFotoPerfilPeloIDUsuario(item.id_empresa.id)}
                                                            style={{ width: "100px" }}
                                                            className="rounded-circle"
                                                            onError={(e) => {
                                                                e.target.onerror = null
                                                                e.target.src = "https://ui-avatars.com/api/?background=random&name=" + item.id_empresa.nome
                                                                e.target.style.width = "90px"
                                                            }}
                                                        />
                                                    </div>

                                                    <h3 className='text-center mt-3'><strong>{item.id_empresa.nome}</strong></h3>

                                                    <br />

                                                    <p className='text-center'><label className='text-muted'><i className="bi bi-briefcase me-2"></i> Título:</label> {item.titulo}</p>
                                                    <p className='text-center'> <label className='text-muted small'><i className="bi bi-briefcase me-2"></i> Localização:</label> {item.id_empresa.endereco}</p>

                                                    <br />

                                                    <p><label className='text-muted small'><i className="bi bi-card-text me-1"></i>Descrição:</label> {item.descricao}</p>
                                                    <p><label className='text-muted small'><i className="bi bi-tags"></i> Área:</label> {item.area}</p>

                                                    <br />

                                                    <p><label className='text-muted small'><i className="bi bi-cash-coin me-2 text-success"></i>Salário:</label> R${item.salario}</p>
                                                    <p><label className='text-muted small'><i className="bi bi-hourglass me-2 text-success"></i>Turno:</label> R${item.turno}</p>
                                                    <p><label className='text-muted small'><i className="bi bi-file-earmark-check me-2 text-warning"></i>Tipo de contratação:</label> {item.efetivo}</p>
                                                    <p><label className='text-muted small'><i className="bi bi-geo-alt me-2 text-danger"></i>Modelo de trabalho:</label> {item.presencial}</p>

                                                    <br />

                                                    <p className='text-muted small'><i className="bi bi-calendar-event me-2"></i>Data de publicação: {formataData(item.criado_em)}</p>

                                                </div>

                                                <div className="modal-footer">
                                                    <button
                                                        className="btn-padrao"
                                                        data-bs-dismiss="modal"
                                                        onClick={() => confirmacao(item.id)}
                                                    >
                                                        Candidatar-se
                                                    </button>
                                                </div>

                                            </div>
                                        </div>
                                    </div>

                                </div>
                            )
                        }
                    </div>
            }

        </div>

    )
}