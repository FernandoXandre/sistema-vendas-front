import React from "react";
import { useNavigate } from "react-router-dom";

function Button ({type='button', children, className=''}){
    const navigate = useNavigate();

    const onClick = ()=>{
        navigate("/home")
    };

    return (
        <button type={type} onClick={onClick} className={`${className}`}>
            {children}
        </button>
    );
}

export default Button;