import { useState } from "react";
import { Button } from "react-bootstrap";
import Input from "../../inputs/Input";

import '../../../components/styles/styleRegistrationPageGeneral.css'
import InputPrice from "../../inputs/InputPrice";
import axios from "axios";
import UpdateProduct from "./UpdateProduct";

function ProductForm (){
    const [objectProduct, setObjectProduct] = useState({
        tipo: '',
        sabor:'',
        preco:''
    });

    const handleSubmit = async (e) =>{
        e.preventDefault();
        try {
            await axios.post("http://localhost:8080/produtos", objectProduct);
        } catch (error) {
            console.log("Erro ao tentar cadastrar produto..." + error)
        }
    };

    const handleChangePrice = (value, name, values)=>{
        setObjectProduct(prev => ({
            ...prev,
            [name]:values.float
        }));
        
    };

    const handleChange = (e) =>{
        const {value, name} = e.target;

        setObjectProduct(prev => ({
            ...prev,
            [name]: value
        }));

    };


    return(
        <>
            <form onSubmit={handleSubmit} className="material-form form-card line-top">
                <h3 className="form-title">Registrar Novo Produto</h3>
                <Input
                    required={true}
                    label='Nome'
                    type="text"
                    name={"tipo"}
                    value={objectProduct.nome}
                    onChange={handleChange}
                    placeholder={"Nome do produto..."}
                />

                <Input
                    required={true}
                    label='Sabor'
                    type="text"
                    name={"sabor"}
                    value={objectProduct.sabor}
                    onChange={handleChange}
                    placeholder={"Sabor do bolo..."}
                />

                <InputPrice
                    name={'preco'}
                    label={"Preço produto"}
                    placeholder={"Preço do produto..."}
                    onChange={handleChangePrice}
                />
                


                <Button type="submit">Registar produto</Button>
            </form>

            <UpdateProduct/>
        </>
        
    );
};

export default ProductForm;