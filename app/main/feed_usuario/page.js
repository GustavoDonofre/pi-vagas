import "./feed.css"

export default function Feed() {
    return (

        <div>

            <form class="container-fluid">
                <div class="input-group">
                    <span class="input-group-text">🔍</span>
                    <input type="text" class="form-control" placeholder="Buscar vagas..." />
                </div>
            </form>

            <card>
                <div className="col-2">

                    <div>
                        <label className="form-label"> Turno </label>
                        <select className="form-select">
                            <option value="" selected disabled hidden> Selecione </option>
                            <option value="matutino"> Matutino </option>
                            <option value="vespertino"> Vespertino </option>
                            <option value="noturno"> Noturno </option>
                        </select>
                    </div>

                    <div>
                        <label className="form-label"> Área </label>
                        <select className="form-select">
                            <option value="" selected disabled hidden> Selecione </option>
                            <option value="">  </option>
                            <option value="">  </option>
                            <option value="">  </option>
                        </select>
                    </div>

                </div>

            </card>

        </div>

    )
}