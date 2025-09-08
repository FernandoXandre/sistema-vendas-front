import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";

import "../../styles/styleRegistrationPageGeneral.css"

function TableRegisterProduct({onClickEdit, onClickDelete, flag}){
    const [products, setProducts] = useState([]);

    useEffect(()=>{
        getAllProducts();
    },[flag]);

    const getAllProducts = async () =>{
        try {
            const resp = await axios.get("http://localhost:8080/produtos");
            // console.log(resp);
            
            setProducts(resp.data)
        } catch (error) {
            
        }
    };
    return(
        <>
            <Table striped bordered hover className="table">
                <thead>
                    <tr>
                        <th>id</th>
                        <th>Tipo</th>
                        <th>Sabor</th>
                        <th>Preço</th>
                    </tr>
                </thead>

                <tbody>
                    {products.map(reg =>(
                        <tr key={reg.id_produto}>
                            <td>{reg.id_produto}</td>
                            <td>{reg.tipo}</td>
                            <td>{reg.sabor}</td>
                            <td>{reg.preco}</td>
                            <td className="btn-form-del"><Button onClick={() => onClickDelete(reg)} variant="danger">Excluir</Button></td>
                            <td className="btn-form-edit"><Button onClick={() => onClickEdit(reg)}>Alterar</Button></td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    );
};

export default TableRegisterProduct;