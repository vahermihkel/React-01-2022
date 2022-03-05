import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ToastContainer, toast } from 'react-toastify';
import AdminProduct from "../../components/AdminProduct";

function ViewProducts() {

  const { t } = useTranslation();
  const [products, setProducts] = useState([]);
  const [originalProducts, setOriginalProducts] = useState([]);

  useEffect(() => {
    fetch("https://webshop-02-2022-default-rtdb.europe-west1.firebasedatabase.app/products.json")
    .then(response => response.json()) 
    .then(body => { 
        const newArray = [];
        for (const key in body) {
          newArray.push(body[key]);
        }
        setProducts(newArray); 
        setOriginalProducts(newArray);
      }
    );
  },[])

  function onProductDeleted(product) {
    let productsArray = products.slice();
    const index = productsArray.indexOf(product);
    if (index !== -1) {
      productsArray.splice(index,1);
      setProducts(productsArray);
      fetch("https://webshop-02-2022-default-rtdb.europe-west1.firebasedatabase.app/products.json",
      {
        method: "PUT",
        body: JSON.stringify(productsArray)
      })
      toast.success(t("Edukalt kustutatud!"), {
        position: "bottom-right"
      });
    } else {
      toast.error(t("Viga toote kustutamisel!"), {
        position: "bottom-right"
      });
    }
  }  

  function onSearch(event) {
    const updatedProducts = originalProducts.filter(element => 
      element.name.indexOf(event.target.value) > -1);
    setProducts(updatedProducts);
  }

  return (<div>
      <input onKeyUp={onSearch} type="text" />
      {products.map(element => <AdminProduct key={element.id}
        product={element} productDeleted={onProductDeleted}
      />)}
      <ToastContainer />
    </div>)
}

export default ViewProducts;