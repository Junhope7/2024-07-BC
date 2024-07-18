// Package 관한 선언
require('dotenv').config();
const express=require('express');
const nunjucks = require('nunjucks');
const bodyParser = require('body-parser')   //body parser 추가 1
const app = express();
const port = process.env.SERVER_PORT || 3000;

// HTML 파일 위치 views
nunjucks.configure('views',{
    express:app,
});

//HTML 환경설정 , post , public
app.set('view engine', 'html');
app.use(bodyParser.urlencoded({extended:false})); //객체 들어감. 추가 2 
app.use(express.static('public'));

// Controller
// 127.0.0.1:3000/
app.get('/', (req,res)=>{
    res.render('index');
});
//Login 화면
app.get('/login', (req,res)=>{
    res.render('index',{'center':'login'});
});
// Register 화면 
app.get('/register', (req,res)=>{
    res.render('index',{'center':'register'});
});

// Map 화면 
app.get('/map', (req,res)=>{
    res.render('index',{'center':'map'});
});
// Map2
app.get('/map2', (req,res)=>{
    res.render('index',{'center':'map2'});
});

// Chart 화면 
app.get('/chart', (req,res)=>{
    res.render('index',{'center':'chart'});
});

// Chart2 화면 
app.get('/chart2', (req,res)=>{
    res.render('index',{'center':'chart2'});
});



// Detail 화면
app.get('/detail', (req,res)=>{
    res.render('index',{'center':'detail'});
});

// Router
const cust = require('./routes/cust');
app.use('/cust', cust);

const item = require('./routes/item');
app.use('/item', item);

app.listen(port,()=>{
    console.log(`server start port:${port}`)
})