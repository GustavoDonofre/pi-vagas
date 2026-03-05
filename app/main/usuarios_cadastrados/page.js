
export default function UsuariosCadastrados() {

    const usuarios = [
        {
            id: 1,
            nome: "Carlos Henrique Souza",
            email: "carlos.souza@email.com",
            senha: "carlos@123",
            cpf: "123.456.789-00",
            area: "Tecnologia",
            contato: "(11) 98888-1111",
            dataNasc: "1995-03-12"
        },
        {
            id: 2,
            nome: "Mariana Oliveira Lima",
            email: "mariana.lima@email.com",
            senha: "mariana2026",
            cpf: "234.567.890-11",
            area: "Marketing",
            contato: "(21) 97777-2222",
            dataNasc: "1998-07-25"
        },
        {
            id: 3,
            nome: "Rafael Almeida Costa",
            email: "rafael.costa@email.com",
            senha: "rafa@456",
            cpf: "345.678.901-22",
            area: "Financeiro",
            contato: "(31) 96666-3333",
            dataNasc: "1992-11-08"
        },
        {
            id: 4,
            nome: "Juliana Martins Rocha",
            email: "juliana.rocha@email.com",
            senha: "juRocha789",
            cpf: "456.789.012-33",
            area: "Recursos Humanos",
            contato: "(41) 95555-4444",
            dataNasc: "2000-01-19"
        },
        {
            id: 5,
            nome: "Lucas Fernandes Silva",
            email: "lucas.silva@email.com",
            senha: "lucas@2026",
            cpf: "567.890.123-44",
            area: "Logística",
            contato: "(51) 94444-5555",
            dataNasc: "1997-09-30"
        },
        {
            id: 6,
            nome: "Beatriz Carvalho Gomes",
            email: "beatriz.gomes@email.com",
            senha: "biaCarv",
            cpf: "678.901.234-55",
            area: "Saúde",
            contato: "(19) 93333-6666",
            dataNasc: "1994-05-14"
        },
        {
            id: 7,
            nome: "Felipe Rodrigues Mendes",
            email: "felipe.mendes@email.com",
            senha: "felipe123",
            cpf: "789.012.345-66",
            area: "Educação",
            contato: "(62) 92222-7777",
            dataNasc: "1999-12-03"
        },
        {
            id: 8,
            nome: "Amanda Ribeiro Santos",
            email: "amanda.santos@email.com",
            senha: "amanda@789",
            cpf: "890.123.456-77",
            area: "Jurídico",
            contato: "(71) 91111-8888",
            dataNasc: "1993-04-27"
        },
        {
            id: 9,
            nome: "Thiago Barbosa Nunes",
            email: "thiago.nunes@email.com",
            senha: "thiago2026",
            cpf: "901.234.567-88",
            area: "Comercial",
            contato: "(85) 90000-9999",
            dataNasc: "1996-08-16"
        },
        {
            id: 10,
            nome: "Camila Andrade Pereira",
            email: "camila.pereira@email.com",
            senha: "camila@321",
            cpf: "012.345.678-99",
            area: "Administrativo",
            contato: "(48) 98888-0000",
            dataNasc: "2001-02-10"
        }
    ];
    return (
        <div>
            <div>
                <div>
                    <h1>Usuários cadastrados</h1>
                    <hr />
                </div>
                <table className="table">
                    <thead>
                        <tr>
                            <td>Nome</td>
                            <td>Email</td>
                            <td>Cpf</td>
                            <td>Àrea</td>
                            <td>Contato</td>
                            <td>Data de Nascimento</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            usuarios.map(
                                usuario =>
                                    <tr key={usuario.id}>
                                        <td>{usuario.nome}</td>
                                        <td>{usuario.email}</td>
                                        <td>{usuario.cpf}</td>
                                        <td>{usuario.area}</td>
                                        <td>{usuario.contato}</td>
                                        <td>{usuario.dataNasc}</td>
                                    </tr>
                            )
                        }
                    </tbody>
                </table>


            </div>
        </div>

    )
};
