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

    /**
     * 
     * @param saving An object with all the parameters entered by the user on the page related with how much money he wants to save
     * @returns The invest result according to the params
     */
    function getResult(saving: Saving){
        const amount = parseFloat(saving.amount)
        const time = parseFloat(saving.time)
        /**
         * Calculates the difference of days between two dates
         * @param firstDate The furthest date
         * @param secondDate The closest date
         * 
         * @returns The days between those dates
         */
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
    /**
     * Transforms the date to the input date accepted format
     * @param date Any date
     * @returns the date in the right format
     */
    function formateDate(date: Date){
        return date.toLocaleDateString("fr-FR", {year: "numeric", month: "2-digit", day: "2-digit"}).split("/").reverse().join("-")
    }

    return <div id="saving">
                <ManagementHeader
                    pages={pages}
                    setPages={setPages}
                />
                <div className="body">
                    <p>How much money do you want to save ?</p>
                    <input type="number" placeholder="1234.67" value={saving.amount} onChange={(e) => setSaving({...saving, amount: e.target.value})}/>
                    <p>How often do you want to make that save  ?</p>
                    <div className="period">
                        <input type="number" placeholder="1234" value={saving.time} onChange={(e) => setSaving({...saving, time: e.target.value})}/>
                        <select name="" id="" value={saving.period} onChange={(e) => setSaving({...saving,  period: e.target.value})}>
                            <option value="days">day</option>
                            <option value="month">month</option>
                        </select>
                    </div>
                    <p>Until when ?</p>
                    <input type="date" value={formateDate((new Date(saving.date)))} onChange={(e) => setSaving({...saving, date: formateDate(new Date(e.target.value))})}/>
                    <p>The result of your savings will be of :</p>
                    <span className="result">{saving.result.toFixed(2)} €</span>
                </div>
            </div>
}