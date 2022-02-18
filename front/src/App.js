import "./App.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [data, setData] = useState([]);

  const [newName, setNewName] = useState([]);
  const [newId, setNewId] = useState([]);
  const [newDescripcion, setNewDescripcion] = useState([]);
  const [newCodigo, setNewCodigo] = useState([]);
  const [newFoto, setNewDFoto] = useState([]);
  const [newPrecio, setNewPrecio] = useState([]);
  const [newStock, setNewStock] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const response = await fetch("http://192.168.0.19:8000/api/productos", {
        method: "GET",
        cors: "no-cors",
        headers: { "Access-Control-Allow-Origin": "*" },
      });
      const datos = await response.json();
      setData(datos);
      console.log(datos);
    };
    getData();
  }, []);



  const handleNameChange = (e) => {
    console.log(newName);
    setNewName(e.target.value);
  };
  const handleIdChange = (e) => {
    console.log(newId);
    setNewId(e.target.value);
  };
  const handleDescripcionChange = (e) => {
    console.log(newDescripcion);
    setNewDescripcion(e.target.value);
  };
  const handleCodigoChange = (e) => {
    console.log(newCodigo);
    setNewCodigo(e.target.value);
  };
  const handleFotoChange = (e) => {
    console.log(newFoto);
    setNewDFoto(e.target.value);
  };
  const handlePrecioChange = (e) => {
    console.log(newPrecio);
    setNewPrecio(e.target.value);
  };
  const handleStockChange = (e) => {
    console.log(newStock);
    setNewStock(e.target.value);
  };
  const handleSubmit = async (e) => {
    await axios({
      method: "post",
      url: "http://192.168.0.19:8000/api/productos",
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      data: {
        nombre: newName,
        descripcion: newDescripcion,
        código: newCodigo,
        foto: newFoto,
        precio: newPrecio,
        stock: newStock,
      },
    });
  };

  const actualizar = async (e) => {
    await axios({
      method: "put",
      url: "http://192.168.0.19:8000/api/productos",
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      data: {

      }
    })
  }

  const eliminar = async (e) => {
    await axios({
      method: "delete",
      url: "http://192.168.0.19:8000/api/productos",
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      data: {

      }
    })
  }

  return (
    <div className="App">
      <section className="formularioProductos">
        <h2>Añadir de productos</h2>
        <input
          className="d-block m-auto"
          type="text"
          name="nombre"
          placeholder="nombre"
          onChange={handleNameChange}
        />
        <input
          className="d-block m-auto"
          type="text"
          name="id"
          placeholder="id"
          onChange={handleIdChange}
        />
        <input
          className="d-block m-auto"
          type="text"
          name="descripcion"
          placeholder="descripcion"
          onChange={handleDescripcionChange}
        />
        <input
          className="d-block m-auto"
          type="text"
          name="codigo"
          placeholder="codigo"
          onChange={handleCodigoChange}
        />
        <input
          className="d-block m-auto"
          type="text"
          name="foto"
          placeholder="foto"
          onChange={handleFotoChange}
        />
        <input
          className="d-block m-auto"
          type="text"
          name="precio"
          placeholder="precio"
          onChange={handlePrecioChange}
        />
        <input
          className="d-block m-auto"
          type="text"
          name="stock"
          placeholder="stock"
          onChange={handleStockChange}
        />
        <input
          className="mt-2"
          type="button"
          value="Guardar"
          onClick={handleSubmit}
        />
      </section>
      <section className="row justify-content-center w-100">
        <h2>Productos</h2>
        {data?.map(
          ({ id, nombre, descripcion, codigo, foto, precio, stock }) => {
            return (
              <div class="card col-3 ">
                <img
                  src={foto}
                  class="card-img-top m-auto"
                  alt="..."
                  style={{ maxWidth: "200px", height: "200px" }}
                />
                <div className="card-body">
                  <h4 className="card-title">{nombre}</h4>
                  <h5 className="card-title">id:{id}</h5>
                  <p className="card-text">{descripcion}</p>
                </div>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item" style={{ listStyle: "none" }}>
                    precio: ${precio}
                  </li>
                  <li className="list-group-item" style={{ listStyle: "none" }}>
                    Disponibles: {stock}
                  </li>
                  <li className="list-group-item" style={{ listStyle: "none" }}>
                    Cod del producto: {codigo}
                  </li>
                </ul>
                <div className="card-body d-flex justify-content-around border-bottom">
                  <button className="btn btn-warning" onClick={actualizar}>Actualizar</button>
                  <button className="btn btn-danger" onClick={eliminar}>Eliminar</button>
                </div>
                <div className="card-body">
                  <button className="btn btn-primary">Añadir al carrito</button>
                </div>
              </div>
            );
          }
        )}
      </section>
      <section className="carrito">
        <h2>Carrito de compras</h2>
      </section>
    </div>
  );
}

export default App;
