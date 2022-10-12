import "./sass/main.scss";


import "./js/modal.js";
import {getResultPage, getResultModal, getStatsResultPage, addCopyEvents} from "./js/results";
import Stats from "./js/stats";
import Swiper, { Navigation, Pagination } from 'swiper';
import Cookies from 'js-cookie';

Swiper.use([Navigation, Pagination]);

const init = () => {
    let wordObject = {};

    if(!Cookies.get('acceptCookies') ||  Cookies.get('acceptCookies') !== 'true') {
        const cookieBanner = document.querySelector(".cookie-banner");
        if (cookieBanner) {
            cookieBanner.classList.remove("hide");
        }
    }

    const stats = new Stats();

    fetch('./files/dictio.json').then((response) => response.json()).then(json => {
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

    document.querySelector(".cookie-banner__btn").addEventListener("click", acceptCookies);
    document.querySelectorAll(".header__icon").forEach(icon => icon.addEventListener("click", acceptCookies));

    document.querySelector(".cmp-question__button--valider").addEventListener('click', (event) => {
        acceptCookies();
        const textAreaValue = document.querySelector(".cmp-question__textarea").value;
        if(textAreaValue) {
            document.querySelector(".question").classList.add("hide");
            stats.update(wordObject, textAreaValue);
            setStats(stats);
            document.querySelector(".modal-result").classList.add("modal--active");
            document.querySelector(".result").classList.remove("hide");
        }
    });

    document.querySelector(".cmp-question__button--passer").addEventListener('click', (event) => {
        event.preventDefault();
        acceptCookies();
        const textArea = document.querySelector(".cmp-question__textarea");
        if(textArea.value) {
            textArea.value = "";
        } 
        
        stats.update(wordObject, "je n’ai pas proposé de définition.");
        setStats(stats);
        document.querySelector(".modal-result").classList.add("modal--active");
        document.querySelector(".question").classList.add("hide");
        document.querySelector(".result").classList.remove("hide");
    });

    if('serviceWorker' in navigator) {
        navigator.serviceWorker
                 .register('./sw.js')
                 .then(function() { console.log('Service Worker Registered'); });
      }
};


const setStats = async function(stats) {

    const resultComponent = document.querySelector(".result");
    resultComponent.innerHTML = getResultPage(stats);

    const resultModal = document.querySelector(".modal-result .modal-wrapper");
    resultModal.innerHTML = getResultModal(stats);

    const statsComponent = document.querySelector(".modal-stats .modal-wrapper");
    statsComponent.innerHTML = getStatsResultPage(stats);

    new Swiper(".swiper", {
        slidesPerView: 1,
        loop: true,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });

    addCopyEvents(stats.get());
}

const acceptCookies = () => {
    if (Cookies.get('acceptCookies') !== 'true') {
        document.querySelector(".cookie-banner").remove();
        Cookies.set('acceptCookies', 'true', { expires: 365 });
    }
}


document.addEventListener('DOMContentLoaded', init);