export async function getQuadros() {
    const res = await fetch("http://localhost:8080/api/quadros");
    if(!res.ok) throw new Error("Erro ao buscar quadros"); 
    return res.json();
}