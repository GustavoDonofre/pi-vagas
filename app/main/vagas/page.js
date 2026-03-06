'use client'
import { useState } from "react";

export default function Vagas() {
  const [empresa, SetEmpresa] = useState("")
  const [atuacao, SetAtucao] = useState("")
  const [descricao, SetDescricao] = useState("")
  const [salario, SetSalario] = useState()
  const [tipo_vaga, SetTipo_vaga] = useState()
  const [modo_trabalho, SetModo_trabalho] = useState()
  const [periodo, SetPerido] = useState()

  function cadastrar (e) {
    e.preventDefault ()

    const vaga = {
      empresa: "empresa",
      descricao: "descricao",
      salario: " ",
      vaga: "vaga",
      modo: "modo",
      periodo: "periodo"
    };
    console.log(vaga)
  }

  return (

    <div>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Gerenciador de Vagas</title>

      <div className="container d-flex justify-content-center align-items-center min-vh-100">
        <div className="card shadow-lg p-4 col-md-6">

          <h1 className="text-center mb-4">Cadastro de Vagas</h1>

          <form onSubmit={cadastrar}>

            <div className="mb-3">
              <label className="form-label">Empresa</label>
              <input type="text" className="form-control" placeholder="Nome da empresa"
               onChange={(e) =>SetEmpresa (e.target.value)}/>
            </div>

            <div className="mb-3">
              <label className="form-label">Área de Atuação</label>
             <textarea className="form-control" rows="3"onChange={(e) => Setarea(e.target.value)}></textarea>
            </div>

            <div className="mb-3">
              <label className="form-label">Descrição da Vaga</label>
              <textarea className="form-control" rows="3" onChange={(e) =>SetDescricao (e.target.value)}></textarea>
            </div>

            <div className="mb-3">
              <label className="form-label">Salário</label>
              <div className="input-group">
                <span className="input-group-text">R$</span>
                <input type="number" className="form-control" placeholder="0,00" onChange={(e) =>SetSalario (e.target.value)}/>
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">Tipo de Vaga</label>
              <select className="form-select" onChange={(e) =>SetTipo_vaga (e.target.value)}>
                <option select disabled>Selecione</option>
                <option value= "efetiva" >Efetiva</option>
                <option value= "freelancer" >Freelancer</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">Modo de Trabalho</label>
              <select className="form-select" onChange={(e) =>SetModo_trabalho (e.target.value)}>
                <option select disabled>Selecione</option>
                <option value= "remoto">Remoto</option>
                <option value= "hibrido">Híbrido</option>
                <option value= "presencial">Presencial</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="form-label">Período</label>
              <select className="form-select" onChange={(e) =>SetPerido (e.target.value)}>
                <option select disabled>Selecione</option>
                <option value= "matutino">Matutino</option>
                <option value= "vespertino">Vespertino</option>
                <option value= "noturno">Noturno</option>
              </select>
            </div>

            <button type="submit" className="btn btn-warning">Cadastrar Vaga</button>

          </form>

        </div>
      </div>

      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js"></script>

    </div>
  )
}