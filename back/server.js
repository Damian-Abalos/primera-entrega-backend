import express from "express";
import cors from "cors";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

let ahora = Date.now();

const data = [
    { nombre: "Damian", edad: 27 },
    { nombre: "Juana", edad: 26 },
    { nombre: "Leo", edad: 28 },
    { nombre: "Jony", edad: 31 },
];

const productos = [
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

app.get("/productos", (req, res) => {
    res.send(productos);
});

app.post("/productos", (req, res) => {
    const newData = req.body;
    productos.push(newData);
    res.send(data);
});

// app.put('/productos', (req, res) => {

// })

// app.delete('/productos', (req, res) => {

// })

// //carrito

// app.post('/carrito', (req, res) => {

// })

// app.delete('/carrito/:id', (req, res) => {

// })

// app.get('/carrito/:id/productos', (req, res) => {

// })

// app.post('/carrito/:id/productos', (req, res) => {

// })

// app.delete('/carrito/:id/productos/:id_prod', (req, res) => {

// })

app.listen(8000, () => {
    console.log("server on");
});
