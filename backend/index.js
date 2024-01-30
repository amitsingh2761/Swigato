const express = require('express')

const startMongoDB=require('./db');
startMongoDB();
const app = express()
const port = 5000


app.use('/',(req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin","http://localhost:3000");
  res.header("Access-Control-Allow-Headers","Origin,X-Requested-With,Content-Type,Accept");
  next();
});
app.options('*', (req, res) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.send();
});

app.use(express.json());


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/api',require("./routes/createuser"));
app.use('/api',require("./routes/DisplayData"));
app.use('/api',require("./routes/OrderData"));
app.use('/api',require("./routes/FindUser"));
app.listen(port, () => {
  console.log(` app listening on port ${port}`)
})