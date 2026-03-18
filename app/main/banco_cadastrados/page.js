export default function BancoCadastrado () {

    const bancoCandidato = [

        {
        id_usuario: 
        curriculo: curriculo,
        certificacoes: certificacoes,
        portfolio: portfolio,
        area: area,
        competencias: competencias,
        contratacao: contratacao,
        turno: turno,
        }

    ];
    return (
        <div>

            <h1>Vendas</h1>
            <hr />

            <table class="table">
                <tr>
                    <td>#</td>
                    <td>Cliente</td>
                    <td>Produtos</td>
                    <td>Quantidade</td>
                    <td>Forma de pagamento</td>
                    <td>Data</td>
                </tr>

                {
                    listaVendas.length == 0 ?
                        <p>Carregando</p>
                        :
                        listaVendas.map(
                            (item, index) => <tr>
                                <td> {index+1} </td>
                                <td> {item.id_usuario.nome} </td>
                                <td> {item.id_livro.nome} </td>
                                <td> {item.quantidade} </td>
                                <td> {formataPagamento(item.pagamento)} </td>
                                <td> {formataData(item.created_at)} às {formataHoras(item.created_at)} </td>
                            </tr>
                        )
                }

            </table>

        </div >
    )
        

}