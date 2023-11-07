const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 3000;

app.use(express.json());

// Rota para a raiz (rota raiz)
app.get('/', (req, res) => {
  res.send('Bem-vindo à minha aplicação!');
});

app.get('/api/movies', async (req, res) => {
  try {
    const response = await axios.get('https://api.themoviedb.org/3/your-endpoint', {
      params: req.query,
    });
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error');
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server is running on port ${PORT}`);
});
