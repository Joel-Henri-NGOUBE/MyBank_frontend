import { fireEvent, render, screen } from "@testing-library/react"
import { MemoryRouter, Route, Routes } from "react-router"
import Authenticate from "../../../Pages/Authenticate/authenticate"
import Operations from "../../../Pages/Operations/operations"
import Management from "../../../Pages/Management/management"
import NewOrSetOperation from "../../../Pages/NewOrSetOperation/neworsetoperation"
import Statistics from "../../../Pages/Statistics/statistics"
import { setupServer } from "msw/node"
import { http, HttpResponse } from "msw"
import jwt from "jsonwebtoken"

// The definition of mocked API routes

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

describe("Signup tests", () => {
    it("Should have a span title", async () => {
        // Defining the router
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

        const spanTitle = document.querySelectorAll("span.title")

        expect(spanTitle[0]).toHaveTextContent("Sign Up")

    })
    it("Should have a button calling to action", async () => {
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

        const button = document.querySelectorAll("button")

        expect(button[0]).toHaveTextContent("Sign up")

    })
    it("Should change input values", async () => {
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

        const inputs : any = await document.querySelectorAll("input")

        fireEvent.change(inputs[0], {
            target: {
                value: "the@gmail.com"
            }
        })


        const content1 = await screen.findByDisplayValue("the@gmail.com")

        expect(content1).toBeInTheDocument()
        expect(content1).toBeVisible()

        const passwordInputs = document.querySelectorAll("input[type=password]")

        fireEvent.change(passwordInputs[0], {
            target: {
                value: "password"
            }
        })

        const content2 = await screen.findByDisplayValue("password")

        expect(content2).toBeInTheDocument()
        expect(content2).toBeVisible()

        fireEvent.change(passwordInputs[1], {
            target: {
                value: "password2"
            }
        })

        const content3 = await screen.findByDisplayValue("password2")

        expect(content3).toBeInTheDocument()
        expect(content3).toBeVisible()

    })
    
})