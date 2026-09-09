async function buscarFilmes() {
    const lista = document.querySelector("#listaFilmes");

    try {
        const resposta = await fetch("https://grud-de-filmes-back-end-mv1u.vercel.app/all-movies", { cache: "no-store" });

        if (!resposta.ok) {
            throw new Error(`Erro HTTP: ${resposta.status}`);
        }

        const filmes = await resposta.json();
        lista.innerHTML = "";

        if (!Array.isArray(filmes) || filmes.length === 0) {
            lista.innerHTML = "<p>Nenhum filme cadastrado.</p>";
            return;
        }

        filmes.forEach((filme) => {
            // Pega qualquer variação existente no objeto
            const titulo = filme.titulo || filme.title || "Sem título";
            const genero = filme.genero || filme.gender || "Sem gênero";
            const duracao = filme.duracao || filme.duration || "N/A";
            const classificacao = filme.classificacao_etaria || filme.ageLimit || "N/A";

            lista.innerHTML += `
                <div class="filme">
                    <h2>${titulo}</h2>
                    <p><strong>Gênero:</strong> ${genero}</p>
                    <p><strong>Duração:</strong> ${duracao} minutos</p>
                    <p><strong>Classificação:</strong> ${classificacao}</p>
                </div>
            `;
        });

    } catch (erro) {
        console.error("Erro ao buscar filmes:", erro);
        lista.innerHTML = `<p class="erro">Não foi possível carregar os filmes.</p>`;
    }
}

buscarFilmes();