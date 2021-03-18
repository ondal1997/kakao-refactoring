import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <App itemName={'카카오 프렌즈 인형'} basicPrice={10000} />
  </React.StrictMode>,
  document.getElementById('root')
);
