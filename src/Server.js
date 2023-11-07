const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    // Serve o arquivo HTML que inclui seu aplicativo React
    const filePath = path.join(__dirname, 'public', 'index.html');

    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(500);
        res.end('Erro interno do servidor');
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
      }
    });
  } else {
    // Lidar com outras solicitações, como recursos estáticos (CSS, JavaScript)
    const staticFilePath = path.join(__dirname, 'public', req.url);
    
    fs.readFile(staticFilePath, (err, data) => {
      if (err) {
        res.writeHead(404);
        res.end('Recurso não encontrado');
      } else {
        // Determinar o tipo de conteúdo com base na extensão do arquivo
        const contentType = getContentType(req.url);
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(data);
      }
    });
  }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

// Função auxiliar para determinar o tipo de conteúdo com base na extensão do arquivo
function getContentType(filename) {
  const extname = path.extname(filename);
  switch (extname) {
    case '.js':
      return 'text/javascript';
    case '.css':
      return 'text/css';
    default:
      return 'text/plain';
  }
}
