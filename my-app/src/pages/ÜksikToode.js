import { useEffect, useState } from 'react';

function ÜksikToode() {
  // .splice() - MASSIIV/LIST/ARRAY kustutamiseks (+ lisamiseks mingile kindlale indeksile)
  // .slice() - MASSIIV/LIST/ARRAY massiivist koopia tegemiseks (mälukohtade kaotamiseks)
  // .split() - STRING/SÕNA sõnalise muutuja tükeldamiseks mis teeb sellest massiivi 

  // "Elas metsas mutionu, keset kuuski".split(" ") ----
  // ["Elas", "metsas","mutionu,","keset","kuuski"]

  // "Elas metsas mutionu, keset kuuski".split("a") ----
  // ["El","s mets","s mutionu, keset kuuski"][2] ---- "s mutionu, keset kuuski"
  const [tooted,uuendaTooted] = useState([]);

  console.log(window.location.href.split("toode/"));
  console.log(window.location.href.split("toode/")[1]);
  const tooteNimetus = window.location.href.split("toode/")[1];

  const toode = tooted.find(element => 
    element.nimetus.toLowerCase().replace(" ","-") === tooteNimetus);
  console.log(toode);
  
  // function saaTooted() {
  //   return [{nimetus: "Coca Cola", hind: 1.5, kategooria: "coca", pilt: "https://www.selver.ee/img/800/800/resize/5/4/54490703.jpg"},
  //   {nimetus: "Fanta", hind: 1, kategooria: "coca", pilt: ""},
  //   {nimetus: "Sprite", hind: 1, kategooria: "coca", pilt: ""},
  //   {nimetus: "Vitamin well", hind: 2, kategooria: "water", pilt: "https://www.vitaminwell.com/wp-content/uploads/2019/01/EXP_VW_CELEBRATE_Ltd_1.14-219x884.png"},
  //   {nimetus: "Vichy", hind: 1.5, kategooria: "water", pilt: "https://saku.ee/media/18809/ee_vichy-vitamin-sport.png"}];
  // }

  useEffect(()=>{
    fetch("https://react-01-2022-default-rtdb.europe-west1.firebasedatabase.app/tooted.json")
    .then(tagastus => tagastus.json())
    .then(andmed => {
      // {võti: {toode1},võti: {toode2}}
      // forin
      //  [] --> [{toode1}] --> [{toode1},{toode2}]
      const uusMassiiv = [];
      for (const voti in andmed) {
        uusMassiiv.push(andmed[voti]);
      }
      uuendaTooted(uusMassiiv);
      console.log("uuendan");
    });
  },[]);

  return(
    <div>
    { toode && // toode !== undefined
    <div>
      <div>Nimetus: {toode.nimetus}</div>
      <div>Hind: {toode.hind}</div>
      <div>Kategooria: {toode.kategooria}</div>
      <img src={toode.pilt} alt="" />
    </div>}
    { !toode && <div>Sellist toodet ei eksisteeri</div> }
  </div>)
}

export default ÜksikToode;