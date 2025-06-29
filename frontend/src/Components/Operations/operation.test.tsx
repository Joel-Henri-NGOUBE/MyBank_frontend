import { screen, render } from "@testing-library/react"
import Operation from "./operation"
import type { IOperation } from "../../Interfaces/operation"

describe("Signin tests", () => {
    it("should have a category span", async () => {
        let operation: IOperation = {label: "VIREMENT RECU", category: "salary", type: "income", amount: 1750, date: "29/05/2025"}
        
        render(<Operation
            operation={operation}
        />)

        expect(document.querySelector("span.category")).toHaveTextContent("salary")

    })
    it("should have a label paragraph", async () => {
        let operation: IOperation = {label: "VIREMENT RECU", category: "salary", type: "income", amount: 1750, date: "29/05/2025"}
        
        render(<Operation
            operation={operation}
        />)

        expect(document.querySelector("p.label")).toHaveTextContent("VIREMENT RECU")

    })
    it("should have span with positive amount ", async () => {
        let operation: IOperation = {label: "VIREMENT RECU", category: "salary", type: "income", amount: 1750, date: "29/05/2025"}
        
        render(<Operation
            operation={operation}
        />)

        expect(document.querySelector("span.amount")).toHaveTextContent("1750 €")

    })
    it("should have span with negative amount ", async () => {
        let operation: IOperation = {label: "Taxing", category: "tax", type: "expense", amount: 50, date: "29/05/2025"}
        
        render(<Operation
            operation={operation}
        />)

        expect(document.querySelector("span.amount")).toHaveTextContent("- 50 €")

    })
})