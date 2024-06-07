import { useState } from 'react';
import viteLogo from '/vite.svg';
import Content from './components/Content';

function App() {
  const [count, setCount] = useState(0);

  return (
    <Content>
      <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
        <img src={viteLogo} className="logo" alt="Vite logo" />
      </a>
      <h1>Vite + React</h1>

      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
    </Content>
  );
}

export default App;
