import { screen, render } from "@testing-library/react"
import InputSelect from "./InputSelect"

describe("InputSelect tests", () => {
    it("should have label with the good id", async () => {

        render(<InputSelect
            label="Mail"
            options={["yahoo", "gmail", "outlook", "hotmail"]}
        />)

        expect(document.querySelector("label")).toHaveAttribute("for", "mail")
        expect(document.querySelector("label")).toHaveTextContent("Mail")

    })
    it("should have all the good attributes and options ", async () => {

        render(<InputSelect
            label="Mail"
            options={["default value","yahoo", "gmail", "outlook", "hotmail"]}
        />)

        const select = screen.getByRole("combobox")
        expect(select).toHaveAttribute("name", "mail")
        expect(select).toHaveAttribute("id", "mail")

        const options = screen.getAllByRole("option")
        
        expect(options[0]).toHaveAttribute("value", "")
        expect(options[1]).toHaveAttribute("value", "yahoo")
        expect(options[2]).toHaveAttribute("value", "gmail")
        expect(options[3]).toHaveAttribute("value", "outlook")
        expect(options[4]).toHaveAttribute("value", "hotmail")
        // options.forEach((op) => {
        // })
        // expect(option).toHaveAttribute("type", "text")
        // expect(option).toHaveAttribute("placeholder", "Mail address")

    })
})