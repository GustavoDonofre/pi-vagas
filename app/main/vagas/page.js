'use client'
import { useEffect, useState } from "react";
import supabase from "../conexao/supabase";
import { useParams } from "next/navigation";
// const supabase = createClient('https://qrcmtnxakmuwbunyoooc.supabase.co', 'sb_publishable_kD9z8OLZIlbh3yry6yNMDQ_LTAi81op')

export default function Vagas() {
  const params = useParams()

  const [empresa, alteraEmpresa] = useState("")
  const [titulo, alteraTitulo] = useState("")
  const [area, alteraArea] = useState("")
  const [descricao, alteraDescricao] = useState("")
  const [salario, alteraSalario] = useState("")
  const [efetivo, alteraEfetivo] = useState("")
  const [presencial, alteraPresencial] = useState("")
  const [turno, alteraTurno] = useState("")
  const [editando, alteraEditando] = useState(false)

  const [vagas, alteraVagas] = useState([])

  const nome_usuario = typeof window !== 'undefined' ? localStorage.getItem("nome_usuario") : null;
  const id_empresa = typeof window !== 'undefined' ? localStorage.getItem("id_usuario") : null;

  async function buscarEmpresa(id_editando) {
    const { data, error } = await supabase
      .from('cadastro_vagas')
      .select(`*,
      id_empresa (*)
      `)
      .eq(`id`, id_editando)

    if(data != null){
      alteraTitulo(data[0].titulo)
      alteraArea(data[0].area)
      alteraDescricao(data[0].descricao)
      alteraSalario(data[0].salario)
      alteraEfetivo(data[0].efetivo)
      alteraPresencial(data[0].presencial)
      alteraTurno(data[0].turno)
      alteraVagas(data)
    }

  }

  async function salvar(e) {
    e.preventDefault()

    const vaga = {
      id_empresa: id_empresa, //adicionar Id da empresa
      titulo: titulo,
      descricao: descricao,
      area: area,
      salario: salario,
      efetivo: efetivo,
      presencial: presencial,
      turno: turno
    };

    const { data, error } = await supabase
      .from('cadastro_vagas')
      .insert(vaga)
    console.log(error)


    if (error == null) {
      alert("vaga cadastrada com sucesso!")
      // alteraEmpresa("")
      alteraTitulo("")
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

  async function atualizar() {

    const objeto = {
      empresa: id_empresa,
      descricao: descricao,
      salario: salario,
      efetivo: vagas,
      presencial: presencial,
      turno: turno
    }
    const { error } = await supabase
      .from('cadastro_vagas')
      .update(objeto)
      .eq('id', editando)

    if (error == null) {
      alert("Atualização realiza com sucesso!")
      cancelaEdicao()
      buscaTodos()
    } else {
      alert("Dados Inválidos! Verifique os campos e tente novamente...")
    }

    function cancelaEdicao() {
      alteraEditando(null)

      alteraTitulo("")
      alteraArea("")
      alteraDescricao("")
      alteraSalario("")
      alteraEfetivo("")
      alteraPresencial("")
      alteraTurno("")

    }


    buscaTodos()
  }

  function editar(vaga) {

    alteraEditando(true)

    alteraTitulo(objeto.titulo)
    alteraArea(objeto.area)
    alteraDescricao(objeto.descricao)
    alteraSalario(objeto.salario)
    alteraEfetivo(objeto.efetivo)
    alteraPresencial(objeto.presencial)
    alteraTurno(objeto.turno)

  }

  useEffect(() => {

    let id_editando = null
    if(typeof window !== "undefined"){
      id_editando = window.location.search.split("=")[1]
      console.log("Editar o id: "+id_editando)
    }

    buscarEmpresa(id_editando)
    
  }, [])

  return (

    <div>
      <div className="container d-flex justify-content-center align-items-center min-vh-100 mb-5">
        <div className="card shadow-lg p-4 col-md-6">

          <h1 className="text-center mb-4">Cadastro de Vagas</h1>

          <form onSubmit={salvar}>

            <div className="mb-3">
              <label className="form-label">{nome_usuario}</label>
              {/* <input value={empresa} type="text" className="form-control" disabled placeholder={localStorage.getItem('empresa')} /> */}
            </div>

            <div className="mb-3">
              <label className="form-label">Título</label>
              <input value={titulo} className="form-control" onChange={(e) => alteraTitulo(e.target.value)} />
            </div>
            <div className="mb-3">
              <label className="form-label">Área de Atuação</label>
              <input value={area} className="form-control" rows="3" onChange={(e) => alteraArea(e.target.value)}></input>
            </div>

            <div className="mb-3">
              <label className="form-label">Descrição da Vaga</label>
              <input value={descricao} className="form-control" rows="3" onChange={(e) => alteraDescricao(e.target.value)}></input>
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

            <div className="col-12">
              <div className="row">
                <div className="col-6">


                  <div className="col-md-6 d-flex justify-content-center">
                    <div>
                      {
                        editando == true ?
                          <div>
                            <button className="btn btn padrao" onClick={atualizar}>Atualizar</button>
                            <button className="btn btn-outiline-padrao" onClick={cancelaEdicao}>Cancelar</button>
                          </div>
                          :
                        <div>
                      
                        <button type="button" className="btn btn-padrao" onClick={() => window.location.href = "/main/feed_empresa"}>Cadastrar Vaga</button>
                
                        <button type="button" className='btn btn-lg btn-outline-dark' onClick={() => window.location.href = "/main/feed_empresa"}> Cancelar </button>

                        </div>
                      
                      }
                    </div>
                  </div>

                </div>
              </div>
            </div>

          </form>



        </div>
      </div>

      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js"></script>

    </div>
  )
}