import { Link } from 'react-router-dom';
import { useState } from 'react';

function VaataTooteid() {
  const [tooted,uuendaTooted] = useState(saaTooted());

  function saaTooted() {
    return [{nimetus: "Coca Cola", hind: 1.5, kategooria: "coca", pilt: "https://www.selver.ee/img/800/800/resize/5/4/54490703.jpg"},
    {nimetus: "Fanta", hind: 1, kategooria: "coca", pilt: ""},
    {nimetus: "Sprite", hind: 1, kategooria: "coca", pilt: ""},
    {nimetus: 'Vitamin well', hind: 2, kategooria: "water", pilt: "https://www.vitaminwell.com/wp-content/uploads/2019/01/EXP_VW_CELEBRATE_Ltd_1.14-219x884.png"},
    {nimetus: "Vichy", hind: 1.5, kategooria: "water", pilt: "https://saku.ee/media/18809/ee_vichy-vitamin-sport.png"}];
  }

  function kustutaToode(kustutamiselToode) {
    console.log("töötab nupuvajutus");
    console.log(kustutamiselToode);
    let toodeteMassiiv = tooted.slice();
    const index = toodeteMassiiv.indexOf(kustutamiselToode);
    toodeteMassiiv.splice(index,1);
    uuendaTooted(toodeteMassiiv);
  }

  return(
  <div>
    <Link to="/admin">
      <button>Tagasi</button>
    </Link>
    <div>
      {tooted.map(toode => 
      <div key={toode.nimetus} className="toode">
        <div>{toode.nimetus}</div>
        <div>{toode.hind}</div>
        <div>{toode.kategooria}</div>
        <img src={toode.pilt} alt="" /><br />
        <button onClick={() => kustutaToode(toode)}>Kustuta</button>
        <button>Muuda</button><br /><br />
      </div>)}
    </div>
  </div>)
}

export default VaataTooteid;