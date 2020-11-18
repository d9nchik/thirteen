import {UserState, generateThrowOfFirstDice, generateThrowOfSecondDice} from "./userState";

export class GameState {
    firstPlayer = new UserState();
    secondPlayer = new UserState();

    isEnd() {
        return this.firstPlayer.isEnd() && this.secondPlayer.isEnd();
    }

    firstDice;
    secondDice;

    isRolled = false;

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

    fromScratch() {
        this.firstPlayer = new UserState()
        this.secondPlayer = new UserState();
    }
}