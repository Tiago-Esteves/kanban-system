import React from "react";
import "./LandingPage.css";
import videoSrc from "../../assets/videos/exemplo.mp4";
import { useNavigate } from "react-router-dom";

function LandingPage() {
    const navigate = useNavigate();

    return (
        <div className="landingPage">
            <h1>Kanban Board</h1>
            <div className="descricao">
                <p>O Kanban é um método visual de gestão de tarefas que organiza atividades em colunas representando
                    cada fase do processo, ajudando você e sua equipe a acompanhar o progresso e priorizar o que realmente importa.</p>
                <p>Transforme seu fluxo de trabalho em etapas claras. Menos confusão, mais produtividade.</p>
            </div>
            <video  className="video" width={400} height={350} autoPlay loop muted>
                <source src={videoSrc} type="video/mp4" />
                
            </video>
        <button
            onClick={() => navigate("/auth/login")}
            className="botaoLanding"
        >Crie seus quadros</button>
        </div>
    );
}
export default LandingPage;