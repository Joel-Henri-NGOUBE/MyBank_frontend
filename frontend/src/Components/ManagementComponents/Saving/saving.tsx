import { useEffect, useState } from "react"
import type { ManagementPages } from "../../../Interfaces/managementpages"
import ManagementHeader from "../../ManagementHeader/Managementheader"
import "./saving.css"

export default function Saving({pages, setPages}: ManagementPages){
    const [saving, setSaving] = useState({
        amount: "",
        time: "",
        period: "days",
        date: formateDate(new Date(Date.now())),
        result: 0
    })

    type Saving = typeof saving

    useEffect(() => {
        getResult(saving)
    }, [saving.time, saving.amount, saving.date, saving.period])

    function getResult(saving: Saving){
        const amount = parseFloat(saving.amount)
        const time = parseFloat(saving.time)
        function getDays(firstDate: Date, secondDate: Date){
            const milliseconds =  secondDate.valueOf() - firstDate.valueOf()
            const hours = parseInt(`${Math.floor(milliseconds / (1000 * 60 * 60))}`)
            return Math.floor(Math.abs(hours) / 24)
        }
        const days = getDays(new Date(saving.date), new Date(Date.now()))
        if(amount && time && amount > 0 && time > 0){
            const numberOfTimeSaved = saving.period === "days" ? Math.floor(days / time) : Math.floor(Math.floor(days / 30) / time)
            setSaving({...saving, result: numberOfTimeSaved * amount})
        }
        else{
            setSaving({...saving, result: 0})
        }
        return saving.result
    }

    function formateDate(date: Date){
        return date.toLocaleDateString("fr-FR", {year: "numeric", month: "2-digit", day: "2-digit"}).split("/").reverse().join("-")
    }

    return <div id="saving">
                <ManagementHeader
                    pages={pages}
                    setPages={setPages}
                />
                <div className="body">
                    <p>Combien souhaitez-vous mettre de côté pour épargne ?</p>
                    <input type="number" placeholder="1234.67" value={saving.amount} onChange={(e) => setSaving({...saving, amount: e.target.value})}/>
                    <p>A quelle fréquence souhaitez vous réaliser cette épargne  ?</p>
                    <div className="period">
                        <input type="number" placeholder="1234" value={saving.time} onChange={(e) => setSaving({...saving, time: e.target.value})}/>
                        <select name="" id="" value={saving.period} onChange={(e) => setSaving({...saving,  period: e.target.value})}>
                            <option value="days">jours</option>
                            <option value="month">mois</option>
                        </select>
                    </div>
                    <p>Jusqu'à quelle date ?</p>
                    <input type="date" value={formateDate((new Date(saving.date)))} onChange={(e) => setSaving({...saving, date: formateDate(new Date(e.target.value))})}/>
                    <p>Le résultat de votre épargne sera de: </p>
                    <span className="result">{saving.result.toFixed(2)} €</span>
                </div>
            </div>
}