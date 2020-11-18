export function getChoice(gameState) {
    var availableCoefficients = gameState.availableCoefficients();
    var currentPoints = gameState.firstPlayer.totalPoints;
    var totalOfDices = gameState.firstDice + gameState.secondDice;
    var bestCoefficient = availableCoefficients[0];
    var bestAmount = getCoefficientHeuristic(bestCoefficient, currentPoints, totalOfDices);
    for (let coefficient of availableCoefficients) {
        let currentCoefficientAmount = getCoefficientHeuristic(coefficient, currentPoints, totalOfDices);
        if (bestAmount < currentCoefficientAmount) {
            bestAmount = currentCoefficientAmount;
            bestCoefficient = coefficient;
        }
    }
    return bestCoefficient;
}

function getCoefficientHeuristic(coefficient, currentPoints, diceAmount) {
    var total = currentPoints + diceAmount * coefficient;
    if (total % 13 === 0) {
        return total / 13;
    }
    return 0;
}