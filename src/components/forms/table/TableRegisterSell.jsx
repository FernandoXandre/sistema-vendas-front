import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";

import "../../styles/styleRegistrationPageGeneral.css"

function TableRegisterSell(prop){
    const [sells, setSells] = useState([]);

    useEffect(()=>{
        getAllSells();
    },[prop.refreshTrigger])

    const handleClickEdit = (register) => {
        prop.onClickEdit(register);
    };
    
    const getAllSells = async ()=>{
        try{
            const resp = await axios.get("http://localhost:8080/sell");
            setSells(resp.data);
        }catch(error){
            console.log("Erro ao fazer a busca de todos os registros de venda..." + error);
        }
    };

    const onClickDelete = async (obj)=>{
        console.log(obj)
        if(!obj.id){
            alert("Digite um id...");
            return;
        };
        try {
            const id = obj.id;
            await axios.delete(`http://localhost:8080/sell/${id}`);
            getAllSells();  
            alert('Registro excluido com sucesso...')
        } catch (error) {
            console.log("Erro ao tentar deletar o registro..." + error)
            
        };
    };


    return(
        <>
            <Table striped bordered hover className="table">
                <thead>
                    <tr>
                        <th>id</th>
                        <th>Tipo</th>
                        <th>Sabor</th>
                        <th>Vendas</th>
                        <th>Data venda</th>
                        <th>Anotações</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {sells.map(register => (
                        <tr key={register.id}>
                            <td>{register.id}</td>
                            <td>{register.tipo}</td>
                            <td>{register.sabor}</td>
                            <td>{register.qtdVendidos}</td>
                            <td>{register.dataVenda}</td>
                            <td>{register.anotacao}</td>
                            <td>{(register.total).toFixed(2)}</td>
                            <td>
                                <Button onClick={() => handleClickEdit(register) }>Alterar</Button>
                                <Button onClick={() => onClickDelete(register)} variant="danger">Excluir</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    );
};

export default TableRegisterSell;