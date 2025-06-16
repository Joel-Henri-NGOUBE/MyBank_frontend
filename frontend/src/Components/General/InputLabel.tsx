import type { IInputLabel } from "../../Interfaces/InputLabel";

export default function InputLabel({label, placeholder, type}: IInputLabel){
    return <div className="inputlabel">
        <label htmlFor={label.toLowerCase()}>{label}</label>
        <input type={type} name={label.toLowerCase()} id={label.toLowerCase()} placeholder={placeholder} />
    </div>
}