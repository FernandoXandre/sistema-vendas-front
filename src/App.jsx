// Import components
import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
// Import Pages
import LoginPage from  './pages/LoginPage'
import HomePage from './pages/HomePage'
// CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import RegisterMaterial from './pages/registers/RegisterMaterial';
import RegisterSell from './pages/registers/RegisterSell';
import RegisterProduct from './pages/registers/RegisterProduct';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState('false')

  return (
  <Router>
      <Routes>
          <Route path='/' element={<LoginPage onLogin={setIsLoggedIn}/>}/>
          <Route path='/home' element={<HomePage statusLogin={isLoggedIn} setLogin={setIsLoggedIn}/>}/>
          <Route path='/registrovenda' element={<RegisterSell/>}/>
          <Route path='/registromaterial' element={<RegisterMaterial/>}/>
          <Route path='/registroproduto' element={<RegisterProduct/>}/>
          {/* <Route path='/teste' element={<TableRegister titles={[1, "t1", "t2", "t3"]} url={"http://localhost:8080/sell"}/>}/> */}
      </Routes>
  </Router>
 
  )
}

export default App;
