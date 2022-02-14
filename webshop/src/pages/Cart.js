import { useState } from "react";

function Cart() {

  const [cartProducts, setCartProducts] = useState(getCart());

  function getCart() {
    if (sessionStorage.getItem("cart")) {
      return JSON.parse(sessionStorage.getItem("cart"));
    } else {
      return [];
    }
  }

  return (<div>{cartProducts.map(element => <div>
    <div>{element.cartProduct.name}</div>
    <div>{element.cartProduct.price} €</div>
    <div>{element.quantity} tk</div>
    <div>KOKKU: {element.cartProduct.price * element.quantity} €</div>
  </div>)}</div>)
}

export default Cart;