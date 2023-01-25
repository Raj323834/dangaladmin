import { Injectable } from '@angular/core';
import { AppConstants } from '../app/constant/AppConstants';
import { GameCategory } from "../app/models/gameorder/GameCategory";
import { GameOrder } from '../app/models/gameorder/GameOrder';



@Injectable({ providedIn: 'root' })
export class GamesOrderDataStore {

    private categoryBasedGames = new Map<String, String[]>();

    storeGamesByCategory(allGames: GameOrder) {
        this.clearDataStoreValues();
        this.categorizeGames(allGames.gameCategories);
    }

    clearDataStoreValues() {
        this.categoryBasedGames.clear();
    }

    categorizeGames(allGameCategories: GameCategory[]) {
        if (allGameCategories.length > 0) {
            for (let gameCategory of allGameCategories) {
                if (gameCategory.name == AppConstants.NEW_GAMES_CATEGORY) {
                    this.categoryBasedGames.set(AppConstants.NEW_GAMES_KEY, gameCategory.games);
                }

                if (gameCategory.name == AppConstants.CARD_GAMES_CATEGORY) {
                    this.categoryBasedGames.set(AppConstants.CARD_GAMES_KEY, gameCategory.games);
                }

                if (gameCategory.name == AppConstants.CASUAL_GAMES_CATEGORY) {
                    this.categoryBasedGames.set(AppConstants.CASUAL_GAMES_KEY, gameCategory.games);
                }
            }

            console.log(this.categoryBasedGames);
        }
    }

    public get getAllGames(): String[] {
        let allGamesData: String[] = [];
        for (let key of this.categoryBasedGames.keys()) {
            let gamesInACategory = this.categoryBasedGames.get(key);
            for (let game of gamesInACategory) {
                allGamesData.push(game);
            }
        }
        return allGamesData;
    }

    public get getNewGames(): String[] {
        let allNewGames: String[] = [];
        allNewGames = this.categoryBasedGames.get(AppConstants.NEW_GAMES_KEY);
        return allNewGames;
    }

    public get getCasualGames(): String[] {
        let allCasualGames: String[] = [];
        allCasualGames = this.categoryBasedGames.get(AppConstants.CASUAL_GAMES_KEY);
        return allCasualGames;
    }

    public get getCardGames(): String[] {
        let allCardGames: String[];
        allCardGames = this.categoryBasedGames.get(AppConstants.CARD_GAMES_KEY);
        return allCardGames;
    }

    public get getNewAndCasualGames(): String[] {
        let allNewAndCasualGames: String[] = [];
        for (let key of this.categoryBasedGames.keys()) {
            if(key == AppConstants.CARD_GAMES_KEY){
                continue;
            }
            let gamesInACategory = this.categoryBasedGames.get(key);
            for (let game of gamesInACategory) {
                allNewAndCasualGames.push(game);
            }
        }
        return allNewAndCasualGames;
    }
}