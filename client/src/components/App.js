import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import SignIn from './pages/signIn/SignIn';
import './App.scss';

function App () {
  return (
    <Router>
      <Route exact path="/" component={Home} />
      <Route path="/signIn" component={SignIn} />
    </Router>
  );
}

export default App;
