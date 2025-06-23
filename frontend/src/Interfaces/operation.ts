export interface IOperation{
    label: string,
    category: string,
    amount: number,
    type: "income" | "expense"
    date: string
}