import Company from "../Company/company";
import WhiteBank from "../../assets/whitebank.svg"
import "./header.css"
import { Link } from "react-router";

export default function Header(){
    return <div className="header">
        <Company
        svg={WhiteBank}
        length="60px"
        />
        <div className="links">
            <Link to="/operations">operations</Link>
            <Link to="/management">management</Link>
            <Link to="/settings">settings</Link>
        </div>
    </div>
}