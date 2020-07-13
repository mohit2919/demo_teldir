const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
var cors = require('cors')
const port = 3000
const nano = require('nano')('http://admin:admin@localhost:5984')



app.use(express.static(path.join(__dirname, 'public')))

app.use("/",(req,res,next)=>{
    req["nano"]=nano;
    const dir_db = nano.use("dir_db")
    req["dir_db"]=dir_db
    next()
});

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json())
app.use(cors());

const customer = require('./api/customer')
app.use('/api/dir',customer)

app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/index.html')
})

app.listen(port,()=>{
    console.log('server is running at ',port)
})