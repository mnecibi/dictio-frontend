(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
let textarea = document.querySelector('.mdj__textarea');
let yourDefinition = document.querySelector('.mdj__your-definition');
let yourDefinitionContainer = document.querySelector('.mdj__your-definition-wrapper');
let button = document.querySelector('.mdj__button');
let answer = document.querySelector('.mdj__answer');
let question = document.querySelector('.mdj__question');

textarea.addEventListener('input', () => {
    button.innerHTML = "Valider";
    button.classList.add('mdj__button--active');
});


button.addEventListener('click', () => {
    answer.classList.remove("hide");
    question.classList.add("hide");
    document.cookie = "played=true";
    
    if(textarea.value) {
        yourDefinitionContainer.classList.remove("hide");
        yourDefinition.innerHTML = textarea.value;
    }
});
},{}]},{},[1]);
