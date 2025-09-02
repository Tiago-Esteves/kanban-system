import { useState } from "react";
import * as authService from "../../services/authService";
import { Navigate, useNavigate } from "react-router-dom";
import "../loginPage/LoginPage.css";

function Register(){

    // eslint-disable-next-line no-unused-vars
    const [usuario, setUsuario] = useState(null);
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    async function handleRegister(e) {
        e.preventDefault();

        try {
            const data = await authService.register( { username, email, password});
            setUsuario(data);
            console.log("Usuário criado: ", data);

            navigate("/auth/login")

        } catch (error) {
            console.error("Erro ao criar conta.", error);
            alert("Erro ao criar conta. Tente novamente!");
        }
    }

    return(
        <div className="div">
            <form onSubmit={handleRegister}
                className="containerForm"
            >
                <h1 className="text-center font-bold text-[30px]"> Cadastro</h1>
                <input 
                    type="text" 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Nome de usuário"
                    className="containerFields"
                />
                <input 
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className="containerFields"
                />
                <input 
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Senha"
                    className="containerFields"
                />
                <button type="submit"
                    className="botao"
                >Criar</button>
            </form>
            <div className="divCadastro">
                <h2>Já possui uma conta? </h2>
                <button 
                    onClick={() => navigate("/auth/login")}
                    className="cadastroLink"
                > Entrar</button>
            </div>

        </div>
    )
}

export default Register;