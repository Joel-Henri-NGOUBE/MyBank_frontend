import "./company.css"

export default function Company({svg, length}: {svg: string, length: string}){
    return <div className="company">
                <img src={svg} alt="MyBank" width={length}/>
                <h1>MyBank</h1>
            </div>
}