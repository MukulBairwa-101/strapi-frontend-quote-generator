import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {Provider} from "./Context/AppContext";
import {BrowserRouter as Router} from "react-router-dom";
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider>
      <Router>
      <App />
      </Router>
    </Provider>
  </React.StrictMode>
);
