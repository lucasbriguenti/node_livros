import express from "express";

const app = express();

app.use(express.json());

const livros = [
  { id: 1, titulo: "O Senhor dos Anéis", autor: "J. R. R. Tolkien" },
  { id: 2, titulo: "Harry Potter", autor: "J. K. Rowling" },
];

app.get("/", (req, res) => {
  res.status(200).send("Curso de Node");
});

app.get("/livros", (req, res) => {
  res.status(200).json(livros);
});

app.get("/livros/:id", (req, res) => {
  const index = buscaLivro(parseInt(req.params.id));

  if (verificarLivroExistente(index, res)) {
    res.json(livros[index]);
  }
});

app.post("/livros", (req, res) => {
  livros.push(req.body);
  res.status(201).send("livro cadastrado");
});

app.put("/livros/:id", (req, res) => {
  const index = buscaLivro(parseInt(req.params.id));

  if (verificarLivroExistente(index, res)) {
    livros[index] = req.body;
    res.json(livros);
  }
});

app.delete("/livros/:id", (req, res) => {
  const { id } = req.params;
  const index = buscaLivro(parseInt(id));

  if (verificarLivroExistente(index, res)) {
    livros.splice(index, 1);

    res.status(200).send("Livro removido");
  }
});

export default app;

function verificarLivroExistente(index, res) {
  if (index === -1) {
    res.status(404).send("Livro não encontrado");
    return false;
  }

  return true;
}

function buscaLivro(id) {
  return livros.findIndex((livro) => livro.id === id);
}
