const express = require("express");
const app = express();

const path = require("path");
const { allowedNodeEnvironmentFlags } = require("process");
const methodOverride = require("method-override"); // para poder usar los métodos PUT y DELETE
const session = require("express-session");

/*======> Requerimos nuestros routers <======*/
const usersRoute = require("./routers/users");
const mainRouter = require("./routers/main");
const productsRouter = require("./routers/products");

/*======> Declaramos el puerto donde se ejecutará nuestra app <======*/
const PORT = process.env.PORT || 3000;

// Para poder enviar datos por POST
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Middleware de aplicación global para las SESIONES
const userLoggedMiddleware = require("./middlewares/userLoggedMiddleware");
app.use(
  session({
    secret: "Codigo secreto",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(userLoggedMiddleware);

// Utlizaremos ejs como motor de vistas
app.set("view engine", "ejs");
app.use(methodOverride("_method")); // Pasar poder pisar el method="POST" en el formulario por PUT y DELETE

/*======> Definimos los archivos que serán estáticos <======*/
const publicPath = path.join(__dirname, "./public");
app.use(express.static(publicPath));

/*======> Declaramos las rutas <======*/
app.use("/", mainRouter);
app.use("/products", productsRouter);
app.use("/users", usersRoute);

/*======> Iniciamos nuestra app <======*/
app.listen(PORT, () => console.log(`Server runing: http://localhost:${PORT}`));
