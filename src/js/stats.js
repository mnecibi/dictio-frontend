'use strict';

import ls from "local-storage";
import {subDays, format, parseISO} from "date-fns";

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
        stats.playedGames = stats.games.length;
        stats.games.push(word);

        stats.currentStreak = this.getCurrentStreak(stats.games);
        stats.bestStreak = this.getBestStreak()
        this.set(stats);
    };

    getPlayedGames = function () {
        if (this.get().games) {
            return this.get().games.length;
        }
        return 0;
    }

    getGames = function () {
        return this.get().games;
    };


    getCurrentStreak = function () {
        let games = this.getGames();
        let dates = Object.values(games)
            .filter(game => game.date)
            .map(game => game.date);

        let currentStreak = 0;
        if (dates && dates.length > 0) {
            currentStreak = 1;
        } else {
            return 0;
        }

        let counter = dates.length - 1;
        while (counter > 0 && this.sameDay(subDays(new Date(dates[counter]), 1), new Date(dates[counter - 1]))) {
            currentStreak++;
            counter--;
        }

        return currentStreak;
    };

    getBestStreak = function () {
        if(this.get().bestStreak && this.get().bestStreak > this.getCurrentStreak()) {
            return this.get().bestStreak;
        }
        return this.getCurrentStreak();
    };

    sameDay = function (date1, date2) {
        return format(new Date(date1), "dd MMM yyyy") === format(new Date(date2), "dd MMM yyyy")
    }
}