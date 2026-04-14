'use client'

import './editar_perfil.css'
import supabase from '../conexao/supabase'
import { useEffect, useState } from 'react'
import { PegaCurriculoPeloIDUsuario, PegaFotoPerfilPeloIDUsuario } from '../conexao/bucket'

export default function EditarPerfil() {

    const id_candidato = typeof window !== 'undefined' ? localStorage.getItem("id_usuario") : null;

    const [nome, alteraNome] = useState("")
    const [dataNascimento, alteraDataNascimento] = useState("")
    const [telefone, alteraTelefone] = useState("")
    const [endereco, alteraEndereco] = useState("")
    const [area, alteraArea] = useState("")

    const [foto, alteraFoto] = useState(null)
    const [listaUsuarios, alteraListaUsuarios] = useState([])
    const [perfil, alteraPerfil] = useState(true)

    async function buscaUsuario() {

        const { data, error } = await supabase
            .from('usuarios')
            .select()
            .eq('id', id_candidato)

        alteraListaUsuarios(data)
        editar(data[0]) // chama a função editar para que apareça no input

    }

    function editar(objeto) {

        alteraNome(objeto.nome)
        alteraDataNascimento(objeto.data_nasc)
        alteraTelefone(objeto.contato)
        alteraEndereco(objeto.endereco)
        alteraArea(objeto.area_atuacao)

    }

    function cancelaEdicao() {

        editar(listaUsuarios[0])
        alteraPerfil(true)

    }

    async function salvar(e) { //salvar 

        e.preventDefault()


        const obj = {
            nome: nome,
            contato: telefone,
            endereco: endereco,
            area_atuacao: area,
            data_nasc: dataNascimento,
        }

        const { error } = await supabase
            .from('usuarios')
            .update(obj)
            .eq('id', id_candidato)

        if (error == null) {
            alert("Atualização realizada com sucesso!")
            alteraPerfil(true)
            buscaUsuario()

        } else {
            alert("Dados inválidos! Verifique os campos e tente novamente...")
        }

        const resposta = await supabase.storage
            .from('fotos_perfil')
            .upload(id_candidato, foto)

        console.log(resposta)

        if (error) {
            alert("Erro ao enviar foto!")
            return
        } else {
            alteraPerfil(true)
            buscaUsuario()
        }

    }

    useEffect(() => {
        buscaUsuario()
    }, [])

    return (

        <div>

            <div className="titulo foto mb-4">
                <h2>Perfil</h2>
                <p>Confira seus dados e mantenha suas informações sempre atualizadas.</p> 
                <br />
            </div>


            {
                perfil == true ? (

                    <div>
                        {
                            listaUsuarios.map(item => (

                                <div className="card">
                                    <div className="card-body">

                                        <div className="d-flex flex-column align-items-center mb-3">

                                            {
                                                <img src={PegaFotoPerfilPeloIDUsuario(id_candidato)} style={{ width: "90px" }} className="rounded-circle"
                                                    onError={(e) => {
                                                        e.target.onerror = null
                                                        e.target.src = "https://ui-avatars.com/api/?background=random&name=" + nome
                                                        e.target.style.width = "90px"
                                                    }} />
                                            }

                                        </div>

                                        <h5 className="mb-4 text-center">Dados pessoais</h5>

                                        <form>
                                            <div className="row">

                                                <div className="col-md-6 mb-3">
                                                    <label>E-mail: </label>
                                                    <input type="email" className="form-control" value={item.email} disabled />
                                                </div>

                                                <div className="col-md-6 mb-3">
                                                    <label>Senha: </label>
                                                    <input type='password' className="form-control" value={"**********"} disabled />
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
                                                    <input type='text' className="form-control" value={telefone} disabled />
                                                </div>

                                                <div className="col-md-6 mb-3">
                                                    <label>Endereço: </label>
                                                    <input type='text' className="form-control" value={endereco} disabled />
                                                </div>

                                                <div className="col-md-6">
                                                    <label>Área: </label>
                                                    <input type="text" className="form-control" value={area} disabled />
                                                </div>

                                                <div className="col-md-6">
                                                    <label>Currículo: </label>
                                                    <p>
                                                        <a target='_blank' href={PegaCurriculoPeloIDUsuario(id_candidato)}>
                                                            Acessar aqui
                                                        </a>
                                                    </p>
                                                </div>

                                                <div className="mt-4 d-flex justify-content-center">
                                                    <button className="btn-padrao me-4" onClick={() => alteraPerfil(false)}>Editar</button>
                                                </div>

                                            </div>
                                        </form>
                                    </div>
                                </div>

                            ))
                        }
                    </div>

                ) : (

                    <div>
                        {
                            listaUsuarios.map(item => (

                                <div>

                                    <div className="card">

                                        <div className="card-body">

                                            <div className="d-flex flex-column align-items-center mb-3">

                                                {
                                                    <img src={PegaFotoPerfilPeloIDUsuario(id_candidato)} style={{ width: "110px" }} className="rounded-circle"
                                                        onError={(e) => {
                                                            e.target.onerror = null
                                                            e.target.src = "https://ui-avatars.com/api/?background=random&name=" + nome
                                                        }} />
                                                }

                                                <label className="btn-padrao mt-3"> Editar foto <input type="file" accept="image/*" style={{ display: "none" }} onChange={e => alteraFoto(e.target.files[0])} /> </label>
                                            </div>

                                            <h5 className="mb-4 mt-5 text-center">Dados pessoais</h5>

                                            <form>

                                                <div className="row">

                                                    <div className="col-md-6 mb-3">
                                                        <label>E-mail: </label>
                                                        <input type="email" className="form-control" value={item.email} disabled />
                                                    </div>

                                                    <div className="col-md-6 mb-3">
                                                        <label>Senha: </label>
                                                        <input type='password' className="form-control" value={"**********"} disabled />
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

                                                        <button className="btn-padrao me-4" type="submit" onClick={salvar}>Salvar Alterações</button>
                                                        <button className="btn-acao" type="button" onClick={cancelaEdicao}>Cancelar</button> {/* NAO tirar o type button*/}

                                                    </div>

                                                </div>

                                            </form>

                                        </div>

                                    </div>

                                </div>

                            ))
                        }
                    </div>

                )
            }
        </div>

    )
}