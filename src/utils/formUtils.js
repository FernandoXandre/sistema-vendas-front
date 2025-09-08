import axios from "axios";

export async function clickSubmitForm(strId, obj, url) {
    if(!validateId(strId)){
        console.log("Id invalido...");
        return;
    };
    try {
        axios.put(`${url}/${id}`, obj);
        return;
    } catch (error) {
        return console.log("Erro ao tentar atualizar o registro..." + error);
    };
};

export async function objSearchInDataBase(id,url) {
    if(!validateId(id)){
        console.log("Id invalido...");
        return;
    };

    try {
        const resp = await axios.get(`${url}/${id}`);
        return resp.data;
    } catch (error) {
        return console.log("Erro ao tentar pesquisar por id..." + error);
    };
};

export function assingsInputsValues(obj, setObj){
    const newObj = {};
    for(let key in obj){
        newObj[key] = obj[key] ?? '';
    };
    // console.log(newObj);
    setObj(newObj); 
};

// ######## Functions for internal use ########

export function validateId (num){
    const id = Number(num);
    if(isNaN(id)){
        console.log("Id não é um numero..." + id);
        return false;
    };
    if(typeof id != "number" || id <= 0){
        console.log("Id com formato invalido..." + id);
        return false;
    };
    return true;
};

