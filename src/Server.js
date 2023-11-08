const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

console.log('__dirname:', __dirname);

// Defina a pasta "public" como pasta de arquivos estáticos
app.use(express.static(path.join(__dirname, '..', 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Proxy server is running on port ${PORT}`);
});
