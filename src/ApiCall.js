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
            console.log(mercadoResponse);
            mercadoResponse=sortJSON(mercadoResponse,'desc')

            const amazonResponse = await amazon(InputValue);

            console.log(mercadoResponse);
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

            return 0; // Si no se especifica un orden, no se realiza ningún cambio
        });
    }

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
