import { useState } from 'react';

function Ostukorv() {
  const [ostukorviEsemed, uuendaOstukorvi] = useState(saaOstukorv());

  function saaOstukorv() {
    // return [
    //   {nimi: "Rolex", maksumus: 5999, aktiivne: true}, 
    //   {nimi: "Tag Heuer", maksumus: 3999, aktiivne: false},
    //   {nimi: "Hugo Boss", maksumus: 499, aktiivne: true}
    //   ];
    if (sessionStorage.getItem("ostukorv")) {
      return JSON.parse(sessionStorage.getItem("ostukorv"));
    } else {
      return [];
    }
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
    sessionStorage.setItem("ostukorv", JSON.stringify(tooted));
    uuendaOstukorvi(tooted);
  }

  function kustutaOstukorvist(toode) {
    let tooted = ostukorviEsemed.slice();
    let indeks = tooted.indexOf(toode);
    if (indeks !== -1) {
      tooted.splice(indeks,1);
      sessionStorage.setItem("ostukorv", JSON.stringify(tooted));
      uuendaOstukorvi(tooted);
    }
  }

  function tyhjendaOstukorv() {
    const tooted = [];
    sessionStorage.setItem("ostukorv", JSON.stringify(tooted));
    uuendaOstukorvi(tooted);
  }

  function ostukorviSumma() {
    let summa = 0;
                                    // summa = summa + element.maksumus
    // [{nimi: "A", maksumus: 5},{nimi: "B", maksumus: 2},{nimi: "C", maksumus: 8}]
    // .forEach({nimi: "A", maksumus: 5}=> 5  = 0 + 5 );
    // .forEach({nimi: "B", maksumus: 2}=> 7  = 5 + 2);
    // .forEach({nimi: "C", maksumus: 8}=> 15 = 7 + 8 );
    ostukorviEsemed.forEach(element => summa += Number(element.hind));
    return summa;
  }

  function maksa() {
    const andmed = {
      "api_username": "92ddcfab96e34a5f",
      "account_name": "EUR3D1",
      "amount": ostukorviSumma(),
      "order_reference": "624233",
      "nonce": "92ddcfab96e34a5f" + new Date(),
      "timestamp": new Date(),
      "customer_url": "https://www.postimees.ee"
      };

    fetch("https://igw-demo.every-pay.com/api/v4/payments/oneoff",
      {
        method: "POST",
        body: JSON.stringify(andmed),
        headers: {
          "Content-Type": "application/json",   
          "Authorization": "Basic OTJkZGNmYWI5NmUzNGE1Zjo4Y2QxOWU5OWU5YzJjMjA4ZWU1NjNhYmY3ZDBlNGRhZA=="
        }
      }
    ).then(res => res.json())
    .then(data => window.location.href = data.payment_link);
  }

  return (
  <div>
    { ostukorviEsemed.length !== 0 && <button onClick={tyhjendaOstukorv}>Tühjenda ostukorv</button>}
    {ostukorviEsemed.map(element => 
    <div>
      <div>{element.nimetus}</div>   
      <div>{element.hind}</div>
      <div>{element.aktiivne}</div>
      <button onClick={() => lisaOstukorvi(element)}>+</button>  
      <button onClick={() => kustutaOstukorvist(element)}>X</button>  
    </div>)
    }
    { ostukorviEsemed.length !== 0 && <div>Kokku: {ostukorviSumma()} €</div>}
    { ostukorviEsemed.length !== 0 && <button onClick={maksa}>Maksma</button> }
    { ostukorviEsemed.length === 0 && <div>Ostukorv on tühi</div>}
  </div>);
}

export default Ostukorv;