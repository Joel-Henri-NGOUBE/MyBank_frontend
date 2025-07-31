import { screen, render } from "@testing-library/react"
import Operations from "./operations"
import { Route, Routes, MemoryRouter } from "react-router";
import Authenticate from "../Authenticate/authenticate";
import Statistics from "../Statistics/statistics";
import Management from "../Management/management";
import NewOrSetOperation from "../NewOrSetOperation/neworsetoperation";

describe("Operations page tests", () => {
    it("should have a title", async () => {
        render(
            <MemoryRouter initialEntries={["/operations"]}>
                <Routes>
                    <Route path="/" element={<Authenticate />} />
                    <Route path="/operations" element={<Operations />} />
                    <Route path="/management" element={<Management />} />
                    <Route path="/neworsetoperation" element={<NewOrSetOperation />}>
                    <Route path="/neworsetoperation/:id" element={<NewOrSetOperation />} />
                    </Route>
                    <Route path="/statistics" element={<Statistics />} />
                </Routes>
            </MemoryRouter>
        )

        const title = document.querySelector(".page-title")

        expect(title).toHaveTextContent("Balance")

    })
    it("should have buttons calling to action", async () => {
        render(
            <MemoryRouter initialEntries={["/operations"]}>
                <Routes>
                    <Route path="/" element={<Authenticate />} />
                    <Route path="/operations" element={<Operations />} />
                    <Route path="/management" element={<Management />} />
                    <Route path="/neworsetoperation" element={<NewOrSetOperation />}>
                    <Route path="/neworsetoperation/:id" element={<NewOrSetOperation />} />
                    </Route>
                    <Route path="/statistics" element={<Statistics />} />
                </Routes>
            </MemoryRouter>
        )

        const button = document.querySelectorAll("button")

        expect(button[0]).toHaveTextContent("Add new operation")
        expect(button[1]).toHaveTextContent("Access statistics")

    })
})