import { act, render, waitFor } from "@testing-library/react"
import type { IOperation } from "../../Interfaces/operation"
import { MemoryRouter, Route, Routes } from "react-router"
import Authenticate from "../../Pages/Authenticate/authenticate"
import Operations from "../../Pages/Operations/operations"
import Management from "../../Pages/Management/management"
import NewOrSetOperation from "../../Pages/NewOrSetOperation/neworsetoperation"
import Statistics from "../../Pages/Statistics/statistics"
import { setupServer } from "msw/node"
import { http, HttpResponse } from "msw"
import jwt from "jsonwebtoken"

const operations: IOperation[] = [
        {label: "VIREMENT RECU DE: AIRBUS FRANCE SAS\nREF:FR2025:48:456355:34334:34", category: "salary", type: "INCOME", amount: 1750, id: 1},
        {label: "PAIEMENT CARTE J85475\nREF:FR2025:48:456355:34334:34", category: "courses", type: "EXPENSE", amount: 150.67, id: 2},
        {label: "VIREMENT RECU DE: AIRBUS FRANCE SAS\nREF:FR2025:48:456355:34334:34", category: "payment", type: "INCOME", amount: 170.98, id: 3},
        {label: "PRELEVEMENT IMPÔT\nREF:FR2025:48:456355:34334:34", category: "tax", type: "EXPENSE", amount: 15.17, id: 4},
        {label: "PRELEVEMENT SEPA ABONNEMENT\nREF:FR2025:48:456355:34334:34", category: "subscription", type: "EXPENSE", amount: 130.56, id: 5},
    ]

// The definition of mocked API routes

const server = setupServer(
    http.get([`${import.meta.env.VITE_APP_BACKEND_API_URL}`, "/api/users/:id/operations"].join(""), async () => {
        return HttpResponse.json(
                {
                    member: operations
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

describe("Signin tests", () => {
    it("Should have the good number of visible Operation Components", async () => {
        // Awaiting the router for permitting the requests to reach the API routes before the application is rendered 
        await act(async () => render(
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
        ))

        const allOperations = await waitFor(() => document.querySelectorAll(".operations .all .operation"))
        const incomeOperations = await waitFor(() => document.querySelectorAll(".operations .incomes .operation"))
        const expenseOperations = await waitFor(() => document.querySelectorAll(".operations .expenses .operation"))

        // As there are 5 operations defined in the top
        expect(allOperations.length).toBe(5)
        
        // As there are 2 income operations defined in the top
        expect(incomeOperations.length).toBe(2)

        // As there are 3 expense operations defined in the top
        expect(expenseOperations.length).toBe(3)

    })
})