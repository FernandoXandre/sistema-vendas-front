import Button from "../../components/button/Button";
import '../../components/styles/styleRegistrationPageGeneral.css'
import TabsPages from "../../components/tabs/TabsPages";
import ProductForm from "../../components/forms/registerForms/ProductForm";

function RegisterProduct(){

    return(
        <div>
            <div className="top-container">
                <div className="btnBack-container">
                    <Button className="btnBack" type="button">Voltar</Button>
                </div>
                <div className="tabs-container">
                    <TabsPages/>
                </div>
            </div>
            <div className="register-page-container">
                <div className="forms-wrapper">
                    <ProductForm/>
                </div>
            </div>
        </div>
    );
}

export default RegisterProduct;