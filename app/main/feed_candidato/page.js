'use client'

import { useEffect, useState } from 'react'
import supabase from '../conexao/supabase'
import './feed_candidato.css'

export default function Feed() {

    // BOTAO CANDIDATURA: qual usuario esta logado? ligar o seu ID com o ID da vaga clicada
    // ALERT se deseja mesmo se candidatar
    // BLOQUEAR o botao após candidatura 

    // FILTROS funcionando

    // if tempo = favoravel -> arrumar os dados dentro da modal

    const [feedCandidato, alteraFeedCandidato] = useState([])

    async function buscarVagas() {
        const { data, error } = await supabase

            .from('cadastro_vagas')
            .select(`*, id_empresa(*)`)
            .eq('ativo', true)

        alteraFeedCandidato(data)

    }

     async function confirmacao(id) {
        const opcao = confirm("Tem certeza que deseja se candidatar a vaga?")
        if (opcao == false) {
            return
        }

        const obj = {
            id_vaga: id_vaga,
            id_usuario: id_usuario
        }

        const response = await supabase
            .from('vaga_candidato')
            .insert(obj)
    }


    function formataData(data) {
        let data_formatada = new Date(data)
        data_formatada = data_formatada.toLocaleDateString()
        return data_formatada
    }

    useEffect(() => {
        buscarVagas()
    }, [])

    return (

        <div>

            <form className="container-fluid d-flex justify-content-center">
                <div className="input-group">
                    <span className="input-group-text">🔍</span>
                    <input type="text" className="form-control" placeholder="Buscar vagas..." />
                </div>
            </form>

            <br />

            <div className="card_filtros">
                <div className="row g-3">

                    <div className="col-md-6">
                        <label className="form-label"> Turno </label>
                        <select className="form-select">
                            <option value="" selected disabled hidden> Todos </option>
                            <option value="matutino"> Matutino </option>
                            <option value="vespertino"> Vespertino </option>
                            <option value="noturno"> Noturno </option>
                        </select>
                    </div>

                    <div className="col-md-6">
                        <label className="form-label"> Tipo de contratação </label>
                        <select className="form-select">
                            <option value="" selected disabled hidden> Todos </option>
                            <option value="efetivo"> Efetivo </option>
                            <option value="temporario"> Temporário </option>
                        </select>
                    </div>

                </div>

            </div>

            <br />

            {
                feedCandidato.length == 0 ?
                    <h4>Sem registros no momento...</h4>
                    :
                    feedCandidato.map(
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
                                                            <h5 className="nome">{item.id_empresa.nome}</h5>
                                                            <p className="contratacao">{item.efetivo}</p>
                                                        </div>
                                                    </div>
                                                    <div className="row">

                                                        <div className="col-8">
                                                            <div className="info">
                                                                <p>{item.titulo}</p>
                                                                <p>|</p>
                                                                <p>{item.turno}</p>
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

                                                <p><strong> {item.id_empresa.nome} </strong></p>
                                                <p> {item.titulo} </p>

                                                <br />

                                                <p><strong>Área: </strong> {item.area} </p>
                                                <p><strong>Descrição: </strong> {item.descricao} </p>

                                                <br />

                                                <p><strong>Salário: </strong> {item.salario} </p>
                                                <p><strong>Tipo de contratação: </strong> {item.efetivo} </p>
                                                <p><strong>Modelo de trabalho: </strong> {item.descricao} </p>

                                                <br />

                                                <p>Data de publicação: {formataData(item.criado_em)} </p>


                                            </div>
                                            <div className="modal-footer">
                                                <button className="btn-padrao" data-bs-dismiss="modal" onClick={() => confirmacao(item.id)}> Candidatar-se </button>
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