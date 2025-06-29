import"./tablist.css"

export default function Tablist({tabs}: {tabs: {tab: string, onclick: Function}[]}){
    return <div className="tablist">        
        {tabs.map((t, i) => <span className={i === 0 ? `tab ${t.tab} clicked` : `tab ${t.tab}`} key={i} onClick={() => t.onclick()}>{t.tab}</span>)}
    </div>
}