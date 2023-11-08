const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000; // Porta em que o servidor irá rodar

// Defina a pasta "build" como pasta de arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Rota para servir a página principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Inicie o servidor na porta especificada
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
