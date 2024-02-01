// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import DisplayBooks from './components/DisplayBook';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/display-books" component={DisplayBooks} />
      </Switch>
    </Router>
  );
};

export default App;
