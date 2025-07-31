import { jwtDecode } from "jwt-decode"
import { useEffect, useState, type Dispatch, type SetStateAction } from "react"
import type { NavigateFunction } from "react-router"

export function useId(token: string, navigate: NavigateFunction): [number, Dispatch<SetStateAction<number>>]{
    const [id, setId] = useState<number>(0)
    
    console.log(token && jwtDecode(token))
    
    useEffect(() => {
        token &&
        fetch([`${import.meta.env.VITE_APP_BACKEND_API_URL}`, "/api/id"].join(""), {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        email: token ? (jwtDecode(token) as any).username : ""
                    })
                })
        .then(res => {
            (!res.status.toString().startsWith("2")) && navigate("/")
            return res.json()
        })
        .then((res: {id: number}) => {
            setId(res.id)
        })
    }, [])

    return [id, setId]
}