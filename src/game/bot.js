import {availableCoefficients} from "./gameState";

export function getChoice(gameState) {
    var secondPlayerState = gameState.secondPlayer;
    var availableCoefficients = gameState.availableCoefficients();
    if (secondPlayerState.turnNumber < 1) {

        let currentPoints = secondPlayerState.totalPoints;
        let totalOfDices = gameState.firstDice + gameState.secondDice;

        let bestCoefficient = availableCoefficients[0];
        let bestTotalAmount = getTotalAmountAfter(bestCoefficient, currentPoints, totalOfDices);
        let bestHeuristic = getCoefficientHeuristic(bestTotalAmount);

        for (let coefficient of availableCoefficients) {
            let currentTotalAmount = getTotalAmountAfter(coefficient, currentPoints, totalOfDices);
            let currentHeuristic = getCoefficientHeuristic(currentTotalAmount);
            if (bestHeuristic < currentHeuristic) {
                bestHeuristic = currentHeuristic;
                bestTotalAmount = currentTotalAmount;
                bestCoefficient = coefficient;
            } else if (bestHeuristic === currentHeuristic && currentTotalAmount > bestTotalAmount) {
                bestHeuristic = currentHeuristic;
                bestTotalAmount = currentTotalAmount;
                bestCoefficient = coefficient;
            }
        }
        return bestCoefficient;
    } else {
        const firstDice = gameState.firstDice;
        const secondDice = gameState.secondDice;
        let best = availableCoefficients[0];
        let bestTotalAmount = Number.NEGATIVE_INFINITY;
        for (let coefficient of availableCoefficients) {
            let copy = secondPlayerState.copy();
            copy.makeTurn(firstDice, secondDice, coefficient);
            let currentMax = minMax(copy);
            if (currentMax > bestTotalAmount) {
                bestTotalAmount = currentMax;
                best = coefficient;
            }
        }
        return best;
    }
}

function getCoefficientHeuristic(totalAmountAfter) {
    if (totalAmountAfter % 13 === 0) {
        return totalAmountAfter / 13;
    }
    return 0;
}

function getTotalAmountAfter(coefficient, currentPoints, diceAmount) {
    return currentPoints + diceAmount * coefficient;
}

function minMax(playerState) {
    if (playerState.isEnd()) {
        return playerState.winScores;
    }

    var total = 0;


    for (let i = 1; i <= 6; i++) {
        for (let j = 2; j <= 7; j++) {
            if (i > j) {
                continue;
            }

            let probability = (2 <= i && i <= 7 && 1 <= j && j <= 6 && i !== j) ? 1 / 18 : 1 / 36;

            let max = 0;
            for (const availableCoefficient of availableCoefficients(i, j)) {
                let copy = playerState.copy();
                copy.makeTurn(i, j, availableCoefficient);
                max = Math.max(minMax(copy), max);
            }
            total += probability * max;
        }
    }

    return total;
}