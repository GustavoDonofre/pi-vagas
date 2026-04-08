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

        const idsInscritos = inscricoes.map(vaga => vaga.id_vaga)

        const { data, error } = await supabase
            .from('cadastro_vagas')
            .select(`*, id_empresa(*)`)
            .eq('ativo', true)
            .not('id', 'in', `(${idsInscritos.join(',') || 0})`)

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

    /*async function alteraBusca() {
        const { data, error } = await supabase
            .from('cadastro_vagas')
            .select(`*, id_empresa(*)`)
            .ilike('', '%' + alteraBusca + '%') //like, como, parecido, no meio. % no começo e no final serve para pesquisar a palavra em qualquer posição

        alteraFeedCandidato(data)
    }*/


    useEffect(() => {
        buscarVagas()
    }, [])


    return (

        <div>

            <div className="titulo">
                <h2> Bem-Vindo </h2>
                <br />
                <p> Descubra oportunidades e encontre vagas cadastradas por empresas. </p>
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
                            <input type="text" className="form-control" placeholder="Buscar vagas..." onChange={(e) => alteraBusca(e.target.value)} />
                        </div>
                    </form>

                    <div className="col-4">
                        <label className="form-label"> Turno </label>
                        <select className="form-select" value={turno} onChange={(e) => alteraTurno(e.target.value)}>
                            <option hidden> Todos </option>
                            <option value="matutino"> Matutino </option>
                            <option value="vespertino"> Vespertino </option>
                            <option value="noturno"> Noturno </option>
                        </select>
                    </div>

                    <div className="col-4">
                        <label className="form-label"> Tipo de contratação </label>
                        <select className="form-select" value={tipo} onChange={(e) => alteraTipo(e.target.value)}>
                            <option hidden> Todos </option>
                            <option value="efetivo"> Efetivo </option>
                            <option value="temporario"> Temporário </option>
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
                    feedCandidato.map(
                        item =>
                            <div>

                                {/* Card da vaga */}
                                <div className="card">

                                    <div className="perfil">
                                        <div className="col-12">
                                            <div className="row">
                                                <div className="col-1">
                                                    <div>
                                                    <img src={PegaFotoPerfilPeloIDUsuario(item.id_empresa.id)} style={{ width: "90px" }} className="rounded-circle"
                                                        onError={(e) => {
                                                            e.target.onerror = null
                                                            e.target.src = "https://ui-avatars.com/api/?background=random&name=" + item.id_empresa.nome
                                                        }} />
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
                                                                <p>{item.descricao}</p>
                                                            </div>
                                                        </div>
                                                        <div className="col-4 d-flex justify-content-end">
                                                            <button className="btn-padrao" data-bs-toggle="modal" data-bs-target={`#modal_perfil_${item.id}`}>Ver vaga</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                                {/* Modal da vaga */}
                                <div className="modal fade" id={`modal_perfil_${item.id}`}>
                                    <div className="modal-dialog">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <button className="btn-close" data-bs-dismiss="modal"></button>
                                            </div>
                                            <div className="modal-body">

                                                <div className="justify-content-center">
                                                    <img src={PegaFotoPerfilPeloIDUsuario(item.id)} style={{ width: "80px" }} className="rounded-circle"
                                                        onError={(e) => {
                                                            e.target.onerror = null
                                                            e.target.src = "https://ui-avatars.com/api/?background=random&name=" + item.id_empresa.nome
                                                        }} />
                                                </div>

                                                <p className='text-center mt-3'><strong> {item.id_empresa.nome} </strong></p>

                                                <p className='text-center'><strong> Título: </strong> {item.titulo} </p>

                                                <br />

                                                <p><strong>Área: </strong> {item.area} </p>
                                                <p><strong>Descrição: </strong> {item.descricao} </p>

                                                <br />

                                                <p><strong>Salário: </strong> R${item.salario} </p>
                                                <p><strong>Tipo de contratação: </strong> {item.efetivo} </p>
                                                <p><strong>Modelo de trabalho: </strong> {item.presencial} </p>

                                                <br />

                                                <p>Data de publicação: {formataData(item.criado_em)}</p>

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