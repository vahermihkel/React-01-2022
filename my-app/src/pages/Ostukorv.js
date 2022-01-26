import { useState } from 'react';

function Ostukorv() {
  const [ostukorviEsemed, uuendaOstukorvi] = useState(saaOstukorv());

  function saaOstukorv() {
    return [
      {nimi: "Rolex", maksumus: 5999, aktiivne: true}, 
      {nimi: "Tag Heuer", maksumus: 3999, aktiivne: false},
      {nimi: "Hugo Boss", maksumus: 499, aktiivne: true}
      ];
  }

  // loon uue viite väärtusele (ehk muutuja) kas:
  // sulgude seest
  // const abil (konstantne ehk enam ei saa võrdusmärgiga uut väärtust anda)
  // let abil (muudetav)

                      // 'sdasss'
  function lisaOstukorvi(toode) {
    console.log("ostukorvi lisatud!");
    // toode = 12;
    console.log(toode);
    // push()
    // const string = "sõnaline muutuja";
    // let number = 13123;
    // const kahendV22rtus = true;
    // let jsonObjekt = {}
    // const massiiv = [321,31,11,22,645];
    // number = "uus sõnaline muutuja";
    // console.log(number);
              // ['üks','kaks','kolm']
    const tooted = ostukorviEsemed.slice();
      // ['üks','kaks','kolm', 'sdasss']
    console.log(tooted);
    tooted.push(toode);
    console.log(tooted);
    uuendaOstukorvi(tooted);
  }

  function kustutaOstukorvist(toode) {
    let tooted = ostukorviEsemed.slice();
    let indeks = tooted.indexOf(toode);
    if (indeks !== -1) {
      tooted.splice(indeks,1);
      uuendaOstukorvi(tooted);
    }
  }

  function tyhjendaOstukorv() {
    const tooted = [];
    uuendaOstukorvi(tooted);
  }

  function ostukorviSumma() {
    let summa = 0;
                                    // summa = summa + element.maksumus
    // [{nimi: "A", maksumus: 5},{nimi: "B", maksumus: 2},{nimi: "C", maksumus: 8}]
    // .forEach({nimi: "A", maksumus: 5}=> 5  = 0 + 5 );
    // .forEach({nimi: "B", maksumus: 2}=> 7  = 5 + 2);
    // .forEach({nimi: "C", maksumus: 8}=> 15 = 7 + 8 );
    ostukorviEsemed.forEach(element => summa += element.maksumus);
    return summa;
  }

  return (
  <div>
    { ostukorviEsemed.length !== 0 && <button onClick={tyhjendaOstukorv}>Tühjenda ostukorv</button>}
    {ostukorviEsemed.map(element => 
    <div>
      <div>{element.nimi}</div>   
      <div>{element.maksumus}</div>
      <div>{element.aktiivne}</div>
      <button onClick={() => lisaOstukorvi(element)}>+</button>  
      <button onClick={() => kustutaOstukorvist(element)}>X</button>  
    </div>)
    }
    { ostukorviEsemed.length !== 0 && <div>Kokku: {ostukorviSumma()} €</div>}
    { ostukorviEsemed.length === 0 && <div>Ostukorv on tühi</div>}
  </div>);
}

export default Ostukorv;