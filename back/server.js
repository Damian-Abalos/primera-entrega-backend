import cors from "cors";
import express from "express";
const { Router } = express;
const app = express();

const rutaProductos = Router();
const rutaCarritos = Router();
import Productos from "./Productos.js";
import Carritos from "./Carritos.js";
const productos = new Productos("productos.txt");
const carritos = new Carritos("carritos.txt");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const administrador = true;

//productos
rutaProductos.get("/", (req, res) => {
    productos.getAll().then((resp) => res.send(resp));
});

rutaProductos.get("/:id", (req, res) => {
    const id = req.params.id;
    console.log(id);
    productos.getById(id).then((resp) => res.send(resp));
});

rutaProductos.post("/", (req, res) => {
    const newData = req.body;
    if (administrador) {
        productos.save(newData).then((resp) => res.send(resp));
    } else {
        res.send({
            error: -1,
            descripcion: `ruta '${req.url}' método ${req.method}, no autorizada`,
        });
    }
});

rutaProductos.put("/:id", (req, res) => {
    let id = req.params.id;
    if (administrador) {
        productos.updateById(req.body, id).then((resp) => res.send(resp));
    } else {
        res.send({
            error: -1,
            descripcion: `ruta '${req.url}' método ${req.method}, no autorizada`,
        });
    }
});

rutaProductos.delete("/:id", (req, res) => {
    let id = req.params.id;
    if (administrador) {
        productos.deleteById(id).then((resp) => res.send(resp));
    } else {
        res.send({
            error: -1,
            descripcion: `ruta '${req.url}' método ${req.method}, no autorizada`,
        });
    }
});

//carrito

rutaCarritos.get("/", (req, res) => {
    carritos.getAllCarts().then((resp) => res.send(resp));
});

rutaCarritos.get("/:id", (req, res) =>{
    const id = req.params.id;
    console.log(id);
    carritos.getById(id).then((resp) => res.send(resp));
})

rutaCarritos.post('/', (req, res) => {
    carritos.create().then(resp => res.send(resp))
})

rutaCarritos.delete('/:id', (req, res) => {
    const id = req.params.id
    carritos.deleteCartByID(id).then(resp => res.send(resp))
})

rutaCarritos.post('/:id/productos', (req, res) => {
    const id = req.params.id
    const id_prod = req.body.id_prod
    productos.getById(id_prod)
        .then(resp => {
            carritos.saveById(resp, id).then(respo => res.send(respo))
        })
})

rutaCarritos.get('/:id/productos', (req, res) => {
    const id = req.params.id
    carritos.getProductsById(id).then(resp => res.send(resp))
})

rutaCarritos.delete('/:id/productos/:id_prod', (req, res) => {
    const id = req.params.id
    const id_prod = req.params.id_prod
    carritos.updateById(id, id_prod).then(resp => res.send(resp))
})

app.use('/api/carritos', rutaCarritos)
app.use("/api/productos", rutaProductos);
app.use("/static", express.static("public"));

app.listen(8080, () => {
    console.log("server on");
});
