// ### Hooks ###
import axios from "axios";
import { useState, useEffect } from "react";

// ### Components ###
import Input from "../../inputs/Input";
import { Button } from "react-bootstrap";
import TableRegisterSell from "../table/TableRegisterSell";

// ### Utils ###
import {assingsInputsValues, objSearchInDataBase, validateId} from "../../../utils/formUtils"

// ### CSS ###
import '../../../components/styles/styleRegistrationPageGeneral.css'


function UpdateVenda({refreshTrigger}){
    // Inputs form
    const [refresh, setRefresh] = useState(false);
    const [objectRegister, setObjectRegister] = useState({
        id:'',
        tipo:'',
        sabor:'',
        qtdVendidos:'',
        dataVenda:'',
        anotacao:'',
        total:''
    });

    useEffect(() =>{
        setRefresh(prev => !prev);
    }, [refreshTrigger])

  // Click functions

    const handleClickSubmitForm = (e) =>{
        e.preventDefault();
        console.log();
        const id = objectRegister.id;

        try {
            axios.put(`http://localhost:8080/sell/${id}`, objectRegister)
            clearInputs();
        } catch (error) {
            console.log(error)            
        }
    };

    const handleEditRegister = (register)=>{
        // console.log(register);
        assingsInputsValues(register, setObjectRegister);
    };

    const handleClickSend = async ()=>{
        const id = objectRegister.id;
        const resp = await objSearchInDataBase(id, "http://localhost:8080/sell")
        assingsInputsValues(resp, setObjectRegister);
    };


    const onClickDelete = async ()=>{
        const id = objectRegister.id;
        if(!validateId(id)){
            alert("Digite um id valido...");
            return;
        };
        try {
            await axios.delete(`http://localhost:8080/sell/${id}`);
            alert('Registro excluido com sucesso...')
        } catch (error) {
            console.log("Erro ao tentar deletar o registro..." + error)
            
        };
    };

    const handleChange = (e) =>{
        const {name, value} = e.target;
        // console.log(value);
        setObjectRegister((prevRegister)=>({
            ...prevRegister,
            [name]:value
        }));  
    };

    const clearInputs = ()=>{
        setObjectRegister({
            id:'',
            tipo:'',
            sabor:'',
            qtdVendidos:'',
            dataVenda:'',
            anotacao:'',
            total:''
        })
    };

    return(
        <div className="line-top">
            <TableRegisterSell onClickEdit ={handleEditRegister} refreshTrigger = {refresh}/>    
            <form onSubmit={handleClickSubmitForm} className="venda-form form-card" >
                <h3 className="form-title">Atualizar Registro de Venda</h3> 
               <div className="id-container">
                    <Input
                        required={true}
                        label='ID'
                        name = 'id'
                        type="number"
                        value={objectRegister.id}
                        min={1}
                        onChange={handleChange}
                        placeholder='Id do produto...'
                    />
                    <Button variant="primary" onClick = {handleClickSend}>Pesquisar</Button>
                    <Button variant="primary" onClick={handleClickSubmitForm}>Atualizar</Button>
                    <Button variant="danger" onClick={onClickDelete}>Deletar</Button>
                    <Button variant="secondary" onClick = {clearInputs}>Limpar Pesquisa</Button>
               </div>

               <div className="radio-group form-input"> 
                    <label>
                        <input
                            required={true}
                            type="radio"
                            name="tipo"
                            checked={objectRegister.tipo === 'bolo'}
                            value="bolo"
                            onChange={handleChange}
                            />
                        Bolo
                    </label>
                    <label>
                        <input
                            required={true}
                            type="radio"
                            checked={objectRegister.tipo === 'alfajor'}
                            name="tipo"
                            value='alfajor'
                            onChange={handleChange}
                            />
                        Alfajor
                    </label>
                </div>

                {/* <Input
                    required={true}
                    label='Tipo'
                    name = 'tipo'
                    type="text"
                    value={objectRegister.tipo}
                    onChange={handleChange}
                    placeholder='Tipo...'
                /> */}
                
                <Input
                    required={true}
                    label='Data Venda'
                    name='dataVenda'
                    type="date"
                    value={objectRegister.dataVenda}
                    onChange={handleChange}
                    />

                <Input
                    required={true}
                    label='QTD Vendidos'
                    name = 'qtdVendidos'
                    type="number"
                    value={objectRegister.qtdVendidos}
                    onChange={handleChange}
                    placeholder='Quantidade vendida...'
                />

                {objectRegister.tipo === 'bolo' && (
                    <Input
                        required={objectRegister.tipo === "bolo" ? true : false}
                        label='Sabor'
                        name = 'sabor'
                        type="text"
                        value={objectRegister.tipo === "bolo" ? objectRegister.sabor : ''}
                        onChange={handleChange}
                        placeholder='Sabor...'
                    />
                )}

                <Input
                    label='Anotação'
                    name = 'anotacao'
                    type="text"
                    value={objectRegister.anotacao}
                    onChange={handleChange}
                    placeholder={"Anotações..."}
                />

                <Button className="" type="submit">
                    Alterar Registro
                </Button>
            </form>
            
        </div>
    );
}

export default UpdateVenda;