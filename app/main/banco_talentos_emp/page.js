'use client'

import './banco_talentos_emp.css'
import supabase from '../conexao/supabase'
import { useEffect, useState } from 'react'

export default function bancoTalentosEmp() {

    const [bancoTalentos, alteraBancoTalentos] = useState([])

    async function buscaBanco() {

        const { data, error } = await supabase

            .from('banco_talentos')
            .select(`*, id_usuario(*)`)

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
                            <option disabled value=""> Todos </option>
                            <option value="matutino"> Matutino </option>
                            <option value="vespertino"> Vespertino </option>
                            <option value="noturno"> Noturno </option>
                        </select>
                    </div>

                    <div className="col-md-6">
                        <label className="form-label"> Tipo de contratação </label>
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
                bancoTalentos.length == 0 ?
                    <h2>Sem registros no momento...</h2>
                    :
                    bancoTalentos.map(
                        item =>
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
                                                        <h5 className="nome">{item.id_usuario.nome}</h5>
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
                                                        <button className="btn-padrao" data-bs-toggle="modal" data-bs-target="#modal_perfil">Ver perfil</button>
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
                                                <h2> {item.id_usuario.nome} </h2>
                                                <button className="btn-close" data-bs-dismiss="modal"></button>
                                            </div>
                                            <div className="modal-body">

                                                <img src="https://placehold.co/100" className="rounded-circle img-fluid d-block mx-auto" />

                                                <br />

                                                <p><strong>Nome:</strong> {item.id_usuario.nome}</p>
                                                <p><strong>Email:</strong> {item.id_usuario.email}</p>

                                                <br />

                                                <p><strong>Área: </strong> {item.area} </p>
                                                <p><strong>Turno de preferência: </strong> {item.turno} </p>
                                                <p><strong>Tipo de contratação: </strong> {item.contratacao} </p>
                                                <p><strong>Competências e Habilidades: </strong> {item.competencias} </p>

                                                <br />

                                                <p><strong>Currículo: </strong> {item.curriculo} </p>

                                                {
                                                    bancoTalentos.certificacoes == null ?
                                                    <p><strong>Certificações: </strong> Não informado. </p>
                                                    :
                                                    <p><strong>Certificações: </strong> {item.certificacoes} </p>
                                                }

                                                {
                                                    bancoTalentos.portfolio == null ?
                                                    <p><strong>Portfólio: </strong> Não informado. </p>
                                                    :
                                                    <p><strong>Portfólio: </strong> {item.portfolio} </p>
                                                }

                                            </div>
                                            <div className="modal-footer">
                                                <p><strong>Entrar em contato:</strong> {item.id_usuario.telefone}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                    )
            }


        </div>

    )

}