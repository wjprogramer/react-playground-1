import logo from './logo.svg';
import './App.css';
import { Counter } from './features/counter/Counter';
import Sample from './features/sample/Sample';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <hr />
        <Counter />
        <hr />
        <Sample />
      </header>
    </div>
  );
}

export default App;
