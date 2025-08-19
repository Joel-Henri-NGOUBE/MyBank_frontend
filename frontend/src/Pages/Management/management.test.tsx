import { render, act } from "@testing-library/react"
import userEvent from "@testing-library/user-event";

import { Route, Routes, MemoryRouter } from "react-router";
import Authenticate from "../Authenticate/authenticate";
import Operations from "../Operations/operations";
import Management from "./management";
import NewOrSetOperation from "../NewOrSetOperation/neworsetoperation";
import Statistics from "../Statistics/statistics";
import { http, HttpResponse } from "msw";
import jwt from "jsonwebtoken";
import { setupServer } from "msw/node";

// The definition of mocked API routes

const server = setupServer(
    http.post([`${import.meta.env.VITE_APP_BACKEND_API_URL}`, "/api/id"].join(""), async () => {
        return HttpResponse.json(
                {
                    id: 1
                },
                {
                    status: 200
                }
            )
        }
    ),
)

beforeAll(
    () => {
        server.listen()
    }
)

afterEach(
    () => {
        server.resetHandlers()
    }
)
afterAll(
    () => {
        server.close()
    }
)

const token = jwt.sign({email: "this@gmail.com"},"THESECRETTOSIGN")
localStorage.setItem("token", token)

describe("Management page tests", async () => {
    it("should hide default management interface and display tracking interface", async () => {
        // Awaiting the router for permitting the requests to reach the API routes before the application is rendered 
        await act(async () => render(
            <MemoryRouter initialEntries={["/management"]}>
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
        ))
        
        const divActions = document.querySelector("div.actions")

        expect(divActions).toBeVisible()

        const tracking = document.querySelector(".tracking")
        
        tracking && await userEvent.click(tracking)
        
        expect(document.querySelector("#tracking")).toBeVisible()

        expect(divActions).not.toBeVisible()

    })
    it("should hide default management interface and display investing interface", async () => {

        await act(async () => render(
            <MemoryRouter initialEntries={["/management"]}>
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
        ))

        const divActions = document.querySelector("div.actions")

        expect(divActions).toBeVisible()
        
        const investing = document.querySelector(".investing")

        // As the actions and the investing subpage don't appear at the same time ont the page
        
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

        // As the actions and the saving subpage don't appear at the same time ont the page
        
        saving && await userEvent.click(saving)
        
        expect(document.querySelector("#saving")).toBeVisible()
        
        expect(divActions).not.toBeVisible()

    })
})