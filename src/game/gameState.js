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
        this.firstDice = generateThrowOfFirstDice();
        this.secondDice = generateThrowOfSecondDice();
        this.isRolled = true;
    }

    makeTurn(coefficient) {
        if (this.isRolled) {
            if (!this.firstPlayer.isEnd()) {
                this.firstPlayer.makeTurn(this.firstDice, this.secondDice, coefficient);
            } else {
                this.firstPlayer.makeTurn(this.firstDice, this.secondDice, coefficient);
            }
        }
    }

    whoWon() {
        return this.firstPlayer.winScores - this.secondPlayer.winScores;
    }
}