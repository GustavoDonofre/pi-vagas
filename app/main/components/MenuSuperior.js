import "./MenuSuperior.css"

export default function MenuSuperior(){
    return(
        <div className="barra_inicio d-flex align-items-center gap-3">
          <img className="margem_logo" src="/images/logo_banco_v2.png" style={{ width: "50px", height: "auto" }}/>
          <h1 className="fs-4 titulo_superior"> Conecta Sanca </h1>
        </div>
    )
}