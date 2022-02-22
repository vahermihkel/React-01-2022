import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

function Home() {

  const [products, setProducts] = useState([]);
  const { t } = useTranslation();

  // kui läheb käima useState parempoolne funktsioon (ükskõik millisel useState-l),
  // siis tehakse terve Component uuesti kui ta on Componendi renderdamisega lõpule jõudnud

  useEffect(() => { // useEffect ei annaks errorit
    fetch("https://webshop-02-2022-default-rtdb.europe-west1.firebasedatabase.app/products.json")
    .then(response => response.json()) // terve response koos kõikide andmetega
    .then(body => { // teine then() on body kättesaamiseks
        const newArray = [];
        for (const key in body) {
          newArray.push(body[key]);
        }
        setProducts(newArray); // setProducts ei annaks errorit
      }
    );
  },[])

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
        cartProducts.push({cartProduct: product, quantity: 1});
      }
    } else {
      cartProducts = [{cartProduct: product, quantity: 1}];
    }       // scope
    sessionStorage.setItem("cart",JSON.stringify(cartProducts));
  }

  function sortAZ() {
    products.sort((a, b) => a.name.localeCompare(b.name));
    setProducts(products.slice());
  }

  function sortZA() {
    products.sort((a, b) => b.name.localeCompare(a.name));
    setProducts(products.slice());
  }

  function sortPriceAsc() {
    products.sort((a, b) => a.price - b.price);
    setProducts(products.slice());
  }

  function sortPriceDesc() {
    products.sort((a, b) => b.price - a.price);
    setProducts(products.slice());
  }

  return (
  <div>
    <button onClick={sortAZ}>Sorteeri A-Z</button>
    <button onClick={sortZA}>Sorteeri Z-A</button>
    <button onClick={sortPriceAsc}>Hinna järgi kasvavalt</button>
    <button onClick={sortPriceDesc}>Hinna järgi kahanevalt</button>
    <div>{products.map(element => <div>
        <div>{element.name}</div>
        <img src={element.imgSrc} alt="" />
        <div>{element.price}€</div>
        <button onClick={() => onAddToCart(element)}>{t("add-to-cart-button")}</button>
      </div>)}
    </div>
  </div>)
}

// export, et saaks importida
// default näitamaks, et terve leht tuleb kasutusele
export default Home;