import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { Nav } from "react-bootstrap";

// Imports CSS
import './HomePage.css'
import SalesTotal from "../components/monthly_indicators/SalesTotal";
import MaterialsTotal from "../components/monthly_indicators/MaterialsTotal";

function HomePage({statusLogin, setLogin}) {
  const navigate = useNavigate();
  // Pages: /home, /registro, /login

  const handleLogout = () => {
    setLogin('false')
    alert("Deslogado!");
    navigate('/');
  };

  return (
    <div className="div-general">
      <div className="top-container">
        <div className="logo-container">
          <img src="public\imagem_bolo-loko.png" alt="logo bolo loko" />
          <p>Bolo Loko</p>
        </div>
        <div className="content-container">
          <h1>Dashboard Bolo loko</h1>
        </div>
        <div className="logout-container">
          <Button variant="danger" onClick={handleLogout}>Sair</Button>
        </div>
      </div>

      <hr/>

      <div className="body-container">
        <div className="side-container">
          <div className="navigatePage">
            <Nav>
              <Nav.Link as={Link} to={'/home'}>Pagina Inicial</Nav.Link>
            </Nav>
          </div>
          <div className="navigatePage">
            <Nav>
              <Nav.Link as={Link} to={'/registrovenda'}>Registrar</Nav.Link>
            </Nav>
          </div>
          <div className="navigatePage">
            <Nav>
              <Nav.Link as={Link} to={'/'}>Relatorios</Nav.Link>
            </Nav>
          </div>
          <div className="navigatePage">
            <Nav>
              <Nav.Link as={Link} to={'/registroproduto'}>Produtos</Nav.Link>
            </Nav>
          </div>
        </div>

        <div className="main-container">
          <div className="info-container">
            <p className="info">Total Vendidos:</p>
            <SalesTotal className = "info-value"/>
          </div>
          <div className="info-container">
            <p className="info">Lucro do Mês:</p>
            <MaterialsTotal className={'info-value'}/>
          </div>
        </div>
      </div>
        

    </div>
  );
}

export default HomePage;