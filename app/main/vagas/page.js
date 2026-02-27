export default function CadastroVagas () {
    return (

        <div>
            <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Gerenciador de Vagas</title>

  
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet"/>
  <link rel="stylesheet" href="./pi_vagas.css" />


   <div class="container d-flex justify-content-center align-items-center min-vh-100">
    <div class="card shadow-lg p-4 col-md-6">

      <h1 class="text-center mb-4">Cadastro de Vagas</h1>

      <form>

        <div class="mb-3">
          <label class="form-label">Empresa</label>
          <input type="text" class="form-control" placeholder="Nome da empresa"/>
        </div>

        <div class="mb-3">
          <label class="form-label">Área de Atuação</label>
          <select class="form-select">
            <option selected disabled>Selecione</option>
            <option>T.I</option>
            <option>Barman</option>
            <option>Atendimento ao Cliente</option>
          </select>
        </div>

        <div class="mb-3">
          <label class="form-label">Descrição da Vaga</label>
          <textarea class="form-control" rows="3"></textarea>
        </div>

        <div class="mb-3">
          <label class="form-label">Salário</label>
          <div class="input-group">
            <span class="input-group-text">R$</span>
            <input type="number" class="form-control" placeholder="0,00"/>
          </div>
        </div>

        <div class="mb-3">
          <label class="form-label">Tipo de Vaga</label>
          <select class="form-select">
            <option selected disabled>Selecione</option>
            <option>Efetiva</option>
            <option>Freelancer</option>
          </select>
        </div>

        <div class="mb-3">
          <label class="form-label">Modo de Trabalho</label>
          <select class="form-select">
            <option selected disabled>Selecione</option>
            <option>Remoto</option>
            <option>Híbrido</option>
            <option>Presencial</option>
          </select>
        </div>

        <div class="mb-4">
          <label class="form-label">Período</label>
          <select class="form-select">
            <option selected disabled>Selecione</option>
            <option>Manhã</option>
            <option>Tarde</option>
            <option>Noite</option>
          </select>
        </div>

        <button type="submit" class="btn btn-warning">Cadastrar Vaga</button>

      </form>

    </div>
  </div>

  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js"></script>

        </div>
    )
}