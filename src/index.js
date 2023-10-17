require('dotenv').config();
const express = require("express");
const morgan = require("morgan");
const path = require("path");
const app = express();

//middleware
app.use(morgan("dev"));
//Permitimos la recepción de formularios desde AJAX o Fetch;
app.use(express.urlencoded({extended: false}));
//Permitimos la recepción de JSON;
app.use(express.json());
//Importamos las rutas que necesitamos para que esto funcione
app.use(require("./routes/index"));


//static Comienza la magia, el servidor corre y toma la carpeta public como Raíz para el acceso del usuario

app.use(express.static(path.join(__dirname, 'public')));

app.listen(3000);
console.log("Servidor de oreja parada...");
    