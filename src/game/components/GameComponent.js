import React from "react";
import Dice from "./Dice.js";
import './GameComponent.css';
import {GameState} from "../gameState";


class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {myGame: new GameState()};
        this.state.myGame.rollDice();
        this.rollDice = this.rollDice.bind(this);
    }

    rollDice() {
        this.state.myGame.rollDice();
        console.log(`${this.state.myGame.firstDice} ${this.state.myGame.secondDice}`);
        this.setState({});

    }


    render() {
        return (
            <div>
                <div id="dices">
                    <Dice state={this.state.myGame.firstDice - 1} values={[1, 2, 3, 4, 5, 6]}/>
                    <Dice state={this.state.myGame.secondDice - 2} values={[2, 3, 4, 5, 6, 7]}/>
                </div>
                <button onClick={this.rollDice}>Roll dice</button>
            </div>
        );
    }
}

export default Game;