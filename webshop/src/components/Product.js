import { useTranslation } from "react-i18next";

function Product(props) {
  const { t } = useTranslation();

//          {name: "sadas", price: 4,...}
  // hinna teada saamiseks element.price
  // []  --> [{name: "sadas", price: 4,...}] --> [{name: "sadas", price: 4,...},{name: "sadas", price: 4,...}]
  // hinna teada saamiseks element.cartProduct.price
  // koguse poole pöördumiseks element.quantity
  // []  --> [{cartProduct:{name: "sadas", price: 4,...},quantity:1}]
  function onAddToCart(product) {
    let cartProducts; // let muutujale saab anda uuesti
    if (sessionStorage.getItem("cart")) {
      cartProducts = JSON.parse(sessionStorage.getItem("cart"));
      const index = cartProducts.findIndex(element => element.cartProduct.name === product.name);
      if (index !== -1) {
        // suurenda quantity't
        cartProducts[index].quantity++; // suurendab ühe võrra (koodilühendus)
                      // cartProducts[index].quantity = cartProducts[index].quantity + 1;
                      // cartProducts[index].quantity += 1;
      } else {
        // push
        const packageMachineIndex = cartProducts.findIndex(element => element.cartProduct.id === "11110000");
        console.log(packageMachineIndex);
        if (packageMachineIndex === -1) {
          cartProducts.push({cartProduct: product, quantity: 1});
        } else {
          cartProducts.splice(cartProducts.length-1,0,{cartProduct: product, quantity: 1});
        }
      }
    } else {
      cartProducts = [{cartProduct: product, quantity: 1}];
    }       // scope
    sessionStorage.setItem("cart",JSON.stringify(cartProducts));
    props.addedToCart();
  }

  return (<div>
    <div>{props.product.name}</div>
    <img src={props.product.imgSrc} alt="" />
    <div>{props.product.price}€</div>
    <button onClick={() => onAddToCart(props.product)}>{t("add-to-cart-button")}</button>
  </div>)
}

export default Product;