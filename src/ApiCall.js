import React, { useState } from 'react';
import mercadolibre from './ScrapMercadoLibre';
import amazon from './BrightData';
import ProductCard from './components/ProductCard.js';

function sortJSON(data, orden) {
    return data.sort((a, b) => {
        const x = parseFloat(a.price);
        const y = parseFloat(b.price);

        if (orden === 'asc') {
            return x - y; // Orden ascendente
        }

        if (orden === 'desc') {
            return y - x; // Orden descendente
        }

        return 0;
    });
}

function Combine(JSON1, JSON2) {
    console.log(JSON1);
    console.log(JSON2);
    let combined = [];

    for (let i = 0; i < 11; i++) {
        combined.push(JSON1.data[i]);
        combined.push(JSON2.data[i]);
    }
    console.log(combined);
    combined = sortJSON(combined, 'asc');
    return combined;
}

const APIsCall = () => {
    const [inputValue, setInputValue] = useState(''); // Changed to inputValue
    const [loading, setLoading] = useState(false);
    const [apisData, setApisData] = useState(null); // Changed to apisData

    const handleSearch = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        setLoading(true);
        let mercadoResponse = null;
        let amazonResponse = null;

        try {
            mercadoResponse = await mercadolibre(inputValue);
            amazonResponse = await amazon(inputValue);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            if (mercadoResponse && amazonResponse) {
                setApisData(Combine(mercadoResponse, amazonResponse));
            }
            setLoading(false);
        }
    };

    return (
        <div>
            <form
                className="flex items-center space-x-2 justify-center rounded-full py-2 px-4 bg-indigo-100 max-w-md mx-auto"
                onSubmit={handleSearch}
            >
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Search..."
                    className="flex-1 outline-none bg-transparent text-indigo-400 placeholder:text-indigo-300"
                />
                <button type="submit">Buscar</button>
            </form>

            {loading && <p>Cargando...</p>}

            {apisData && <ProductCard productos={apisData} />}
        </div>
    );
};

export default APIsCall;
