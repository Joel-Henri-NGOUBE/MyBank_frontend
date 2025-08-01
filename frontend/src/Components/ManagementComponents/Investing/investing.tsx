import { useEffect, useState } from "react"
import type { ManagementPages } from "../../../Interfaces/managementpages"
import ManagementHeader from "../../ManagementHeader/Managementheader"
import "./investing.css"

export default function Investing({pages, setPages}: ManagementPages){

    const [investing, setInvesting] = useState({
        amount: 0,
        time: 0,
        period: "days",
        date: formateDate(new Date(Date.now())),
        interest: 0,
        capital: 0,
        result: 0
    })

    type Investing = typeof investing

    useEffect(() => {
        console.log(investing)
        getResult(investing)
    }, [investing.time, investing.amount, investing.date, investing.period, investing.capital, investing.interest])

    function getResult(investing: Investing){
        function getDays(firstDate: Date, secondDate: Date){
            const milliseconds =  secondDate.valueOf() - firstDate.valueOf()
            const hours = parseInt(`${Math.floor(milliseconds / (1000 * 60 * 60))}`)
            return Math.floor(Math.abs(hours) / 24)
        }
        const days = getDays(new Date(investing.date), new Date(Date.now()))
        if(investing.amount && investing.time && investing.capital && investing.interest > 0 && investing.time > 0 && investing.capital > 0 && investing.amount > 0){
            const numberOfTimeInvested = investing.period === "days" ? Math.floor(days / investing.time) : Math.floor(Math.floor(days / 30) / investing.time)
            console.log(numberOfTimeInvested)
            let investingResult = investing.capital
            for(let i = 0; i < numberOfTimeInvested; i++){
                investingResult = (investingResult + investing.amount) * (1 + (investing.interest / 100))
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
            <p>Combien souhaitez-vous mettre de côté pour épargne ?</p>
            <input type="number" placeholder="1234,67" value={investing.amount} onChange={(e) => setInvesting((i) => ({...i, amount: parseInt(e.target.value)}))}/>
            <p>Pendant quelle période souhaitez vous réaliser cette épargne  ?</p>
            <div className="period">
                <input type="number" placeholder="1234" value={investing.time} onChange={(e) => setInvesting((i) => ({...i, time: parseInt(e.target.value)}))}/>
                <select name="" id="" value={investing.period} onChange={(e) => setInvesting((i) => ({...i,  period: e.target.value}))}>
                    <option value="days">jours</option>
                    <option value="month">mois</option>
                </select>
            </div>
            <p>Quel capital prévoyez-vous d’avoir à cette période ? (Ne saisissez rien si capital actuel) ?</p>
            <input type="number" placeholder="1234567" value={investing.capital} onChange={(e) => setInvesting((i) => ({...i,  capital: parseInt(e.target.value)}))}/>
            <p>Quel pourcentage d’intérêt obtiendrez-vous sur votre capital (à chaque période)? </p>
            <input type="number" placeholder="12,07" value={investing.interest} onChange={(e) => setInvesting((i) => ({...i,  interest: parseInt(e.target.value)}))}/>
            <p>A partir de quelle date ?</p>
            <input type="date" value={formateDate((new Date(investing.date)))} onChange={(e) => setInvesting((i) => ({...i, date: formateDate(new Date(e.target.value))}))}/>
            <p>Le résultat de votre épargne sera de: </p>
            <span className="result">{investing.result.toFixed(2)} €</span>
        </div>
    </div>
}