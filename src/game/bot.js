export function getChoice(gameState) {
    var availableCoefficients = gameState.availableCoefficients();
    var currentPoints = gameState.firstPlayer.totalPoints;
    var totalOfDices = gameState.firstDice + gameState.secondDice;

    var bestCoefficient = availableCoefficients[0];
    var bestTotalAmount = getTotalAmountAfter(bestCoefficient, currentPoints, totalOfDices);
    var bestHeuristic = getCoefficientHeuristic(bestTotalAmount);

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