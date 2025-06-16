import type { IInputSelect } from "../../Interfaces/InputSelect";

export default function InputSelect({label, options}: IInputSelect){
    return <div className="inputselect">
        <label htmlFor={label.toLowerCase()}>{label}</label>
        <select name={label.toLowerCase()} id={label.toLowerCase()}>
            {options.map((op, index) => {
                return index ? <option value={op}>{op}</option> : <option value="">{op}</option>})}
        </select>
    </div>
}