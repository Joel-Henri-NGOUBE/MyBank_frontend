const allSlides: string[] = ["slideFromIncomesToAll","slideFromExpensesToAll","slideFromCategoriesToAll","slideFromAllToIncomes","slideFromExpensesToIncomes","slideFromCategoriesToIncomes","slideFromIncomesToExpenses","slideFromAllToExpenses","slideFromCategoriesToExpenses","slideFromIncomesToCategories","slideFromExpensesToCategories","slideFromAllToCategories"]

/**
 * Generates the animations to slide to the All tab
 */
export function slideToAll(){
    
    if((document.querySelector(".clicked") as HTMLElement).classList.contains("incomes")){
        // Suppresses the class associated to the slide animation on all the tabs
        allSlides.forEach(aS => {
            (document.querySelector(".operations-wrapper") as HTMLElement).classList.remove(aS);
        });
        // Adds the class associated to the slide animation on the appropriate tab (the clicked tab)
        (document.querySelector(".operations-wrapper") as HTMLElement).classList.add("slideFromIncomesToAll");
        
    }
    if((document.querySelector(".clicked") as HTMLElement).classList.contains("expenses")){
        allSlides.forEach(aS => {
            (document.querySelector(".operations-wrapper") as HTMLElement).classList.remove(aS);
        });
        (document.querySelector(".operations-wrapper") as HTMLElement).classList.add("slideFromExpensesToAll");
        
    }
    if((document.querySelector(".clicked") as HTMLElement).classList.contains("categories")){
        allSlides.forEach(aS => {
            (document.querySelector(".operations-wrapper") as HTMLElement).classList.remove(aS);
        });
        (document.querySelector(".operations-wrapper") as HTMLElement).classList.add("slideFromCategoriesToAll");

    }
    (document.querySelector(".clicked") as HTMLElement).classList.remove("clicked");
    (document.querySelector("span.all") as HTMLElement).classList.add("clicked");
    
}

/**
 * Generates the animations to slide to the Incomes tab
 */
export function slideToIncomes(){
    if((document.querySelector(".clicked") as HTMLElement).classList.contains("all")){
        allSlides.forEach(aS => {
            (document.querySelector(".operations-wrapper") as HTMLElement).classList.remove(aS);
        });
        (document.querySelector(".operations-wrapper") as HTMLElement).classList.add("slideFromAllToIncomes");

    }
    if((document.querySelector(".clicked") as HTMLElement).classList.contains("expenses")){
        allSlides.forEach(aS => {
            (document.querySelector(".operations-wrapper") as HTMLElement).classList.remove(aS);
        });
        (document.querySelector(".operations-wrapper") as HTMLElement).classList.add("slideFromExpensesToIncomes");

    }
    if((document.querySelector(".clicked") as HTMLElement).classList.contains("categories")){
        allSlides.forEach(aS => {
            (document.querySelector(".operations-wrapper") as HTMLElement).classList.remove(aS);
        });
        (document.querySelector(".operations-wrapper") as HTMLElement).classList.add("slideFromCategoriesToIncomes");

    }
    (document.querySelector(".clicked") as HTMLElement).classList.remove("clicked");
    (document.querySelector("span.incomes") as HTMLElement).classList.add("clicked");
}

/**
 * Generates the animations to slide to the Expenses tab
 */
export function slideToExpenses(){

    if((document.querySelector(".clicked") as HTMLElement).classList.contains("incomes")){
        allSlides.forEach(aS => {
            (document.querySelector(".operations-wrapper") as HTMLElement).classList.remove(aS);
        });
        (document.querySelector(".operations-wrapper") as HTMLElement).classList.add("slideFromIncomesToExpenses");
    }
    if((document.querySelector(".clicked") as HTMLElement).classList.contains("all")){
        allSlides.forEach(aS => {
            (document.querySelector(".operations-wrapper") as HTMLElement).classList.remove(aS);
        });
        (document.querySelector(".operations-wrapper") as HTMLElement).classList.add("slideFromAllToExpenses");
    }
    if((document.querySelector(".clicked") as HTMLElement).classList.contains("categories")){
        allSlides.forEach(aS => {
            (document.querySelector(".operations-wrapper") as HTMLElement).classList.remove(aS);
        });
        (document.querySelector(".operations-wrapper") as HTMLElement).classList.add("slideFromCategoriesToExpenses");
    }
    (document.querySelector(".clicked") as HTMLElement).classList.remove("clicked");
    (document.querySelector("span.expenses") as HTMLElement).classList.add("clicked");

}

/**
 * Generates the animations to slide to the Categories tab
 */
export function slideToCategories(){

    if((document.querySelector(".clicked") as HTMLElement).classList.contains("incomes")){
        allSlides.forEach(aS => {
            (document.querySelector(".operations-wrapper") as HTMLElement).classList.remove(aS);
        });
        (document.querySelector(".operations-wrapper") as HTMLElement).classList.add("slideFromIncomesToCategories");
    }
    if((document.querySelector(".clicked") as HTMLElement).classList.contains("expenses")){
        allSlides.forEach(aS => {
            (document.querySelector(".operations-wrapper") as HTMLElement).classList.remove(aS);
        });
        (document.querySelector(".operations-wrapper") as HTMLElement).classList.add("slideFromExpensesToCategories");
    }
    if((document.querySelector(".clicked") as HTMLElement).classList.contains("all")){
        allSlides.forEach(aS => {
            (document.querySelector(".operations-wrapper") as HTMLElement).classList.remove(aS);
        });
        (document.querySelector(".operations-wrapper") as HTMLElement).classList.add("slideFromAllToCategories");
    }
    (document.querySelector(".clicked") as HTMLElement).classList.remove("clicked");
    (document.querySelector("span.categories") as HTMLElement).classList.add("clicked");

}