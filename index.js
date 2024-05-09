require('dotenv').config({ path: './.env' })

const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const routes = require('./src/routes/index.js')

const express = require('express')

const cors = require('cors')

const app = express()

var corOptions = {
    origin: 'http://localhost:3001'
}

app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(cookieParser());
app.use(morgan('dev'));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5100');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

app.use('/', routes);

app.use(cors(corOptions))

app.use(express.json)

app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.json({ message: 'hello world'})
})

const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log('server listening in port ', PORT)
})