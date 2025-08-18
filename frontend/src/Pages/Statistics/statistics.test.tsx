import { act, render, waitFor } from "@testing-library/react"
import Statistics from "./statistics"
import { Route, Routes, MemoryRouter } from "react-router";
import Authenticate from "../Authenticate/authenticate";
import Management from "../Management/management";
import NewOrSetOperation from "../NewOrSetOperation/neworsetoperation";
import Operations from "../Operations/operations";
import jwt from "jsonwebtoken"
import type { IOperation } from "../../Interfaces/operation";
import { setupServer } from "msw/node";
import { http, HttpResponse } from "msw";
import userEvent from "@testing-library/user-event";

const operations: IOperation[] = [
        {label: "VIREMENT RECU DE: AIRBUS FRANCE SAS\nREF:FR2025:48:456355:34334:34", category: "salary", type: "INCOME", amount: 1750, id: 1},
        {label: "PAIEMENT CARTE J85475\nREF:FR2025:48:456355:34334:34", category: "courses", type: "EXPENSE", amount: 150.67, id: 2},
        {label: "VIREMENT RECU DE: AIRBUS FRANCE SAS\nREF:FR2025:48:456355:34334:34", category: "payment", type: "INCOME", amount: 170.98, id: 3},
        {label: "PRELEVEMENT IMPÔT\nREF:FR2025:48:456355:34334:34", category: "tax", type: "EXPENSE", amount: 15.17, id: 4},
        {label: "PRELEVEMENT SEPA ABONNEMENT\nREF:FR2025:48:456355:34334:34", category: "subscription", type: "EXPENSE", amount: 130.56, id: 5},
    ]

const server = setupServer(
    http.get([`${import.meta.env.VITE_APP_BACKEND_API_URL}`, "/api/users/:id/operations"].join(""), async ({request, params}) => {
        const { id } = params
        console.log(id)
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

describe("Statistics page tests", () => {
    it("should have a title", async () => {
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

        const title = document.querySelector(".page-title")

        const subtitle = document.querySelector(".page-subtitle")

        expect(title).toHaveTextContent("Statistics")
        
        expect(subtitle).toHaveTextContent("Total")

    })
    it("should have a button calling to action", async () => {
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

        const button = document.querySelector("button")

        expect(button).toHaveTextContent("Get back to operations")

    })
    it("should redirect to Operations fron the button", async () => {
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

        const button = document.querySelector("button")

        button && await userEvent.click(button)

        const operationDivContainer = await waitFor(() => document.querySelector(".operations"))
        expect(operationDivContainer).toBeInTheDocument()
        expect(operationDivContainer).toBeVisible()

    })
})