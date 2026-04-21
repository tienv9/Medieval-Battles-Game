import './App.css';

function App() {
  const size = 10;
  const board = [];

  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      board.push(
        <div key={`${row}-${col}`} className="cell"></div>
      );
    }
  }

  return (
    <div className="App">
      <div className="board">
        {board}
      </div>
    </div>
  );
}

export default App;