import Company from "../Company/company";
import WhiteBank from "../../assets/whitebank.svg"
import "./header.css"
import { Link, useLocation, useNavigate, type NavigateFunction } from "react-router";

export default function Header(){
    const location = useLocation()
    const path = location.pathname

    const navigate: NavigateFunction = useNavigate()
    function handleLogout(e: any){
        e.preventDefault()
        localStorage.removeItem("token")
        navigate("/")
    }

    return <div className="header">
        <Company
        svg={WhiteBank}
        length="60px"
        />
        <div className="links">
            <Link to="/operations" style={path === "/operations" ? {color: "var(--white)"} : {}}>operations</Link>
            <Link to="/management" style={path === "/management" ? {color: "var(--white)"} : {}}>management</Link>
            <a href="" onClick={(e) => {handleLogout(e)}}>logout</a>
        </div>
    </div>
}