import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";

import "../../styles/styleRegistrationPageGeneral.css"

function TableRegisterMaterial({refreshTrigger, handleRegister }){
    const [objectRegister, setObjectRegister] = useState([]);

    useEffect(()=>{
        getAllMaterials();
    },[refreshTrigger]);

    const getAllMaterials = async ()=>{
        try {
            const resp = await axios.get("http://localhost:8080/material");
            // console.log(resp.data)
            setObjectRegister(resp.data)
        } catch (error) {
            console.log("Erro ao tentar buscar os registros... " + error)
        }

    };

    const handleClickDelete = async (register) => {
        const id = register.id;

        try {
            await axios.delete(`http://localhost:8080/material/${id}`);
            getAllMaterials();
        } catch (error) {
            console.log("Erro ao tentar deletar o registro..." + error)
        }
    };
    return(
        <Table striped bordered hover className="table">
            <thead>
                <tr>
                    <th>id</th>
                    <th>tipo</th>
                    <th>preco</th>
                    <th>quantidade</th>
                    <th>data</th>
                    <th>estabelecimento</th>
                    <th>anotacao</th>
                </tr>
            </thead>
            <tbody>
                {objectRegister.map((register) => (
                    <tr key={register.id}>
                        <td>{register.id}</td>
                        <td>{register.tipo}</td>
                        <td>{register.preco.toFixed(2)}</td>
                        <td>{register.quantidade}</td>
                        <td>{register.data}</td>
                        <td>{register.estabelecimento}</td>
                        <td>{register.anotacao}</td>
                        <td>
                            <Button onClick={() => (handleRegister(register))}>Editar</Button>
                            <Button variant="danger" onClick={() => (handleClickDelete(register))}>Excluir</Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};

export default TableRegisterMaterial;