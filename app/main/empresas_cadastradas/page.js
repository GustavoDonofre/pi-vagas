export default function EmpresasCadastradas() {

    const empresas = [
        {
            id: 1,
            nome: "Tech Solutions LTDA",
            email: "contato@techsolutions.com",
            senha: "tech@123",
            cnpj: "12.345.678/0001-90",
            area: "Tecnologia",
            telefone: "(11) 99999-9999",
            contato2: null,
            premium: true,
            endereco: "Rua das Inovações, 100 - São Paulo/SP"
        },
        {
            id: 2,
            nome: "Construtora Horizonte",
            email: "atendimento@horizonte.com",
            senha: "horizonte2026",
            cnpj: "98.765.432/0001-10",
            area: "Construção Civil",
            telefone: "(21) 98888-7777",
            contato2: "(21) 97777-6666",
            premium: false,
            endereco: "Av. Central, 450 - Rio de Janeiro/RJ"
        },
        {
            id: 3,
            nome: "Marketing Criativo Agência",
            email: "contato@mkcriativo.com",
            senha: "mk@criativo",
            cnpj: "45.321.987/0001-55",
            area: "Marketing Digital",
            telefone: "(31) 96666-5555",
            contato2: null,
            premium: true,
            endereco: "Rua das Ideias, 78 - Belo Horizonte/MG"
        },
        {
            id: 4,
            nome: "Auto Peças Brasil",
            email: "vendas@autopecas.com",
            senha: "auto123",
            cnpj: "11.222.333/0001-44",
            area: "Automotivo",
            telefone: "(19) 95555-4444",
            contato2: null,
            premium: false,
            endereco: "Av. Brasil, 999 - Campinas/SP"
        },
        {
            id: 5,
            nome: "Clínica Vida Plena",
            email: "contato@vidaplena.com",
            senha: "vida@2026",
            cnpj: "22.333.444/0001-55",
            area: "Saúde",
            telefone: "(41) 94444-3333",
            contato2: "(41) 93333-2222",
            premium: true,
            endereco: "Rua Saúde, 120 - Curitiba/PR"
        },
        {
            id: 6,
            nome: "EducaMais Cursos",
            email: "suporte@educamais.com",
            senha: "educa456",
            cnpj: "33.444.555/0001-66",
            area: "Educação",
            telefone: "(51) 92222-1111",
            contato2: null,
            premium: false,
            endereco: "Av. do Saber, 321 - Porto Alegre/RS"
        },
        {
            id: 7,
            nome: "Restaurante Sabor da Terra",
            email: "contato@sabordaterra.com",
            senha: "sabor789",
            cnpj: "44.555.666/0001-77",
            area: "Alimentação",
            telefone: "(85) 91111-0000",
            contato2: null,
            premium: true,
            endereco: "Rua Gourmet, 88 - Fortaleza/CE"
        },
        {
            id: 8,
            nome: "Imobiliária Prime Lar",
            email: "atendimento@primelar.com",
            senha: "prime@lar",
            cnpj: "55.666.777/0001-88",
            area: "Imobiliário",
            telefone: "(62) 90000-9999",
            contato2: "(62) 98888-7777",
            premium: false,
            endereco: "Av. Residencial, 654 - Goiânia/GO"
        },
        {
            id: 9,
            nome: "Logística Rápida Express",
            email: "suporte@rapidaexpress.com",
            senha: "express2026",
            cnpj: "66.777.888/0001-99",
            area: "Logística",
            telefone: "(71) 97777-6666",
            contato2: null,
            premium: true,
            endereco: "Rua do Transporte, 432 - Salvador/BA"
        },
        {
            id: 10,
            nome: "PetShop Amigo Fiel",
            email: "contato@amigofiel.com",
            senha: "pet@fiel",
            cnpj: "77.888.999/0001-00",
            area: "Pet",
            telefone: "(48) 96666-5555",
            contato2: null,
            premium: false,
            endereco: "Av. dos Animais, 210 - Florianópolis/SC"
        }
    ];

    return (
        <div>
            <h1>Empresas cadastradas</h1>
            <hr />

            <table className="table">
                <thead>
                    <tr>
                        <td>Nome</td>
                        <td>Email</td>
                        <td>Endereço</td>
                        <td>Cnpj</td>
                        <td>Àrea</td>
                        <td>Telefone</td>
                        <td>Outro contato</td>
                        <td>Premium</td>
                    </tr>
                </thead>
                <tbody>

                    {
                        empresas.map(
                            empresa =>
                                <tr key={empresa.id}>
                                    <td>{empresa.nome}</td>
                                    <td>{empresa.email}</td>
                                    <td>{empresa.endereco}</td>
                                    <td>{empresa.cnpj}</td>
                                    <td>{empresa.area}</td>
                                    <td>{empresa.telefone}</td>
                                    <td>{empresa.contato2}</td>
                                    <td>
                                        <input
                                            type="checkbox"
                                            checked={empresa.premium}
                                            readOnly
                                        />
                                    </td>
                                </tr>
                        )
                    }
                </tbody>


            </table>
        </div>
    )
};
