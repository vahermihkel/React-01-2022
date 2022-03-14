// import React, { useState } from "react";

// const CartSumContext = React.createContext({
//   cartSum: 0
// });

// export const CartSumContextProvider = (props) => {
//   const [cartSum, setCartSum] = useState(getCartSum());

//   // const [loggedIn, setLoggedIn] = useState(getLoggedInFromSS());

//   function getCartSum() {
//     const cart = JSON.parse(sessionStorage.getItem("cart"));
//     const sumOfCart = cart.forEach();
//     return sumOfCart;
//   }

//   function setNewAmount() {
//     const cart = JSON.parse(sessionStorage.getItem("cart"));
//     const sumOfCart = cart.forEach();
//     setCartSum(sumOfCart);
//   }

//   return (
//     <CartSumContext.Provider value={{
//       cartSum: cartSum
//     }}>
//       {props.children}
//     </CartSumContext.Provider>
//   )
// } 

// export default CartSumContext;