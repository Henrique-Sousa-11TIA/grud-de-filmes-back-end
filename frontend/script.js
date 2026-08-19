async function buscarFilmes() {
    try {
        const resposta = await fetch("http://localhost:8080/all-movies");

        if (!resposta.ok) {
            throw new Error("Erro ao buscar os filmes");
        }

        const filmes = await resposta.json();

        const lista = document.querySelector(".filmes");

        lista.innerHTML = "";

        filmes.forEach((filme) => {
            lista.innerHTML += `
                <div class="filme">
                    <h2>${filme.titulo}</h2>
                    <p>Gênero: ${filme.genero}</p>
                    <p>Duração: ${filme.duracao} minutos</p>
                    <p>Classificação: ${filme.classificacao_etaria}</p>
                </div>
            `;
        });

    } catch (erro) {
        console.error("Erro:", erro);
    }
}

buscarFilmes();