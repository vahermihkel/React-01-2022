import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { useTranslation } from "react-i18next";
import Product from "../components/Product";
import SortButtons from "../components/SortButtons";

function Home() {

  const { t } = useTranslation();
  const [products, setProducts] = useState([]);

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

  return (
  <div>
    <SortButtons prods={products} prodsSorted={setProducts} />
    <div>{products.map(element => <Product key={element.id}
              product={element} addedToCart={() => toast.success(t("Edukalt lisatud ostukorvi!"), {
                position: "bottom-right"
              })}
           />)}
    </div>
    <ToastContainer />
  </div>)
}

// export, et saaks importida
// default näitamaks, et terve leht tuleb kasutusele
export default Home;