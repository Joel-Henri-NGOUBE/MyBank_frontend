import { screen, render } from "@testing-library/react"
import InputLabel from "./InputLabel"

describe("InputLabel tests", () => {
    it("should have label with the good id", async () => {

        render(<InputLabel
            label="Mail"
            placeholder="Mail address"
            type="text"
        />)

        expect(document.querySelector("label")).toHaveAttribute("for", "mail")
        expect(document.querySelector("label")).toHaveTextContent("Mail")

    })
    it("should have an input with corresponding attributes", async () => {

        render(<InputLabel
            label="Mail"
            placeholder="Mail address"
            type="text"
        />)

        const input = screen.getByRole("textbox")
        expect(input).toHaveAttribute("name", "mail")
        expect(input).toHaveAttribute("id", "mail")
        expect(input).toHaveAttribute("type", "text")
        expect(input).toHaveAttribute("placeholder", "Mail address")

    })
})