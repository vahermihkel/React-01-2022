import { Route, Routes } from 'react-router-dom';
import './App.css';
import NavigationBar from './components/NavigationBar';


function App() {

  return (
   <div>
     <NavigationBar/>
     <Routes>
       <Route path='/' exact element={<div>AVALEHT</div>} />
       <Route path='/ostukorv' exact element={<div>OSTUKORV</div>} />
     </Routes>
   </div>
  );
}

export default App;
