import { act, fireEvent, render, screen } from "@testing-library/react"
import { MemoryRouter, Route, Routes } from "react-router"
import Authenticate from "../../../Pages/Authenticate/authenticate"
import Operations from "../../../Pages/Operations/operations"
import Management from "../../../Pages/Management/management"
import NewOrSetOperation from "../../../Pages/NewOrSetOperation/neworsetoperation"
import Statistics from "../../../Pages/Statistics/statistics"
import { setupServer } from "msw/node"
import { http, HttpResponse } from "msw"
import jwt from "jsonwebtoken"

const server = setupServer(
    http.post([`${import.meta.env.VITE_APP_BACKEND_API_URL}`, "/api/id"].join(""), async ({request}) => {
        const credentials = await request.json()
        const { email, password } : any = credentials
        if(email === "this@gmail.com" && password === "password"){
            return HttpResponse.json(
                {
                    message: "User successfully created"
                }, {
                    status: 200
                }
            )
        }
        return HttpResponse.json(
            {
                message: "Invalid credentials"
            }, {
                status: 401
            }
        )
    }),
    http.post([`${import.meta.env.VITE_APP_BACKEND_API_URL}`, "/signup"].join(""), async ({request}) => {
        const credentials = await request.json()
        const { email, password } : any = credentials
        if(email === "this@gmail.com" && password === "password"){
            return HttpResponse.json(
                {
                    message: "User successfully created"
                }, {
                    status: 200
                }
            )
        }
        return HttpResponse.json(
            {
                message: "Invalid credentials"
            }, {
                status: 401
            }
        )
    })
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
    it("should have a span title", async () => {
        await act(async () => render(
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
        ))

        const spanTitle = document.querySelectorAll("span.title")

        expect(spanTitle[1]).toHaveTextContent("Sign In")

    })
    it("should have a button calling to action", async () => {
        await act(async () => render(
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
        ))

        const button = document.querySelectorAll("button")

        expect(button[1]).toHaveTextContent("Sign in")

    })
    it("Should change input values", async () => {
        await act(async () => render(
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
        ))

        const inputs : any = await document.querySelectorAll("input")

        fireEvent.change(inputs[0], {
            target: {
                value: "the@gmail.com"
            }
        })


        let content = await screen.findByDisplayValue("the@gmail.com")

        expect(content).toBeInTheDocument()
        expect(content).toBeVisible()

        fireEvent.change(inputs[1], {
            target: {
                value: "password"
            }
        })

        content = await screen.findByDisplayValue("password")

        expect(content).toBeInTheDocument()
        expect(content).toBeVisible()

    })
    it("Should not generate an error", async () => {
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

        const button = document.querySelector("button")

        fireEvent.click((button as HTMLElement))

    })
})