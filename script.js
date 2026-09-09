async function buscarFilmes() {
    const lista = document.querySelector("#listaFilmes");

    try {
        const resposta = await fetch(
            "http://localhost:8080/all-movies"
        );

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
            lista.innerHTML += `
                <div class="filme">
                    <h2>${filme.titulo}</h2>

                    <p>
                        <strong>Gênero:</strong>
                        ${filme.genero}
                    </p>

                    <p>
                        <strong>Duração:</strong>
                        ${filme.duracao} minutos
                    </p>

                    <p>
                        <strong>Classificação:</strong>
                        ${filme.classificacao_etaria}
                    </p>
                </div>
            `;
        });

    } catch (erro) {
        console.error("Erro ao buscar filmes:", erro);

        lista.innerHTML = `
            <p class="erro">
                Não foi possível carregar os filmes.
                Verifique se o servidor está funcionando.
            </p>
        `;
    }
}

buscarFilmes();