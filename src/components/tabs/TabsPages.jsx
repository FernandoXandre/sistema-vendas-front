import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

function TabsPages({props}){
    return(
        <Nav>
            <Nav.Link as={Link} to='/registrovenda'>Registrar venda</Nav.Link>
            <Nav.Link as={Link} to='/registromaterial'>Registrar material</Nav.Link>
            <Nav.Link as={Link} to='/registroproduto'>Registrar Produto</Nav.Link>
        </Nav>
    );
}

export default TabsPages;