import React from "react";
import { products } from "../../database-sample/products";
import ShopItem from "./ShopItem";
import { Product } from '../../interface/product.interface';

export const ListProducts:React.FC = () => {
  return (
    <div className="col-lg-9">
      <h4>List products</h4>
      <div className="row">
        {products &&
          products.map((o: Product, i: number) => (
            <ShopItem item={o} key={i} />
          ))}
      </div>
    </div>
  );
}
