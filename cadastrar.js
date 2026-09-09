async function cadastrarFilme() {
    const inputTitle = document.getElementById("title");
    const inputGender = document.getElementById("gender");
    const inputAgeLimit = document.getElementById("ageLimit");
    const inputDuration = document.getElementById("duration");

    if (!inputTitle.value || !inputGender.value || !inputAgeLimit.value || !inputDuration.value) {
        alert("Preencha todas as informações!");
        return;
    }

    const filme = {
        titulo: inputTitle.value,
        title: inputTitle.value,
        genero: inputGender.value,
        gender: inputGender.value,
        classificacao_etaria: inputAgeLimit.value,
        ageLimit: inputAgeLimit.value,
        duracao: Number(inputDuration.value),
        duration: Number(inputDuration.value)
    };

    const informacoesAEnviar = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(filme)
    };

    try {
        const resposta = await fetch("http://localhost:8080/add-movie", informacoesAEnviar);

        if (!resposta.ok) {
            throw new Error(`Erro no cadastro: ${resposta.status}`);
        }

        const mensagemDecifrada = await resposta.json();
        alert(mensagemDecifrada.mensagem || mensagemDecifrada.message || "Filme cadastrado!");

        // Redireciona apontando para a raiz do Live Server para recarregar o index correto
        window.location.href = "./index.html";
    } catch (erro) {
        console.error("Erro ao cadastrar:", erro);
        alert("Erro ao conectar com o servidor local.");
    }
}