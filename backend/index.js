const express = require('express');
const cors = require('cors');
require('dotenv').config();

const startMongoDB = require('./db');
startMongoDB();

const app = express();
const port = 5000;

app.use(express.static(__dirname + '/public'));

// Enable CORS for all routes
app.use(cors({
  origin: 'https://swigato-backend-xe1m.onrender.com',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // Enable credentials (cookies, authorization headers)
}));

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Your routes...
app.use('/api', require('./routes/CreateUser'));
app.use('/api', require('./routes/DisplayData'));
app.use('/api', require('./routes/OrderData'));
app.use('/api', require('./routes/FindUser'));

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});


































// const express = require('express')
// require("dotenv").config()
// const cors=require("cors");
// const startMongoDB = require('./db');
// startMongoDB();
// const app = express()
// const port = 5000;


// app.use('/', (req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "https://swigato-backend-xe1m.onrender.com");
//   res.header("Access-Control-Allow-Headers", "Origin,X-Requested-With,Content-Type,Accept");
//   next();
// });
// app.options('*', (req, res) => {
//   res.header('Access-Control-Allow-Origin', "https://swigato-backend-xe1m.onrender.com");
//   res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//   res.send();
// });

// app.use(express.json());


// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

// app.use('/api', require("./routes/CreateUser"));
// app.use('/api', require("./routes/DisplayData"));
// app.use('/api', require("./routes/OrderData"));
// app.use('/api', require("./routes/FindUser"));
// app.listen(port, () => {
//   console.log(` app listening on port ${port}`)
// })
