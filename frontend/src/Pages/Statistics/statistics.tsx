import Header from "../../Components/Header/header";
import Tablist from "../../Components/TabList/tablist";
import { PieChart } from '@mui/x-charts/PieChart';
import type { IOperation } from "../../Interfaces/operation";
import "./statistics.css"
import { useNavigate, type NavigateFunction } from "react-router";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export default function Statistics(){

    const [operations, setOperations] = useState<IOperation[]>([])

    const [id, setId] = useState<number>(0)

    const navigate: NavigateFunction = useNavigate()

    const token = localStorage.getItem("token")

    useEffect(() => {
            token
            ?
            fetch([`${import.meta.env.VITE_APP_BACKEND_API_URL}`, "/api/id"].join(""), {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    email: (jwtDecode(token) as any).username
                })
            })
            .then(res => {
                (!res.status.toString().startsWith("2")) && navigate("/")
                return res.json()
            })
            .then((res: {id: number}) => setId(res.id))
            : navigate("/")
    }, [])

    useEffect(() => {
        id &&
        fetch([`${import.meta.env.VITE_APP_BACKEND_API_URL}`, "/api/users/", id,"/operations/"].join(""), {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`
                    },
                })
        .then(res => res.json())
        .then((res: any) => {
        })
    }, [id])

    const incomes: IOperation[] = operations?.filter(op => op.type === "INCOME") || []
    const incomesTotal: number = incomes.reduce((acc, cur) => cur.amount + acc, 0)
    const incomeData: {label: string, value: number}[] = incomes.reduce((acc: {label: string, value: number}[], cur) => { 
                acc.push({label: cur.category.toUpperCase(), value: parseFloat(((cur.amount/incomesTotal)*100).toFixed(2))})
                return acc
            }, [])
    const expenses: IOperation[] = operations?.filter(op => op.type === "EXPENSE") || []
    const expensesTotal: number = expenses.reduce((acc, cur) => cur.amount + acc, 0)
    const expenseData: {label: string, value: number}[] = expenses.reduce((acc: {label: string, value: number}[], cur) => { 
                acc.push({label: cur.category.toUpperCase(), value: parseFloat(((cur.amount/expensesTotal)*100).toFixed(2))})
                return acc
            }, [])

    function slide(){
        if(!(document.querySelector(".slider")as HTMLElement).classList.contains("slide")){
            (document.querySelector(".slider") as HTMLElement).classList.add("slide");

            (document.querySelector(".tablist .tab:nth-of-type(1)") as HTMLElement).classList.remove("clicked");
            (document.querySelector(".tablist .tab:nth-of-type(2)") as HTMLElement).classList.add("clicked")
            if((document.querySelector(".slider") as HTMLElement).classList.contains("slide-back")){
                (document.querySelector(".slider") as HTMLElement).classList.remove("slide-back");
            }
        }
    }

    function slideBack(){
        if(!(document.querySelector(".slider") as HTMLElement).classList.contains("slide-back")){
            (document.querySelector(".slider") as HTMLElement).classList.add("slide-back");

            (document.querySelector(".tablist .tab:nth-of-type(1)") as HTMLElement).classList.add("clicked");
            (document.querySelector(".tablist .tab:nth-of-type(2)") as HTMLElement).classList.remove("clicked")

            if((document.querySelector(".slider") as HTMLElement).classList.contains("slide")){
                (document.querySelector(".slider") as HTMLElement).classList.remove("slide");
            }
        }
    }

    return <div className="statistics">
        <Header />
        <div className="page">
            <span className="page-title">Statistics</span>
            <Tablist 
                tabs={[{tab: "incomes", onclick: () => slideBack()}, {tab: "expenses", onclick: () => slide()}]}
            />
            <span className="page-subtitle">Total</span>
            
            <div className="slider-wrapper">
                <div className="slider">
                    <div className="incomes">
                        <span className="total">{incomesTotal} €</span>

                        <PieChart
                            series={[
                                {
                                data: incomeData,
                                highlightScope: { fade: 'global', highlight: 'item' },
                                faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                                innerRadius: 70,
                                outerRadius: 85,
                                },
                            ]}
                            colors={["#199F65", "#FCA311", "#F63C6B", "#28427B", "#CA7D02", "#1F1F1F", "#21D486", "#9C072C", "#14213D"]}
                            height={200}
                            width={200}
                        />
                        <div className="categories">
                            {incomes.map((i, index) => <div className="category" key={index}><span className="category">{i.category}</span><span className="percentage">{((i.amount/incomesTotal)*100).toFixed(2)} %</span></div>)}

                        </div>
                    </div>

                    <div className="expenses">
                        <span className="total">- {expensesTotal} €</span>

                        <PieChart
                            series={[
                                {
                                data: expenseData,
                                highlightScope: { fade: 'global', highlight: 'item' },
                                faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                                innerRadius: 70,
                                outerRadius: 85
                                },
                            ]}
                            colors={["#9C072C", "#FCA311", "#28427B","1F1F1F1" ,"#CA7D02", "#F63C6B", "#21D486", "#199F65", "#14213D"]}
                            height={200}
                            width={200}
                        />
                        <div className="categories">
                            {expenses.map((i, index) => <div className="category" key={index}><span className="category">{i.category}</span><span className="percentage">{((i.amount/expensesTotal)*100).toFixed(2)} %</span></div>)}
                        </div>

                    </div>
                </div>
            </div>
            <button onClick={() => navigate("/operations")}>Get back to operations</button>
        </div>
    </div>
}