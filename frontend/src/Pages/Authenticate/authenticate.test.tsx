import { screen, render } from "@testing-library/react"
import { Route, Routes, MemoryRouter } from "react-router";
import Authenticate from "./authenticate"
import Operations from "../Operations/operations";
import NewOrSetOperation from "../NewOrSetOperation/neworsetoperation";
import Statistics from "../Statistics/statistics";
import Management from "../Management/management";
import { setupServer } from "msw/node";
import { http, HttpResponse } from "msw";

const server = setupServer(
    http.post([`${import.meta.env.VITE_APP_BACKEND_API_URL}`, "/api/id"].join(""), () => {
        return HttpResponse.json(
            {
                message: "Expired JWT token"
            }
        )
    })
)

describe("Authenticate page tests", () => {
    it("should have 2 logos", async () => {

        render(
            <MemoryRouter initialEntries={["/"]}>
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

        expect(document.querySelectorAll("div.company").length).toBe(2)

    })
    it("should have 2 inputs div", async () => {

        render(
            <MemoryRouter initialEntries={["/"]}>
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

        expect(document.querySelectorAll("div.inputs").length).toBe(2)

    })
})