import axios from "axios";
import { useEffect, useState } from "react";

function SalesTotal({className}){
    const [registersTotal, setRegistersTotal] = useState(0);
    
    useEffect(()=>{
        getAllSells();
    }, []);

    const getAllSells = async () =>{
        try{
            const resp = await axios.get("http://localhost:8080/sell");
            const listSells = resp.data;
            setRegistersTotal(listSells.length);
        }catch(error){
            console.error("Não foi possivel buscar os registros... " + error);
        }
    };
    
    return(
        <>
            <p className={className}>{registersTotal}</p>
        </>
    );
}

export default SalesTotal;