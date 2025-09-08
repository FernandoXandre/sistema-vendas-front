// src/components/forms/VendaForm.jsx
import React, { useEffect, useState } from "react";
import Input from "../../inputs/Input";
import { Button } from "react-bootstrap";
import axios from "axios";
import UpdateVenda from "./UpdateVenda";

// Import CSS
import '../../../components/styles/styleRegistrationPageGeneral.css'


function VendaForm() {
    const [totalSend, setTotalSend] = useState(0);
    const [unitValue, setUnitValue] = useState(0);
    const [IsSubmitting, setIsSubmitting] = useState('');
    const [refreshTrigger, setRefreshTrigger] = useState('');
    const [sellObject, setSellObject] = useState({
        id:"",
        tipo:'',
        data:'',
        quantidade:'',
        anotacao:'',
        sabor:'',
        total:''
    });

    useEffect(() => {
        assingValueVariable();
    }, [ unitValue, sellObject.quantidade]); 



    const handleChange = (e) =>{
        // console.log(e.target)
        const {value, name } = e.target;

        setSellObject(prev => ({
            ...prev,
            [name]: value
        }));

    } 

    const handleSubmit = async (e) => {
        e.preventDefault()

        setIsSubmitting(true)

        const vendaData = {...sellObject};
        console.log(vendaData)
        
        try {
            await axios.post("http://localhost:8080/sell", vendaData)
            alert("Registro realizado com sucesso !!!")
        } catch (error) {
            console.error(`Erro ao salver o produto... ${error.message}` )
        }
        finally{
            setIsSubmitting(false)
            setRefreshTrigger(prev => prev+1);
        }
    };

    const assingValueVariable = () =>{
        const qty = sellObject.quantidade === '' ? 0 : parseFloat(sellObject.quantidade);
        const val = parseFloat(unitValue);

        if (!isNaN(qty) && !isNaN(val)) {
            setTotalSend(qty * val);
            // console.log("passou")
            sellObject.total = (val * qty);
        };
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="venda-form form-card line-top">
                <h3 className="form-title">Registro de Venda</h3> 
                <div className="radio-group form-input"> 
                    <label>
                        <input
                            required={true}
                            type="radio"
                            name="tipo"
                            value="bolo"
                            onChange={handleChange}/>
                        Bolo
                    </label>
                    <label>
                        <input
                            required={true}
                            type="radio"
                            name="tipo"
                            value='alfajor'
                            onChange={handleChange}
                            />
                        Alfajor
                    </label>
                </div>

                <Input
                    required={true}
                    label='Data Venda'
                    name="data"
                    type="date"
                    value={sellObject.data}
                    onChange={handleChange}
                    />

                <Input
                    required={true}
                    label='Valor unidade'
                    type="number"
                    value={Number(unitValue).toFixed(2)}
                    onChange={(e) =>(setUnitValue(e.target.value))}
                    placeholder='Quantidade vendida...'
                    />

                <Input
                    required={true}
                    label='Quantidade vendida'
                    type="number"
                    name="quantidade"
                    value={sellObject.quantidade}
                    onChange={handleChange}
                    placeholder='Quantidade vendida...'
                    />

                {sellObject.tipo === "bolo" && (
                    <Input
                    label='Sabor'
                    type="text"
                    name="sabor"
                    value={sellObject.sabor}
                    onChange={handleChange}
                    placeholder='Sabor do bolo...'
                    />
                )}

                <Input
                    label='Anotação'
                    type="text"
                    name='anotacao'
                    value={sellObject.anotacao}
                    onChange={handleChange}
                    placeholder={"Anotações..."}
                />

                <Input
                    disable={true}
                    label='Total'
                    type="number"
                    name='total'
                    value={totalSend.toFixed(2)}
                    placeholder={"Total da venda..."}
                />

                <Button className="" type="submit" disabled ={IsSubmitting} >
                    Registrar Venda
                </Button>
            </form>

            <UpdateVenda refreshTrigger = {refreshTrigger}/>
        </>
    );
}

export default VendaForm;