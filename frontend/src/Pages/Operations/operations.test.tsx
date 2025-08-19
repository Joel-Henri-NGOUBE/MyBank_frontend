import { render, waitFor } from "@testing-library/react"
import Operations from "./operations"
import { Route, Routes, MemoryRouter } from "react-router";
import Authenticate from "../Authenticate/authenticate";
import Statistics from "../Statistics/statistics";
import Management from "../Management/management";
import NewOrSetOperation from "../NewOrSetOperation/neworsetoperation";
import type { IOperation } from "../../Interfaces/operation";
import { setupServer } from "msw/node";
import { http, HttpResponse } from "msw";
import jwt from "jsonwebtoken"
import { act } from "react";
import userEvent from "@testing-library/user-event";

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

describe("Operations page tests", () => {
    it("should have a title", async () => {
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

        const title = document.querySelector(".page-title")

        expect(title).toHaveTextContent("Balance")

    })
    it("should have tabs", async () => {
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

        const allTab = document.querySelector(".operations .tablist .all")

        expect(allTab).toBeVisible()
        expect(allTab).toBeInTheDocument()

        const incomesTab = document.querySelector(".operations .tablist .incomes")

        expect(incomesTab).toBeVisible()
        expect(incomesTab).toBeInTheDocument()

        const expensesTab = document.querySelector(".operations .tablist .expenses")

        expect(expensesTab).toBeVisible()
        expect(expensesTab).toBeInTheDocument()

        const categoriesTab = document.querySelector(".operations .tablist .categories")

        expect(categoriesTab).toBeVisible()
        expect(categoriesTab).toBeInTheDocument()

    })
    it("should have buttons calling to action", async () => {
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

        const button = document.querySelectorAll("button")

        expect(button[0]).toHaveTextContent("Add new operation")
        expect(button[1]).toHaveTextContent("Access statistics")

    })
    it("should redirect to Neworsetoperation fron the first button", async () => {
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

        const button = document.querySelectorAll("button")

        await userEvent.click(button[0])

        const newOrSetOperationDivContainer = await waitFor(() => document.querySelector(".neworsetoperation"))
        expect(newOrSetOperationDivContainer).toBeInTheDocument()
        expect(newOrSetOperationDivContainer).toBeVisible()

    })
    it("should redirect to Statistics fron the second button", async () => {
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

        const button = document.querySelectorAll("button")

        await userEvent.click(button[1])

        const statisticsDivContainer = await waitFor(() => document.querySelector(".statistics"))
        expect(statisticsDivContainer).toBeInTheDocument()
        expect(statisticsDivContainer).toBeVisible()

    })
})