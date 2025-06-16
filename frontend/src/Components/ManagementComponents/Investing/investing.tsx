import type { ManagementPages } from "../../../Interfaces/managementpages"
import ManagementHeader from "../../ManagementHeader/Managementheader"
import "./investing.css"

export default function Investing({pages, setPages}: ManagementPages){
    return <div id="investing">
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
                    <p>Quel capital prévoyez-vous d’avoir à cette période ? (Ne saisissez rien si capital actuel) ?</p>
                    <input type="number" placeholder="1234567"/>
                    <p>Quel pourcentage d’intérêt obtiendrez-vous sur votre capital (à chaque période)? </p>
                    <input type="number" placeholder="12,07"/>
                    <p>A partir de quelle date ?</p>
                    <input type="date" />
                    <p>Le résultat de votre épargne sera de: </p>
                    <span className="result">1234 €</span>
                </div>
            </div>
}