import { useEffect } from "react";

function TestEnv() {
  useEffect(() => {
    console.log("URL do backend do Vercel:", import.meta.env.VITE_API_URL);
  }, []);

  return <div>Verifique o console do navegador</div>;
}

export default TestEnv;
