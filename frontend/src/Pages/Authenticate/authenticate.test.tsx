import { screen, render } from "@testing-library/react"
import { Route, Routes, MemoryRouter } from "react-router";
import Authenticate from "./authenticate"
// import Authenticate from "../Authenticate/authenticate";
import Operations from "../Operations/operations";
// import Management from "./management";
import Settings from "../Settings/settings";
import NewOrSetOperation from "../NewOrSetOperation/neworsetoperation";
import Statistics from "../Statistics/statistics";
import Management from "../Management/management";

describe("Authenticate page tests", () => {
    it("should have 2 logos", async () => {

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

        expect(document.querySelectorAll("div.company").length).toBe(2)

    })
    it("should have 2 inputs div", async () => {

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

        expect(document.querySelectorAll("div.inputs").length).toBe(2)

    })
})