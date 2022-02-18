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

  function onDecreaseQuantity(product) {
    product.quantity--;
    if (product.quantity === 0) {
      onRemoveFromCart(product);
    }
    setCartProducts(cartProducts.slice());
    sessionStorage.setItem("cart",JSON.stringify(cartProducts));
  }

  function onIncreaseQuantity(product) {
    // product.quantity = product.quantity + 1;
    // product.quantity += 1;
    product.quantity++;
    setCartProducts(cartProducts.slice());
    sessionStorage.setItem("cart",JSON.stringify(cartProducts));
  }

  function onRemoveFromCart(product) {
    const index = cartProducts.indexOf(product); // indexOf-i saan siis kasutada kui on täpselt
    // identne toode millele ma indexit otsin ja indexOf sulgude sisse panen ka otsitavas
    // massiivis. See hõlmab ka mälukohta. Kui ei ole sama mälukoht, siis kasutan findIndex
    // funktsiooni või otsin mingite kindlate omaduste alusel (kasutan otsimiseks ID-d või nime)
    cartProducts.splice(index,1);
    setCartProducts(cartProducts.slice());
    sessionStorage.setItem("cart",JSON.stringify(cartProducts));
  }

  function calculateSumOfCart() {
    let sumOfCart = 0;
    cartProducts.forEach(element => sumOfCart += element.cartProduct.price * element.quantity);
    return sumOfCart;
  }

  // function getFirebaseOrderCount() {
  //     let ordersLength = 0;
  //     fetch("https://webshop-02-2022-default-rtdb.europe-west1.firebasedatabase.app/orders.json")
  //     .then(response => response.json()) 
  //     .then(body => {
  //         const newArray = [];
  //         for (const key in body) {
  //           newArray.push(body[key]);
  //         }
  //         console.log(newArray.length);
  //       }
  //     );
  //     return ordersLength + 100000;
  // }

  function onPay() {
    const paymentData = {
      "api_username": "92ddcfab96e34a5f",
      "account_name": "EUR3D1",
      "amount": calculateSumOfCart(),
      "order_reference": Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000,
      "nonce": "92ddcfab96e34a5f" + new Date(),
      "timestamp": new Date(),
      "customer_url": "https://reactmihkel022022.web.app/tellimus"
      };

    fetch("https://igw-demo.every-pay.com/api/v4/payments/oneoff",
      {
        method: "POST",
        body: JSON.stringify(paymentData),
        headers: {
          "Content-Type": "application/json",   
          "Authorization": "Basic OTJkZGNmYWI5NmUzNGE1Zjo4Y2QxOWU5OWU5YzJjMjA4ZWU1NjNhYmY3ZDBlNGRhZA=="
        }
      }
    ).then(res => res.json())
    .then(data => window.location.href = data.payment_link);
  }

  return (<div>{cartProducts.map(element => <div>
    <div>{element.cartProduct.name}</div>
    <div>{element.cartProduct.price} €</div>
    <button onClick={() => onDecreaseQuantity(element)}>-</button>
    <div>{element.quantity} tk</div>
    <button onClick={() => onIncreaseQuantity(element)}>+</button>
    <div>KOKKU: {element.cartProduct.price * element.quantity} €</div>
    <button onClick={() => onRemoveFromCart(element)}>x</button>
    <br /><br />
  </div>)}
  { cartProducts.length > 0 && <div>{calculateSumOfCart()}</div>}
  { cartProducts.length > 0 && <button onClick={onPay}>Maksa</button> }
  </div>)
}

export default Cart;