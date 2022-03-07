import { Link, useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';

function EditProduct() {
  const idRef = useRef();
  const nameRef = useRef();
  const priceRef = useRef();
  const descriptionRef = useRef();
  const categoryRef = useRef();
  const imgRef = useRef();
  const activeRef = useRef();
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState({});
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [index, setIndex] = useState();
  const { productId } = useParams();

  useEffect(() => { 
    fetch("https://webshop-02-2022-default-rtdb.europe-west1.firebasedatabase.app/products.json")
    .then(response => response.json())
    .then(body => { 
        const newArray = [];
        for (const key in body) {
          newArray.push(body[key]);
        }
        setProducts(newArray);
        const productFound = newArray.find(element => element.id.toString() === productId);
        setProduct(productFound);
        const indexFound = newArray.indexOf(productFound);
        setIndex(indexFound);
      }
    );
  },[productId])

  function editProduct(event) {
    event.preventDefault();
    if (!buttonDisabled &&
          idRef.current.value !== "" &&
          nameRef.current.value !== "") {
      const newProduct = {
        id: idRef.current.value,
        name: nameRef.current.value,
        price: priceRef.current.value,
        description: descriptionRef.current.value,
        category: categoryRef.current.value,
        imgSrc: imgRef.current.value,
        isActive: activeRef.current.checked
      }
      products[index] = newProduct;
      fetch("https://webshop-02-2022-default-rtdb.europe-west1.firebasedatabase.app/products.json",
        {
          method: "PUT",
          body: JSON.stringify(products)
        }
      );
      idRef.current.value = "";
      nameRef.current.value = "";
      toast.success("Edukalt toode muudetud!", {
        position: "bottom-right",
        theme: "dark"
      });
    }
  }

  function checkIdUniqueness() {
    if (idRef.current.value.length === 8 ) {
      const index = products.findIndex(element => element.id.id.toString() === idRef.current.value);
      if (index === -1 || idRef.current.value === productId) {
        setButtonDisabled(false);
      } else {
        setButtonDisabled(true);
      }
    } else {
      setButtonDisabled(true);
    }
  }

  return(
  <div>
    <Link to="/admin/tooted">
      <button>Tagasi</button>
    </Link><br />
    {product && <form onSubmit={editProduct}>
      <label>Toote id</label><br />
      {/* <button type='button'>?</button> */}
      <input onKeyUp={checkIdUniqueness} min={10000000} max={99999999} ref={idRef} defaultValue={product.id} type="number" required></input><br />
      <label>Toote nimetus</label><br />
      <input ref={nameRef} defaultValue={product.name} type="text" required></input><br />
      <label>Toote kirjeldus</label> <br />
      <input ref={descriptionRef} defaultValue={product.description} type="text" required></input><br />
      <label>Toote hind</label> <br />
      <input ref={priceRef} defaultValue={product.price} type="number" required></input> <br />
      <label>Toote kategooria</label><br />
      <input ref={categoryRef} defaultValue={product.category} type="text" required/><br />
      <label>Toote pilt</label><br />
      <input ref={imgRef} defaultValue={product.imgSrc} type="text" required/><br />
      <label>Toote aktiivsus</label><br />
      <input ref={activeRef} defaultChecked={product.isActive} type="checkbox"/><br />
      <button disabled={buttonDisabled}>Sisesta</button>
    </form>}
    <ToastContainer />
  </div>)
}

export default EditProduct;