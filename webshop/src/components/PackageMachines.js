import { useEffect, useState } from "react";

function PackageMachines(props) {
  const [packageMachines, setPackageMachines] = useState([]);
  const [selectedMachine, setSelectedMachine] = useState(null);

  useEffect(()=>{
    fetch("https://www.omniva.ee/locations.json")
      .then(res => res.json()) // koos statuscode-ga, headeritega, url-ga..... {console.log(res); res.json()}
      .then(body => setPackageMachines(body)); // sisu kätte
  },[]);

  function chooseMachine(event) {
    // console.log(selectedMachine);
    // console.log(packageMachine);
    setSelectedMachine(event.target.value);
    // const packageMachine = packageMachines.find(element => element.NAME === event.target.value);
    // console.log(event.target.value);
    // console.log(packageMachine);
    const products = props.cartContent;
    const packageMachineInCart = {cartProduct:{id: "11110000", name: "Pakiautomaadi tasu", price: 3.5},quantity:1};
    products.push(packageMachineInCart);
    sessionStorage.setItem("cart",JSON.stringify(products));
    props.sendProducts(products.slice());
  }

  // ["banana", "mango", "apple"]  0   1   2     .length  === 3      .length-1
  function deleteMachine() {
    setSelectedMachine(null);
    const products = props.cartContent;
    products.splice(products.length-1);
    sessionStorage.setItem("cart",JSON.stringify(products));
    props.sendProducts(products.slice());
  }

  return (
  <div>
    { !selectedMachine && <select onChange={chooseMachine}>{packageMachines
      .filter(element => element.A0_NAME === "EE")
      .map(element => <option>{element.NAME}</option>)}</select>}
  { selectedMachine && <div>{selectedMachine} <button onClick={deleteMachine}>X</button></div> }
  </div>);
}

export default PackageMachines;