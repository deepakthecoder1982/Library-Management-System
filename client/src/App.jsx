// src/App.js
import React from 'react';
import Router from './components/routes';
import NavBar from './components/NavBar';

const App = () => {
  return (
    <>
      <NavBar />
      <Router />
    </>
  );
};

export default App;
