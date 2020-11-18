export class UserState {
    turnNumber = 0;
    totalPoints = 0;
    winScores = 0;

    copy() {
        let state = new UserState();
        state.turnNumber = this.turnNumber;
        state.totalPoints = this.totalPoints;
        state.winScores = this.winScores;
        return state;
    }

    isEnd() {
        return this.totalPoints < 5;
    }

    makeTurn(firstDiceNumber, secondDiceNumber, coefficient = 1) {
        if (this.isEnd()) {
            throw new Error('You have no turns');
        }
        if (firstDiceNumber > 6 || firstDiceNumber < 1) {
            throw new Error('firstDice number is incorrect');
        }
        if (secondDiceNumber > 7 || firstDiceNumber < 2) {
            throw new Error('secondDiceNumber is incorrect');
        }


        var applicableCoefficient = [1, 2, 3, 4, -1, 1 / 2, 1 / 3, 1 / 4];
        if (!applicableCoefficient.includes(coefficient)) {
            throw new Error('Coefficient breaks the rules');
        }
        var totalDiceScores = firstDiceNumber + secondDiceNumber;
        if (Number.isInteger(totalDiceScores * coefficient)) {
            throw new Error('Number should be in result int type');
        }

        this.totalPoints += coefficient * (firstDiceNumber + secondDiceNumber);
        if (this.totalPoints % 13 === 0) {
            this.winScores += this.totalPoints / 13;
        }
    }
}

export function generateThrowOfFirstDice() {
    return generateRandomNumber(1, 6);
}

export function generateThrowOfSecondDice() {
    return generateRandomNumber(2, 7);
}

function generateRandomNumber(fromInclusive, toExclusive) {
    return Math.floor(Math.random() * (toExclusive - fromInclusive)) + fromInclusive;
}