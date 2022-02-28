
function SortButtons(props) {
  function sortAZ() {
    props.prods.sort((a, b) => a.name.localeCompare(b.name));
    props.prodsSorted(props.prods.slice());
  }

  function sortZA() {
    props.prods.sort((a, b) => b.name.localeCompare(a.name));
    props.prodsSorted(props.prods.slice());
  }

  function sortPriceAsc() {
    props.prods.sort((a, b) => a.price - b.price);
    props.prodsSorted(props.prods.slice());
  }

  function sortPriceDesc() {
    props.prods.sort((a, b) => b.price - a.price);
    props.prodsSorted(props.prods.slice());
  }

  return (<div>
    <button onClick={sortAZ}>Sorteeri A-Z</button>
    <button onClick={sortZA}>Sorteeri Z-A</button>
    <button onClick={sortPriceAsc}>Hinna järgi kasvavalt</button>
    <button onClick={sortPriceDesc}>Hinna järgi kahanevalt</button>
  </div>)
}

export default SortButtons;