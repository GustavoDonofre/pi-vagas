'use client'

import { useEffect, useState } from 'react'
import supabase from '../conexao/supabase'
import './feed_candidato.css'

export default function Feed() {

    // Arrumar para candidato logado
    // Arrumar filtros

    const [feedCandidato, alteraFeedCandidato] = useState([])
    const [candidaturas, alteraCandidaturas] = useState([])

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

        } else {
            alert("Candidatura realizada com sucesso!")

            const obj = {
                id_vaga: id,
                id_usuario: 3
            }

            const response = await supabase
                .from('vaga_candidato')
                .insert([obj])

            buscarVagas() // atualiza a pagina? 
            buscarCandidaturas() // atualiza a pagina? 
        }

    }

    async function buscarCandidaturas() {

        const { data, error } = await supabase

            .from('vaga_candidato')
            .select('id_vaga')
            .eq('id_usuario', 3) // Me de o ID da vaga onde o Id_usuario é equivalente a 3

        const idVagas = data.map(item => item.id_vaga) // Lista dessas vagas
        alteraCandidaturas(idVagas) // Guarda a lista
    }

    const vagasFiltradas = feedCandidato.filter(item => !candidaturas.includes(item.id)) 
    // .filter = cria uma nova lista, contendo apenas os elementos da lista original que passam em um teste especifico
    // se item.id esta em candidaturas (includes é true) -> false (!)
    // se item.id não esta em candidaturas (includes é false) -> true (!)
    // assim, mostra no feed as vagas que ele NAO se candidatou

    useEffect(() => {
        buscarVagas()
        buscarCandidaturas()
    }, [])

    return (

        <div>
            {/* Barra de pesquisa */}
            <form className="container-fluid d-flex justify-content-center">
                <div className="input-group">
                    <span className="input-group-text">🔍</span>
                    <input type="text" className="form-control" placeholder="Buscar vagas..." />
                </div>
            </form>

            <br />

            {/* Filtros */}
            <div className="card_filtros">
                <div className="row g-3">

                    <div className="col-md-6">
                        <label className="form-label"> Turno </label>
                        <select className="form-select">
                            <option hidden> Todos </option>
                            <option value="matutino"> Matutino </option>
                            <option value="vespertino"> Vespertino </option>
                            <option value="noturno"> Noturno </option>
                        </select>
                    </div>

                    <div className="col-md-6">
                        <label className="form-label"> Tipo de contratação </label>
                        <select className="form-select">
                            <option hidden> Todos </option>
                            <option value="efetivo"> Efetivo </option>
                            <option value="temporario"> Temporário </option>
                        </select>
                    </div>

                </div>

            </div>

            <br />

            {
                vagasFiltradas.length == 0 ?
                    <h4>Sem registros no momento...</h4>
                    :
                    vagasFiltradas.map(
                        item =>
                            <div>

                                {/* Card da vaga */}
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

                                {/* Modal da vaga */}
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