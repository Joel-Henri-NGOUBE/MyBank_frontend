import { useNavigate } from "react-router";
import InputLabel from "../../Components/General/InputLabel";
import InputSelect from "../../Components/General/InputSelect";
import Header from "../../Components/Header/header";
import "./neworsetoperation.css"

export default function NewOrSetOperation(){
    
    const navigate : Function = useNavigate()
    
    return <div className="neworsetoperation">
        <Header />

        <div className="page">
            <h3>New operation</h3>

            <div className="inputs">
                {/* <InputLabel 
                label="Label"
                type="text"
                placeholder="Name your operation"
                />

                <InputLabel 
                label="Amount"
                type="number"
                placeholder="1234,567"
                /> */}

                <InputSelect
                label="Type"
                options={["Income","income", "expense"]} 
                />

                <InputSelect
                label="Category"
                options={["Annual bonus","income", "expense"]} 
                />

                {/* <InputLabel 
                label="Date"
                type="date"
                placeholder="JJ/MM/AAAA"
                /> */}
            </div>

            <div className="buttons">
                <button onClick={() => navigate("/operations")}>Get back to operations</button>
                <button onClick={() => navigate("/operations")}>Save operation</button>
            </div>

        </div>

    </div>
}