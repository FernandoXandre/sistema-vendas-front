import Button from "../../components/button/Button";
import MaterialForm from "../../components/forms/registerForms/MaterialForm";
import '../../components/styles/styleRegistrationPageGeneral.css'
import TabsPages from "../../components/tabs/TabsPages";

function RegisterMaterial(){

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
                    <MaterialForm/>
                </div>
            </div>
        </div>


    );

};

export default RegisterMaterial;