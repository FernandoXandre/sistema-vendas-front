import { useEffect, useRef } from 'react';
import './Input.css'

function Input ({label, type ="text", required,disable, placeholder, onChange, value,name, min = 0, className="input-field-container"}){
    const inputRef = useRef(null)
    useEffect(() =>{
        const handleWheel = (e) =>{
            e.preventDefault();
        };

        const currentInput = inputRef.current;
        if(currentInput){
            currentInput.addEventListener('wheel', handleWheel)
        };

        return () =>{
            if(currentInput){
                currentInput.addEventListener('wheel', handleWheel)
            };
        }
    },[]);



    return(
        <div className={className}>
           {label && <label>{label}:</label>}
            <input
                name = {name}
                ref={inputRef}
                disabled = {disable}
                required = {required}
                value={value}
                onChange={onChange}
                type={type}
                placeholder={placeholder}
                min={min}
            />
       </div>
    );
};

export default Input;
