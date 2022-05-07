'use strict';

const getLastDefinition = function(games) {
    if(!games || games.length === 0) {
        return "";
    }

    let lastDefinition = games[games.length - 1];

    return `
        <div class="cmp-definition">
            <h3 class="cmp-definition__subtitle">La <span>définition</span> du mot</h3>
            <div class="cmp-definition__title-wrapper">
                <div class="cmp-definition__title-icon cmp-definition__title-icon--left-top">
                    <svg width="13" height="11" viewBox="0 0 13 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.5 9.4641L11.5 7.73205L3.83975 1L0.839746 6.19615L10.5 9.4641Z" fill="#FFD600" stroke="#FFD600"/>
                    </svg>
                </div>
                <div class="cmp-definition__title-icon cmp-definition__title-icon--left-center">
                    <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11 5V3L1 1V7L11 5Z" fill="#FFD600" stroke="#FFD600"/>
                    </svg>
                </div>
                <div class="cmp-definition__title-icon cmp-definition__title-icon--left-bottom">
                    <svg width="13" height="10" viewBox="0 0 13 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.5 0.732065L11.5 2.46412L3.83975 9.19617L0.839746 4.00001L10.5 0.732065Z" fill="#FFD600" stroke="#FFD600"/>
                    </svg>
                </div>
                <h1 class="cmp-definition__title">${lastDefinition.word}</h1>
                <div class="cmp-definition__title-icon cmp-definition__title-icon--right-top">
                    <svg width="13" height="11" viewBox="0 0 13 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2 9.4641L1 7.73205L8.66025 1L11.6603 6.19615L2 9.4641Z" fill="#FFD600" stroke="#FFD600"/>
                    </svg>
                </div>
                <div class="cmp-definition__title-icon cmp-definition__title-icon--right-center">
                    <svg width="11" height="8" viewBox="0 0 11 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0.5 5V3L10.5 1V7L0.5 5Z" fill="#FFD600" stroke="#FFD600"/>
                    </svg>
                </div>
                <div class="cmp-definition__title-icon cmp-definition__title-icon--right-bottom">
                    <svg width="13" height="10" viewBox="0 0 13 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2 0.732065L1 2.46412L8.66025 9.19617L11.6603 4.00001L2 0.732065Z" fill="#FFD600" stroke="#FFD600"/>
                    </svg>    
                </div>
            </div>
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

    return Definition(games[games.length - 1], "");
}

const getStatsDefinitions = function(games) {
    if(!games || games.length === 0) {
        return "";
    }

    let definitions = games.reduce((acc, game) =>  Definition(game, "swiper-slide") + acc, "")
    return `
        <div class="swiper">
            <div class="swiper-wrapper">
                ${definitions}
            </div>
            <div class="swiper-button-prev">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 14L7 9L12 4" stroke="white" stroke-linecap="round"/>
                    <rect x="0.5" y="0.5" width="17" height="17" rx="5.5" stroke="#FCFCFC"/>
                </svg>            
            </div>
            <div class="swiper-button-next">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 14L12 9L7 4" stroke="white" stroke-linecap="round"/>
                    <rect x="0.5" y="0.5" width="17" height="17" rx="5.5" stroke="#FCFCFC"/>
                </svg>            
            </div>
        </div>`;
};

const Definition = function(definition, className) {
    return `
    <div class="cmp-definition cmp-definition--stats ${className}">

        <div class="cmp-definition__date">${new Date(definition.date).toLocaleDateString("fr-fr")}</div>

        ${Separator("Définition")}
        <h1 class="cmp-definition__title">${definition.word}</h1>
        <div class="cmp-definition__text">
            ${definition.definition1}
        </div>

        ${Infos(definition)}
        ${SecondaryButton("En savoir +", definition.wikitionnaire)}

        <div class="cmp-definition__your-text">
            <div class="cmp-definition__your-text-label">Votre définition:</div>
            <div class="cmp-definition__your-text-text">${definition.yourDefinition}</div>
            <div class="cmp-definition__your-text-button">
                <button class="btn btn--primary btn--copy">
                    <svg width="17" height="20" viewBox="0 0 17 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13.3101 17.803V18.3685C13.3095 18.801 13.1279 19.2157 12.8052 19.5215C12.4825 19.8273 12.045 19.9994 11.5886 20H1.72149C1.26511 19.9994 0.827592 19.8273 0.504881 19.5215C0.18217 19.2157 0.000604881 18.801 0 18.3685L0 5.12835C0.000604881 4.69583 0.18217 4.2812 0.504881 3.97536C0.827592 3.66953 1.26511 3.49746 1.72149 3.49689H2.31818V14.8716C2.31939 15.6487 2.64567 16.3937 3.22549 16.9432C3.80532 17.4927 4.59138 17.8019 5.41138 17.803H13.3101Z" fill="#212121"/>
                        <path d="M15.2808 0H5.41143C4.95505 0.000573247 4.51753 0.172643 4.19482 0.478477C3.87211 0.78431 3.69055 1.19895 3.68994 1.63146V14.8716C3.69055 15.3039 3.87219 15.7184 4.19496 16.0238C4.51774 16.3293 4.95526 16.5009 5.41143 16.5009H15.2808C15.7368 16.5009 16.1741 16.3293 16.4965 16.0237C16.8189 15.7182 17.0001 15.3037 17.0001 14.8716V1.63146C17.0001 1.19914 16.819 0.784505 16.4966 0.478609C16.1743 0.172713 15.737 0.000574123 15.2808 0ZM13.5708 13.0257H7.1192C6.9373 13.0257 6.76286 12.9572 6.63423 12.8353C6.50561 12.7134 6.43335 12.5481 6.43335 12.3757C6.43335 12.2033 6.50561 12.038 6.63423 11.9161C6.76286 11.7942 6.9373 11.7257 7.1192 11.7257H13.5708C13.7527 11.7257 13.9271 11.7942 14.0558 11.9161C14.1844 12.038 14.2566 12.2033 14.2566 12.3757C14.2566 12.5481 14.1844 12.7134 14.0558 12.8353C13.9271 12.9572 13.7527 13.0257 13.5708 13.0257ZM13.5708 8.90911H7.1192C6.9373 8.90911 6.76286 8.84063 6.63423 8.71874C6.50561 8.59684 6.43335 8.43151 6.43335 8.25913C6.43335 8.08674 6.50561 7.92142 6.63423 7.79952C6.76286 7.67762 6.9373 7.60914 7.1192 7.60914H13.5708C13.7527 7.60914 13.9271 7.67762 14.0558 7.79952C14.1844 7.92142 14.2566 8.08674 14.2566 8.25913C14.2566 8.43151 14.1844 8.59684 14.0558 8.71874C13.9271 8.84063 13.7527 8.90911 13.5708 8.90911ZM13.5708 4.79255H7.1192C6.9373 4.79255 6.76286 4.72407 6.63423 4.60217C6.50561 4.48028 6.43335 4.31495 6.43335 4.14256C6.43335 3.97018 6.50561 3.80485 6.63423 3.68296C6.76286 3.56106 6.9373 3.49258 7.1192 3.49258H13.5708C13.7527 3.49258 13.9271 3.56106 14.0558 3.68296C14.1844 3.80485 14.2566 3.97018 14.2566 4.14256C14.2566 4.31495 14.1844 4.48028 14.0558 4.60217C13.9271 4.72407 13.7527 4.79255 13.5708 4.79255Z" fill="#212121"/>
                    </svg>                    
                    <span>Partager<span>
                </div>
            </div>
        </div>`;
}

const Infos = function(definition) {
    if(!definition && !definition.etymologie && !definition.origin && !definition.notes && !definition.figure) {
        return "";
    }

    return `
        ${Separator("Infos")}
        ${SubSection("Étymologie", definition.etymologie)}
        ${SubSection("Origine", definition.origin)}
        ${SubSection("Figure", definition.figure)}
        ${SubSection("Notes", definition.notes)}
    `;
}

const SecondaryButton = function(label, link) {
    return `<a class="btn btn--secondary" target="_blank" href="${link}">${label}</a>`;
}

const SubSection = function(title, content) {
    if(!content) {
        return "";
    }
    return `
    <div class="cmp-definition-subsection">
        <div class="cmp-definition-subsection__title">${title}</div>
        <div class="cmp-definition-subsection__content">${content}</div>
    </div>`;
}

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
    } catch (err) {
        console.error('Failed to copy: ', err);
    }
};

const getTextToCopy = function(stats) {

    let lastDefinition = stats.games[stats.games.length - 1];

    return `Ma définition de ${lastDefinition.word} :

${lastDefinition.yourDefinition}
        
https://dictio.io`;
}

