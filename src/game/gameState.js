import {UserState, generateThrowOfFirstDice, generateThrowOfSecondDice} from "./userState";

export class GameState {
    constructor() {
        this.firstPlayer = new UserState();
        this.secondPlayer = new UserState();
        this.isRolled = false;
    }


    isEnd() {
        return this.firstPlayer.isEnd() && this.secondPlayer.isEnd();
    }


    rollDice() {
        if (this.isRolled) {
            return;
        }
        this.firstDice = generateThrowOfFirstDice();
        this.secondDice = generateThrowOfSecondDice();
        this.isRolled = true;
    }

    makeTurn(coefficient) {
        if (this.isRolled) {
            if (!this.firstPlayer.isEnd()) {
                this.firstPlayer.makeTurn(this.firstDice, this.secondDice, coefficient);
            } else {
                this.secondPlayer.makeTurn(this.firstDice, this.secondDice, coefficient);
            }
            this.isRolled = false;
        }
    }

    whoWon() {
        return this.firstPlayer.winScores - this.secondPlayer.winScores;
    }

    availableCoefficients() {
        return availableCoefficients(this.firstDice, this.secondDice);
    }

    fromScratch() {
        this.firstPlayer = new UserState()
        this.secondPlayer = new UserState();
    }

    isFirstTurn() {
        return !this.firstPlayer.isEnd();
    }
}

export function availableCoefficients(firstDice, secondDice) {
    var applicableCoefficient = [1, 2, 3, 4, -1, 1 / 2, 1 / 3, 1 / 4];
    var total = firstDice + secondDice;
    return [...applicableCoefficient.filter(coefficient => Number.isInteger(total * coefficient))];
}