const express=require("express");
const PORT= 5002;
const controller=require('./controller');

const app=express();
require("./config/db");

const router = require("./routers/router");

//handlebars
const handlebars = require('express-handlebars');


app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.engine('hbs', handlebars.engine({
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials',
    extname: 'hbs',
    defaultLayout: 'main'
}));


// parsing body request
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use('/',router);

app.listen(PORT, () => {
    console.log(`The server is running on port ${PORT}`);
});