import "./ManagementHeader.css"
import type { ManagementPages } from "../../Interfaces/managementpages"

export default function ManagementHeader({pages, setPages} : ManagementPages){

    function handleTracking(){
        setPages([false, true, false, false])
    }
    function handleInvesting(){
        setPages([false, false, true, false])
    }
    function handleSaving(){
        setPages([false, false, false, true])
    }

    return <div className="managementHeader">
        <div className="left">
            {pages[1] && <span>Tracking</span>}
            {pages[2] && <span>Investing</span>}
            {pages[3] && <span>Saving</span>}
        </div>
        <div className="right">
            <span className={pages[1] ? "tracking activepage" : "tracking"} onClick={() => handleTracking()}>Tracking</span>
            <span className={pages[2] ? "investing activepage" : "investing"} onClick={() => handleInvesting()}>Investing</span>
            <span className={pages[3] ? "saving activepage" : "saving"} onClick={() => handleSaving()}>Saving</span>
        </div>
    </div>
}