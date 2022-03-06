import Cookie from "js-cookie";

let textarea = document.querySelector('.mdj__textarea');
let yourDefinition = document.querySelector('.mdj__your-definition');
let yourDefinitionContainer = document.querySelector('.mdj__your-definition-wrapper');
let button = document.querySelector('.mdj__button');
let answer = document.querySelector('.mdj__answer');
let question = document.querySelector('.mdj__question');

if(Cookie.get("played") === "true") {
    answer.classList.remove("hide");
    question.classList.add("hide");
}

textarea.addEventListener('input', () => {
    button.innerHTML = "Valider";
    button.classList.add('mdj__button--active');
});


button.addEventListener('click', () => {
    answer.classList.remove("hide");
    question.classList.add("hide");
    Cookie.set("played", true);
    
    if(textarea.value) {
        yourDefinitionContainer.classList.remove("hide");
        yourDefinition.innerHTML = textarea.value;
    }
});