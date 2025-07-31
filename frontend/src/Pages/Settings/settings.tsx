import Header from "../../Components/Header/header";
import { getNavigationStatusParameters } from "../Utils/getNavigationStateParameters";
import { useId } from "../Utils/useId";
import "./settings.css"

export default function Settings(){

    const [navigate, token] = getNavigationStatusParameters()

    const id = useId(token, navigate)

    return <div className="settings">
        <Header />
    </div>
}