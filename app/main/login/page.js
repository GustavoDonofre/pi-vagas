'use client'
import { useState } from "react";
import supabase from "../conexao/supabase";

function Login() {

    const [email, alteraEmail] = useState("")
    const [senha, alteraSenha] = useState("")

    async function autenticar() {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: senha,
        })

        console.log(data)

        if (data.user == null) {
            alert("Dados inválidos...")
            return
        }

        console.log("Autenticado com sucesso!")
        localStorage.setItem("id_usuario", data.user.id)

    }

    return (

        <div>
            <h1>ALO ALO GUSTAVO ESQUECEU DA PAGINA DE LOGIN SEU PUTO</h1>

            <button onClick={autenticar} >Salvar</button>




            <div class="card w-50">
                <div class="card-body">
                    <h5 class="card-title"><strong>Bem-Vindo!</strong></h5> 
                    <p class="card-text">Entre na sua conta do Conecta Sanca.</p>
                    <p>Email <br/> <input onChange={e => alteraEmail(e.target.value)} /> </p>
                    <p>Senha <br/> <input type="password" onChange={e => alteraSenha(e.target.value)} /> </p>
                    <button onClick={autenticar} class="btn-padrao">Entrar</button>
                </div>
            </div>

        </div>

    );
}

export default Login;