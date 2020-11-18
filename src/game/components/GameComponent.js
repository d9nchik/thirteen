import React from "react";
import Dice from "./Dice.js";

function Game() {
    return (
        <div>
            <Dice state={2} values={[1, 2, 3, 4, 5, 6]}/>
            <Dice state={3} values={[2, 3, 4, 5, 6, 7]}/>
        </div>
    );
}

export default Game;