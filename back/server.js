import express from "express";
const { Router } = express;
import cors from "cors";
const app = express();
const productos = Router()
const carrito = Router()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

let ahora = Date.now();

const misProductos = [
    {
        id: 1,
        timestamp: ahora,
        nombre: "Palta",
        descripcion: "Palta hass",
        codigo: 1234,
        foto: "https://hiperlibertad.vteximg.com.br/arquivos/ids/168488-1000-1000/PALTA-HASS-X-UN-1-10016.jpg?v=637353115999530000",
        precio: 125,
        stock: 50,
    },
    {
        id: 2,
        timestamp: ahora,
        nombre: "Tomate",
        descripcion: "Tomate perita",
        codigo: 1235,
        foto: "https://ardiaprod.vteximg.com.br/arquivos/ids/213840-1000-1000/Tomate-Perita-x-Kg-_1.jpg?v=637711189359870000",
        precio: 125,
        stock: 50,
    },
];

const admin = true;

//productos

productos.get("/", (req, res) => {
    res.send(misProductos);
});

productos.post("/", (req, res) => {
    const newData = req.body;
    misProductos.push(newData);
    res.send(data);
});

productos.put('/:id', (req, res) => {
    //recibe y actualiza un producto según su id.
    let id = req.params.id - 1
    misProductos[id]["nombre"] = req.body.title
    misProductos[id]["precio"] = req.body.price
    misProductos[id]["foto"] = req.body.thumbnail

    res.send(misProductos)

});

productos.delete('/:id', (req, res) => {
    //elimina un producto según su id.
    let id = req.params.id - 1
    misProductos.splice(id, 1)
    res.send(misProductos)
});

// //carrito

// carrito.post('/', (req, res) => {

// })

// carrito.delete('/:id', (req, res) => {

// })

// carrito.get('/:id/productos', (req, res) => {

// })

// carrito.post('/:id/productos', (req, res) => {

// })

// carrito.delete('/:id/productos/:id_prod', (req, res) => {

// })
app.use('/api/carrito', carrito)
app.use('/api/productos', productos)
app.use('/static', express.static('public'));

app.listen(8000, () => {
    console.log("server on");
});
