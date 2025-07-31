import Company from "../Company/company";
import WhiteBank from "../../assets/whitebank.svg"
import "./header.css"
import { Link, useLocation } from "react-router";
import type { MouseEvent } from "react";

export default function Header(){
    const location = useLocation()
    const path = location.pathname
    // const {unused, pathname, unused2} = location
    // console.log(location.pathname)
    function handleLogout(e: any){
        const localToken = localStorage.getItem("token")
        e.preventDefault()
        fetch([`${import.meta.env.VITE_APP_BACKEND_API_URL}`, "/logout"].join(""), {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localToken}`
            }
        })
    }

    return <div className="header">
        <Company
        svg={WhiteBank}
        length="60px"
        />
        <div className="links">
            <Link to="/operations" style={path === "/operations" ? {color: "var(--white)"} : {}}>operations</Link>
            <Link to="/management" style={path === "/management" ? {color: "var(--white)"} : {}}>management</Link>
            <a href="" onClick={(e: any) => {handleLogout(e)}}>logout</a>
            {/* <Link to="/settings" style={path === "/settings" ? {color: "var(--white)"} : {}}>settings</Link> */}
        </div>
    </div>
}