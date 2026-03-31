"use client"
import { useEffect, useState } from 'react';
import supabase from '../conexao/supabase';

export default function editarPerfilEmpresa() {

    const [nomeFantasia, alteraNomeFantasia] = useState("")
    const [area, alteraArea] = useState("")
    const [telefone, alteraTelefone] = useState("")
    const [endereco, alteraEndereco] = useState("")
    const [premium, alteraPremium] = useState("")

    const [listaEmpresa, alteraListaEmpresa] = useState([])

    const [editando, alteraEditando] = useState()

    async function buscaEmpresa() {

        const { data, error } = await supabase
            .from('usuarios')
            .select()

        alteraListaEmpresa(data)
        editar(data[0])

    }

    function editar(objeto) {
        alteraEditando(objeto.id)

        alteraNomeFantasia(objeto.nomeFantasia)
        alteraArea(objeto.area)
        alteraTelefone(objeto.telefone)
        alteraEndereco(objeto.endereco)
        alteraPremium(objeto.premium)

    }

    function cancelaEdicao() {
        alteraNomeFantasia("")
        alteraArea("")
        alteraTelefone("")
        alteraEndereco("")
        alteraPremium("")

        alteraEditando(null)
    }

    async function salvar(e) {
        e.preventDefault()

        const objeto = {
            nomeFantasia: nomeFantasia,
            area: area,
            telefone: telefone,
            endereco: endereco,
            premium: premium
        }



        const { error } = await supabase
            .from('usuarios')
            .update(objeto)
            .eq()

        if (error == null) {
            alert("Atualização realizada com sucesso!")
            cancelaEdicao()
            buscaEmpresa()
        } else {
            alert("Dados inválidos! Verifique os campos e tente novamente...")
        }

        console.log(error)

    }

    useEffect(() => {
        buscaEmpresa()
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
                listaEmpresa.map(
                    item =>
                        <div className="card">

                            <div className="card-body">

                                <h5 className="mb-4">Dados pessoais</h5>

                                <form onSubmit={salvar}>

                                    <div className="row">

                                        <div className="col-md-6 mb-3">
                                            <label>Razão Social </label>
                                            <input type="text" className="form-control" value={item.nome} disabled />
                                        </div>

                                        <div className="col-md-6 mb-3">
                                            <label>Nome Fantasia </label>
                                            <input type="text" className="form-control" value={item.nome} />
                                        </div>

                                        <div className="col-md-6 mb-3">
                                            <label>CNPJ: </label>
                                            <input type="text" className="form-control" value={item.cnpj} disabled />
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

                                        <div className="mt-4 d-flex justify-content-center">

                                            <button className="btn-padrao me-4" type="submit" onChange={(e) => salvar(e.target.value)}>Salvar Alterações</button>
                                            <button className="btn-padrao" onClick={cancelaEdicao}>Cancelar</button>

                                        </div>

                                    </div>

                                </form>

                            </div>

                        </div>
                )
            }


        </div>

    )
}
