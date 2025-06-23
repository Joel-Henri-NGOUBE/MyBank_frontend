import Company from "../Company/company";
import WhiteBank from "../../assets/whitebank.svg"
import "./header.css"
import { Link, useLocation } from "react-router";

export default function Header(){
    const location = useLocation()
    const path = location.pathname
    // const {unused, pathname, unused2} = location
    // console.log(location.pathname)
    return <div className="header">
        <Company
        svg={WhiteBank}
        length="60px"
        />
        <div className="links">
            <Link to="/operations" style={path === "/operations" ? {color: "var(--white)"} : {}}>operations</Link>
            <Link to="/management" style={path === "/management" ? {color: "var(--white)"} : {}}>management</Link>
            <Link to="/settings" style={path === "/settings" ? {color: "var(--white)"} : {}}>settings</Link>
        </div>
    </div>
}