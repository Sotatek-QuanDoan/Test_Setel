import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import { Header } from "./components/Header/Header";
import { OrderDetail } from "./components/Order/Detail/OrderDetail";
import { Order } from "./components/Order/Order";
import { Shop } from "./components/Shop/Shop";

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
