import React from 'react';
import Request from './ApiCall.js';
import useStore from './components/useStore';

function Search() {
    return (
        <div className="App">
            <Request />
        </div>
    );
};

export default Search;