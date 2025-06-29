import { render } from "@testing-library/react"
import { MemoryRouter, Route, Routes } from "react-router"
import Authenticate from "../../../Pages/Authenticate/authenticate"
import Operations from "../../../Pages/Operations/operations"
import Management from "../../../Pages/Management/management"
import Settings from "../../../Pages/Settings/settings"
import NewOrSetOperation from "../../../Pages/NewOrSetOperation/neworsetoperation"
import Statistics from "../../../Pages/Statistics/statistics"

describe("Signin tests", () => {
    it("should have a span title", async () => {
        render(
            <MemoryRouter initialEntries={["/"]}>
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

        const spanTitle = document.querySelectorAll("span.title")

        expect(spanTitle[0]).toHaveTextContent("Sign Up")

    })
    it("should have a button calling to action", async () => {
        render(
            <MemoryRouter initialEntries={["/"]}>
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

        expect(button[0]).toHaveTextContent("Sign up")

    })
})