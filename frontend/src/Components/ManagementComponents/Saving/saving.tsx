import type { ManagementPages } from "../../../Interfaces/managementpages"
import ManagementHeader from "../../ManagementHeader/Managementheader"
import "./saving.css"

export default function Saving({pages, setPages}: ManagementPages){
    return <div id="saving">
                <ManagementHeader
                    pages={pages}
                    setPages={setPages}
                />
                <div className="body">
                    <p>Combien souhaitez-vous mettre de côté pour épargne ?</p>
                    <input type="number" placeholder="1234,67"/>
                    <p>Pendant quelle période souhaitez vous réaliser cette épargne  ?</p>
                    <div className="period">
                        <input type="number" placeholder="1234"/>
                        <select name="" id="">
                            <option value="jours">jours</option>
                            <option value="mois">mois</option>
                        </select>
                    </div>
                    <p>A partir de quelle date ?</p>
                    <input type="date" />
                    <p>Le résultat de votre épargne sera de: </p>
                    <span className="result">1234 €</span>
                </div>
            </div>
}