import { Link } from 'react-router-dom';

function Admin() {
  return(
  <div>
    <Link to="/admin/lisa">
      <button>Lisa uus toode</button>
    </Link>
    <Link to="/admin/tooted">
      <button>Muuda/kustuta tooteid</button>
    </Link>
  </div>)
}

export default Admin;