import React from "react";
import { Product } from '../../interface/product.interface';
import { cartStore } from '../../store/cart.store';

interface Props {
  item: Product,
}

const ShopItem:React.FC<Props> = (props) => {
  return (
    <div className="col-lg-4">
      <div className="card">
        <div className="card-body">
          <img src={props.item.image} className="img-fluid" alt={props.item.name} />
          <h3 className="card-title">{props.item.name}</h3>
          <p className="card-text">
            Price: <b>{props.item.price}</b>
          </p>
          <div className="text-center">
            <button
              className="btn btn-info"
              onClick={() => {
                cartStore.addToCart(props.item.id);
              }}
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShopItem;
