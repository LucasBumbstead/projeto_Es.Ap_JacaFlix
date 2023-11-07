const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;


// Servir arquivos estáticos a partir da pasta de compilação
app.use(express.static(path.join(__dirname, 'build')));


app.listen(port, () => {
  console.log(`Servidor está ouvindo na porta ${port}`);
});