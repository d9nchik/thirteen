import './Dice.css';
import React from "react";

function Dice(parameters) {
    var allStates = ['btnFront', 'btnRight', 'btnBack', 'btnLeft', 'btnTop', 'btnBottom'];
    var state = allStates[parameters.state];
    return (
        <div className="view">
            <div className={"dice " + state}>
                <div className="diceFace front">{parameters.values[0]}</div>
                <div className="diceFace right">{parameters.values[1]}</div>
                <div className="diceFace back">{parameters.values[2]}</div>
                <div className="diceFace left">{parameters.values[3]}</div>
                <div className="diceFace top">{parameters.values[4]}</div>
                <div className="diceFace bottom">{parameters.values[5]}</div>
            </div>
        </div>
    );
}

export default Dice;