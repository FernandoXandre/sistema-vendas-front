import React, { useEffect, useState } from "react";
import Input from "../../inputs/Input";
import { Button } from "react-bootstrap";
import UpdateMaterial from "./UpdateMaterial";
import axios from "axios";
import InputPrice from "../../inputs/InputPrice";

function MaterialForm() {
    const [refreshTrigger, setRefreshTrigger] = useState(0);
    const [totalMaterial, setTotalMaterial] = useState(0);
    const [materialObject, setMaterialObject] = useState({
        tipo:'',
        preco:'',
        quantidade:'',
        data:'',
        estabelecimento:'',
        anotacao:'',
        total:0
    });

    useEffect(() => {
        assingsInputTotalMaterial();
    }, [materialObject.quantidade, materialObject.preco]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(materialObject);
            
            await axios.post("http://localhost:8080/material",materialObject);
            console.log(materialObject)
            setRefreshTrigger(prev =>(prev+1))
            clearInputs();
        } catch (error) {
            console.log("Erro ao tentar registar... " + error);
        };
    };

    const handleChangePrice = (value, name, values) =>{
        setMaterialObject(prev => ({
            ...prev,
            [name]:values.float
        }))
    };

    const handleChange = (e) => {
        const {value, name} = e.target;
        setMaterialObject(prev =>({
            ...prev,
            [name]: value
        }));
    };

    const assingsInputTotalMaterial = ()=>{
        let qtd = Number(materialObject.quantidade);
        let price =Number(materialObject.preco);
        // console.log(price, qtd);

        if(qtd < 0 || isNaN(qtd)){
            qtd = 0;
        };

        if(price < 0 || isNaN(price)){
            
            price = 0;
        };
        
        const calculetedTotal = price*qtd  
        setTotalMaterial(calculetedTotal)
        setMaterialObject(prev => ({
            ...prev,
            total:calculetedTotal
        }));
    };

    const clearInputs = ()=>{
        setMaterialObject({
            tipo:'',
            preco:'',
            quantidade:'',
            data:'',
            estabelecimento:'',
            anotacao:''
        })
    }

    return (
        <>
            <form onSubmit={handleSubmit} className="material-form form-card line-top">
                <h3 className="form-title">Registro de Material</h3> 

                <Input
                    required={true}
                    label='Material'
                    type="text"
                    name={"tipo"}
                    value={materialObject.tipo}
                    onChange={handleChange}
                    placeholder={"Material comprado..."}
                />

                <InputPrice
                    required={true}
                    label={'Valor unidade'}
                    name={"preco"}
                    onChange={handleChangePrice}
                    placeholder='Valor unidade...'
                />

                <Input
                    required={true}
                    label='QTD comprada'
                    type="number"
                    name={"quantidade"}
                    value={materialObject.quantidade}
                    onChange={handleChange}
                    placeholder='Quantidade comprada...' 
                />

                <Input
                    required={true}
                    label='Local da compra'
                    type="text"
                    name={"estabelecimento"}
                    value={materialObject.estabelecimento}
                    onChange={handleChange}
                    placeholder={"Local de compra..."}
                />

                <Input
                    required={true}
                    label='Data compra'
                    type="date"
                    name={"data"}
                    value={materialObject.data}
                    onChange={handleChange}
                />

                <Input
                    label='Anotacao'
                    type="text"
                    name={"anotacao"}
                    value={materialObject.anotacao}
                    onChange={handleChange}
                    placeholder={"Anotação..."}
                />

                <Input
                    disable={true}
                    label='Total'
                    type="number"
                    name={"total"}
                    value={totalMaterial}
                    placeholder={"Total..."}
                />

                <Button type="submit" className="">
                    Registrar Material
                </Button>
            </form>

            <UpdateMaterial setRefreshTrigger={setRefreshTrigger}  refreshTrigger={refreshTrigger}/>
        </>
    );
}

export default MaterialForm;