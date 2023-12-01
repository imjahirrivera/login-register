const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;

const app = express();
const port = process.env.PORT || 3000;

// Middleware para analizar datos JSON
app.use(bodyParser.json());

// Ruta para servir la página HTML
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/src/index.html');
});

// Agregar esto después de inicializar tu aplicación Express
app.use(express.static('./src/'));

// Ruta para manejar datos JSON (acumular datos en lugar de sobrescribir)
app.post('/guardar-datos', async (req, res) => {
    try {
      const nuevosDatos = req.body;
  
      // Leer datos existentes del archivo JSON
      let datosExistente = [];
      try {
        const contenidoArchivo = await fs.readFile('datos.json', 'utf-8');
        datosExistente = JSON.parse(contenidoArchivo);
        // Verificar si datosExistente es un array
        if (!Array.isArray(datosExistente)) {
          datosExistente = [];
        }
      } catch (error) {
        // Si el archivo no existe o hay un error al leerlo, datosExistente se quedará como un array vacío
      }
  
      // Combinar datos existentes con los nuevos
      const datosCombinados = [...datosExistente, ...nuevosDatos];
  
      // Guardar los datos combinados en el archivo JSON
      await fs.writeFile('datos.json', JSON.stringify(datosCombinados, null, 2));
  
      res.json({ message: '¡Registro realizado con éxito!' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al guardar datos' });
    }
  });

// Ruta para obtener la lista de usuarios
app.get('/obtener-usuarios', async (req, res) => {
    try {
      const contenidoArchivo = await fs.readFile('datos.json', 'utf-8');
      const usuarios = JSON.parse(contenidoArchivo);
      res.json(usuarios);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al obtener usuarios' });
    }
}); 

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor web iniciado en http://localhost:${port}`);
});
