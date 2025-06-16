import { useNavigate } from "react-router"
import type { ManagementPages } from "../../../Interfaces/managementpages"
import ManagementHeader from "../../ManagementHeader/Managementheader"
import "./tracking.css"

export default function Tracking({pages, setPages}: ManagementPages){

     const navigate : Function = useNavigate()

    return <div id="tracking">
                <ManagementHeader
                    pages={pages}
                    setPages={setPages}
                />
                <div className="body">
                    <p>The <span>Tracking</span> is the default mode when you use <span>MyBank</span>.</p>
                    <p>To use you it you can add, modifiy and delete your operations.</p>
                    <button onClick={() => navigate("/neworsetoperation")}>Add new operation</button>
                    <button onClick={() => navigate("/operations")}>Get to operations</button>
                    <p>To use you it you can add, modifiy and delete your operations.</p>
                    <button onClick={() => navigate("/statistics")}>Access statistics</button>
                </div>
            </div>
}