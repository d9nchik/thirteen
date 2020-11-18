import React from "react";
import Dice from "./Dice.js";
import './GameComponent.css';
import {GameState} from "../gameState";


class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {myGame: new GameState()};
        this.rollDice = this.rollDice.bind(this);
        this.makeChoice = this.makeChoice.bind(this);
    }

    rollDice() {
        this.state.myGame.rollDice();
        this.setState({});

    }

    makeChoice(choice) {
        this.state.myGame.makeTurn(Number(choice));
        this.setState({});
    }


    render() {
        return (
            <div>
                <div className="flexible">
                    <div>
                        <div>Your score: {this.state.myGame.firstPlayer.totalPoints}</div>
                        <div>Your winPoints: {this.state.myGame.firstPlayer.winScores}</div>
                    </div>
                    <div>
                        <div>Bot score: {this.state.myGame.secondPlayer.totalPoints}</div>
                        <div>Bot winPoints: {this.state.myGame.secondPlayer.winScores}</div>
                    </div>
                </div>

                <div className="flexible">
                    <Dice state={this.state.myGame.firstDice - 1} values={[1, 2, 3, 4, 5, 6]}/>
                    <Dice state={this.state.myGame.secondDice - 2} values={[2, 3, 4, 5, 6, 7]}/>
                </div>
                <div className="flexible">
                    {
                        this.state.myGame.isFirstTurn() && (!this.state.myGame.isRolled ?
                                <button onClick={this.rollDice}>Roll dice</button> :

                                <NumberList numbers={this.state.myGame.availableCoefficients()}
                                            change={this.makeChoice}/>

                        )
                    }
                </div>

            </div>
        );
    }
}

function ListItem(props) {
    return (
        <option value={props.value}>
            {props.value}
        </option>);
}

function NumberList(props) {
    const numbers = props.numbers;
    return (
        <select onChange={event => props.change(event.target.value)}>
            {numbers.map((number) => <ListItem key={number.toString()} value={number}/>)}
        </select>
    );
}

export default Game;