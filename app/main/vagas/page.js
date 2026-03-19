'use client'
import { useEffect, useState } from "react";
import { createClient } from '@supabase/supabase-js'
import supabase from "../conexao/supabase";
// const supabase = createClient('https://qrcmtnxakmuwbunyoooc.supabase.co', 'sb_publishable_kD9z8OLZIlbh3yry6yNMDQ_LTAi81op')

export default function Vagas() {

  const [empresa, alteraEmpresa] = useState("")
  const [area, alteraArea] = useState("")
  const [descricao, alteraDescricao] = useState("")
  const [salario, alteraSalario] = useState("")
  const [efetivo, alteraEfetivo] = useState("")
  const [presencial, alteraPresencial] = useState("")
  const [turno, alteraTurno] = useState("")

  const [vagas, alteraVagas] = useState([])

  async function name(params) {
    
  }

  async function salvar(e) {
    e.preventDefault()

    const vaga = {
      id_empresa: empresa,
      area: area,
      descricao: descricao,
      salario: salario,
      efetivo: efetivo,
      presencial: presencial,
      turno: turno
    };

    const { error } = await supabase
      .from('cadastrovagas')
      .insert(vaga)
    console.log(error)

    if (error == null) {
      alert("vaga cadastrada com sucesso!")
      alteraEmpresa("")
      alteraArea("")
      alteraDescricao("")
      alteraSalario("")
      alteraEfetivo("")
      alteraPresencial("")
      alteraTurno("")
      //location.reload()
    } else {
      alert("Dados inválidos, verifique os campos e tente novamente...")
    }
  }



  return (

    <div>
      <div className="container d-flex justify-content-center align-items-center min-vh-100">
        <div className="card shadow-lg p-4 col-md-6">

          <h1 className="text-center mb-4">Cadastro de Vagas</h1>

          <form onSubmit={salvar}>

            <div className="mb-3">
              <label className="form-label">Empresa</label>
              <input value={empresa} type="text" className="form-control" disabled placeholder={localStorage.getItem('empresa')}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Área de Atuação</label>
              <textarea value={area} className="form-control" rows="3" onChange={(e) => alteraArea(e.target.value)}></textarea>
            </div>

            <div className="mb-3">
              <label className="form-label">Descrição da Vaga</label>
              <textarea value={descricao} className="form-control" rows="3" onChange={(e) => alteraDescricao(e.target.value)}></textarea>
            </div>

            <div className="mb-3">
              <label className="form-label">Salário</label>
              <div className="input-group">
                <span className="input-group-text">R$</span>
                <input value={salario} type="number" className="form-control" onChange={(e) => alteraSalario(e.target.value)} />
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">Tipo de Vaga</label>
              <select value={efetivo} className="form-select" onChange={(e) => alteraEfetivo(e.target.value)}>
                <option disabled value="">Selecione</option>
                <option value="efetiva" >Efetiva</option>
                <option value="freelancer" >Freelancer</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">Modo de Trabalho</label>
              <select value={presencial} className="form-select" onChange={(e) => alteraPresencial(e.target.value)}>
                <option disabled value="">Selecione</option>
                <option value="remoto">Remoto</option>
                <option value="presencial">Presencial</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="form-label">Turno</label>
              <select value={turno} className="form-select" onChange={(e) => alteraTurno(e.target.value)}>
                <option disabled value="">Selecione</option>
                <option value="matutino">Matutino</option>
                <option value="vespertino">Vespertino</option>
                <option value="noturno">Noturno</option>
              </select>
            </div>

            <button type="submit" className="btn btn-warning">Cadastrar Vaga</button>

          </form>

          <div>
            <ul>
              {
                vagas.length == 0 ?
                  <p></p>
                  :
                  vagas.map(
                    item => <li> Empresa: {item.empresa} Area: {item.area} Descrição: {item.descricao} Salario: {item.salario} Tipo: {item.efetivo} Modo: {item.presencial} Turno: {item.turno}</li>


                  )
              }
            </ul>
          </div>

        </div>
      </div>

      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js"></script>

    </div>
  )
}