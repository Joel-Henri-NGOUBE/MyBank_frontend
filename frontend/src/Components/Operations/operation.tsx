import type { IOperation } from "../../Interfaces/operation"
import "./operation.css"


export default function Operation({operation}: {operation: IOperation}){

    return <div className="operation">
            <span className="category">{operation.category}</span>
            <p className="label">{operation.label}</p>
            <span className={`amount ${operation.type}`}>{operation.type === "expense" ? "- " + operation.amount + " €" : "+ " + operation.amount + " €"}</span>
        </div>
}