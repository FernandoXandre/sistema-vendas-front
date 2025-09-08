import axios from "axios";
import { useState } from "react";

import { Button } from "react-bootstrap";
import Input from "../../inputs/Input";
import TableRegisterProduct from "../table/TableRegisterProduct";

import { objSearchInDataBase, assingsInputsValues } from "../../../utils/formUtils";

import '../../../components/styles/styleRegistrationPageGeneral.css'

function UpdateProduct(){
    const [flag, setFlag] = useState(true);
    const [objectProduct, setObjectProduct] = useState({
        id_produto:"",
        tipo:"",
        sabor:"",
        preco:""
    });

    const handleClickEdit = (register) =>{
        // console.log(register);
        const preco = register.preco != null ? register.preco : 0
        
        setObjectProduct(prev => ({
            ...prev,
            id_produto: register.id_produto,
            tipo: register.tipo != null ? register.tipo : '',
            sabor: register.sabor,
            preco: preco
        }));
        setFlag(flag === true ? false : true);
    };

    const handleClickDelete = (register) => {
        const id = register.id_produto;
        try {
            axios.delete(`http://localhost:8080/produtos/${id}`)
            setFlag(flag === true ? false : true);
        } catch (error) {
            console.log("Erro ao tentar deletar..." + error);
        }
    };  

    // const handleSubmit = async (e) =>{
    //     e.preventDefault();
    //     const id = e.target[0].value;

    //     if(id === null || id === ''){
    //         alert("Preencha os campos do formulario");
    //         return;
    //     };
        
    //     try {
    //         const resp = await axios.put(`http://localhost:8080/produtos/${id}`, objectProduct);
    //         setFlag(flag === true ? false : true);
    //     } catch (error) {
    //         console.log("Erro ao tentar atualizar o produto..." + error);
    //     };
    // };

    const handleChange = (e) =>{
        const {name, value} = e.target;
        // console.log(e)
        setObjectProduct(prev => ({
            
            ...prev,
            [name]:value
        }));
    };

    const handleClickSubmitForm = async (e) =>{
        e.preventDefault();
        const objectProductUpdate = {...objectProduct};
        const id = objectProductUpdate.id_produto;
        // console.log(typeof id);
        if(typeof id != "number" ){
            console.log("Id invalido..." + id);
            return;
        };
        
        try {
            await axios.put(`http://localhost:8080/produtos/${id}`, objectProductUpdate);
            setFlag(flag === true ? false : true);
        } catch (error) {
            console.log("Erro ao tentar atualizar..." + error);
        }
    };

    const handleClickSearch = async ()=>{
        const id = Number(objectProduct.id_produto);
        if(typeof id != "number" || isNaN(id)){
            console.log('id invalido...' + id);
            return;
        }
        
        const resp = await objSearchInDataBase(id, "http://localhost:8080/produtos");
        assingsInputsValues(resp, setObjectProduct);
    };


    const clearInputs = ()=>{
        setObjectProduct({
            id_produto:'',
            tipo:'',
            sabor:'',
            preco:''
        })
    };
    return(
        <>
            <TableRegisterProduct flag={flag} onClickEdit={handleClickEdit} onClickDelete={handleClickDelete} />
            <h3 className="form-title">Alterar registro de produto</h3>
            <form onSubmit={handleClickSubmitForm}>
                <div className="id-container">
                    <Input
                        required={true}
                        label='ID'
                        name = 'id_produto'
                        type="number"
                        value={objectProduct.id_produto}
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
                    label={"Tipo"}
                    name={"tipo"}
                    // required={true}
                    placeholder={"Digite o tipo do produto..."}
                    type="text"
                    value={objectProduct.tipo}
                    onChange={handleChange}
                />

                <Input
                    label={"Sabor"}
                    name={"sabor"}
                    placeholder={"Digite o sabor..."}
                    type="text"
                    value={objectProduct.sabor}
                    onChange={handleChange}
                />

                <Input
                    label={"Preço"}
                    name={"preco"}
                    placeholder={"Digite o preço..."}
                    type="number"
                    value={objectProduct.preco}
                    onChange={handleChange}
                />

                <Button className="" type="submit">
                    Alterar produto
                </Button>
            </form>
        </>
    );
};

export default UpdateProduct;