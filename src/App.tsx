import React from 'react';
import PdfSimple from './PdfSimple';
// @ts-ignore
import pdfDummy from './OoPdfFormExample.pdf';
import logo from './logo.svg';
import './App.css';

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
      </header>
      <PdfSimple
        file={`http://localhost:3000${pdfDummy}`}
      />
    </div>
  );
}

export default App;
