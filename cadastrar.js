const API_URL = "https://grud-de-filmes-back-end-mv1u.vercel.app";

const form = document.getElementById("form-cadastro") || document.querySelector("form");

if (form) {
  form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const filme = {
      titulo: document.getElementById("titulo").value,
      genero: document.getElementById("genero").value,
      classificacao_etaria: document.getElementById("classificacao").value,
      duracao: Number(document.getElementById("duracao").value)
    };

    try {
      const resposta = await fetch(`${API_URL}/add-movie`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(filme)
      });

      if (resposta.ok) {
        // Redireciona para a tela inicial assim que o cadastro for bem-sucedido
        window.location.href = "index.html";
      } else {
        alert("Erro ao cadastrar o filme.");
      }
    } catch (erro) {
      console.error("Erro na requisição:", erro);
      alert("Erro ao conectar com o servidor.");
    }
  });
}