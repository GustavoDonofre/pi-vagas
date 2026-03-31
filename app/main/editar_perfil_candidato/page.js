'use client'

import './editar_perfil.css'
import supabase from '../conexao/supabase'
import { useEffect, useState } from 'react'

export default function EditarPerfil() {

    const id_candidato = localStorage.getItem("id_usuario")

    // Arrumar editar foto
    // Salvar o pdf do curriculo
    // fora isso, funfona :)

    //const [cpf, alteraCpf] = useState()
    //const [email, alteraEmail] = useState()
    //const [senha, alteraSenha] = useState()
    const [nome, alteraNome] = useState("")
    const [dataNascimento, alteraDataNascimento] = useState("")
    const [telefone, alteraTelefone] = useState("")
    const [endereco, alteraEndereco] = useState("")
    const [area, alteraArea] = useState("")
    const [curriculo, alteraCurriculo] = useState("")

    const [listaUsuarios, alteraListaUsuarios] = useState([])

    //const [editando, alteraEditando] = useState()

    async function buscaUsuario() {

        const { data, error } = await supabase
            .from('usuarios')
            .select()
            .eq('id', id_candidato)

        alteraListaUsuarios(data)
        editar(data[0]) // chama a função editar para que apareça no input

    }

    function editar(objeto) {

        //alteraEditando(objeto.id)

        //alteraEmail(objeto.email)
        //alteraCpf(objeto.cpf)
        //alteraSenha(objeto.password)
        alteraNome(objeto.nome)
        alteraDataNascimento(objeto.data_nasc)
        alteraTelefone(objeto.contato)
        alteraEndereco(objeto.endereco)
        alteraArea(objeto.area_atuacao)
        alteraCurriculo(objeto.curriculo)

    }

    function cancelaEdicao() { //limpa os campos

        //alteraCpf("")
        //alteraEmail("")
        //alteraSenha("")
        alteraNome("")
        alteraTelefone("")
        alteraEndereco("")
        alteraArea("")
        //alteraCurriculo("") COMO LIMPAR PDF? 

    }

    async function salvar(e) { //salvar 

        e.preventDefault()

        const obj = {
            //cpf: cpf,
            //email: email,
            //password: senha,
            nome: nome,
            contato: telefone,
            endereco: endereco,
            area_atuacao: area,
            //curriculo: curriculo,
            data_nasc: dataNascimento 
        }

        const { error } = await supabase
            .from('usuarios')
            .update(obj)
            .eq('id', id_candidato )

        if (error == null) {
            alert("Atualização realizada com sucesso!")
            //cancelaEdicao() /* limpa os campos */
            buscaUsuario() /* atualiza a pg */

        } else {
            alert("Dados inválidos! Verifique os campos e tente novamente...")
        }

        console.log(error)

    }

    useEffect(() => {
        buscaUsuario()
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
                listaUsuarios.map(
                    item =>
                        <div className="card">

                            <div className="card-body">

                                <h5 className="mb-4">Dados pessoais</h5>

                                <form>

                                    <div className="row">

                                        <div className="col-md-6 mb-3">
                                            <label>Nome: </label>
                                            <input type="text" className="form-control" value={nome} onChange={e => alteraNome(e.target.value)}/>
                                        </div>

                                        <div className="col-md-6 mb-3">
                                            <label>CPF: </label>
                                            <input type="text" className="form-control" value={item.cpf} disabled />
                                        </div>

                                        <div className="col-md-6 mb-3">
                                            <label>E-mail: </label>
                                            <input type="email" className="form-control" value={item.email} disabled />
                                        </div>

                                        <div className="col-md-6 mb-3">
                                            <label>Senha: </label>
                                            <input type='password' className="form-control" value={item.senha} disabled />
                                        </div>

                                        <div className="col-md-6 mb-3"> 
                                            <label>Data de Nascimento: </label>
                                            <input type='date' className="form-control" value={dataNascimento} onChange={e => alteraDataNascimento(e.target.value)} />
                                        </div>

                                        <div className="col-md-6 mb-3">
                                            <label>Telefone: </label>
                                            <input type="text" className="form-control" value={telefone} onChange={e => alteraTelefone(e.target.value)} />
                                        </div>

                                        <div className="col-md-6 mb-3">
                                            <label>Endereço: </label>
                                            <input className="form-control" value={endereco} onChange={e => alteraEndereco(e.target.value)} />
                                        </div>

                                        <div className="col-md-6">
                                            <label>Área: </label>
                                            <input className="form-control" value={area} onChange={e => alteraArea(e.target.value)} />
                                        </div>

                                        <div className="col-md-6">
                                            <label>Currículo: </label>
                                            <input className="form-control" type="file" accept=".pdf" onChange={e => alteraCurriculo(e.target.files[0])}/>
                                        </div> 

                                        <div className="mt-4 d-flex justify-content-center">

                                            <button className="btn-padrao me-4" onClick={salvar}>Salvar Alterações</button>
                                            <button className="btn-padrao" onClick={cancelaEdicao}>Cancelar</button>

                                        </div>

                                    </div>

                                </form>

                            </div>

                        </div>
                )
            }

        </div >

    )

}