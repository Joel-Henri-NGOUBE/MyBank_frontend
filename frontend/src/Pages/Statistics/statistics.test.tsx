import { screen, render } from "@testing-library/react"
import Statistics from "./statistics"
import { Route, Routes, MemoryRouter } from "react-router";
import Authenticate from "../Authenticate/authenticate";
import Settings from "../Settings/settings";
import Management from "../Management/management";
import NewOrSetOperation from "../NewOrSetOperation/neworsetoperation";
import Operations from "../Operations/operations";

describe("Statistics page tests", () => {
    it("should have a title", async () => {
        render(
            <MemoryRouter initialEntries={["/statistics"]}>
                <Routes>
                    <Route path="/" element={<Authenticate />} />
                    <Route path="/operations" element={<Operations />} />
                    <Route path="/management" element={<Management />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/neworsetoperation" element={<NewOrSetOperation />}>
                    <Route path="/neworsetoperation/:id" element={<NewOrSetOperation />} />
                    </Route>
                    <Route path="/statistics" element={<Statistics />} />
                </Routes>
            </MemoryRouter>
        )

        const title = document.querySelector(".page-title")

        const subtitle = document.querySelector(".page-subtitle")

        expect(title).toHaveTextContent("Statistics")
        
        expect(subtitle).toHaveTextContent("Total")

    })
    it("should have a button calling to action", async () => {
        render(
            <MemoryRouter initialEntries={["/statistics"]}>
                <Routes>
                    <Route path="/" element={<Authenticate />} />
                    <Route path="/operations" element={<Operations />} />
                    <Route path="/management" element={<Management />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/neworsetoperation" element={<NewOrSetOperation />}>
                    <Route path="/neworsetoperation/:id" element={<NewOrSetOperation />} />
                    </Route>
                    <Route path="/statistics" element={<Statistics />} />
                </Routes>
            </MemoryRouter>
        )

        const button = document.querySelector("button")

        expect(button).toHaveTextContent("Get back to operations")

    })
})