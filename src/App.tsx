import React from 'react';
import './App.css';
import Game from "./Game";

function App() {
  return (
    <div className="app">
        <div className="header">2048</div>
        <div className="score-block">Score: 0</div>
        <div className="reset-button">New Game</div>
        <Game />
    </div>
  );
}

export default App;
