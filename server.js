const express = require('express');
const path = require('path');

const app = express();

// Servir archivos estáticos desde la carpeta dist
app.use(express.static(path.join(__dirname, 'dist/plos-article-searcher')));

// Redirigir todas las rutas a index.html (para Angular routing)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/plos-article-searcher/index.html'));
});

// Puerto
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
