export default function getResults(stats) {

    const getLastDefinition = function(games) {
        if(!games || games.length === 0) {
            return "";
        }

        let lastDefinition = games[games.length - 1];

        return `
            <div class="cmp-separator">
                <div class="cmp-separator__label-wrapper">
                    <div class="cmp-separator__label">Définition</div>
                </div>
            </div>
        
            <div class="cmp-definition">
                <h1 class="cmp-definition__title">${lastDefinition.word}</h1>
                <div class="cmp-definition__text">
                    ${lastDefinition.definition1}
                </div>
        
                <div class="cmp-definition__your-text">
                    <div class="cmp-definition__your-text-label">Votre définition:</div>
                    <div class="cmp-definition__your-text-text">${lastDefinition.yourDefinition}</div>
                    <div class="cmp-definition__your-text-button">
                        <button class="btn btn--primary">Partager</div>
                    </div>
                </div>
            </div>`;
    }


    return `
        <div class="cmp-stats">
            <div class="cmp-stats__item">
                <div class="cmp-stats__item-number">${stats.playedGames}</div>
                <div class="cmp-stats__item-label">parties jouées</div>
            </div>

            <div class="cmp-stats__item">
                <div class="cmp-stats__item-number">${stats.bestStreak}</div>
                <div class="cmp-stats__item-label">meilleure série</div>
            </div>

            <div class="cmp-stats__item">
                <div class="cmp-stats__item-number">${stats.currentStreak}</div>
                <div class="cmp-stats__item-label">série actuelle</div>
            </div>
        </div>
        
        ${getLastDefinition(stats.games)}`;
}