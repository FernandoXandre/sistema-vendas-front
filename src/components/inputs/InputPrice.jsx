import CurrencyInput from "react-currency-input-field";
import './Input.css'

function InputPrice({label, name, placeholder, onChange, value}){

    return(
        <div className="input-field-container">
            {label && <label>{label}:</label>}
            <CurrencyInput
                name={name}
                placeholder={placeholder}
                prefix="R$ "
                decimalScale={2}
                decimalSeparator=","
                groupSeparator="."
                onValueChange={onChange}
                value={value}
            />
        </div>
    );
};

export default InputPrice;