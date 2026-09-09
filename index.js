import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

const filmes = [
    {
        id: 1,
        titulo: "Interestelar",
        genero: "Ficção científica",
        duracao: 169,
        classificacao_etaria: "10 anos"
    },
    {
        id: 2,
        titulo: "O Poderoso Chefão",
        genero: "Drama",
        duracao: 175,
        classificacao_etaria: "16 anos"
    },
    {
        id: 3,
        titulo: "Toy Story",
        genero: "Animação",
        duracao: 81,
        classificacao_etaria: "Livre"
    }
];

// BUSCAR TODOS OS FILMES
app.get("/all-movies", (req, res) => {
    res.json(filmes);
});

// ADICIONAR FILME
app.post("/add-movie", (req, res) => {
    const novoFilme = {
        id: filmes.length + 1,
        titulo: req.body.titulo,
        genero: req.body.genero,
        duracao: Number(req.body.duracao),
        classificacao_etaria: req.body.classificacao_etaria
    };

    filmes.push(novoFilme);

    res.status(201).json({
        mensagem: "Filme adicionado com sucesso!",
        filme: novoFilme
    });
});

// DELETAR FILME
app.delete("/delete-movie/:id", (req, res) => {
    const id = Number(req.params.id);

    const indice = filmes.findIndex(filme => filme.id === id);

    if (indice === -1) {
        return res.status(404).json({
            mensagem: "Filme não encontrado"
        });
    }

    const filmeRemovido = filmes.splice(indice, 1);

    res.json({
        mensagem: "Filme removido com sucesso!",
        filme: filmeRemovido[0]
    });
});

// EDITAR FILME
app.put("/update-movie/:id", (req, res) => {
    const id = Number(req.params.id);

    const filme = filmes.find(filme => filme.id === id);

    if (!filme) {
        return res.status(404).json({
            mensagem: "Filme não encontrado"
        });
    }

    filme.titulo = req.body.titulo;
    filme.genero = req.body.genero;
    filme.duracao = Number(req.body.duracao);
    filme.classificacao_etaria = req.body.classificacao_etaria;

    res.json({
        mensagem: "Filme atualizado com sucesso!",
        filme: filme
    });
});

// SERVIDOR
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});