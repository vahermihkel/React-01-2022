import { useParams, Link } from 'react-router-dom';
import { useRef, useEffect, useState } from 'react';

function MuudaToode() {
  const nimetusRef = useRef();
  const hindRef = useRef();
  const piltRef = useRef();
  const aktiivneRef = useRef();
  const [tooted,uuendaTooted] = useState([]);
  const { tooteNimi } = useParams();

  // sessionStorage-sse lisamisega

  // const tooteNimetus2 = window.location.href.split("muuda/")[1];
  // path="adasdasd/:tooteNimi"
  // vitamin-well
  // console.log(tooteNimetus2);
  // console.log(tooteNimi);

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

  //[{nim: "Coca c",...},{nim: "Fanta",...},{nim: "Vitamin well", hind:2},{nim: "Vichy",..},{nim: "Vitamin well", hind: 3}].find()
  // .find({nim: "Coca c",...} => coca-c === vitamin-well) // false
  // .find({nim: "Fanta",...} => fanta === vitamin-well) // false
  // .find({nim: "Vitamin well",...} => vitamin-well === vitamin-well) // true
  const toode = tooted.find(element => 
    element.nimetus.toLowerCase().replace(" ","-") === tooteNimi);
  console.log(toode);
  const toodeId = tooted.indexOf(toode); // saamaks kätte ID, et selle abil muuta
  
  // function saaTooted() {
  //   return [{nimetus: "Coca Cola", hind: 1.5, kategooria: "coca", pilt: "https://www.selver.ee/img/800/800/resize/5/4/54490703.jpg"},
  //   {nimetus: "Fanta", hind: 1, kategooria: "coca", pilt: ""},
  //   {nimetus: "Sprite", hind: 1, kategooria: "coca", pilt: ""},
  //   {nimetus: "Vitamin well", hind: 2, kategooria: "water", pilt: "https://www.vitaminwell.com/wp-content/uploads/2019/01/EXP_VW_CELEBRATE_Ltd_1.14-219x884.png"},
  //   {nimetus: "Vichy", hind: 1.5, kategooria: "water", pilt: "https://saku.ee/media/18809/ee_vichy-vitamin-sport.png"}];
  // }

  function muudaToode() {
    // console.log("uus toode");
    // console.log(nimetusRef.current);
    console.log(nimetusRef.current.value);
    console.log(hindRef.current.value);
    console.log(aktiivneRef.current.checked);
    const toode = {
      nimetus: nimetusRef.current.value,
      hind: hindRef.current.value,
      pilt: piltRef.current.value,
      aktiivne: aktiivneRef.current.checked
    }
    console.log(toode);
    tooted[toodeId] = toode;
    fetch("https://react-01-2022-default-rtdb.europe-west1.firebasedatabase.app/tooted.json",
    {
      method: "PUT",
      body: JSON.stringify(tooted)
    })
  }

  return(
  <div>
    <Link to="/admin/tooted">
      <button>Tagasi</button>
    </Link><br />
    { toode && // toode !== undefined
    <div>
      <label>Toote nimetus</label><br />
      <input ref={nimetusRef} defaultValue={toode.nimetus} type="text" /><br />
      <label>Toote hind</label><br />
      <input ref={hindRef} defaultValue={toode.hind} type="number" /><br />
      <label>Toote pilt</label><br />
      <input ref={piltRef} defaultValue={toode.pilt} type="text" /><br />
      <label htmlFor='aktiivne'>Toode aktiivne</label><br />
      <input ref={aktiivneRef} defaultChecked={toode.aktiivne} id='aktiivne' type="checkbox" /><br />
      <button onClick={muudaToode}>Sisesta</button>
      {/* <div>Nimetus: {toode.nimetus}</div>
      <div>Hind: {toode.hind}</div>
      <div>Kategooria: {toode.kategooria}</div>
      <img src={toode.pilt} alt="" /> */}
    </div>}
  </div>)
}

export default MuudaToode;