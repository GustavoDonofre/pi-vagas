'use client'

import './editar_perfil.css'
import supabase from '../conexao/supabase'
import { useEffect, useState } from 'react'

export default function EditarPerfil() {

    //fazer o botao editar funcionar
    //deixar os campos obrigatorios
    //selecionar apenas o usuario logado

    const [editaCandidato, alteraEditaCandidato] = useState([])

    const [nome, alteraNome] = useState()
    const [email, alteraEmail] = useState()
    const [senha, alteraSenha] = useState()
    const [telefone, alteraTelefone] = useState()
    const [endereco, alteraEndereco] = useState()
    const [area, alteraArea] = useState()

    const [editando, alteraEditando] = useState()
    async function buscaCandidato() { //Busca no bando de dados infomações do usuario

        const { data, error } = await supabase
            .from('usuarios')
            .select()
        alteraEditaCandidato(data)
    }

    function editar(objeto) { //objeto (no botao) q estou editando

        alteraNome(objeto.nome)
        alteraEmail(objeto.email)
        alteraSenha(objeto.senha)
        alteraTelefone(objeto.telefone)
        alteraEndereco(objeto.endereco)
        alteraArea(objeto.area)

        alteraEditando(objeto.id)
    }

    function cancelaEdicao() { //limpar campos

        alteraNome("")
        alteraEmail("")
        alteraSenha("")
        alteraTelefone("")
        alteraEndereco("")
        alteraArea("")

        alteraEditando(null)

    }

    async function atualizar() {

        const obj = {
            nome: nome,
            email: email,
            senha: senha,
            telefone: telefone,
            endereco: endereco,
            area: area
        }

        const { error } = await supabase
            .from('usuarios')
            .update(obj)
            .eq('id', editando)

        if (error == null) {
            alert("Atualização realizada com sucesso!")
            cancelaEdicao() /* limpa os campos */
            buscaCandidato() /* atualiza a pg */
        } else {
            alert("Dados inválidos! Verifique os campos e tente novamente...")
        }
    }

    async function salvar(e) {

        const obj = {
            nome: nome,
            email: email,
            senha: senha,
            telefone: telefone,
            endereco: endereco,
            area: area
        }

        console.log(obj)

        const { error } = await supabase.from('usuarios').insert(obj)
        console.log(error)

    }

    useEffect(() => {
        buscaCandidato()
    }, [])


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
                buscaCandidato.length == 0 ?
                    <p></p>
                    :
                    buscaCandidato.map(
                        item =>

                            <div className="card">

                                <div className="card-body">

                                    <h5 className="mb-4">Dados pessoais</h5>

                                    <div className="row">

                                        <div className="col-md-6 mb-3">
                                            <label>Nome: </label>
                                            <input className="form-control" value={nome} onChange={e => alteraNome(e.target.value)} />
                                        </div>

                                        <div className="col-md-6 mb-3">
                                            <label>E-mail: </label>
                                            <input className="form-control" value={email} onChange={e => alteraEmail(e.target.value)} />
                                        </div>

                                        <div className="col-md-6 mb-3">
                                            <label>Senha: </label>
                                            <input className="form-control" type='password' value={senha} onChange={e => alteraSenha(e.target.value)} />
                                        </div>

                                        <div className="col-md-6 mb-3">
                                            <label>CPF: </label>
                                            <input className="form-control" disabled value={item.cpf} />
                                        </div>

                                        <div className="col-md-6 mb-3">
                                            <label>Telefone: </label>
                                            <input className="form-control" value={telefone} onChange={e => alteraTelefone(e.target.value)} />
                                        </div>

                                        <div className="col-md-6 mb-3">
                                            <label>Endereço: </label>
                                            <input className="form-control" value={endereco} onChange={e => alteraEndereco(e.target.value)} />
                                        </div>

                                        <div className="col-md-6 mb-3">
                                            <label>Área: </label>
                                            <input className="form-control" value={area} onChange={e => alteraArea(e.target.value)} />
                                        </div>

                                        <div className="mt-4 d-flex justify-content-center ">

                                            <button className="btn-padrao me-4" onClick={() => salvar()}>Salvar Alterações</button>
                                            <button className="btn-padrao" onClick={() => cancelaEdicao()}>Cancelar</button>

                                        </div>

                                    </div>

                                </div>

                            </div>
                
                    )

            }

        </div>

    )

}