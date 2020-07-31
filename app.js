const express=require('express');
const path=require('path')
const app=express(); 
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
mongoose.connect('mongodb://localhost/contactDance', {useNewUrlParser: true}); // i want my database name to be contactDance
const port=8000;

//DEFINE MONGOOSE SCHEMA

const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
  });

const Contact = mongoose.model('Contact', contactSchema); // making final model





















// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded()) // for forms

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory
 
// ENDPOINTS
app.get('/', (req, res)=>{
    const params = {}
    res.status(200).render('home.pug', params);
})
app.get('/contact', (req, res)=>{
    const params = {}
    res.status(200).render('contact.pug', params);
})






//if we get a post contacts request

app.post('/contact', (req, res)=>{
    var myData = new Contact(req.body); // req.body is nothing but contacts details that user has entered
    myData.save().then(()=>{
        res.send("This item has been saved to the database")
    }).catch(()=>{
        res.status(400).send("Item was not saved to the database")
    });
    // res.status(200).render('contact.pug');
})





// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});