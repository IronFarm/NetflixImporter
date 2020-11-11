import React, { ChangeEvent, FormEvent } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

type SquareProps = {
  onClick: () => void,
  value: string
}

function Square(props: SquareProps) {
  return (
    <button
      className="square"
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );
}

type BoardState = {
  squares: Array<string>,
  xIsNext: boolean,
}

class Board extends React.Component<{}, BoardState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
    };
  }

  handleClick(i: number) {
    const squares = this.state.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
    });
  }

  renderSquare(i: number) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  render() {
    const winner = calculateWinner(this.state.squares);
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div>
        <div className="status">{status}</div>
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
        <div>
          <NetflixUpload />
        </div>
      </div>
    );
  }
}

type NetflixState = {
  formExpanded: boolean,
  targetFile: Blob | null,
}

class NetflixUpload extends React.Component<{}, NetflixState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      formExpanded: false,
      targetFile: null,
    };
  }

  handleChange(event: ChangeEvent<HTMLInputElement>) {
    console.log('File selected');

    const file_list = event.target.files;
    if (!file_list) return;

    this.setState({
      targetFile: file_list[0]
    })
  }

  handleSubmit(event: FormEvent) {
    // alert('Submit clicked!');
    console.log('Target file:')
    console.log(this.state.targetFile);

    // https://stackoverflow.com/a/63227449/4453582
    const reader = new FileReader();
    reader.onload = (event) => {
      console.log('First 10 bytes:');
      console.log(event.target?.result?.slice(0, 10));
    }
    if (this.state.targetFile != null) reader.readAsText(this.state.targetFile);

    // Collapse the form and clear up
    this.setState({
      formExpanded: false,
      targetFile: null,
    })

    // Stop navigation to new page (default form action)
    event.preventDefault();
  }

  renderForm() {
    if (!this.state.formExpanded) {
      return null;
    }

    return (
      <div>
        <h1>FORM GOES HERE</h1>
        <form onSubmit={(event) => this.handleSubmit(event)}>
          <input type='file' onChange={(event) => this.handleChange(event)} />
          <input type='submit' />
        </form>
      </div>
    )
  }

  render() {
    return (
      <div className='netflix'>
        <button
          onClick={() => this.setState({ formExpanded: true })}
        >Upload Netflix Data</button>
        <div>{this.renderForm()}</div>
      </div>
    );
  }
}

function calculateWinner(squares: Array<string>) {
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
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
