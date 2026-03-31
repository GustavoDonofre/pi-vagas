'use client'

import './banco_talentos_emp.css'
import supabase from '../conexao/supabase'
import { useEffect, useState } from 'react'

export default function bancoTalentosEmp() {

    //const id_empresa = localStorage.getItem("id_empresa")
    // Arrumar empresa que esta logada

    // Arrumar filtros
    // foto do candidato
    // curriculo e pdf para a empresa baixar

    const [bancoTalentos, alteraBancoTalentos] = useState([])
    const [candidatoInscrito, alteraCandidatoInscrito] = useState(null)

    const [filtroTurno, alteraFiltroTurno] = useState("")
    const [filtroContratacao, alteraFiltroContratacao] = useState("")

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
                    bancoTalentos.map(
                        (item, index) =>
                            <div className="card mb-3" key={item.id}>

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
                                                        <h5 className="nome">{item.id_candidato.nome}</h5>
                                                        <p className="contratacao">{item.contratacao}</p>
                                                    </div>
                                                </div>
                                                <div className="row">

                                                    <div className="col-8">
                                                        <div className="info">
                                                            <p>{item.turno}</p>
                                                            <p>|</p>
                                                            <p>{item.area}</p>
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




                                {/* modal do perfil do usuario */}
                                <div className="modal fade" id="modal_perfil">
                                    <div className="modal-dialog">
                                        <div className="modal-content">
                                            {
                                                candidatoInscrito && (
                                                    <div>
                                                        <div className="modal-header">
                                                            <h2> {candidatoInscrito.id_candidato.nome} </h2>
                                                            <button className="btn-close" data-bs-dismiss="modal"></button>
                                                        </div>
                                                        <div className="modal-body">

                                                            <img src="https://placehold.co/100" className="rounded-circle img-fluid d-block mx-auto" />

                                                            <br />

                                                            <p><strong>Nome:</strong> {candidatoInscrito.id_candidato.nome}</p>
                                                            <p><strong>Email:</strong> {candidatoInscrito.id_candidato.email}</p>

                                                            <br />

                                                            <p><strong>Área: </strong> {candidatoInscrito.area} </p>
                                                            <p><strong>Turno de preferência: </strong> {candidatoInscrito.turno} </p>
                                                            <p><strong>Tipo de contratação desejável: </strong> {candidatoInscrito.contratacao} </p>
                                                            <p><strong>Competências e Habilidades: </strong> {candidatoInscrito.competencias} </p>

                                                            <br />

                                                            <p><strong>Currículo: </strong> {candidatoInscrito.curriculo} </p>

                                                            {
                                                                candidatoInscrito.certificacoes == null ?
                                                                    <p><strong>Certificações: </strong> Não informado. </p>
                                                                    :
                                                                    <p><strong>Certificações: </strong> {candidatoInscrito.certificacoes} </p>
                                                            }

                                                            {/*
                                                                candidatoInscrito.portfolio == null ?
                                                                    <p><strong>Portfólio: </strong> Não informado. </p>
                                                                    :
                                                                    <p><strong>Portfólio: </strong> {candidatoInscrito.portfolio} </p>
                                                            */}

                                                            {
                                                                candidatoInscrito.portfolio == null ?
                                                                    <p><strong>Portfólio: </strong> Não informado.</p> 
                                                                    :
                                                                    <p><strong>Portfólio: </strong> <a  href={ candidatoInscrito.portfolio } > Acessar portfólio </a> </p>
                                                            }

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

    )

}