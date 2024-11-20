import React, { useState } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import mercadolibre from './ScrapMercadoLibre';
import amazon from './BrightData';
import ProductCard from './components/ProductCard.js';

function sortJSON(data, orden) {
    return data.sort((a, b) => {
        const x = parseFloat(a.price);
        const y = parseFloat(b.price);
        return orden === 'asc' ? x - y : y - x;
    });
}

function Combine(JSON1, JSON2) {
    let JSON11 = JSON.parse(JSON.stringify(JSON1));
    let JSON22 = JSON.parse(JSON.stringify(JSON2));
    let combined = [];

    for (let i = 0; i < 50; i++) {
        if (JSON11.data[i]) combined.push(JSON11.data[i]); 
        if (JSON22.data[i]) combined.push(JSON22.data[i]);
    }

    combined = sortJSON(combined, 'asc');
    return combined;
}

const APIsCall = () => {
    const [inputValue, setInputValue] = useState('');
    const [loading, setLoading] = useState(false);
    const [combine, setCombine] = useState(null);
    const [apisData, setApisData] = useState(null);
    const [plat, setPlat] = useState("");

    const handleSearch = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const mercadoResponse = await mercadolibre(inputValue);
            const amazonResponse = await amazon(inputValue);

            const combinedData = Combine(mercadoResponse, amazonResponse);
            setApisData(combinedData);
            setCombine(combinedData);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };
    const handleSelect = (e) => {
        const selectedPlatform = typeof e === "string" ? e : e.target.value;
        setPlat(selectedPlatform);

        if (!apisData) return;

        const filteredData = selectedPlatform === "amazon"
            ? apisData.filter(item => item.plataforma === 'Amazon')
            : selectedPlatform === "mercado"
                ? apisData.filter(item => item.plataforma === 'MercadoLibre')
                : apisData;

        setCombine(filteredData);
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
                {combine &&  <select id="Presentacion" name="Presentacion" onChange={handleSelect}>
                <option value="amazon">Amazon</option>
                <option value="mercado">Mercado Libre</option>
                <option value="combinado">Combinado</option>
            </select>}
            </form>
            {loading && <p>Cargando...</p>}
            {combine && <ProductCard productos={combine} />}
        </div>
    );
};

export default APIsCall;
