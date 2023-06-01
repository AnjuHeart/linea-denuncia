const express = require('express');
const port = process.env.PORT || 3000;
const app = express();

app.set('view engine', 'ejs');


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

const apiRoute = require("./api");
app.use("/api", apiRoute);

//REQUEST INSIDE SERVER SIDE
function getJsonFetch(url){
    return new Promise((resolve, reject) =>{
        request({
            url: url,
            json:true
        }, (error, response, body) => {
            if (error) reject(error);
            if (response.statusCode != 200) {
                reject('Invalid status code <' + response.statusCode + '>');
            }
            resolve(body);

        });
    });
}

app.listen(port, ()=> 
    console.log(`Server running at http://localhost:${port}`)
);