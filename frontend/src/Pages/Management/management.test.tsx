import { screen, render } from "@testing-library/react"
import userEvent from "@testing-library/user-event";

// import Authenticate from "./authenticate"
// import Management from "./management"
import { Route, Routes, MemoryRouter } from "react-router";
import Authenticate from "../Authenticate/authenticate";
import Operations from "../Operations/operations";
import Management from "./management";
import Settings from "../Settings/settings";
import NewOrSetOperation from "../NewOrSetOperation/neworsetoperation";
import Statistics from "../Statistics/statistics";

describe("Management page tests", async () => {
    it("should hide default management interface and display tracking interface", async () => {

        render(
            <MemoryRouter initialEntries={["/management"]}>
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
        
        const divActions = document.querySelector("div.actions")

        expect(divActions).toBeVisible()

        const tracking = document.querySelector(".tracking")
        
        tracking && await userEvent.click(tracking)
        
        expect(document.querySelector("#tracking")).toBeVisible()

        expect(divActions).not.toBeVisible()

    })
    it("should hide default management interface and display investing interface", async () => {

        render(
            <MemoryRouter initialEntries={["/management"]}>
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

        const divActions = document.querySelector("div.actions")

        expect(divActions).toBeVisible()
        
        const investing = document.querySelector(".investing")
        
        investing && await userEvent.click(investing)
        
        expect(document.querySelector("#investing")).toBeVisible()
        
        expect(divActions).not.toBeVisible()

    })
    it("should hide default management interface and display saving interface", async () => {

        render(
            <MemoryRouter initialEntries={["/management"]}>
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

        const divActions = document.querySelector("div.actions")

        expect(divActions).toBeVisible()
        
        const saving = document.querySelector(".saving")
        
        saving && await userEvent.click(saving)
        
        expect(document.querySelector("#saving")).toBeVisible()
        
        expect(divActions).not.toBeVisible()

    })
})