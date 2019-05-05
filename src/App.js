import React from 'react';
import './App.css';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import Main from './containers/Main';

function App() {
  return (
    <Router className="App">
      <Route path="/" component={Main}/>
    </Router>
  );
}

export default App;
