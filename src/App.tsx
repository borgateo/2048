import { useState } from 'react';
import viteLogo from '/vite.svg';
import Container from './components/Container';

function App() {
  const [count, setCount] = useState(0);

  return (
    <Container>
      <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
        <img src={viteLogo} className="logo" alt="Vite logo" />
      </a>
      <h1>Vite + React</h1>

      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
    </Container>
  );
}

export default App;
