import { useState } from "react";
import * as authService from "../../services/authService";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

function LoginPage() {

    // eslint-disable-next-line no-unused-vars
    const [usuario, setUsuario] = useState(null);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    async function handleLogin(e) {
        e.preventDefault();
        try {
            const data = await authService.login({ email: username, password })
            setUsuario(data)
            localStorage.setItem("token", data.token);
            localStorage.setItem("tipoToken", data.tipoToken);
            navigate("/quadros");
        } catch (error) {
            console.error("Erro no login: ", error);
        }
    }

    return (
        <div className="div">

            <form
                onSubmit={handleLogin}
                className="containerForm"
            >
                <h1 className="text-center font-bold text-[50px]">Bem vindo!</h1>
                <h1 className="text-center font-bold text-[30px] mt-4">Login</h1>
                <input
                    className="containerFields"
                    type="email"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Email"
                />
                <input
                    className="containerFields"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Senha"
                />
                <button
                    type="submit"
                    className="botao"
                >Entrar</button>
                <div className="divCadastro">
                    <h2>Ainda não possui uma conta? </h2>
                    <button
                        onClick={() => navigate("/auth/register")}
                        className="cadastroLink"
                    > Cadastre-se</button>
                </div>
            </form>



        </div>
    )
}

export default LoginPage;