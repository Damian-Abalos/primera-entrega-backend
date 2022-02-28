import axios from "axios";
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Productos = () => {
  

const [admin, setAdmin] = useState(true)

const [data, setData] = useState([]);
const [dataCarritos, setDataCarritos] = useState([]);

  const [newName, setNewName] = useState([]);
  const [newDescripcion, setNewDescripcion] = useState([]);
  const [newCodigo, setNewCodigo] = useState([]);
  const [newFoto, setNewDFoto] = useState([]);
  const [newPrecio, setNewPrecio] = useState([]);
  const [newStock, setNewStock] = useState([]);

  const urlProductos = "http://192.168.0.19:8080/api/productos"
  const getData = async () => {
    const response = await fetch(urlProductos, {
      method: "GET",
      cors: "no-cors",
      headers: { "Access-Control-Allow-Origin": "*" },
    });
    const datos = await response.json();
    setData(datos);
  };

  useEffect(() => {    
    getData();
  }, []);

  const getDataCarritos = async () => {
    const response = await fetch("http://192.168.0.19:8080/api/carritos", {
      method: "GET",
      cors: "no-cors",
      headers: { "Access-Control-Allow-Origin": "*" }     
    })
    const datosCarrito = await response.json();
    setDataCarritos(datosCarrito)
  }

  useEffect(() => {    
    getDataCarritos();
  }, []);

  const setearAdmin = () =>{
    if (admin === true){
      setAdmin(false)
    } else {
      setAdmin(true)
    }
  }

  const handleNameChange = (e) => {
    console.log(newName);
    setNewName(e.target.value);
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
      url: urlProductos,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      data: {
        nombre: newName,
        descripcion: newDescripcion,
        codigo: newCodigo,
        foto: newFoto,
        precio: newPrecio,
        stock: newStock,
      },
    });
  };

  const eliminarProducto = async (e) => {
    let idToDelete = e.target.value
    console.log(idToDelete);
    await axios.delete(`http://192.168.0.19:8080/api/productos/${idToDelete}`)
  }

//   const añadirAlCarrito = async (id) => {
//     alert(`producto con id:${id} añadido al carrito`);
// //{ id, timestamp(producto), nombre, descripcion, código, foto (url), precio, stock }
//     const productToAdd = data.find(product => product.id === id)    
//     const lastCartIndex = dataCarritos.length -1
//     const lastCart = dataCarritos[lastCartIndex]
//     const lastCartId = lastCart.id
//     const array = lastCart.productos
//     array.push(productToAdd)
    
//     await axios({
//       method: "post",
//       url: `http://192.168.0.19:8080/api/carritos/${lastCartId}`,
//       headers: {
//         "Access-Control-Allow-Origin": "*",
//       },
//       data:{productos:array}
//     })
//   }

  // const actualizar = async (e) => {
  //   await axios({
  //     method: "put",
  //     url: "http://192.168.0.19:8000/api/productos",
  //     headers: {
  //       "Access-Control-Allow-Origin": "*",
  //     },
  //     data: {

  //     }
  //   })
  // }

  // const eliminar = async (e) => {
  //   await axios({
  //     method: "delete",
  //     url: "http://192.168.0.19:8000/api/productos",
  //     headers: {
  //       "Access-Control-Allow-Origin": "*",
  //     },
  //     data: {

  //     }
  //   })
  // }

  return (
    <div className="productos">
      <button onClick={setearAdmin}>admin</button>
      {admin? (
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
      ):(<div></div>)}
      
      <section className="row justify-content-center w-100">
        <h2>Productos</h2>
        {data?.map(
          ({ id, nombre, descripcion, codigo, foto, precio, stock }) => {
            return (
              <div className="card col-3 ">
                <img
                  src={foto}
                  className="card-img-top m-auto"
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
                  <button className="btn btn-warning">Actualizar</button>
                  <button className="btn btn-danger" value={id} onClick={eliminarProducto}>Eliminar</button>
                </div>
                <div className="card-body">
                  <button className="btn btn-primary" 
                  // onClick={()=>añadirAlCarrito(id)}
                  >Añadir al carrito</button>
                </div>
              </div>
            );
          }
        )}
      </section>
    </div>
  );
}

export default Productos