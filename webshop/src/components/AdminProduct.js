import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

function AdminProduct(props) {
  const { t } = useTranslation();

  return (<div>
    <div>{props.product.name}</div>
    <img src={props.product.imgSrc} alt="" />
    <div>{props.product.price}€</div>
    <button onClick={() => props.productDeleted(props.product)}>{t("delete-product-button")}</button>
    <Link to={"/admin/muuda/" + props.product.id}>
      <button>{t("edit-product-button")}</button>
    </Link>
  </div>)
}

export default AdminProduct;