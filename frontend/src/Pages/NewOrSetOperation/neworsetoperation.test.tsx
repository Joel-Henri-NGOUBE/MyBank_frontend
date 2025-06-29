import { screen, render } from "@testing-library/react"
import NewOrSetOperation from "./neworsetoperation"

import { Route, Routes, MemoryRouter } from "react-router";
import Authenticate from "../Authenticate/authenticate";
import Operations from "../Operations/operations";
import Settings from "../Settings/settings";
import Statistics from "../Statistics/statistics";
import Management from "../Management/management";

describe("Neworsetoperation page tests", () => {
    it("should have a title", async () => {
        render(
            <MemoryRouter initialEntries={["/neworsetoperation"]}>
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

        const title = screen.getByRole("heading", {
            level: 3
        })

        expect(title).toHaveTextContent("New operation")

    })
    it("should have buttons calling to action", async () => {
        render(
            <MemoryRouter initialEntries={["/neworsetoperation"]}>
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

        const button = document.querySelectorAll("button")

        expect(button[0]).toHaveTextContent("Get back to operations")
        expect(button[1]).toHaveTextContent("Save operation")

    })
})