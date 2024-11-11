import React, { useState } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import mercadolibre from './ScrapMercadoLibre';
import amazon from './BrightData';

const APIsCall = () => {
    const [inputValue, setInputValue] = useState('');
    const [loading, setLoading] = useState(false);
    const [apisData, setAPIsData] = useState(null);

    const handleSearch = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const mercadoResponse = await mercadolibre(inputValue);
            const amazonResponse = await amazon(inputValue);

            const data = {
                Mercado_Libre: mercadoResponse?.data || mercadoResponse,
                Amazon: amazonResponse?.data || amazonResponse,
            };

            setAPIsData(data);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
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
                <button type="submit" hidden>Search</button>
                <MagnifyingGlassIcon
                    className="h-6 w-6 text-gray-400 cursor-pointer"
                    onClick={handleSearch}
                />
            </form>

            {loading ? <p>Cargando...</p> : null}

            {apisData ? <pre>{JSON.stringify(apisData, null, 2)}</pre> : null}
        </div>
    );
}

export default APIsCall;
