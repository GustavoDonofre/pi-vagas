'use client'

import './minhas_candidaturas.css'

export default function MinhasCandidaturas() {

    return (

        <div>

            <div className="titulo">
                <h2> Minhas Candidaturas </h2>
            </div>

            <br />
            <br />

            <div class="card_info container">
                <div class="row justify-content-center g-4">

                    <div class="col-md-4">
                        <div class="card total_vagas p-2 text-center">
                            <p><strong>Total</strong></p>
                            <p>0</p>
                        </div>
                    </div>

                    <div class="col-md-4">
                        <div class="card contatado_vagas p-2 text-center">
                            <p><strong>Contatado</strong></p>
                            <p>0</p>
                        </div>
                    </div>

                    <div class="col-md-4">
                        <div class="card analise_vagas p-2 text-center">
                            <p><strong>Em análise</strong></p>
                            <p>0</p>
                        </div>
                    </div>

                </div>
            </div>

            <div className="card_vaga">
                <div className="perfil">
                    <div className="col-12">
                        <div className="row">
                            <div className="col-1">
                                <div>
                                    <img src="https://placehold.co/70" className="rounded-circle img-fluid" />
                                </div>
                            </div>

                            <div className="col-11">
                                <div className="col-4">
                                    <div className="topo">
                                        <h5 className="nome">Titulo da vaga</h5>
                                        <p className="contratacao">Tipo de contratação</p>
                                    </div>
                                </div>
                                <div className="row">

                                    <div className="col-8">
                                        <div className="info">
                                            <p>Nome da vaga</p>
                                            <p>|</p>
                                            <p>Turno</p>
                                        </div>
                                    </div>
                                    <div className="col-4 d-flex justify-content-end">
                                        <div className="alert alert-light inscricao" role="alert">
                                            <p> Status </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>

    )
}