import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import ApiCall from './ApiCall'
import reportWebVitals from './reportWebVitals';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <main className="p-5 max-w-7xl w-full mx-auto overflow-y-auto" />
    <App />
    <div className='division'>

    </div>
  </React.StrictMode>
);

reportWebVitals();
