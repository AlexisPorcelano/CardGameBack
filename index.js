require('dotenv').config({ path: './.env' });
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const router = require('./src/routes/index.js');
const cors = require('cors');

// Importa la configuración de la base de datos
const db = require('./src/db.js');
const sequelize = require('./src/db.js').conn
const app = express();

const PORT = 3001


app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(cookieParser());
app.use(morgan('dev'));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
  });


// Rutas
app.use('/', router);

// Manejadores de cuerpo de solicitud JSON y codificación de URL
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ruta de prueba
app.get('/', (req, res) => {
    res.json({ message: 'hello world' });
});

// Inicializa la conexión a la base de datos
db.conn.sync({ force: true }).then(() => {
    console.log('Base de datos conectada y sincronizada');
    app.listen(PORT, () => {
        console.log('Servidor escuchando en el puerto', PORT);
    });
}).catch(err => {
    console.error('Error al conectar y sincronizar la base de datos:', err);
});

