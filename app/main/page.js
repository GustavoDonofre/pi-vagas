

export default function paginainicial() {

    return (
        <div>

            {/* <div class="col-md-8">
                <div class="col-md-8 my-6 container-fluid">
                    <h1 class="hero-title" />
                    As oportunidades de São Carlos agora têm
                    <span class="highlight">lugar certo!</span>
                </div>
                <p div class="mt-3 text-muted">
                    💼 Encontre vagas de freelancer, bicos e trabalhos temporários. <br />
                    📍 Participe do banco de talentos da sua cidade.<br />
                    Simples, organizado e perto de você.
                </p>
            </div> */}


            <form className="d-flex flex-row justify-content-end m-4">

                <div>
                    <div class="card p-4 shadow" style={{width: "450px"}}>
                        <div className="d-flex flex-row align-items-end justify-content-center">
                            <img src="/images/conecta_sanca_logo.png" className="img-fluid" style={{width: "80px"}}></img>
                            <p className="fs-4 pb-2"><strong>Conecta Sanca</strong></p>
                        </div>
                        <div class="mb-3">

                            <label for="exampleInputEmail1" class="form-label">Digite seu Email</label>
                            <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                        </div>
                        <div class="mb-3">
                            <label for="exampleInputPassword1" class="form-label">Digite sua senha</label>
                            <input type="password" class="form-control" id="exampleInputPassword1" />
                        </div>
                        <div class="mb-3">
                            <p>Não tem cadastro? clique <a class="link-opacity-70-hover link-warning" href="#">aqui</a></p>
                        </div>
                        <button type="submit" class="btn btn-padrao">Entrar</button>
                    </div>
                </div>


            </form>

            <div class="card border-0 shadow-sm mt-5 p-4">
                <h2 class="fw-bold text-center mb-3">✨ Como funciona?</h2>
                <p class="text-center text-muted">
                    Simples pra todo mundo, sem complicação, sem enrolação 😉
                </p>

                <div class="row mt-4 text-center">

                    <div class="col-md-6 mb-3">
                        <h5>🙍‍♂️ Para Candidatos</h5>
                        <p class="text-muted">⌨️ Crie sua conta gratuitamente e encontre oportunidades.</p>
                    </div>

                    <div class="col-md-6 mb-3">
                        <h5>🏢 Para Empresas</h5>
                        <p class="text-muted">🖱️ Cadastre sua empresa e publique vagas facilmente.</p>
                    </div>
                </div>
            </div >

        </div>

    )
}
