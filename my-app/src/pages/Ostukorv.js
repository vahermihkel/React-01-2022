
function Ostukorv() {

  function saaOstukorviEsemed() {
    return [
      {nimi: "Rolex", maksumus: 5999, aktiivne: true}, 
      {nimi: "Tag Heuer", maksumus: 3999, aktiivne: false},
      {nimi: "Hugo Boss", maksumus: 499, aktiivne: true}
      ];
  }

  function lisaOstukorvi(toode) {
    console.log("ostukorvi lisatud!");
    console.log(toode);
    // push()
  }

  function kustutaOstukorvist(toode) {
    console.log("ostukorvist kustutatud!");
    console.log(toode);
    // splice()
    // indexOf()
  }

  // = []

  // forEach()

  // useState

  return (
  <div>
    {saaOstukorviEsemed().map(element => 
    <div key={element.nimi}>
      <div>{element.nimi}</div>   
      <div>{element.maksumus}</div>
      <div>{element.aktiivne}</div>
      <button onClick={() => lisaOstukorvi(element)}>+</button>  
      <button onClick={() => kustutaOstukorvist(element)}>X</button>  
    </div>)
    }
  </div>);
}

export default Ostukorv;