const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const app = express();

app.use(express.json());
app.use(cors());

// Servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Conexão MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/cadastro')
  .then(() => console.log('MongoDB conectado com sucesso!'))
  .catch(err => console.log('Erro ao conectar ao MongoDB:', err));

const Pessoa = require('./models/pessoas');

// Listar
app.get('/pessoas', async (req, res) => {
  try {
    const pessoas = await Pessoa.find().sort({ dataCadastro: -1 }); 
    res.json(pessoas);
  } catch (err) {
    res.status(500).json({ erro: "Erro ao buscar dados" });
  }
});

// Criar
app.post('/pessoas', async (req, res) => {
  try {
    const pessoa = new Pessoa(req.body);
    await pessoa.save();
    res.status(201).json(pessoa);
  } catch (err) {
    res.status(400).json({ erro: "Erro ao salvar pessoa" });
  }
});

// Atualizar
app.put('/pessoas/:id', async (req, res) => {
  try {
    const atualizada = await Pessoa.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(atualizada);
  } catch (err) {
    res.status(400).json({ erro: "Erro ao atualizar" });
  }
});

// Deletar
app.delete('/pessoas/:id', async (req, res) => {
  try {
    await Pessoa.findByIdAndDelete(req.params.id);
    res.json({ mensagem: "Pessoa removida" });
  } catch (err) {
    res.status(400).json({ erro: "Erro ao deletar" });
  }
});

// Iniciar servidor
const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});