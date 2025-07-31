import { useLocation, useNavigate, type NavigateFunction } from "react-router"
import type { ILoginSuccess } from "../../Interfaces/APIResponses"

    // const navigate : NavigateFunction = useNavigate()

    
export function getNavigationStatusParameters(): [NavigateFunction, string]{
    
    const location = useLocation()

    if(location.state) {
        const { token }: ILoginSuccess = location.state
        
        console.log(token)

        return [useNavigate(), token]
    
    }
    else{
        const token = ""

        return [useNavigate(), token]
    }

}