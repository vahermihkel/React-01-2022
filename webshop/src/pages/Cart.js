import { useEffect, useState } from "react";
import PackageMachines from "../components/PackageMachines";
import { cartSumService } from '../services/CartSumService'
import styles from "./Cart.module.css";

function Cart() {

  const [cartProducts, setCartProducts] = useState(getCart());
  const [cartSum, setCartSum] = useState(0);

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
    if (!isParcelMachine(product)) {
      const index = cartProducts.indexOf(product); // indexOf-i saan siis kasutada kui on täpselt
      // identne toode millele ma indexit otsin ja indexOf sulgude sisse panen ka otsitavas
      // massiivis. See hõlmab ka mälukohta. Kui ei ole sama mälukoht, siis kasutan findIndex
      // funktsiooni või otsin mingite kindlate omaduste alusel (kasutan otsimiseks ID-d või nime)
      cartProducts.splice(index,1);
      
      // const packageMachineIndex = cartProducts.findIndex(element => isParcelMachine(element));
      if (cartProducts.length === 1 && isParcelMachine(cartProducts[0])) {
        setCartProducts([]);
        sessionStorage.setItem("cart",JSON.stringify([]));
        sessionStorage.removeItem("parcelmachine");
      } else {
        setCartProducts(cartProducts.slice());
        sessionStorage.setItem("cart",JSON.stringify(cartProducts));
      }
    }
  }

  useEffect(()=>{
      let sumOfCart = 0;
      cartProducts.forEach(element => sumOfCart += element.cartProduct.price * element.quantity);
      setCartSum(sumOfCart.toFixed(2));
      cartSumService.sendCartSum(sumOfCart.toFixed(2));
  },[cartProducts]);

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
      "amount": cartSum,
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

  function isParcelMachine(parcelMachine) {
    return parcelMachine.cartProduct.id === "11110000";
  }

  // function updateCart(cartProducts) {
  //   console.log(cartProducts);
    
  // }

                                                    // pöördun imporditud CSS klassi poole
                                                    // ja võtan sealt CSS klassi
  return (
  <div>
    <div>{cartProducts.map(element => <div key={element.cartProduct.id} className={styles.cartItem}>
      <div className={styles.cartItemName}>{element.cartProduct.name}</div>
      <div className={styles.cartItemPrice}>{Number(element.cartProduct.price).toFixed(2)} €</div>
      <div className={styles.cartItemQuantityControls}>
        { !isParcelMachine(element) && <img className={styles.cartItemButton} onClick={() => onDecreaseQuantity(element)} src="/cart/minus.png" alt="" />}
        <div className={styles.cartItemQuantity}>{element.quantity} tk</div>
        { !isParcelMachine(element) && <img className={styles.cartItemButton} onClick={() => onIncreaseQuantity(element)} src="/cart/plus.png" alt="" />}
      </div>
      <div className={styles.cartItemTotal}>{Number(element.cartProduct.price * element.quantity).toFixed(2)} €</div>
      <img 
          className={ isParcelMachine(element) ? 
                        styles.buttonDisabled :
                        styles.cartItemButton } 
          onClick={() => onRemoveFromCart(element)} 
          src="/cart/delete.png" 
          alt="" />  
      </div>)}
    { cartProducts.length > 0 && <div className={styles.cartSum}>
        <PackageMachines cartContent={cartProducts} sendProducts={setCartProducts} /> 
        <div>{cartSum} €</div>
        <button className={styles.paymentButton} onClick={onPay}>Maksa ›</button>
      </div> }
    </div>
  </div>
  )
}

export default Cart;