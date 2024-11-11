import React, { useState } from 'react';
import mercadolibre from './ScrapMercadoLibre';
import amazon from './BrightData';

const APIsCall = () => {
    const [InputValue, setInputValue] = useState('');
    const [Loading, setLoading] = useState(false);
    const [APIsData, setAPIsData] = useState(null);

    const handleSearch = async () => {
        setLoading(true);

        try {

            const mercadoResponse = await mercadolibre(InputValue);
            const amazonResponse = await amazon(InputValue);

            // If the API response structure is not flat, you might need to access specific fields
            const data = {
                Mercado_Libre: mercadoResponse?.data || mercadoResponse, // Use the correct data structure
                Amazon: amazonResponse?.data || amazonResponse, // Adjust based on the response structure
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
            <input
                type="text"
                value={InputValue}
                onChange={(e) => setInputValue(e.target.value)}
            />
            <button onClick={handleSearch}>Buscar</button>

            {Loading ? "Cargando..." : null}

            {APIsData ? <pre>{JSON.stringify(APIsData, null, 2)}</pre> : null}
        </div>
    );
}

export default APIsCall;
