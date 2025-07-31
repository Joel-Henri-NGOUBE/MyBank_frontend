import type { IOperation } from "../../Interfaces/operation"
import Modify from "../../assets/modify.svg"
import Delete from "../../assets/delete.svg"
import "./operation.css"
import { Link } from "react-router"


export default function Operation({operation, operationId, handleDelete, token}: {operation: IOperation, operationId: number, handleDelete: Function, token: string}){

    return <div className="operation" onMouseEnter={(e) => {((e.currentTarget as HTMLDivElement).childNodes[0] as HTMLDivElement).style.display = "flex"}} onMouseLeave={(e) => {((e.currentTarget as HTMLDivElement).childNodes[0] as HTMLDivElement).style.display = "none"}}>
            <div className="actions" style={{display: "none"}}>
                <Link to={`/neworsetoperation/${operationId}`} state={{token: token}}>
                    <img src={Modify} alt="modify" />
                </Link>
                <div onClick={() => handleDelete()}>
                    <img src={Delete} alt="modify" />
                </div>

            </div>
            <span className="category">{operation.category}</span>
            <p className="label">{operation.label.toUpperCase()}</p>
            <span className={`amount ${operation.type.toLowerCase()}`}>{operation.type === "EXPENSE" ? "- " + operation.amount + " €" : "+ " + operation.amount + " €"}</span>
        </div>
}