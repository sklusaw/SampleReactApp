import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

/*
class Square extends React.Component {
    render() {
      return (
          //The arrow function syntax shows that we're passing a function here. Rather than manually creating the function
        <button 
            className="square" 
            //onXXXX represents the event itself
            onClick={() =>  this.props.onClick()}
        >
          {this.props.value}
        </button>
      );
    }
  }
  */

// Instead of using a class we can make square a function component -- it also eliminates the need for this
// we use a function component when we only need a render and don't keep state. Since Board keeps state, we changed this.
function Square(props) {
    return (
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    )
}

class Board extends React.Component {
    renderSquare(i) {
        return <Square
            value={this.props.squares[i]}
            //we are literally passing this function as a property to the child, so the parent can be modified by the child.
            //handleXXXX represents Event handlers
            onClick={() => this.props.onClick(i)} />;
    }

    render() {
        return (
            <div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

class Game extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            history: [{ squares: Array(9).fill(null) }],
            player: true,
            stepNumber: 0
        };
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            player: step % 2 === 0
        });
    };

    handleClick(i) {
        const history = this.state.history.slice(0,this.state.stepNumber + 1);
        const current = history[history.length - 1];
        //slice makes a copy of the array so we dont have to make a immutable copy of the array
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.player ? 'X' : 'O';
        this.setState({
            history: history.concat([{ squares: squares, }]),
            player: !this.state.player,
            stepNumber: history.length
        });
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);

        const moves = history.map((step,move) => {
            const desc = move ? 'go to move #' + move : 
            'Go to game start'
            return (
                <li key={move}>
                    <button onClick={ () => this.jumpTo(move)}>{desc}</button>
                </li>

            )
        });


        let status;
        if (winner) {
            status = 'Winner: ' + winner;
        } else {
            if(this.state.stepNumber === 9)
            {
                status = 'The Game Is A Tie!';
            }
            else 
            {
                status = 'Next Player: ' + (this.state.player ? 'X' : 'O');
            }
        };

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        onClick={(i) => this.handleClick(i)}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }
}

// ========================================

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
};

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);
