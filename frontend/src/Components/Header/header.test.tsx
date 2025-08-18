import { render, act, waitFor } from "@testing-library/react"
import { MemoryRouter, Route, Routes } from "react-router"
import Authenticate from "../../Pages/Authenticate/authenticate"
import Operations from "../../Pages/Operations/operations"
import Management from "../../Pages/Management/management"
import NewOrSetOperation from "../../Pages/NewOrSetOperation/neworsetoperation"
import Statistics from "../../Pages/Statistics/statistics"
import { setupServer } from "msw/node"
import { http, HttpResponse } from "msw"
import userEvent from "@testing-library/user-event"
import jwt from "jsonwebtoken"
import type { IOperation } from "../../Interfaces/operation"

const operations: IOperation[] = [
        {label: "VIREMENT RECU DE: AIRBUS FRANCE SAS\nREF:FR2025:48:456355:34334:34", category: "salary", type: "INCOME", amount: 1750, id: 1},
        {label: "PAIEMENT CARTE J85475\nREF:FR2025:48:456355:34334:34", category: "courses", type: "EXPENSE", amount: 150.67, id: 2},
        {label: "VIREMENT RECU DE: AIRBUS FRANCE SAS\nREF:FR2025:48:456355:34334:34", category: "payment", type: "INCOME", amount: 170.98, id: 3},
        {label: "PRELEVEMENT IMPÔT\nREF:FR2025:48:456355:34334:34", category: "tax", type: "EXPENSE", amount: 15.17, id: 4},
        {label: "PRELEVEMENT SEPA ABONNEMENT\nREF:FR2025:48:456355:34334:34", category: "subscription", type: "EXPENSE", amount: 130.56, id: 5},
    ]

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

describe("Header tests", () => {
    it("Should redirect to Operations", async () => {
        await act(async () => render(
        <MemoryRouter initialEntries={["/statistics"]}>
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

        const statisticsDivContainer = document.querySelector(".statistics")

        expect(statisticsDivContainer).toBeInTheDocument()
        expect(statisticsDivContainer).toBeVisible()


        const links = await waitFor(() => document.querySelectorAll(".links a"))

        await userEvent.click(links[0])

        const operationsDivContainer = document.querySelector(".operations")

        expect(operationsDivContainer).toBeInTheDocument()
        expect(operationsDivContainer).toBeVisible()

    })
    it("Should redirect to Management", async () => {
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

        const statisticsDivContainer = document.querySelector(".operations")

        expect(statisticsDivContainer).toBeInTheDocument()
        expect(statisticsDivContainer).toBeVisible()

        const links = await waitFor(() =>  document.querySelectorAll(".links a"))

        await userEvent.click(links[1])

        const operationsDivContainer = document.querySelector(".management")

        expect(operationsDivContainer).toBeInTheDocument()
        expect(operationsDivContainer).toBeVisible()

    })
    it("Should redirect to Authenticate", async () => {
        await act(async () => render(
        <MemoryRouter initialEntries={["/neworsetoperation"]}>
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

        const statisticsDivContainer = document.querySelector(".neworsetoperation")

        expect(statisticsDivContainer).toBeInTheDocument()
        expect(statisticsDivContainer).toBeVisible()

        const links = await waitFor(() => document.querySelectorAll(".links a"))

        await userEvent.click(links[2])

        const operationsDivContainer = document.querySelector("div.authenticate")

        expect(operationsDivContainer).toBeInTheDocument()
        expect(operationsDivContainer).toBeVisible()

    })
})