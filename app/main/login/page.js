'use client'
import { useState } from "react";
import supabase from "../conexao/supabase";

function Login() {

    const [ email, alteraEmail ] = useState("")
    const [ senha, alteraSenha ] = useState("")

    async function autenticar(){
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: senha,
        })

        console.log(data)

        if(data.user == null){
            alert("Dados inválidos...")
            return
        }

        console.log("Autenticado com sucesso!")
        localStorage.setItem("id_usuario", data.user.id)

    }

    return (
        <div>
            <h1>ALO ALO GUSTAVO ESQUECEU DA PAGINA DE LOGIN SEU PUTO</h1>

            <p>Email <input onChange={ e => alteraEmail(e.target.value)} /> </p>
            <p>Senha <input onChange={ e => alteraSenha(e.target.value)} /> </p>
            <button onClick={autenticar} >Salvar</button>

        </div>
    );
}

export default Login;