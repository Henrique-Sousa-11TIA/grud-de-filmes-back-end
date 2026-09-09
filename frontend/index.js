const API_URL = "https://grud-de-filmes-back-end-mv1u.vercel.app";

async function carregarFilmes() {
  try {
    // cache: "no-store" garante que a Vercel sempre busque os dados mais recentes do servidor
    const resposta = await fetch(`${API_URL}/all-movies`, { cache: "no-store" });
    const filmes = await resposta.json();

    const lista = document.getElementById("lista-filmes");
    if (!lista) return;
    
    lista.innerHTML = "";

    filmes.forEach((filme) => {
      const li = document.createElement("li");
      const titulo = filme.titulo || filme.title;
      const genero = filme.genero || filme.genre;
      const duracao = filme.duracao || filme.duration;
      const classificacao = filme.classificacao_etaria || filme.ageRating || filme.classificacao;

      li.textContent = `${titulo} - ${genero} (${duracao} min) - ${classificacao}`;
      lista.appendChild(li);
    });
  } catch (erro) {
    console.error("Erro ao carregar filmes:", erro);
  }
}

carregarFilmes();