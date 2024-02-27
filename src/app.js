import express from "express"
import mongoose from "mongoose"
import userRouter from "./routes/users.router.js"
import productRouter from "./routes/products.router.js"
import cartRouter from "./routes/carts.router.js"
import agregarCarrito from "./routes/agregarCarrito.router.js"
import messageRouter from "./routes/messages.router.js"
import viewsRouter from "./routes/views.router.js"
import handlebars from "express-handlebars"
import ProductsManager from './daos/ProductsManager.class.js';
import multer from "multer";
import path from 'path';
import { fileURLToPath } from "url";
import { dirname , join } from "path";
import { v4 as uuidv4 } from 'uuid';
import bodyParser from 'body-parser';

const app = express()

app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");



const _filename = fileURLToPath(import.meta.url)
const _dirname = dirname(_filename)

const PORT = 8080


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(bodyParser.urlencoded({ extended: true }));


mongoose.connect("mongodb+srv://vventurini:16371@clustercoder.szloyof.mongodb.net/coderDB?retryWrites=true&w=majority")
    .then(() => {
        console.log("Conectado a la base de datos")
    })
    .catch(error => {
        console.error("Error al conectarse a la base de datos", error)
    })

    
app.use("/api/users", userRouter)
app.use("/api/products", productRouter)
app.use("/api/carts", cartRouter)
app.use("/carts", agregarCarrito)
app.use("/api/messages", messageRouter)
app.use('/', viewsRouter);

app.get("/", (req, res) => res.render("users"));

app.get("/products", (req, res) =>
  res.render("products"));

  app.get("/carts", (req, res) =>
  res.render("carts"));

  app.get('/users', (req, res) => {
    res.render('users')
  })

  app.get('/messages', (req, res) => {
    res.render('messages')
  })
  

  app.get("/descargas", (req,res) => {
    res.sendFile (path.join(_dirname, 'public', 'uploadFiles.html'))
})

const newUuid = uuidv4();

//subir archivos
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb (null, path.join (_dirname, 'descargas')
        )
    },
    filename:(req, file, cb) => {
        const timeStamp = Date.now()
        const originalName = file.originalname
        const ext = path.extname(originalName)
        cb (null,`${timeStamp} - ${originalName}`)
    }
})

const upload = multer ({storage})

app.post("/descargas", upload.single ("archivo"), (req,res)=> {
    res.json({message: "archivo subido correctamente"})
})