'use client'

import { useEffect, useState } from 'react';
import supabase from '../conexao/supabase';
import './banco_talentos.css'

export default function BancoTalentos() {

    const id_candidato = localStorage.getItem("id_usuario")

    // No banco: salvar como pdf (curriculo e certificacoes)
    // Fora isso, funfona :)

    // Animações
    // Criar um css de botão padrao para cancelar / excluir

    const [bancoTalentos, alteraBancoTalentos] = useState([])

    const [cadastroTalentos, alteraCadastroTalentos] = useState(null) //null = ainda n sei / true = sim, tem dados / false = nao, nao tem dados
    const [editando, alteraEditando] = useState(null)

    const [curriculo, alteraCurriculo] = useState("")
    const [certificacoes, alteraCertificacoes] = useState("")
    const [portfolio, alteraPortfolio] = useState("")
    const [area, alteraArea] = useState("")
    const [competencias, alteraCompetencias] = useState("")
    const [contratacao, alteraContratacao] = useState("")
    const [turno, alteraTurno] = useState("")



    async function buscar() { //função que busca os dados no banco 

        const { data, error } = await supabase

            .from('banco_talentos')
            .select()
            .eq('id_candidato', id_candidato) // equals -> igual a 

        console.log(data)
        console.log(error)

        if (error) { // se alguma coisa der errado na comunicação com o banco
            alteraCadastroTalentos(false)
            return
        }

        if (!data) { // ! -> nao , data -> dado / se não existir dados
            alteraCadastroTalentos(false)
            return
        }

        if (data.length > 0) { // se tiver dados no banco, é maior que 0, variavel TRUE
            alteraCadastroTalentos(true)
            alteraBancoTalentos(data)
        } else { //se nao for maior, ele é menor ou igual, então varivel como false
            alteraCadastroTalentos(false)
        }

    }

    async function atualizar(e) { //função para atualizar os dados no banco e atualizar a pagina
        e.preventDefault()

        const obj = { //obj a ser mordificado

            curriculo: curriculo,
            certificacoes: certificacoes,
            portfolio: portfolio,
            area: area,
            competencias: competencias,
            contratacao: contratacao,
            turno: turno

        }

        const { error } = await supabase //da minha tabela do banco -> atualizar o obj 

            .from('banco_talentos')
            .update(obj)
            .eq('id', editando)


        if (error == null) {

            alert("Atualização realizada com sucesso!")
            alteraEditando(null)
            alteraCadastroTalentos(true)
            buscar() //atualiza a pagina

        } else {

            alert("Dados inválidos! Verifique os campos e tente novamente...")

        }

    }

    function editar(objeto) {

        alteraCadastroTalentos(false)

        alteraCurriculo(objeto.curriculo)
        alteraCertificacoes(objeto.certificacoes)
        alteraPortfolio(objeto.portfolio)
        alteraArea(objeto.area)
        alteraCompetencias(objeto.competencias)
        alteraContratacao(objeto.contratacao)
        alteraTurno(objeto.turno)

        alteraEditando(objeto.id)

    }

    async function salvar(e) {
        e.preventDefault()

        const bancoCandidato = {
            curriculo: curriculo,
            certificacoes: certificacoes,
            portfolio: portfolio,
            area: area,
            competencias: competencias,
            contratacao: contratacao,
            turno: turno,
            id_candidato: id_candidato
        }

        if (!bancoCandidato.curriculo) {
            alert("Anexe um currículo");
            return;
        }

        if (!bancoCandidato.area) {
            alert("Informe uma área")
            return
        }

        if (bancoCandidato.area.length < 5) {
            alert("Informe uma área válida")
            return
        }

        if (!bancoCandidato.competencias) {
            alert("Informe uma competência")
            return
        }

        if (bancoCandidato.competencias.length < 5) {
            alert("Informe uma competência válida")
            return
        }

        if (!bancoCandidato.contratacao) {
            alert("Informe um tipo de contratação")
            return
        }

        if (!bancoCandidato.turno) {
            alert("Informe um turno")
            return
        }

        const resposta = await supabase.storage.from('curriculos').upload(id_candidato, curriculo)
        console.log(resposta)
        if (error) {
            alert("Erro ao enviar currículo!")
            return
        }

        return

        const { error } = await supabase
            .from('banco_talentos')
            .insert(bancoCandidato)

        if (error == null) {
            alert("Cadastro realizado com sucesso!")

            alteraCadastroTalentos(true)

            buscar() // recarrega os dados

        } else {
            alert("Erro ao cadastrar!")
        }

        console.log(error)
        console.log(bancoCandidato)

    }

    function cancelar() {

        alteraCurriculo("")
        alteraCertificacoes("")
        alteraPortfolio("")
        alteraArea("")
        alteraCompetencias("")
        alteraContratacao("")
        alteraTurno("")

        alteraEditando(null) // sai do modo edição

    }

    async function cancelarCandidatura() {

        const opcao = confirm("Deseja cancelar sua candidatura?")

        if (opcao == false){
            return
        } 

        const {error} = await supabase
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


    if (cadastroTalentos == null) { // isso trata o null da variavel antes de ir para o operador / evita aparecer uma tela errada
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
                            <p> Cadastre-se para que empresas de São Carlos encontrem você. </p>
                        </div>

                        <br />

                        <div className="alert alert-light inscricao_salvo" role="alert">
                            <p> Você está inscrito no Banco de Talentos! <br /> Empresas podem visualizar seu perfil e entrar em contato. </p>
                        </div>

                        <br />

                        {
                            bancoTalentos.map(
                                item =>

                                    <div className="card card_salvo p-4">
                                        <h5 className="mb-4"> Seus dados cadastrados </h5>

                                        <div className="row">

                                            <div className="col-md-6 mb-3">
                                                <p className="text-muted mb-1"> Curriculo </p>
                                                <p> {item.curriculo} </p>
                                            </div>

                                            <div className="col-md-6 mb-3">
                                                <p className="text-muted mb-1"> Certificações </p>
                                                <p> {item.certificacoes} </p>
                                            </div>

                                            <div className="col-md-6 mb-3">
                                                <p className="text-muted mb-1"> Portfolio </p>
                                                <p> {item.portfolio} </p>
                                            </div>

                                            <div className="col-md-6 mb-3">
                                                <p className="text-muted mb-1"> Área </p>
                                                <p> {item.area} </p>
                                            </div>

                                            <div className="col-md-6 mb-3">
                                                <p className="text-muted mb-1"> Competencias </p>
                                                <p> {item.competencias} </p>
                                            </div>

                                            <div className="col-md-6 mb-3">  </div>
                                            <p className="text-muted mb-1"> Contratação </p>
                                            <p> {item.contratacao} </p>

                                            <div className="col-md-6 mb-3">
                                                <p className="text-muted mb-1"> Turno </p>
                                                <p> {item.turno} </p>
                                            </div>

                                        </div>

                                        <button className='btn-padrao' onClick={() => editar(item)}> Editar </button>
                                        <button className='btn-padrao' onClick={() => cancelarCandidatura(item)}> Cancelar Candidatura </button>

                                    </div>

                            )
                        }

                    </div >
                    :
                    <div>

                        <div className="titulo">
                            <h2> Banco de Talentos </h2>
                            <br />
                            <p> Cadastre-se para que empresas de São Carlos encontrem você. </p>
                        </div>

                        <br />
                        <br />

                        <div>

                            <form className="form_banco row g-3">

                                <div>
                                    <label className="form-label"> Currículo </label>
                                    <input type="file" accept=".pdf" className="form-control" onChange={e => alteraCurriculo(e.target.files[0])} />
                                    <p className="text-body-tertiary"> PDF ou DOC, até 5 MB </p>
                                </div>

                                <div>
                                    <label className="form-label"> Certificações (opcional) </label>
                                    <input type="file" accept=".pdf" className="form-control" multiple onChange={e => alteraCertificacoes(e.target.files)} />
                                </div>

                                <div>
                                    <label className=" form-label"> Portfolio (opcional) </label>
                                    <input type="url" placeholder="Behance, GitHub ou site pessoal." className="form-control" value={portfolio} onChange={e => alteraPortfolio(e.target.value)} />
                                </div>

                                <div>
                                    <label className="form-label"> Área de atuação </label>
                                    <textarea className="form-control" placeholder="Ex: atendimento, vendas, administrativo, TI..." value={area} onChange={e => alteraArea(e.target.value)} />
                                </div>

                                <div>
                                    <label className="form-label"> Competências e Habilidades </label>
                                    <textarea className="form-control" placeholder="Ex: comunicação, organização, Excel, redes sociais..." value={competencias} onChange={e => alteraCompetencias(e.target.value)} />
                                </div>


                                <div className="col-md-6">
                                    <label className="form-label"> Tipo de contratação </label>
                                    <select className="form-select" value={contratacao} onChange={e => alteraContratacao(e.target.value)}>
                                        <option value="" hidden> Selecione </option>
                                        <option value="efetivo"> Efetivo </option>
                                        <option value="freelancer"> Freelancer </option>
                                    </select>
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label"> Turno de preferência </label>
                                    <select className="form-select" value={turno} onChange={e => alteraTurno(e.target.value)}>
                                        <option value="" hidden> Selecione </option>
                                        <option value="matutino"> Matutino </option>
                                        <option value="vespertino"> Vespertino </option>
                                        <option value="noturno"> Noturno </option>
                                    </select>
                                </div>

                                <div className="col-md-6">
                                    <button className="btn-padrao" onClick={editando ? atualizar : salvar}> Salvar inscrição </button>
                                </div>
                           
                                <div className="col-md-6">
                                    <button className="btn-padrao" onClick={() => cancelar()}> Cancelar </button>
                                </div>

                            </form >

                        </div>

                    </div>

            }

        </div>

    )
}