import React from 'react';
import { connect } from 'react-redux';
import Routes from './Routes';
import './App.css';

function App() {
  return <Routes />;
}

export default connect()(App);