const getResultPage = function(stats) {
    return `${getLastDefinition(stats.getGames())}`;
};

const Separator = function(label) {
    return `<div class="cmp-separator">
        <div class="cmp-separator__label-wrapper">
            <div class="cmp-separator__label">${label}</div>
        </div>
    </div>`
}

const getStatsResultPage = function(stats) {
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
    ${getStatsDefinitions(stats.getGames())}`;
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
    ${getStatsLastDefinition(stats.getGames())}
    <div class="center">
        <a class="btn btn--tertiary btn--love" href="https://utip.io/dictio">
            <svg width="19" height="16" viewBox="0 0 19 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18.9847 4.45427C19.0433 5.15581 18.9467 5.86156 18.7016 6.52237C18.4565 7.18319 18.0688 7.78318 17.5655 8.28058L9.95636 15.8163C9.89744 15.8747 9.82746 15.921 9.75044 15.9526C9.67342 15.9842 9.59086 16.0004 9.50748 16.0004C9.4241 16.0004 9.34154 15.9842 9.26452 15.9526C9.1875 15.921 9.11752 15.8747 9.05859 15.8163L1.43598 8.27891C0.923933 7.76525 0.534319 7.14485 0.295612 6.46305C0.0569056 5.78126 -0.0248614 5.05529 0.0562869 4.3382C0.137435 3.62112 0.379448 2.93104 0.764639 2.31839C1.14983 1.70575 1.66847 1.18603 2.28264 0.797203C2.89682 0.408379 3.59102 0.160283 4.3145 0.0710438C5.03799 -0.0181949 5.77248 0.0536794 6.4643 0.281414C7.15612 0.509149 7.78778 0.886989 8.31312 1.38732C8.83847 1.88765 9.24422 2.49783 9.50073 3.17327C9.88074 2.13013 10.6109 1.24762 11.5693 0.67318C12.5276 0.098737 13.6561 -0.132856 14.7663 0.01709C15.8764 0.167036 16.9009 0.689438 17.6687 1.49703C18.4365 2.30462 18.901 3.3485 18.9847 4.45427Z" fill="#212121"/>
            </svg>                       
            <span>Soutenir<span>
        </a>
    </div>`;
};

export { getResultModal, getResultPage, getStatsResultPage, addCopyEvents };