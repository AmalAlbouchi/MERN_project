import React from 'react';
import { Container } from 'reactstrap'
import Routes from './routes';
import './App.css';

function App() {
  return (
    <Container>
      <div className="content">
        <Routes/>
      </div>
    </Container>
  );
}

export default App;