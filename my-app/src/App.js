import './App.css';
import { Routes, Route } from 'react-router-dom';
import Kodu from './pages/Kodu';
import Menüü from './components/Menüü';
import Ostukorv from './pages/Ostukorv';
import Pakiautomaadid from './components/Pakiautomaadid';
import Admin from './pages/Admin';
import LisaToode from './pages/LisaToode';
import VaataTooteid from './pages/VaataTooteid';
import ÜksikToode from './pages/ÜksikToode';

// to="/" -- localhost:3000
// to="/ostukorv" -- localhost:3000/ostukorv

function App() {
  return (
    <div className="App">
      <Menüü />
      <Routes>
        <Route path="/" exact element={ <Kodu /> } />
        <Route path="/ostukorv" exact element={ <Ostukorv /> } />
        <Route path="/omniva" exact element={ <Pakiautomaadid /> } />
        <Route path="/admin" exact element={ <Admin /> } />
        <Route path="/admin/lisa" exact element={ <LisaToode /> } />
        <Route path="/admin/tooted" exact element={ <VaataTooteid /> } />
        <Route path="/toode/:tooteNimi" exact element={ <ÜksikToode /> } />
      </Routes>
    </div>
  );
}

export default App;
