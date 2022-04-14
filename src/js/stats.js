'use strict';

import ls from "local-storage";

export default class Stats {
    constructor() {
        if (!ls.get("stats")) {
            this.set({ "playedGames": 0, "bestStreak": 0, "currentStreak": 0, "games": [] });
        }
    }

    get = function () {
        return ls.get("stats");
    };

    set = function (stats) {
        ls.set("stats", stats);
    }

    update = function (word, yourDefinition) {
        word.yourDefinition = yourDefinition;
        word.date = new Date();

        let stats = this.get();
        stats.playedGames++;
        stats.games.push(word);

        // TODO update currentStreak setup
        stats.currentStreak++;
        if (stats.currentStreak > stats.bestStreak) {
            stats.bestStreak = stats.currentStreak;
        }
        this.set(stats);
    };
}