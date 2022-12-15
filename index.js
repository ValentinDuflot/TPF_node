const express = require('express');
const path = require('path');
const ejs = require('ejs');
const mongoose = require('mongoose');

mongoose.set('strictQuery', false);
mongoose.connect('mongodb://127.0.0.1:27017/absence');

const app = express();
const port = 3001;

app.use(express.static('public'));
app.set('view engine','ejs');
app.use(express.json());
app.use(express.urlencoded({extended:true}));

const logger = (req,res,next)=>{
    let log = ("Logging for request "+req.url+" with ip "+req.ip);
    req.log = log;
    next();
}
app.use(logger);


app.get('/', async (req,res)=>{
    res.render('index');
})
app.get('/departement', (req,res)=>{
    res.render('departement');
})
app.get('/loginUser', (req,res)=>{
    res.render('loginUser');
})

app.get('/absence', (req,res)=>{
    res.render('absence');
})
/*app.get('/create', (req,res)=>{
    res.render('create');
})
app.post('/post', async (req,res)=>{
    console.log("saisie nex post :"+req.body);
    await BlogPost.create(req.body, (error,BlogPost)=>{console.log(error,BlogPost)})
    res.redirect('/');
})

app.get('/post/:id', async (req,res)=>{
    const blogpost= await BlogPost.findById(req.params.id);
    //const log = req.log;
    //res.render('post',{blogpost, log});
    res.render('post',{blogpost});
})*/

app.listen(port,()=>{
    console.log(`Blog listening at http://localhost:${port}`);
});