export interface IOperation{
    id: number,
    label: string,
    category: string,
    amount: number,
    type: "INCOME" | "EXPENSE"
}