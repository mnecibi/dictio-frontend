import "./sass/main.scss";


// TODO Refactor import strategy
// TODO Use typescript

import "./js/modal.js";
import {getResultPage, getResultModal, getStatsResultPage} from "./js/results";
import Stats from "./js/stats";

const init = () => {
    let wordObject = {};

    const stats = new Stats();

    fetch('./dictio.json').then((response) => response.json()).then(json => {
        wordObject = json;

        document.querySelector(".cmp-question__title").innerHTML = wordObject.word;
        document.querySelector(".cmp-question__state").innerHTML = wordObject.state;
        setStats(stats);

        if(stats.get().games && stats.get().games.length>0 && stats.get().games[stats.get().games.length - 1].word === wordObject.word) {
            document.querySelector(".result").classList.remove("hide");
            document.querySelector(".question").classList.add("hide");
        }

    }).catch(error => {
        console.log(error);
    });



    document.querySelector(".cmp-question__button").addEventListener('click', (event) => {
        event.preventDefault();
        const textAreaValue = document.querySelector(".cmp-question__textarea").value;
        if(textAreaValue) {
            document.querySelector(".question").classList.add("hide");
            stats.update(wordObject, textAreaValue);
            setStats(stats);
            document.querySelector(".modal-result").classList.add("modal--active");
            document.querySelector(".result").classList.remove("hide");
        }
    });
};


const setStats = function(stats) {

    const resultComponent = document.querySelector(".result");
    resultComponent.innerHTML = getResultPage(stats.get());

    const resultModal = document.querySelector(".modal-result .modal-wrapper");
    resultModal.innerHTML = getResultModal(stats.get());

    const statsComponent = document.querySelector(".modal-stats .modal-wrapper");
    statsComponent.innerHTML = getStatsResultPage(stats.get());
}


document.addEventListener('DOMContentLoaded', init);