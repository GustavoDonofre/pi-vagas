'use client'

import './editar_perfil.css'
import supabase from '../conexao/supabase'
import { useEffect, useState } from 'react'

export default function EditarPerfil() {

    //pq caraios eu to puxando os dados do usuaro? tem q alterar

    const [buscaUsuarios, alteraBuscaUsuarios] = useState([])

    async function buscaUsuarios() {

        const { data, error } = await supabase

            .from('usuarios')
            .select(`*, id_usuario(*)`)
    }

    /*async function Salvar(e) {
        e.preventDefault()

        const SalvarPerfil = {
            
        }

    useEffect*/


    return (

        <div>

            <div className="foto mb-4">
                <h2>Editar Perfil</h2>
                <p>Atualize suas informações pessoais.</p>

                <br />

                <img src="https://placehold.co/100" className="rounded-circle" />
                <br />
                <button className="btn-padrao mt-3"> Editar foto </button>
            </div>

            {
                buscaUsuarios.length == 0 ?
                    <p></p>
                    :
                    bancoTalentos.map(
                        item =>

                            <div className="card">

                                <div className="card-body">

                                    <h5 className="mb-4">Dados pessoais</h5>

                                    <div className="row">

                                        <div className="col-md-6 mb-3">
                                            <label>Nome: </label>
                                            <input className="form-control" />
                                        </div>

                                        <div className="col-md-6 mb-3">
                                            <label>E-mail: </label>
                                            <input className="form-control" />
                                        </div>

                                        <div className="col-md-6 mb-3">
                                            <label>CPF: </label>
                                            <input className="form-control" />
                                        </div>

                                        <div className="col-md-6 mb-3">
                                            <label>Telefone: </label>
                                            <input className="form-control" />
                                        </div>

                                        <div className="col-md-6 mb-3">
                                            <label>Endereço: </label>
                                            <input className="form-control" />
                                        </div>

                                        <div className="col-md-6 mb-3">
                                            <label>Área: </label>
                                            <input className="form-control" />
                                        </div>

                                        <div className="mt-4 d-flex justify-content-center ">
                                            <button className="btn-padrao">Salvar Alterações</button>
                                        </div>

                                    </div>

                                </div>

                            </div>

                    )

            }

        </div>

    )
}