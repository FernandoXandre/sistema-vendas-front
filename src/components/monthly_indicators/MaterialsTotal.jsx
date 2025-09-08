import axios from "axios";
import { useEffect, useState } from "react";

function MaterialsTotal({className}){
    const [totalRegister, setTotalRegister] = useState(0);
    const [sumRegistersMaterials, setSumRegistersMaterials] = useState(0);
    const [sumRegistersSells, setSumRegistersSells] = useState(0);

    useEffect(()=>{
        getAllSells();
        getAllMaterials();
    }, []);

    useEffect(() =>{
        if(sumRegistersMaterials === 0 || sumRegistersSells === 0){
            setTotalRegister(0);
            return
        };
        const sumMaterialAndSell = (sumRegistersMaterials + sumRegistersSells);
        setTotalRegister(Number(sumMaterialAndSell));
    }, [sumRegistersMaterials, sumRegistersSells])

    const getAllMaterials = async () =>{
        try{
            const resp = await axios.get("http://localhost:8080/material");
            const listMaterials = resp.data;
            setSumRegistersMaterials(sumTotalRegisters(listMaterials));
            
        }catch(error){
            console.error("Não foi possivel buscar os registros... " + error);
        }
    };
    
    const getAllSells = async () =>{
        try{
            const resp = await axios.get("http://localhost:8080/sell");
            const listSells = resp.data;
            setSumRegistersSells(sumTotalRegisters(listSells));
        }catch(error){
            console.error("Não foi possivel buscar os registros... " + error);
        }
    };

    const sumTotalRegisters = (listRegisters) => {
        let sumTotalKey = 0;

        if(listRegisters.length === 0){
            console.log("Alguma lista de registros vazia...");
            return sumTotalKey = 0;
        };
        listRegisters.forEach(e => {
            sumTotalKey += e.total;
        }); 

        return sumTotalKey;
    };
    
    return(
        <>
            <p className={className}>{totalRegister}
            </p>
            
        </>
    );
}

export default MaterialsTotal;