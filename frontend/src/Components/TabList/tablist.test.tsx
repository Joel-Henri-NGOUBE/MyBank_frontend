import { render } from "@testing-library/react"
import Tablist from "./tablist"

describe("InputSelect tests", () => {
    it("should have the right number of tabs", async () => {

        render(<Tablist
            tabs={[{tab: "Transaction 1", onclick: () => {}}, {tab: "Transaction 2", onclick: () => {}}, {tab: "Transaction 3", onclick: () => {}}]}
        />)

        expect(document.querySelectorAll("span.tab").length).toBe(3)

    })
    it("should have the right tabs' names ", async () => {

        render(<Tablist
            tabs={[{tab: "Transaction 1", onclick: () => {}}, {tab: "Transaction 2", onclick: () => {}}, {tab: "Transaction 3", onclick: () => {}}]}
        />)

        const tabs = document.querySelectorAll("span.tab")
        
        expect(tabs[0]).toHaveTextContent("Transaction 1")
        expect(tabs[1]).toHaveTextContent("Transaction 2")
        expect(tabs[2]).toHaveTextContent("Transaction 3")

    })
})