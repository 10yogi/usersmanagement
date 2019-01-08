const express = require("express");
var path = require('path');

const app = express();
var router = require('./routes/index');

const port = process.env.port || 8086;

app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');

app.use(express.json());
app.use('/',router);


app.listen(port,()=>{
  console.log(`listening on port ${port}`);
});
