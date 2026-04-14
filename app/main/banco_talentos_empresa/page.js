'use client'

import './banco_talentos_emp.css'
import supabase from '../conexao/supabase'
import { useEffect, useState } from 'react'
import { PegaCurriculoPeloIDUsuario, PegaFotoPerfilPeloIDUsuario } from '../conexao/bucket'

export default function bancoTalentosEmp() {

    const id_empresa = localStorage.getItem("id_usuario")

    const [bancoTalentos, alteraBancoTalentos] = useState([])
    const [candidatoInscrito, alteraCandidatoInscrito] = useState(null)

    const [filtroTurno, alteraFiltroTurno] = useState("")
    const [filtroContratacao, alteraFiltroContratacao] = useState("")
    const [idCandidato, alteraIdCandidato] = useState([])

    async function buscaBanco() {

        const { data, error } = await supabase

            .from('banco_talentos')
            .select(`*, id_candidato(*)`)

        alteraBancoTalentos(data)

    }

    useEffect(() => {
        buscaBanco()
    }, [])

    return (

        <div>
            <div className="titulo">
                <h2>Banco de Talentos</h2>
                <p>Encontre profissionais de São Carlos para sua empresa.</p>
            </div>

            <br />

            <div className="card_filtros">

                <div className="row g-3">

                    <div className="col-md-6">
                        <label className="form-label" value={filtroTurno} onChange={(e) => alteraFiltroTurno(e.target.value)}> Disponibilidade de turno </label>
                        <select className="form-select">
                            <option disabled value=""> Todos </option>
                            <option value="matutino"> Matutino </option>
                            <option value="vespertino"> Vespertino </option>
                            <option value="noturno"> Noturno </option>
                        </select>
                    </div>

                    <div className="col-md-6">
                        <label className="form-label" value={filtroContratacao} onChange={(e) => alteraFiltroContratacao(e.target.value)}> Tipo de contratação </label>
                        <select className="form-select">
                            <option disabled value=""> Todos </option>
                            <option value="efetivo"> Efetivo </option>
                            <option value="temporario"> Temporário </option>
                        </select>
                    </div>

                </div>

            </div>

            <br />

            {
                bancoTalentos.length == null ?
                    <h4>Sem registros no momento...</h4>
                    :
                    <div className="row justify-content-center">
                        {
                            bancoTalentos.map(
                                (item, index) =>

                                    <div className="col-5 mb-3">
                                        <div className="card">
                                            <div className="perfil">
                                                <div className="col-12">
                                                    <div className="row">
                                                        <div className="col-1">
                                                            <div>
                                                                <img src={PegaFotoPerfilPeloIDUsuario(item.id_candidato.id)} style={{ width: "90px" }} className="rounded-circle"
                                                                    onError={(e) => {
                                                                        e.target.onerror = null
                                                                        e.target.src = "https://ui-avatars.com/api/?background=random&name=" + item.id_candidato.nome
                                                                        e.target.style.width = "90px"
                                                                    }} />
                                                            </div>
                                                        </div>
                                                        <div className="col-11 ">

                                                            <div className="col-6">
                                                                <h5 className="nome">{item.id_candidato.nome}</h5>
                                                            </div>

                                                            <div className="row">

                                                                <div className="col-8">
                                                                    <div className="info">
                                                                        <p>{item.turno}</p>
                                                                        <p>|</p>
                                                                        <p>{item.contratacao}</p>
                                                                    </div>
                                                                </div>
                                                                <div className="col-4 d-flex justify-content-end">
                                                                    <button className="btn-padrao" data-bs-toggle="modal" data-bs-target="#modal_perfil" onClick={() => alteraCandidatoInscrito(item)}>Ver perfil</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>


                                        {/* modal perfil do usuario */}
                                        <div className="modal fade" id="modal_perfil">
                                            <div className="modal-dialog">
                                                <div className="modal-content">
                                                    {
                                                        candidatoInscrito && (

                                                            <div>
                                                                <div className="modal-header">
                                                                    <button className="btn-close" data-bs-dismiss="modal"></button>
                                                                </div>
                                                                <div className="modal-body">

                                                                    <div className="d-flex justify-content-center">
                                                                        <img src={PegaFotoPerfilPeloIDUsuario(candidatoInscrito.id_candidato.nome)} style={{ width: "90px" }} className="rounded-circle"
                                                                            onError={(e) => {
                                                                                e.target.onerror = null
                                                                                e.target.src = "https://ui-avatars.com/api/?background=random&name=" + candidatoInscrito.id_candidato.nome
                                                                                e.target.style.width = "90px"
                                                                            }} />
                                                                    </div>

                                                                    <br />

                                                                    <h3 className='text-center'><strong>{candidatoInscrito.id_candidato.nome}</strong></h3>

                                                                    <br />

                                                                    <p><label className='text-muted small'><i className="bi bi-envelope"></i> Email:</label> {candidatoInscrito.id_candidato.email}</p>
                                                                    <p><label className='text-muted small'><i className="bi bi-tags"></i> Área:</label> {candidatoInscrito.id_candidato.area_atuacao}</p>

                                                                    <br />

                                                                    <p><label className='text-muted small'><i className="bi bi-hourglass me-2 text-danger"></i>Turno:</label> {candidatoInscrito.turno}</p>
                                                                    <p><label className='text-muted small'><i className="bi bi-file-earmark-check me-2 text-warning"></i>Contratação:</label> {candidatoInscrito.contratacao}</p>
                                                                    <p><label className='text-muted small'><i className="bi bi-file-earmark-person me-2 text-success"></i>Competências e Habilidades:</label> {candidatoInscrito.competencias}</p>

                                                                    <br />

                                                                    <p><label className='text-muted small'><i className="bi bi-file-earmark-text"></i> Currículo:</label><a target='_blank' href={PegaCurriculoPeloIDUsuario(candidatoInscrito.id_candidato.id)}> Acessar curriculo </a> </p>
                                                                    <p><label className='text-muted small'><i className="bi bi-file-earmark-richtext"></i> Portfolio:</label>{candidatoInscrito.portfolio ? (<a href={candidatoInscrito.portfolio} target="_blank" rel="noopener noreferrer"> Acessar portfolio </a>)
                                                                        :
                                                                        (<p>Não informado</p>)
                                                                    } </p>

                                                                </div>
                                                                <div className="modal-footer">
                                                                    <p><strong>Entrar em contato:</strong>
                                                                        <a href={`https://api.whatsapp.com/phone=${candidatoInscrito.id_candidato.telefone}&text=${encodeURIComponent(
                                                                            "Olá, vi seu perfil no Conecta Sanca e gostaria de falar com você.")}`}>
                                                                            <img style={{ width: "50px" }} src='https://img.freepik.com/vetores-premium/logo-de-midia-social-verde_197792-4213.jpg?semt=ais_hybrid&w=740&q=80' />
                                                                        </a></p>
                                                                </div>

                                                            </div>
                                                        )
                                                    }

                                                </div>
                                            </div>
                                        </div>

                                    </div>

                            )
                        }
                    </div>
            }



        </div >

    )

}