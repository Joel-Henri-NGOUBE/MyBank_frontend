/**
 * Groups objects by the category key
 * @param {*} arrayToGroup
 * @returns an array
 */
export function groupify(arrayToGroup){
    const groups = Object.groupBy(arrayToGroup, ({category}) => category)
    console.log(arrayToGroup)
    console.log(groups)
    let array = []
    for (let key in groups) {
        array.push(groups[key].reduce(
            (acc, cur) => ({...acc, amount: acc.amount + cur.amount})
            , {...groups[key][0], amount: 0}
        ))}
    // console.log(array)
    return array
}

/**
 * Activates the animations that display the Expense tab
 */
export function slide(){
    if(!(document.querySelector(".slider")).classList.contains("slide")){
        (document.querySelector(".slider") ).classList.add("slide");

        (document.querySelector(".tablist .tab:nth-of-type(1)") ).classList.remove("clicked");
        (document.querySelector(".tablist .tab:nth-of-type(2)") ).classList.add("clicked")
        if((document.querySelector(".slider") ).classList.contains("slide-back")){
            (document.querySelector(".slider") ).classList.remove("slide-back");
        }
    }
}

    
/**
 * Activates the animations that display the Income tab
 */
export function slideBack(){
    if(!(document.querySelector(".slider")).classList.contains("slide-back")){
        (document.querySelector(".slider")).classList.add("slide-back");

        (document.querySelector(".tablist .tab:nth-of-type(1)")).classList.add("clicked");
        (document.querySelector(".tablist .tab:nth-of-type(2)")).classList.remove("clicked")

        if((document.querySelector(".slider")).classList.contains("slide")){
            (document.querySelector(".slider")).classList.remove("slide");
        }
    }
}
