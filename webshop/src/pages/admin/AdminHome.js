import { Link } from "react-router-dom";

function AdminHome() {
  return (<div>
    <Link to="/admin/lisa">
      <button>Lisa uus toode</button>
    </Link>
    <Link to="/admin/tooted">
      <button>Muuda/kustuta tooteid</button>
    </Link>
    <Link to="/admin/registreeri">
      <button>Lisa uus admin kasutaja</button>
    </Link>
  </div>)
}

export default AdminHome;