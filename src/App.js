//import React from 'react';
//import './App.css';
//import Request from './ApiCall.js';
//import useStore from './components/useStore';
//
//function App() {
//
//        return (
//            <div className="App">
//                <Request />
//            </div>
//        );
//    };
//
//    export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Search from './Search';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </Router>
  );
};

export default App;
