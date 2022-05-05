'use strict';

const getLastDefinition = function(games) {
    if(!games || games.length === 0) {
        return "";
    }

    let lastDefinition = games[games.length - 1];

    return `
        <div class="cmp-definition">
            <h1 class="cmp-definition__title">${lastDefinition.word}</h1>
            <div class="cmp-definition__state">${lastDefinition.state}</div>
            <div class="cmp-definition__text">
                ${lastDefinition.definition1}
            </div>
    
            <div class="cmp-definition__your-text">
                <div class="cmp-definition__your-text-label">Votre définition:</div>
                <div class="cmp-definition__your-text-text">${lastDefinition.yourDefinition}</div>
            </div>
        </div>`;
};

const getStatsLastDefinition = function(games) {
    if(!games || games.length === 0) {
        return "";
    }

    let lastDefinition = games[games.length - 1];

    return `
        <div class="cmp-definition">
            <h1 class="cmp-definition__title">${lastDefinition.word}</h1>
            <div class="cmp-definition__text">
                ${lastDefinition.definition1}
            </div>
    
            <div class="cmp-definition__your-text">
                <div class="cmp-definition__your-text-label">Votre définition:</div>
                <div class="cmp-definition__your-text-text">${lastDefinition.yourDefinition}</div>
                <div class="cmp-definition__your-text-button">
                    <button class="btn btn--primary btn--copy">
                        <svg width="17" height="20" viewBox="0 0 17 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13.3101 17.803V18.3685C13.3095 18.801 13.1279 19.2157 12.8052 19.5215C12.4825 19.8273 12.045 19.9994 11.5886 20H1.72149C1.26511 19.9994 0.827592 19.8273 0.504881 19.5215C0.18217 19.2157 0.000604881 18.801 0 18.3685L0 5.12835C0.000604881 4.69583 0.18217 4.2812 0.504881 3.97536C0.827592 3.66953 1.26511 3.49746 1.72149 3.49689H2.31818V14.8716C2.31939 15.6487 2.64567 16.3937 3.22549 16.9432C3.80532 17.4927 4.59138 17.8019 5.41138 17.803H13.3101Z" fill="#212121"/>
                            <path d="M15.2808 0H5.41143C4.95505 0.000573247 4.51753 0.172643 4.19482 0.478477C3.87211 0.78431 3.69055 1.19895 3.68994 1.63146V14.8716C3.69055 15.3039 3.87219 15.7184 4.19496 16.0238C4.51774 16.3293 4.95526 16.5009 5.41143 16.5009H15.2808C15.7368 16.5009 16.1741 16.3293 16.4965 16.0237C16.8189 15.7182 17.0001 15.3037 17.0001 14.8716V1.63146C17.0001 1.19914 16.819 0.784505 16.4966 0.478609C16.1743 0.172713 15.737 0.000574123 15.2808 0ZM13.5708 13.0257H7.1192C6.9373 13.0257 6.76286 12.9572 6.63423 12.8353C6.50561 12.7134 6.43335 12.5481 6.43335 12.3757C6.43335 12.2033 6.50561 12.038 6.63423 11.9161C6.76286 11.7942 6.9373 11.7257 7.1192 11.7257H13.5708C13.7527 11.7257 13.9271 11.7942 14.0558 11.9161C14.1844 12.038 14.2566 12.2033 14.2566 12.3757C14.2566 12.5481 14.1844 12.7134 14.0558 12.8353C13.9271 12.9572 13.7527 13.0257 13.5708 13.0257ZM13.5708 8.90911H7.1192C6.9373 8.90911 6.76286 8.84063 6.63423 8.71874C6.50561 8.59684 6.43335 8.43151 6.43335 8.25913C6.43335 8.08674 6.50561 7.92142 6.63423 7.79952C6.76286 7.67762 6.9373 7.60914 7.1192 7.60914H13.5708C13.7527 7.60914 13.9271 7.67762 14.0558 7.79952C14.1844 7.92142 14.2566 8.08674 14.2566 8.25913C14.2566 8.43151 14.1844 8.59684 14.0558 8.71874C13.9271 8.84063 13.7527 8.90911 13.5708 8.90911ZM13.5708 4.79255H7.1192C6.9373 4.79255 6.76286 4.72407 6.63423 4.60217C6.50561 4.48028 6.43335 4.31495 6.43335 4.14256C6.43335 3.97018 6.50561 3.80485 6.63423 3.68296C6.76286 3.56106 6.9373 3.49258 7.1192 3.49258H13.5708C13.7527 3.49258 13.9271 3.56106 14.0558 3.68296C14.1844 3.80485 14.2566 3.97018 14.2566 4.14256C14.2566 4.31495 14.1844 4.48028 14.0558 4.60217C13.9271 4.72407 13.7527 4.79255 13.5708 4.79255Z" fill="#212121"/>
                        </svg>                    
                        <span>Partager<span>
                    </div>
                </div>
            </div>
        </div>`;
};


