const express = require('express');
const port = process.env.PORT || 3000;
const app = express();
const session = require('express-session');
const passport = require('passport');

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false}));

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

const initializePassport = require('./passport-config')
initializePassport(passport);

//RUTA PARA INDICE
app.get("/", (req,res) =>{
    res.render("index");
});

//RUTAS PARA DENUNCIANTE
app.get("/registro" , (req,res) =>{
    res.render("registro");
});

app.get("/seguimiento", (req,res) =>{
    res.render("seguimiento");
});

//RUTAS PARA ADMIN
app.get("/admin",(req,res) =>{
    res.render("admin");
});

app.post("/admin", passport.authenticate('local', {
    successRedirect: "/portalAdmin",
    failureRedirect: "/admin"
}));

app.get('/portalAdmin', checkAuthenticated, (req, res) =>{
    res.render("portalAdmin");
});

const apiRoute = require("./api");
app.use("/api", apiRoute);

//FUNCION MIDDLEWARE PARA AUTENTICACION
function checkAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/admin');
}

app.listen(port, ()=> 
    console.log(`Server running at http://localhost:${port}`)
);