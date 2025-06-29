import Header from "../../Components/Header/header";
import Tablist from "../../Components/TabList/tablist";
import { PieChart } from '@mui/x-charts/PieChart';
import type { IOperation } from "../../Interfaces/operation";
import "./statistics.css"
import { useNavigate } from "react-router";

export default function Statistics(){

    const operations: IOperation[] = [
                            {label: "VIREMENT RECU DE: AIRBUS FRANCE SAS\nREF:FR2025:48:456355:34334:34", category: "salary", type: "income", amount: 1750, date: "29/05/2025"},
                            {label: "PAIEMENT CARTE J85475\nREF:FR2025:48:456355:34334:34", category: "courses", type: "expense", amount: 150.67, date: "29/05/2025"},
                            {label: "VIREMENT RECU DE: AIRBUS FRANCE SAS\nREF:FR2025:48:456355:34334:34", category: "payment", type: "income", amount: 170.98, date: "29/05/2025"},
                            {label: "PRELEVEMENT IMPÔT\nREF:FR2025:48:456355:34334:34", category: "tax", type: "expense", amount: 15.17, date: "29/05/2025"},
                            {label: "PRELEVEMENT SEPA ABONNEMENT\nREF:FR2025:48:456355:34334:34", category: "subscription", type: "expense", amount: 130.56, date: "29/05/2025"},
                    ]

    const incomes: IOperation[] = operations.filter(op => op.type === "income")
    const incomesTotal: number = incomes.reduce((acc, cur) => cur.amount + acc, 0)
    const incomeData: {label: string, value: number}[] = incomes.reduce((acc: {label: string, value: number}[], cur) => { 
                acc.push({label: cur.category.toUpperCase(), value: parseFloat(((cur.amount/incomesTotal)*100).toFixed(2))})
                return acc
            }, [])
    // console.log(incomeData)
    const expenses: IOperation[] = operations.filter(op => op.type === "expense")
    const expensesTotal: number = expenses.reduce((acc, cur) => cur.amount + acc, 0)
    const expenseData: {label: string, value: number}[] = expenses.reduce((acc: {label: string, value: number}[], cur) => { 
                acc.push({label: cur.category.toUpperCase(), value: parseFloat(((cur.amount/expensesTotal)*100).toFixed(2))})
                return acc
            }, [])

    const navigate : Function = useNavigate()


    function slide(){
        if(!(document.querySelector(".slider")as HTMLElement).classList.contains("slide")){
            (document.querySelector(".slider") as HTMLElement).classList.add("slide");

            (document.querySelector(".tablist .tab:nth-of-type(1)") as HTMLElement).classList.remove("clicked");
            (document.querySelector(".tablist .tab:nth-of-type(2)") as HTMLElement).classList.add("clicked")
            if((document.querySelector(".slider") as HTMLElement).classList.contains("slide-back")){
                (document.querySelector(".slider") as HTMLElement).classList.remove("slide-back");

            // (document.querySelector(".tablist .tab:nth-of-type(1)") as HTMLElement).classList.add("clicked");
            // (document.querySelector(".tablist .tab:nth-of-type(2)") as HTMLElement).classList.remove("clicked")
            }
            // console.log("Slide added")
        }
    }

    function slideBack(){
        if(!(document.querySelector(".slider") as HTMLElement).classList.contains("slide-back")){
            (document.querySelector(".slider") as HTMLElement).classList.add("slide-back");

            (document.querySelector(".tablist .tab:nth-of-type(1)") as HTMLElement).classList.add("clicked");
            (document.querySelector(".tablist .tab:nth-of-type(2)") as HTMLElement).classList.remove("clicked")

            if((document.querySelector(".slider") as HTMLElement).classList.contains("slide")){
                (document.querySelector(".slider") as HTMLElement).classList.remove("slide");

            // (document.querySelector(".tablist .tab:nth-of-type(1)") as HTMLElement).classList.add("clicked");
            // (document.querySelector(".tablist .tab:nth-of-type(2)") as HTMLElement).classList.remove("clicked")
            }
            // console.log("Slide Back added")
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