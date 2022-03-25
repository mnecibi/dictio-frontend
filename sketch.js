import Cookie from "js-cookie";

let textarea = document.querySelector('.mdj__textarea');
let yourDefinition = document.querySelector('.mdj__your-definition');
let yourDefinitionContainer = document.querySelector('.mdj__your-definition-wrapper');
let button = document.querySelector('.mdj__button');
let answer = document.querySelector('.mdj__answer');
let question = document.querySelector('.mdj__question');
let words_of_the_day = document.querySelectorAll('.mdj__title');
let definition_of_the_day = document.querySelector('.mdj__definition-text');

function readJson() {
    fetch('./dictio.json').then((response) => response.json()).then(json => {
        console.log(json);
        words_of_the_day.forEach(word => word.innerHTML = json.word);
        definition_of_the_day.innerHTML = json.definition;
        textarea.placeholder = `Entrez ici votre définition du mot ${json.word}.`;
    }).catch(error => {
        console.log(error);
    });
}

readJson();

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