import React from 'react';
import Request from './ApiCall.js';
import useStore from './components/useStore';
import Header from './components/search/Header';
import Footer from './components/search/Footer';

function Search() {
    return (
        <div className="App flex flex-col min-h-screen bg-indigo-200">
            <Header />
            <div className="flex-grow">
                <Request />
            </div>
            <Footer />
        </div>
    );
};

export default Search;
