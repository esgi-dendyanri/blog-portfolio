import { Suspense } from 'react';
import './App.css';
import Routing from './Routing';

function App() {
  return (
    <Suspense fallback={<h1>loading...</h1>}>
      <Routing />
    </Suspense>
  );
}

export default App;
