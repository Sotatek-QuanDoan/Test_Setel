import "./App.css";
import { Header } from "./Components/Header/Header";
import { Order } from "./Components/Order/Order";
import { Shop } from "./Components/Shop/Shop";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { OrderDetail } from "./Components/Order/Detail/OrderDetail";
import React from "react";

const App:React.FC = () => {
  return (
    <Router>
      <div className="container">
        <Header />

        <Route path="/" exact component={Shop} />
        <Route path="/orders/:page?" component={Order} />
        <Route path="/order/details/:id" component={OrderDetail} />
      </div>
    </Router>
  );
}

export default App;
