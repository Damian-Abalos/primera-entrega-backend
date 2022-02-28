import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Productos from "./components/Productos/Productos";
import Carrito from "./components/Carritos/Carrito";

function App() {
  return (
    <div className="App">
      <Router>

        <Switch>

          <Route exact path="/api/productos">
            <Productos />
          </Route>

          <Route exact path="/api/productos/:id">
            
          </Route>

          <Route exact path="/api/carrito">
            <Carrito />
          </Route>

        </Switch>

      </Router>
    </div>
  );
}

export default App;
