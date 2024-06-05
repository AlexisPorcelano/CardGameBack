require('dotenv').config({ path: './.env' });
const express = require('express');
const expressWs = require('express-ws');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const router = require('./src/routes/index.js');

const db = require('./src/db.js');
const sequelize = require('./src/db.js').conn;
const app = express();

const PORT = 3001;

app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(cookieParser());
app.use(morgan('dev'));
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

expressWs(app);  // Esto agrega soporte WebSocket a tu aplicación Express

// Pasar `app` a las rutas
router(app, expressWs);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

db.conn.sync({ force: true })
    .then(() => {
        console.log('Base de datos conectada y sincronizada');
    })
    .catch(err => {
        console.error('Error al conectar y sincronizar la base de datos:', err);
    });
