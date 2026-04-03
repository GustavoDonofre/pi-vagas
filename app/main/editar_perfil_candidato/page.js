'use client'

import './editar_perfil.css'
import supabase from '../conexao/supabase'
import { useEffect, useState } from 'react'
import { PegaCurriculoPeloIDUsuario } from '../conexao/bucket'

export default function EditarPerfil() {

    const id_candidato = localStorage.getItem("id_usuario")

    const [nome, alteraNome] = useState("")
    const [dataNascimento, alteraDataNascimento] = useState("")
    const [telefone, alteraTelefone] = useState("")
    const [endereco, alteraEndereco] = useState("")
    const [area, alteraArea] = useState("")

    const [curriculo, alteraCurriculo] = useState(null)
    const [listaUsuarios, alteraListaUsuarios] = useState([])

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

        alteraNome(objeto.nome)
        alteraDataNascimento(objeto.data_nasc)
        alteraTelefone(objeto.contato)
        alteraEndereco(objeto.endereco)
        alteraArea(objeto.area_atuacao)
        //alteraCurriculo(objeto.curriculo)

    }

    function cancelaEdicao() { //limpa os campos

        alteraNome("")
        alteraTelefone("")
        alteraEndereco("")
        alteraArea("")
        alteraDataNascimento("")

    }

    async function salvar(e) { //salvar 

        e.preventDefault()

        {/*if (curriculo) { O CHAT FEZ ESSE TRECO E N FUNCIONA
        const caminho = `${id_candidato}.pdf`

        const { error: erroUpload } = await supabase
            .storage
            .from('curriculos')
            .upload(caminho, curriculo, {
                contentType: 'application/pdf',
                upsert: true
            })

        if (erroUpload) {
            alert("Erro ao atualizar currículo")
            console.log(erroUpload)
            console.log(curriculo)
            return
        }
        }*/}

        const obj = {
            nome: nome,
            contato: telefone,
            endereco: endereco,
            area_atuacao: area,
            data_nasc: dataNascimento,
            //email: email,
            //cpf: cpf,
            //senha: senha,
            //curriculo: curriculo,
        }

        const { error } = await supabase
            .from('usuarios')
            .update(obj)
            .eq('id', id_candidato)

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

            {/*

            <div className="foto mb-4">

                <h2>Editar Perfil</h2>
                <p>Atualize suas informações pessoais.</p>

                <br />

                <img src="https://placehold.co/100" className="rounded-circle" />
                <br />
                <button className="btn-padrao mt-3"> Editar foto </button>

            </div>

            perfil == true ?
                {

                    listaUsuarios.map(
                        item =>

                            <div className="card">

                                    <div className="card-body">

                                        <h5 className="mb-4">Dados pessoais</h5>

                                        <form>

                                            <div className="row">

                                                <div className="col-md-6 mb-3">
                                                    <label>E-mail: </label>
                                                    <input type="email" className="form-control" value={item.email} disabled />
                                                </div>

                                                <div className="col-md-6 mb-3">
                                                    <label>Senha: </label>
                                                    <input type='password' className="form-control" value={item.senha} disabled />
                                                </div>

                                                <div className="col-md-6 mb-3">
                                                    <label>Nome: </label>
                                                    <input type="text" className="form-control" value={nome} disabled />
                                                </div>

                                                <div className="col-md-6 mb-3">
                                                    <label>CPF: </label>
                                                    <input type="text" className="form-control" value={item.cpf} disabled />
                                                </div>

                                                <div className="col-md-6 mb-3">
                                                    <label>Data de Nascimento: </label>
                                                    <input type='date' className="form-control" value={dataNascimento} disabled />
                                                </div>

                                                <div className="col-md-6 mb-3">
                                                    <label>Telefone: </label>
                                                    <input type='text' className="form-control" value={dataNascimento} disabled />
                                                </div>

                                                <div className="col-md-6 mb-3">
                                                    <label>Endereço: </label>
                                                    <input type='text' className="form-control" value={endereco} disabled />
                                                </div>

                                                <div className="col-md-6">
                                                    <label>Área: </label>
                                                    <input type="text" className="form-control" value={area} />
                                                </div>

                                                <div className="col-md-6">
                                                    <label>Currículo: </label>
                                                    <p> <a target='_blank' href={PegaCurriculoPeloIDUsuario(id_candidato)}> Acessar aqui </a> </p>
                                                </div>

                                                <div className="mt-4 d-flex justify-content-center">
                                                    <button className="btn-padrao me-4" onClick={editar}>Editar</button>
                                                </div>

                                            </div>

                                        </form>

                                    </div>

                                </div>

                            </div>
                    )
                }

                :

                {
                listaUsuarios.map(
                    item =>

                        <div>

                            <div className="card">

                                <div className="card-body">

                                    <h5 className="mb-4">Dados pessoais</h5>

                                    <form>

                                        <div className="row">

                                            <div className="col-md-6 mb-3">
                                                <label>E-mail: </label>
                                                <input type="email" className="form-control" value={item.email} disabled />
                                            </div>

                                            <div className="col-md-6 mb-3">
                                                <label>Senha: </label>
                                                <input type='password' className="form-control" value={item.senha} disabled />
                                            </div>

                                            <div className="col-md-6 mb-3">
                                                <label>Nome: </label>
                                                <input type="text" className="form-control" value={nome} onChange={e => alteraNome(e.target.value)} />
                                            </div>

                                            <div className="col-md-6 mb-3">
                                                <label>CPF: </label>
                                                <input type="text" className="form-control" value={item.cpf} disabled />
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
                                                <input className="form-control" type="file" accept=".pdf" onChange={e => alteraCurriculo(e.target.files[0])} />
                                                <p className="text-body-tertiary"> PDF </p>
                                            </div>

                                            <div className="mt-4 d-flex justify-content-center">

                                                <button className="btn-padrao me-4" onClick={salvar}>Salvar Alterações</button>
                                                <button className="btn-padrao" onClick={cancelaEdicao}>Cancelar</button>

                                            </div>

                                        </div>

                                    </form>

                                </div>

                            </div>

                        </div>

                )
            } */}

            <div className="titulo foto mb-4">

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

                        <div>

                            <div className="card">

                                <div className="card-body">

                                    <h5 className="mb-4 text-center">Dados pessoais</h5>

                                    <form>

                                        <div className="row">

                                            <div className="col-md-6 mb-3">
                                                <label>E-mail: </label>
                                                <input type="email" className="form-control" value={item.email} disabled />
                                            </div>

                                            <div className="col-md-6 mb-3">
                                                <label>Senha: </label>
                                                <input type='password' className="form-control" value={"*********"} disabled />
                                            </div>

                                            <div className="col-md-6 mb-3">
                                                <label>Nome: </label>
                                                <input type="text" className="form-control" value={nome} onChange={e => alteraNome(e.target.value)} />
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
                                                <input className="form-control" type="file" accept=".pdf" onChange={e => alteraCurriculo(e.target.files[0])} />
                                                <p className="text-body-tertiary"> PDF </p>
                                            </div>

                                            <div className="mt-4 d-flex justify-content-center">

                                                <button className="btn-padrao me-4" onClick={salvar}>Salvar Alterações</button>
                                                {/*<button className="btn-padrao" onClick={cancelaEdicao}>Cancelar</button>*/}

                                            </div>

                                        </div>

                                    </form>

                                </div>

                            </div>

                        </div>

                )
            }

        </div >

    )

}