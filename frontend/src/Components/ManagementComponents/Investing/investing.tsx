import { useEffect, useState } from "react"
import type { ManagementPages } from "../../../Interfaces/managementpages"
import ManagementHeader from "../../ManagementHeader/Managementheader"
import "./investing.css"

export default function Investing({pages, setPages}: ManagementPages){

    const [investing, setInvesting] = useState({
        amount: "",
        time: "",
        period: "days",
        date: formateDate(new Date(Date.now())),
        interest: "",
        capital: "",
        result: 0
    })

    type Investing = typeof investing

    useEffect(() => {
        getResult(investing)
    }, [investing.time, investing.amount, investing.date, investing.period, investing.capital, investing.interest])

    function getResult(investing: Investing){
        let amount = parseFloat(investing.amount)
        let interest = parseFloat(investing.interest)
        let capital = parseFloat(investing.capital)
        let time = parseFloat(investing.time)
        function getDays(firstDate: Date, secondDate: Date){
            const milliseconds =  secondDate.valueOf() - firstDate.valueOf()
            const hours = parseInt(`${Math.floor(milliseconds / (1000 * 60 * 60))}`)
            return Math.floor(Math.abs(hours) / 24)
        }
        const days = getDays(new Date(investing.date), new Date(Date.now()))
        if(amount && time && capital && interest && interest > 0 && time > 0 && capital > 0 && amount > 0){
            const numberOfTimeInvested = investing.period === "days" ? Math.floor(days / time) : Math.floor(Math.floor(days / 30) / time)
            let investingResult = capital
            for(let i = 0; i < numberOfTimeInvested; i++){
                investingResult = (investingResult + amount) * (1 + (interest / 100))
            }
            setInvesting({...investing, result: investingResult})
        }
        else{
            setInvesting({...investing, result: 0})
        }
        return investing.result
    }

    function formateDate(date: Date){
        return date.toLocaleDateString("fr-FR", {year: "numeric", month: "2-digit", day: "2-digit"}).split("/").reverse().join("-")
    }

    return <div id="investing">
        <ManagementHeader
            pages={pages}
            setPages={setPages}
        />
        <div className="body">
            <p>How much money do you want to save ?</p>
            <input type="number" placeholder="1234,67" value={investing.amount} onChange={(e) => setInvesting((i) => ({...i, amount: e.target.value}))}/>
            <p>How often do you want to make that save  ?</p>
            <div className="period">
                <input type="number" placeholder="1234" value={investing.time} onChange={(e) => setInvesting((i) => ({...i, time: e.target.value}))}/>
                <select name="" id="" value={investing.period} onChange={(e) => setInvesting((i) => ({...i,  period: e.target.value}))}>
                    <option value="days">day</option>
                    <option value="month">month</option>
                </select>
            </div>
            <p>What your capital ?</p>
            <input type="number" placeholder="1234567" value={investing.capital} onChange={(e) => setInvesting((i) => ({...i,  capital: e.target.value}))}/>
            <p>Which percentage of interest will you gain on your capital (at each period)? </p>
            <input type="number" placeholder="12,07" value={investing.interest} onChange={(e) => setInvesting((i) => ({...i,  interest: e.target.value}))}/>
            <p>Until when ?</p>
            <input type="date" value={formateDate((new Date(investing.date)))} onChange={(e) => setInvesting((i) => ({...i, date: formateDate(new Date(e.target.value))}))}/>
            <p>The result of your savings will be of : </p>
            <span className="result">{investing.result.toFixed(2)} €</span>
        </div>
    </div>
}