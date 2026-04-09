'use client'

import { useEffect, useState } from 'react'
import './minhas_candidaturas.css'
import supabase from '../conexao/supabase'
import { PegaFotoPerfilPeloIDUsuario } from '../conexao/bucket'

export default function MinhasCandidaturas() {

    const id_candidato = localStorage.getItem("id_usuario")

    const [minhasCandidaturas, alteraMinhasCandidaturas] = useState([])

    async function buscarCandidaturas() {

        const { data, error } = await supabase

            .from('inscricoes')
            .select(`*, id_vaga(*, id_empresa (*))`)
            .eq('id_candidato', id_candidato)
            .eq('ativo', true)
            .order('inscrito_em', { ascending: false })

        alteraMinhasCandidaturas(data)
    }

    async function cancelaCandidatura(id) {

        const opcao = confirm("Tem certeza que deseja CANCELAR sua candidatura?")

        if (!opcao) {
            return

        } else {
            alert("Candidatura cancelada com sucesso!")

            const { error } = await supabase
                .from('inscricoes')
                .update({ ativo: false })
                .eq('id_candidatura', id)

            if (error) {
                console.log(error)
            }

            buscarCandidaturas() // atualiza a pagina
        }
    }



    useEffect(() => {
        buscarCandidaturas()
    }, [])

    return (

        <div>

            <div className="titulo">
                <h2> Minhas Candidaturas </h2>
                <p> Nesta página, você pode conferir as vagas para as quais já se candidatou. </p>
                <p>  </p>
            </div>

            <br />
            <br />

            {
                minhasCandidaturas.length == 0 ?
                    <div>
                        <h5>Sem registros no momento...</h5>
                        <p>Explore as oportunidades em <strong> "Início" </strong> e dê o primeiro passo!</p>
                    </div>
                    :
                    minhasCandidaturas.map(
                        item =>
                            <div>
                                {/* Vagas Candidatadas */}
                                <div className="card">

                                    <div className="perfil">
                                        <div className="col-12">
                                            <div className="row">
                                                <div className="col-1">
                                                    <div className="justify-content-center">
                                                        <img src={PegaFotoPerfilPeloIDUsuario(item.id_vaga.id_empresa.id)} style={{ width: "90px" }} className="rounded-circle"
                                                            onError={(e) => {
                                                                e.target.onerror = null
                                                                e.target.src = "https://ui-avatars.com/api/?background=random&name=" + item.id_vaga.id_empresa.nome
                                                                e.target.style.width = "90px"
                                                            }} />
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
                                                            <button className="btn-acao" data-bs-dismiss="modal" onClick={() => cancelaCandidatura(item.id_candidatura)}> Cancelar Candidatura </button>
                                                        </div>
                                                    </div>
                                                </div>
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