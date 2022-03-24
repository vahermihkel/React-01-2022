import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useTranslation } from "react-i18next";
import { ToastContainer, toast } from 'react-toastify';
import AdminProduct from "../../components/AdminProduct";

function ViewProducts() {
  const [show, setShow] = useState(false);
  const [productDeleted, setProductDeleted] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = (product) => {
    setShow(true)
    setProductDeleted(product);
  };

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
    setShow(false);
  }  

  function onSearch(event) {
    const updatedProducts = originalProducts.filter(element => 
      element.name.indexOf(event.target.value) > -1);
    setProducts(updatedProducts);
  }

  return (<div>
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Hoiatus</Modal.Title>
        </Modal.Header>
        <Modal.Body>Oled kustutamas toodet</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Katkesta
          </Button>
          <Button variant="primary" onClick={() => onProductDeleted(productDeleted)}>
            Kustutan jäädavalt
          </Button>
        </Modal.Footer>
      </Modal>
      <input onKeyUp={onSearch} type="text" />
      {products.map(element => <AdminProduct key={element.id}
        product={element} productDeleted={handleShow}
      />)}
      <ToastContainer />
    </div>)
}

export default ViewProducts;