const addCopyEvents = async function(stats) {
    document.querySelectorAll(".btn--copy").forEach(function(button) {
        button.addEventListener("click", function() {
            copyToClipboard(getTextToCopy(stats))
            changeButtonLabel(button, "Copié !");
        });
    });
}

const changeButtonLabel = function(button, label) {
    button.querySelector("span").innerText = label;
};

const copyToClipboard = async function(text) {
    try {
        await navigator.clipboard.writeText(text);
        console.log('Text copied to clipboard');
    } catch (err) {
        console.error('Failed to copy: ', err);
    }
};

const getTextToCopy = function(stats) {

    let lastDefinition = stats.games[stats.games.length - 1];

    return `Ma définition de ${lastDefinition.word} :

${lastDefinition.yourDefinition}
        
Trouve la vraie définition sur https://dictio.io`;
}

const getResultPage = function(stats) {
    return `${getLastDefinition(stats.getGames())}`;
};

const getSeparator = function(label) {
    return `<div class="cmp-separator">
        <div class="cmp-separator__label-wrapper">
            <div class="cmp-separator__label">${label}</div>
        </div>
    </div>`
}

const getStatsResultPage = function(stats) {
    return `
    ${getSeparator("Statistiques")}
    <div class="cmp-stats">
        <div class="cmp-stats__item">
            <div class="cmp-stats__item-number">${stats.getPlayedGames()}</div>
            <div class="cmp-stats__item-label">parties jouées</div>
        </div>

        <div class="cmp-stats__item">
            <div class="cmp-stats__item-number">${stats.getBestStreak()}</div>
            <div class="cmp-stats__item-label">meilleure série</div>
        </div>

        <div class="cmp-stats__item">
            <div class="cmp-stats__item-number">${stats.getCurrentStreak()}</div>
            <div class="cmp-stats__item-label">série actuelle</div>
        </div>
    </div>
    ${stats.getGames() && stats.getGames().length>0 ? getSeparator("Définition") : ""}
    ${getStatsLastDefinition(stats.getGames())}`;
};

const getResultModal = function(stats) {

    return `
    <div class="cmp-stats">
        <div class="cmp-stats__item">
            <div class="cmp-stats__item-number">${stats.getPlayedGames()}</div>
            <div class="cmp-stats__item-label">parties jouées</div>
        </div>

        <div class="cmp-stats__item">
            <div class="cmp-stats__item-number">${stats.getBestStreak()}</div>
            <div class="cmp-stats__item-label">meilleure série</div>
        </div>

        <div class="cmp-stats__item">
            <div class="cmp-stats__item-number">${stats.getCurrentStreak()}</div>
            <div class="cmp-stats__item-label">série actuelle</div>
        </div>
    </div>
    <div class="cmp-separator">
        <div class="cmp-separator__label-wrapper">
            <div class="cmp-separator__label">Définition</div>
        </div>
    </div>
    ${getStatsLastDefinition(stats.getGames())}`;
};

export { getResultModal, getResultPage, getStatsResultPage, addCopyEvents };