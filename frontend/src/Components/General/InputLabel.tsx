import type { IInputLabel } from "../../Interfaces/InputLabel";

export default function InputLabel({label, placeholder, type, direction}: IInputLabel){
    return <>
        <label htmlFor={label.toLowerCase()}>{label}</label>
        <input type={type} name={label.toLowerCase()} id={label.toLowerCase()} placeholder={placeholder} />
    </>
}