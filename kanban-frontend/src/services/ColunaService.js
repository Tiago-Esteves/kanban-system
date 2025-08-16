export async function getColunas() {
    const res = await fetch("http://localhost:8080/api/colunas");
    return res.json;
}