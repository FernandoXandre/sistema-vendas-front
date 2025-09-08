import axios from "axios";
import { useState } from "react";

import '../../../components/styles/styleRegistrationPageGeneral.css'

import TableRegisterMaterial from "../table/TableRegisterMaterial";
import { Button } from "react-bootstrap";
import Input from "../../inputs/Input";
import InputPrice from "../../inputs/InputPrice";

import { objSearchInDataBase, assingsInputsValues } from "../../../utils/formUtils";


function UpdateMaterial({refreshTrigger, setRefreshTrigger}){
    const [registerMaterial, setRegisterMaterial] = useState({
        id:'',
        tipo:'',
        preco:Number('').toFixed(2),
        quantidade:'',
        data:'',
        estabelecimento:'',
        anotacao:''
    })

    const handleChange = (e)=>{
        const {value, name} = e.target;
        setRegisterMaterial(prev => ({
            ...prev,
            [name]:value
        }))
    };

    const handleClickDelete = async ()=>{
        const id = registerMaterial.id;
        if(!id){
            alert("Digite um id...");
            return;
        };

        try {
            await axios.delete(`http://localhost:8080/material/${id}`);
            clearInputs();
            setRefreshTrigger(prev => prev+1);

        } catch (error) {
            console.log("Erro ao tentar deletar o registro..." + error)
        }
    };
    
    const handleClickSearch = async () =>{
        // console.log(obj);
        const id = Number(registerMaterial.id);
        const obj = await objSearchInDataBase(id, "http://localhost:8080/material");
        if(!obj){
            console.log("Objeto não encontrado no banco de dados...");
            return;
        };
        assingsInputsValues(obj, setRegisterMaterial);
    };

    const handleClickSubmitForm = async (e) =>{
        e.preventDefault();
        const materialUpdate = {...registerMaterial};
        const id = materialUpdate.id;
        try {
            await axios.put(`http://localhost:8080/material/${id}`, materialUpdate);
            setRefreshTrigger(prev => prev+1);
        } catch (error) {
            console.log("Erro ao tentar atualizar..." + error);
        }
    };
    
    const clearInputs = ()=>{

        setRegisterMaterial({
            id:'',
            tipo:'',
            preco:'',
            quantidade:'',
            data:'',
            estabelecimento:'',
            anotacao:''
        })
    };

    return(
        <>
          <TableRegisterMaterial handleRegister={setRegisterMaterial} refreshTrigger={refreshTrigger}/>
          <form onSubmit={handleClickSubmitForm} className="form-card line-top">
            <h3 className="form-title">Alterar Registro de Material</h3>
            <div className="id-container">
                    <Input
                        required={true}
                        label='ID'
                        name = 'id'
                        type="number"
                        value={registerMaterial.id}
                        min={1}
                        onChange={handleChange}
                        placeholder='Id do produto...'
                    />
                    <Button variant="primary" onClick = {handleClickSearch}>Pesquisar</Button>
                    <Button variant="primary" onClick={handleClickSubmitForm}>Atualizar</Button>
                    <Button variant="danger" onClick={handleClickDelete}>Deletar</Button>
                    <Button variant="secondary" onClick = {clearInputs}>Limpar Pesquisa</Button>
               </div>

            <Input
                required={true}
                label='Material'
                type="text"
                name={"tipo"}
                value={registerMaterial.tipo}
                onChange={handleChange}
                placeholder={"Material comprado..."}
            />
            <Input
                required={true}
                label={"Preço"}
                type={"number"}
                name={"preco"}
                placeholder={"Preço do produto..."}
                value={registerMaterial.preco}
                onChange={handleChange}
            />
            <Input
                required={true}
                label='Quantidade comprada'
                type="number"
                min={0}
                name={"quantidade"}
                value={registerMaterial.quantidade}
                onChange={handleChange}
                placeholder={"Quantidade comprada..."}
            />
            <Input
                required={true}
                label='Data da compra'
                type="date"
                name={"data"}
                value={registerMaterial.data}
                onChange={handleChange}
                placeholder={"Data da compra..."}
            />
            <Input
                required={true}
                label='Estabelecimento comprado'
                type="text"
                name={"estabelecimento"}
                value={registerMaterial.estabelecimento}
                onChange={handleChange}
                placeholder={"Onde foi comprado..."}
            />
            <Input
                label='Anotação'
                type="text"
                name={"anotacao"}
                value={registerMaterial.anotacao}
                onChange={handleChange}
                placeholder={"Anotações..."}
            />

            <Button className="" type="submit">
                    Alterar Registro
            </Button>
          </form>
        </>

    );
};

export default UpdateMaterial;