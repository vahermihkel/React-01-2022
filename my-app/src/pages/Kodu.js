import { Link } from 'react-router-dom';

function Kodu() {

  function saaTooted() {
    return [{nimetus: "Coca Cola", hind: 1.5, kategooria: "coca", pilt: "https://www.selver.ee/img/800/800/resize/5/4/54490703.jpg"},
    {nimetus: "Fanta", hind: 1, kategooria: "coca", pilt: ""},
    {nimetus: "Sprite", hind: 1, kategooria: "coca", pilt: ""},
    {nimetus: "Vitamin well", hind: 2, kategooria: "water", pilt: "https://www.vitaminwell.com/wp-content/uploads/2019/01/EXP_VW_CELEBRATE_Ltd_1.14-219x884.png"},
    {nimetus: "Vichy", hind: 1.5, kategooria: "water", pilt: "https://saku.ee/media/18809/ee_vichy-vitamin-sport.png"}];
  }

  function lisaOstukorvi() {
    console.log("töötab nupuvajutus");
  }

  return (
    <div>
      {saaTooted().map(toode => 
      <div key={toode.nimetus} className="toode">
        {/* <Link to={`/toode/${toode.nimetus}`}></Link> */}
        <Link to={"/toode/" + toode.nimetus.toLowerCase().replace(" ","-")}>
          <div>{toode.nimetus}</div>
          <div>{toode.hind}</div>
          <div>{toode.kategooria}</div>
          <img src={toode.pilt} alt="" /><br />
        </Link>
        <button onClick={lisaOstukorvi}>Lisa ostukorvi</button><br /><br />
      </div>)}
    </div>
  );
}

      // default tähendab, et imporditakse alati terve component
      // import { Link } from 'react-router-dom'
      // see tähendab, et Link juures ei olnud default

      // import Kodu from './pages/Kodu.js'
export default Kodu;