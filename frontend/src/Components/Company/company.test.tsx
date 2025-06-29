import { screen, render } from "@testing-library/react"
import Company from "./company"
import GreenBank from "../../assets/greenbank.svg"

describe("Signin tests", () => {
    it("should have a logo of right dimension", async () => {
        render(<Company 
                svg={GreenBank}
                length="75px"
        />)

        expect(screen.getByRole("img")).toHaveAttribute("width", "75px")

    })
    it("should have a title", async () => {
        render(<Company 
                svg={GreenBank}
                length="75px"
        />)

        expect(screen.getByRole("heading")).toHaveTextContent("MyBank")

    })
})