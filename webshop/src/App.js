import { Route, Routes } from 'react-router-dom';
import './App.css';
import NavigationBar from './components/NavigationBar';
import Home from './pages/Home';
import Cart from './pages/Cart';
import AdminHome from './pages/admin/AdminHome';
import PaymentCompleted from './pages/PaymentCompleted';

function App() {

  return (
   <div>
     <NavigationBar/>
     <Routes>
       <Route path='/' exact element={<Home />} />
       <Route path='/ostukorv' exact element={<Cart />} />
       <Route path='/admin' exact element={<AdminHome />} />
       <Route path='/tellimus' exact element={<PaymentCompleted />} />
     </Routes>
   </div>
  );
}

export default App;
