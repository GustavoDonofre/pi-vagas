'use client'

import { useEffect, useState } from 'react'
import './minhas_candidaturas.css'

export default function MinhasCandidaturas() {

    // puxar os dados da tabela vaga_candidato (dados da vaga)
    // dar um jeito de aparecer o status (em analise / contatado / não selecionado)
    // cancelar candidatura?
    // filtro para o mais recente? 

    const [minhasCandidaturas, alteraMinhasCandidaturas] = useState([])

    async function buscarCandidaturas() {
        const { data, error } = await supabase

            .from('vaga_candidato')
            .select(`*, id_vaga(*, id_empresa(id, nome))`)

        alteraMinhasCandidaturas(data)

    }

    useEffect(() => {
        buscarCandidaturas()
    }, [])

    return (

        <div>

            <div className="titulo">
                <h2> Minhas Candidaturas </h2>
            </div>

            <br />
            <br />

            <div class="card_info container">
                <div class="row justify-content-center g-4">

                    <div class="col-md-4">
                        <div class="card total_vagas p-2 text-center">
                            <p><strong>Total</strong></p>
                            <p>0</p>
                        </div>
                    </div>

                    <div class="col-md-4">
                        <div class="card contatado_vagas p-2 text-center">
                            <p><strong>Contatado</strong></p>
                            <p>0</p>
                        </div>
                    </div>

                    <div class="col-md-4">
                        <div class="card analise_vagas p-2 text-center">
                            <p><strong>Em análise</strong></p>
                            <p>0</p>
                        </div>
                    </div>

                </div>
            </div>

            {
                minhasCandidaturas.length == 0 ?
                    <h5>Sem registros no momento...</h5>
                    :
                    minhasCandidaturas.map(
                        item =>
                            <div>
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
                                                            <h5 className="nome">{item.id_vaga.id_empresa.nome}</h5>
                                                            <p className="contratacao">{item.id_vaga.efetivo}</p>
                                                        </div>
                                                    </div>
                                                    <div className="row">

                                                        <div className="col-8">
                                                            <div className="info">
                                                                <p>{item.id_vaga.titulo}</p>
                                                                <p>|</p>
                                                                <p>{item.id_vaga.turno}</p>
                                                            </div>
                                                        </div>
                                                        <div className="col-4 d-flex justify-content-end">
                                                            <button className="btn-padrao" data-bs-toggle="modal" data-bs-target="#modal_perfil">Ver vaga</button>
                                                        </div>
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
                                                <h4> {item.id_empresa.nome} </h4>
                                                <button className="btn-close" data-bs-dismiss="modal"></button>
                                            </div>
                                            <div className="modal-body">

                                                <img src="https://placehold.co/100" className="rounded-circle img-fluid d-block mx-auto" />

                                                <p><strong> {item.id_vaga.id_empresa.nome} </strong></p>
                                                <p> {item.id_vaga.titulo} </p>

                                                <br />

                                                <p><strong>Área: </strong> {item.id_vaga.area} </p>
                                                <p><strong>Descrição: </strong> {item.id_vaga.descricao} </p>

                                                <br />

                                                <p><strong>Salário: </strong> {item.id_vaga.salario} </p>
                                                <p><strong>Tipo de contratação: </strong> {item.id_vaga.efetivo} </p>
                                                <p><strong>Modelo de trabalho: </strong> {item.id_vaga.descricao} </p>

                                                <br />

                                                <p>Data de publicação: {formataData(item.id_vaga.criado_em)} </p>


                                            </div>
                                            <div className="modal-footer">
                                                <button className="btn-padrao" data-bs-dismiss="modal" onClick={() => cancelarCandidtura(item.id)}> Cancelar </button>
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