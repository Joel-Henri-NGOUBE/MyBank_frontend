import { render, act, waitFor } from "@testing-library/react"
import { MemoryRouter, Route, Routes } from "react-router"
import Authenticate from "../../../Pages/Authenticate/authenticate"
import Operations from "../../../Pages/Operations/operations"
import Management from "../../../Pages/Management/management"
import NewOrSetOperation from "../../../Pages/NewOrSetOperation/neworsetoperation"
import Statistics from "../../../Pages/Statistics/statistics"
import userEvent from "@testing-library/user-event"
import { setupServer } from "msw/node"
import { http, HttpResponse } from "msw"
import jwt from "jsonwebtoken"

const server = setupServer(
    http.get([`${import.meta.env.VITE_APP_BACKEND_API_URL}`, "/api/users/:id/operations"].join(""), async () => {
        return HttpResponse.json(
                {
                    member: {}
                },
                {
                    status: 200
                }
            )
        }
    ),
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

describe("ManagementComponents tests", () => {
    it("Should have Tracking as the active page", async () => {

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

        const managementActionsDiv = document.querySelector(".management .actions")
        
        const managementActions = await waitFor(() => document.querySelectorAll(".management .actions > *"))

        await userEvent.click(managementActions[0])

        expect(managementActionsDiv).not.toBeInTheDocument()
        
        const tracking = document.querySelector(".tracking")
        
        const managementHeader= document.querySelector(".managementHeader")
        
        expect(tracking).toBeInTheDocument()
        expect(tracking).toBeVisible()
        expect(managementHeader).toBeInTheDocument()
        expect(managementHeader).toBeVisible()

    })
})