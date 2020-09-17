const express = require('express');
const mongoose = require('mongoose');
const app = express();
const blogRoutes = require('./routes/blogRoutes')

//register view engine
app.set('view engine', 'ejs');

const dbURI = 'mongodb+srv://test:test@cluster0-bsj2k.mongodb.net/pro1?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => {
        app.listen(1507);
    })
    .catch((err) => {
        console.log(err);
    })

app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.redirect('/blogs');
});
app.get('/about', (req, res) => {
    res.render('about', {title: 'About'});
});

//blog routes
app.use('/blogs', blogRoutes);

//404
app.use((req, res) => {
    res.status(404).render('404', {title: 'Error'});
});