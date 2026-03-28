'use client'

import './editar_perfil.css'
import supabase from '../conexao/supabase'
import { useEffect, useState } from 'react'

export default function EditarPerfil() {

    // Arrumar para candidato logado


    //const [nome, alteraNome] = useState()
    //const [cpf, alteraCpf] = useState()
    //const [email, alteraEmail] = useState()
    //const [senha, alteraSenha] = useState()
    const [telefone, alteraTelefone] = useState()
    const [endereco, alteraEndereco] = useState()
    const [area, alteraArea] = useState()
    const [curriculo, alteraCurriculo] = useState("")
    const [dataNascimento, alteraDataNascimento] = useState()

    const [listaUsuarios, alteraListaUsuarios] = useState([])

    const [editando, alteraEditando] = useState()

    async function buscaUsuario() { //buscar usuario no banco

        const { data, error } = await supabase
            .from('usuarios')
            .select()

        alteraListaUsuarios(data)

    }

    function editar(objeto) { //editar objeto

        alteraEditando(objeto.id)

        //alteraNome(objeto.nome)
        //alteraEmail(objeto.email)
        //alteraCpf(objeto.cpf)
        //alteraSenha(objeto.senha)
        alteraTelefone(objeto.telefone)
        alteraEndereco(objeto.endereco)
        alteraArea(objeto.area)
        alteraCurriculo(objeto.curriculo)
        alteraDataNascimento(objeto.dataNascimento)

    }

    function cancelaEdicao() { //limpa os campos

        //alteraNome("")
        //alteraCpf("")
        //alteraEmail("")
        //alteraSenha("")
        alteraTelefone("")
        alteraEndereco("")
        alteraArea("")
        //alteraCurriculo("") COMO LIMPAR PDF? 

    }

    async function salvar(e) { //salvar 

        e.preventDefault()

        const obj = {
            //nome: nome,
            //cpf: cpf,
            //email: email,
            //password: senha,
            telefone: telefone,
            endereco: endereco,
            area: area,
            curriculo: curriculo,
            data_nasc: dataNascimento 
        }

        const { error } = await supabase
            .from('usuarios')
            .update(obj)
            .eq('id', 3)

        if (error == null) {
            alert("Atualização realizada com sucesso!")
            cancelaEdicao() /* limpa os campos */
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

                                <form onSubmit={salvar}>

                                    <div className="row">

                                        <div className="col-md-6 mb-3">
                                            <label>Nome: </label>
                                            <input type="text" className="form-control" value={item.nome} disabled />
                                        </div>

                                        <div className="col-md-6 mb-3">
                                            <label>CPF: </label>
                                            <input type="text" className="form-control" value={item.cpf} disabled />
                                        </div>

                                        <div className="col-md-6 mb-3">
                                            <label>E-mail: </label>
                                            <input type="email" className="form-control" value={item.email} disabled />
                                        </div>

                                        <div className="col-md-6 mb-3"> {/* Desabilitar senha? */}
                                            <label>Senha: </label>
                                            <input type='password' className="form-control" value={item.senha} disabled />
                                        </div>

                                        <div className="col-md-6 mb-3"> 
                                            <label>Data de Nascimento: </label>
                                            <input type='date' className="form-control" value={dataNascimento} onChange={e => alteraDataNascimento(e.target.value)} />
                                        </div>

                                        <div className="col-md-6 mb-3">
                                            <label>Telefone: </label>
                                            <input type="text" placeholder="EX:(XX) XXXXX-XXXX" className="form-control" value={telefone} onChange={e => alteraTelefone(e.target.value)} />
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

                                            <button className="btn-padrao me-4" type="submit">Salvar Alterações</button>
                                            <button className="btn-padrao" onClick={() => cancelaEdicao()}>Cancelar</button>

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