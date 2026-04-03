import "./MenuSuperior.css"

export default function MenuSuperior(){
    return(
        <div className="barra_inicio d-flex align-items-center gap-3">
          <img className="margem_logo" src="/images/logo_branco.png" style={{ width: "40px", height: "auto" }}/>
          <h1 className="fs-4 titulo_superior"> Conecta Sanca </h1>
        </div>
    )
}