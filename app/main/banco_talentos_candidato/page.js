'use client'

import { useEffect, useState } from 'react';
import supabase from '../conexao/supabase';
import './banco_talentos.css'

export default function bancoTalentos() {

    // Se existir um registro na tabela banco talentos com id_usuario = X -> usuário já cadastrou
    // Se não existir -> usuário não cadastrou ainda
    // 

    // buscar o id do candidat no banco de talentos

    const [temCadastro, alteraTemCadastro] = useState(false)
    const [] = useState(null)

    const [curriculo, alteraCurriculo] = useState("")
    const [certificacoes, alteraCertificacoes] = useState("")
    const [portfolio, alteraPortfolio] = useState("")
    const [area, alteraArea] = useState("")
    const [competencias, alteraCompetencias] = useState("")
    const [contratacao, alteraContratacao] = useState("")
    const [turno, alteraTurno] = useState("")

    const [bancoTalentos, alteraBancoTalentos] = useState([])

    async function buscar() {

        const { data, error } = await supabase
            .from('bancotalentos')
            .select()
        console.log(data)
        alteraBancoTalentos(data)
    }
    
    async function Salvar(e) {
        e.preventDefault()

        const bancoCandidato = {
            curriculo: curriculo,
            certificacoes: certificacoes,
            portfolio: portfolio,
            area: area,
            competencias: competencias,
            contratacao: contratacao,
            turno: turno,
            id_usuario: 3
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

        const { error } = await supabase
            .from('bancotalentos')
            .insert(bancoCandidato)

        console.log(error)
        
        console.log(bancoCandidato)

    }

    

    useEffect(() => {
        buscar()
    }, [])


    return (
        <div>
            <div>

                <div className="titulo">
                    <h2> Banco de Talentos </h2>
                    <br />
                    <p> Cadastre-se para que empresas de São Carlos encontrem você. </p>
                </div>

                <br />
                <br />

                <div>

                    <form onSubmit={Salvar} className="form_banco_talentos row g-3">

                        <div>
                            <label className="form-label"> Currículo </label>
                            <input type="file" accept=".pdf" className="form-control" onChange={e => alteraCurriculo(e.target.files[0])} />
                            <p className="text-body-tertiary"> PDF ou DOC, até 5 MB </p>
                        </div>

                        <div>
                            <label className="form-label"> Certificações (opcional) </label>
                            <input type="file" accept=".pdf" className="form-control" multiple onChange={e => alteraCertificacoes(e.target.files[0])} />
                        </div>

                        <div>
                            <label className=" form-label"> Portfolio (opcional) </label>
                            <input type="url" placeholder="Behance, GitHub ou site pessoal." className="form-control" onChange={e => alteraPortfolio(e.target.value)} />
                        </div>

                        <div>
                            <label className="form-label"> Área de atuação </label>
                            <textarea className="form-control" placeholder="Ex: atendimento, vendas, administrativo, TI..." onChange={e => alteraArea(e.target.value)} />
                        </div>

                        <div>
                            <label className="form-label"> Competências e Habilidades </label>
                            <textarea className="form-control" placeholder="Ex: comunicação, organização, Excel, redes sociais..." onChange={e => alteraCompetencias(e.target.value)} />
                        </div>


                        <div className="col-md-6">
                            <label className="form-label"> Tipo de contratação </label>
                            <select className="form-select" onChange={e => alteraContratacao(e.target.value)}>
                                <option value="" hidden> Selecione </option>
                                <option value="efetivo"> Efetivo </option>
                                <option value="freelancer"> Freelancer </option>
                            </select>
                        </div>

                        <div className="col-md-6">
                            <label className="form-label"> Turno de preferência </label>
                            <select className="form-select" onChange={e => alteraTurno(e.target.value)}>
                                <option value="" hidden> Selecione </option>
                                <option value="matutino"> Matutino </option>
                                <option value="vespertino"> Vespertino </option>
                                <option value="noturno"> Noturno </option>
                            </select>
                        </div>

                        <button onClick={Salvar} className="btn-padrao"> Salvar inscrição </button>

                    </form >

                </div>

            </div>

        </div >

    )
}
