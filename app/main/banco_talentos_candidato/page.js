'use client'

import { useEffect, useState } from 'react';
import supabase from '../conexao/supabase';
import './banco_talentos.css'
import { PegaCurriculoPeloIDUsuario } from '../conexao/bucket'

export default function BancoTalentos() {

    const id_candidato = localStorage.getItem("id_usuario")

    const [bancoTalentos, alteraBancoTalentos] = useState([])
    const [cadastroTalentos, alteraCadastroTalentos] = useState(null)
    const [editando, alteraEditando] = useState(null)

    const [portfolio, alteraPortfolio] = useState("")
    const [competencias, alteraCompetencias] = useState("")
    const [contratacao, alteraContratacao] = useState("")
    const [turno, alteraTurno] = useState("")


    async function buscar() {

        const { data, error } = await supabase

            .from('banco_talentos')
            .select(`*, id_candidato(*)`)
            .eq('id_candidato', id_candidato)
            .eq('ativo', true)

        console.log(data)
        console.log(error)

        if (error) { // se erro na comunicação com o banco
            alteraCadastroTalentos(false)
            return
        }

        if (!data) { // se dado não existir
            alteraCadastroTalentos(false)
            return
        }

        if (data.length > 0) {
            alteraCadastroTalentos(true)
            alteraBancoTalentos(data)
        } else { //se nao for maior, ele é menor ou igual, então varivel como false
            alteraCadastroTalentos(false)
        }

    }

    async function atualizar(e) {
        e.preventDefault()

        const obj = {

            portfolio: portfolio,
            competencias: competencias,
            contratacao: contratacao,
            turno: turno

        }

        const { error } = await supabase

            .from('banco_talentos')
            .update(obj)
            .eq('id', editando)


        if (error == null) {

            alert("Atualização realizada com sucesso!")
            alteraEditando(null) //ele não esta mais editando
            alteraCadastroTalentos(true) //agora ele tem os dados para mostrar
            buscar() //atualiza a pagina

        } else {

            alert("Dados inválidos! Verifique os campos e tente novamente...")

        }

    }

    function editar(objeto) {

        alteraCadastroTalentos(false)

        alteraCompetencias(objeto.competencias)
        alteraPortfolio(objeto.portfolio)
        alteraContratacao(objeto.contratacao)
        alteraTurno(objeto.turno)

        alteraEditando(objeto.id)

    }

    async function salvar(e) {
        e.preventDefault()

        const bancoCandidato = {
            portfolio: portfolio,
            competencias: competencias,
            contratacao: contratacao,
            turno: turno,
            id_candidato: id_candidato
        }

        if (!competencias || competencias.length < 5) {
            alert("Escreve melhor suas competências.")
            return
        }

        if (!contratacao) {
            alert("Informe um tipo de contratação.")
            return
        }

        if (!turno) {
            alert("Informe um turno.")
            return
        }

        const { data, error } = await supabase
            .from('banco_talentos')
            .select('*')
            .eq('id_candidato', id_candidato)
            .maybeSingle() // 1 ou nem um

        if (error) {
            alert("Erro ao verificar cadastro")
            console.log(error)
            return
        }

        if (data) { // tem dados? -> updateee
            const { error: errorUpdate } = await supabase
                .from('banco_talentos')
                .update({ ...bancoCandidato, ativo: true })
                .eq('id_candidato', id_candidato)

            if (errorUpdate == null) {
                alert("Cadastro atualizado com sucesso!")
                alteraCadastroTalentos(true)
                buscar()
            } else {
                alert("Erro ao atualizar!")
                console.log(errorUpdate)
            }
        } else { // n tem dados??? -> INSERTTT
            const { error: errorInsert } = await supabase
                .from('banco_talentos')
                .insert({ ...bancoCandidato, ativo: true })

            if (errorInsert == null) {
                alert("Cadastro realizado com sucesso!")
                alteraCadastroTalentos(true)
                buscar()
            } else {
                alert("Erro ao cadastrar!")
                console.log(errorInsert)
            }
        }
    }

    function cancelar() {

        alteraEditando(null) // sai do modo edição

    }

    async function cancelarCandidatura() {

        const opcao = confirm("Deseja cancelar sua candidatura?")

        if (opcao == false) {
            return
        }

        const { error } = await supabase
            .from('banco_talentos')
            .update({ ativo: false })
            .eq('id_candidato', id_candidato)

        if (error == null) {
            alert("Candidatura cancelada com sucesso!")

            alteraCadastroTalentos(false)
            alteraBancoTalentos([])

        } else {
            alert("Erro ao cancelar candidatura!")
        }
    }

    useEffect(() => {
        buscar()
    }, [])


    if (cadastroTalentos == null) {
        return <p>Carregando...</p>
    }

    return (

        <div>

            {
                cadastroTalentos == true ?
                    <div>

                        <div className="titulo">
                            <h2> Banco de Talentos </h2>
                            <br />
                        </div>

                        <br />

                        <div className="alert alert-light inscricao_salvo" role="alert">
                            <p> Você está inscrito no Banco de Talentos! <br /> Empresas podem visualizar seu perfil e entrar em contato. </p>
                        </div>

                        <br />

                        {
                            bancoTalentos.map(
                                item =>

                                    <div className="card card_salvo p-4 text-center">
                                        <h5 className="mb-4"> Seus dados cadastrados </h5>
                                        <br />

                                        <div className="row">

                                            <div className="col-md-6 mb-3">
                                                <p className="mb-1"><strong> Curriculo: </strong></p>
                                                <p> <a target='_blank' href={PegaCurriculoPeloIDUsuario(id_candidato)}> Acessar aqui </a> </p>
                                            </div>

                                            <div className="col-md-6 mb-3">
                                                <p className="mb-1"><strong> Portfolio: </strong></p>
                                                <p> {item.portfolio ? (<a href={item.portfolio} target="_blank" rel="noopener noreferrer"> Acessar aqui </a>)
                                                    :
                                                    (<p>Não informado</p>)
                                                }
                                                </p>
                                            </div>

                                            <div className="col-md-6 mb-3">
                                                <p className="mb-1"> <strong>Competências Profissionais: </strong></p>
                                                <p> {item.competencias} </p>
                                            </div>

                                            <div className="col-md-6 mb-3">
                                                <p className="mb-1"><strong> Contratação: </strong></p>
                                                <p> {item.contratacao} </p>
                                            </div>

                                            <div className="col-md-6 mb-3">
                                                <p className="mb-1"><strong> Turno: </strong></p>
                                                <p> {item.turno} </p>
                                            </div>

                                        </div>

                                        <button className='btn-padrao mb-3' onClick={() => editar(item)}> Editar </button>
                                        <button className='btn-acao' onClick={() => cancelarCandidatura(item)}> Cancelar Candidatura </button>

                                    </div>

                            )
                        }

                    </div >
                    :
                    <div>

                        <div className="titulo">
                            <h2> Banco de Talentos </h2>
                            <br />
                            <p> <strong>Cadastre-se para que empresas de São Carlos encontrem você.</strong> <br /> Aumente suas chances de contratação e receba oportunidades alinhadas ao seu perfil. </p>
                        </div>

                        <br />
                        <br />

                        <div>

                            <form className="form_banco row g-3">

                                <div>
                                    <label className="form-label"> <strong>Portfólio</strong> (opcional) </label>
                                    <input type="url" placeholder="ex: https://github.com/seunome" className="form-control mb-4" value={portfolio} onChange={e => alteraPortfolio(e.target.value)} />
                                </div>

                                <div>
                                    <label className="form-label"> <strong>Competências e Habilidades Profissionais</strong></label>
                                    <textarea className="form-control mb-4" placeholder="ex: comunicação, organização, Excel, redes sociais..." value={competencias} onChange={e => alteraCompetencias(e.target.value)} />
                                </div>

                                <div className="col-md-6 mb-4">
                                    <label className="form-label"><strong>Tipo de contratação</strong></label>
                                    <select className="form-select" value={contratacao} onChange={e => alteraContratacao(e.target.value)}>
                                        <option value="" hidden> Selecione </option>
                                        <option value="Aberto a todos os regimes de contratação."> Todos </option>
                                        <option value="Efetivo."> Efetivo </option>
                                        <option value="Freelancer."> Freelancer </option>
                                    </select>
                                </div>

                                <div className="col-md-6 mb-4">
                                    <label className="form-label"> <strong>Turno de preferência</strong> </label>
                                    <select className="form-select" value={turno} onChange={e => alteraTurno(e.target.value)}>
                                        <option value="" hidden> Selecione </option>
                                        <option value="Disponibilidade para qualquer turno."> Todos </option>
                                        <option value="Matutino."> Matutino </option>
                                        <option value="Vespertino."> Vespertino </option>
                                        <option value="Noturno."> Noturno </option>
                                    </select>
                                </div>

                                <div className="col-md-6">
                                    <button className="btn-padrao" onClick={editando ? atualizar : salvar}> Salvar inscrição </button>
                                </div>

                                <div className="col-md-6">
                                    <button className="btn-acao" onClick={() => cancelar()}> Cancelar </button>
                                </div>

                            </form >

                        </div>

                    </div>

            }

        </div>

    )
}