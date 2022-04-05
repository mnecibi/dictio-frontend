import "./sass/main.scss";


// TODO Refactor import strategy
// TODO Use typescript

import "./js/modal.js";
import getResult from "./js/results";
import Stats from "./js/stats";

let wordObject = {};

const stats = new Stats();

fetch('./dictio.json').then((response) => response.json()).then(json => {
    wordObject = json;

    document.querySelector(".cmp-question__title").innerHTML = wordObject.word;
    document.querySelector(".cmp-question__state").innerHTML = wordObject.state;
    setStats();

    if(stats.get().games && stats.get().games.length>0 && stats.get().games[stats.get().games.length - 1].word === wordObject.word) {
        document.querySelector(".result").classList.remove("hide");
        document.querySelector(".question").classList.add("hide");
    }

}).catch(error => {
    console.log(error);
});



document.querySelector(".cmp-question__button").addEventListener('click', () => {
    const textAreaValue = document.querySelector(".cmp-question__textarea").value;
    if(textAreaValue) {
        document.querySelector(".result").classList.remove("hide");
        document.querySelector(".question").classList.add("hide");
        stats.update(wordObject, textAreaValue)
        setStats();
    }
});


const setStats = function() {
    const resultHTML = getResult(stats.get());

    // TODO: Update result
    const resultComponent = document.querySelector(".result");
    resultComponent.innerHTML = resultHTML;

    // TODO: Update stats
    const statsComponent = document.querySelector(".modal-stats .modal-wrapper");
    statsComponent.innerHTML = `
        <div class="cmp-separator">
            <div class="cmp-separator__label-wrapper">
                <div class="cmp-separator__label">Statistiques</div>
            </div>
        </div>
        ${resultHTML}`;
}