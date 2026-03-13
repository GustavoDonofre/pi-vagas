'use client'

import { createClient } from '@supabase/supabase-js'
import { useState } from 'react';
import './banco_talentos.css'

const supabase = createClient('https://qrcmtnxakmuwbunyoooc.supabase.co', 'sb_publishable_kD9z8OLZIlbh3yry6yNMDQ_LTAi81op')


export default function bancoTalentos() {

    const [curriculo, alteraCurriculo] = useState("")
    const [certificacoes, alteraCertificacoes] = useState("")
    const [portfolio, alteraPortfolio] = useState("")
    const [area, alteraArea] = useState("")
    const [competencias, alteraCompetencias] = useState("")
    const [contratacao, alteraContratacao] = useState("")
    const [turno, alteraTurno] = useState("")

    const[livros, alteraBancoTalentos] = useState

    async function buscar() {

        const { data, error } = await supabase
            .from('bancoTalentos')
            .select()
        console.log(data)
        alteraBancoTalentos(data)
    }

    async function Salvar(e){
        e.preventDefault()

        const bancoCandidato = {
            curriculo: curriculo,
            certificacoes: certificacoes,
            portfolio: portfolio,
            area: area,
            competencias: competencias,
            contratacao: contratacao,
            turno: turno
        }

        if (bancoCandidato.area.length <5) {
            alert("Área inválida.")
            return
        }

        if (bancoCandidato.competencias.length <5) {
            alert("Área inválida.")
            return
        }

        console.log(bancoCandidato)
    }


    return (
        <div>
            <div>
              
                <div className="titulo">
                    <h2> Banco de Talentos </h2>
                    <br />
                    <p> Cadastre-se para que empresas de São Carlos encontrem você. </p>
                </div>

                <br />

                <div className="alert alert-warning inscricao" role="alert">
                    <p> Você ainda não está inscrito <br /> Preencha o formulário abaixo para se cadastrar. </p>
                </div>

                <br />

                <div>

                    <form onSubmit={Salvar} className="form_banco_talentos row g-3">

                        <div>
                            <label className="form-label"> Currículo </label>
                            <input type="file" accept=".pdf,.doc,.docx" className="form-control" onChange={ e => alteraCurriculo(e.target.files[0])}/>
                            <p className="text-body-tertiary"> PDF ou DOC, até 5 MB </p>
                        </div>

                        <div>
                            <label className="form-label"> Certificações (opcional) </label>
                            <input type="file" accept=".pdf,.doc,.docx" className="form-control" multiple onChange={ e => alteraCertificacoes(e.target.files[0])}/>
                        </div>

                        <div>
                            <label className=" form-label"> Portfolio (opcional) </label>
                            <input type="url" placeholder="Behance, GitHub ou site pessoal." className="form-control" onChange={ e => alteraPortfolio(e.target.value)} />
                        </div>

                        <div>
                            <label className="form-label"> Área de atuação </label>
                            <textarea className="form-control" placeholder="Ex: atendimento, vendas, administrativo, TI..." onChange={ e => alteraArea(e.target.value)}/>
                        </div>

                        <div>
                            <label className="form-label"> Competências e Habilidades </label>
                            <textarea className="form-control" placeholder="Ex: comunicação, organização, Excel, redes sociais..." onChange={ e => alteraCompetencias(e.target.value)}/>
                        </div>

                    
                        <div className="col-md-6">
                            <label className="form-label"> Tipo de contratação </label>
                            <select className="form-select" onChange={ e => alteraContratacao(e.target.value)}>
                                <option value="" hidden> Selecione </option>
                                <option value="efetivo"> Efetivo </option>
                                <option value="freelancer"> Freelancer </option>
                            </select>
                        </div>

                        <div className="col-md-6">
                            <label className="form-label"> Turno de preferência </label>
                            <select className="form-select" onChange={ e => alteraTurno(e.target.value)}>
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
