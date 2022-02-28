import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from "react"; // hook  - reacti koodilõigud 
  //componentide ja html-i manipuleerimiseks võimalikult efektiivselt
import { ToastContainer, toast } from 'react-toastify';

function AddProduct() {
  const idRef = useRef();
  const nameRef = useRef();
  const priceRef = useRef();
  const descriptionRef = useRef();
  const categoryRef = useRef();
  const imgRef = useRef();
  const [products, setProducts] = useState([]);
  const [buttonDisabled, setButtonDisabled] = useState(true);

  useEffect(() => { 
    fetch("https://webshop-02-2022-default-rtdb.europe-west1.firebasedatabase.app/products.json")
    .then(response => response.json())
    .then(body => { 
        const newArray = [];
        for (const key in body) {
          newArray.push(body[key]);
        }
        setProducts(newArray); // setProducts ei annaks errorit
      }
    );
  },[])



  function addNewProduct(event) {
    event.preventDefault();
    if (!buttonDisabled &&
          idRef.current.value !== "" &&
          nameRef.current.value !== "") {
      const product = {
        id: idRef.current.value,
        name: nameRef.current.value,
        price: priceRef.current.value,
        description: descriptionRef.current.value,
        category: categoryRef.current.value,
        imgSrc: imgRef.current.value,
        active: true
      }
      fetch("https://webshop-02-2022-default-rtdb.europe-west1.firebasedatabase.app/products.json",
        {
          method: "POST",
          body: JSON.stringify(product)
        }
      );
      idRef.current.value = "";
      nameRef.current.value = "";
      toast.success("Edukalt lisatud ostukorvi!", {
        position: "bottom-right",
        theme: "dark"
      });
    }
  }

  function checkIdUniqueness() {
    if (idRef.current.value.length === 8) {
      const index = products.findIndex(element => element.id === idRef.current.value);
      if (index === -1) {
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
    <Link to="/admin">
      <button>Tagasi</button>
    </Link><br />
    <form onSubmit={addNewProduct}>
      <label>Toote id</label><br />
      {/* <button type='button'>?</button> */}
      <input onKeyUp={checkIdUniqueness} min={10000000} max={99999999} ref={idRef} type="number" required></input><br />
      <label>Toote nimetus</label><br />
      <input ref={nameRef} type="text" required></input><br />
      <label>Toote kirjeldus</label> <br />
      <input ref={descriptionRef} type="text" required></input><br />
      <label>Toote hind</label> <br />
      <input ref={priceRef} type="number" required></input> <br />
      <label>Toote kategooria</label><br />
      <input ref={categoryRef} type="text" required/><br />
      <label>Toote pilt</label><br />
      <input ref={imgRef} type="text" required/><br />
      <button disabled={buttonDisabled}>Sisesta</button>
    </form>
    <ToastContainer />
  </div>)
}

export default AddProduct;