import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

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
  
  class Board extends React.Component {
      constructor(props)
      {
          super(props);
          this.state= {
              squares: Array(9).fill(null),
              player: 'X',
        };
      }

      handleClick(i)
      {
        const squares = this.state.squares.slice();
        if( this.state.player === 'X')
        {
            squares[i] = this.state.player;
            this.setState({
                player: 'O',
                });
        }
        else
        {
            squares[i] = this.state.player;
            this.setState({
                player: 'X',
                });
        }
        this.setState({squares: squares});
      }

    renderSquare(i) {
      return <Square 
      value={this.state.squares[i]} 
      //we are literally passing this function as a property to the child, so the parent can be modified by the child.
      //handleXXXX represents Event handlers
      onClick={() => this.handleClick(i)}/>;
    }
  
    render() {
      const status = 'Next player: ';
  
      return (
        <div>
          <div className="status">{status}{this.state.player}</div>
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
    render() {
      return (
        <div className="game">
          <div className="game-board">
            <Board />
          </div>
          <div className="game-info">
            <div>{/* status */}</div>
            <ol>{/* TODO */}</ol>
          </div>
        </div>
      );
    }
  }
  
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );
  