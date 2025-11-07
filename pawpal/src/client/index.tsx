import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import './styles/globals.css';
import './styles/mobile.css';

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
);