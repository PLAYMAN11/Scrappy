import React, { useState } from 'react';
import mercadolibre from './ScrapMercadoLibre';
import amazon from './BrightData';


function sortJSON(data, orden) {
    return data.sort((a, b) => {
        const x = parseFloat(a.price.replace(/,/g, '')) || 0;
        const y = parseFloat(b.price.replace(/,/g, '')) || 0;


        if (orden === 'asc') {
            return x - y; // Orden ascendente
        }

        if (orden === 'desc') {
            return y - x; // Orden descendente
        }

        return 0;
    });
}
function Combine(JSON1, JSON2){
    const result = {...JSON1, ...JSON2};
console.log(result)
    return result
}


const APIsCall = () => {
    const [InputValue, setInputValue] = useState('');
    const [Loading, setLoading] = useState(false);
    const [APIsData, setAPIsData] = useState(null);

    const handleSearch = async () => {
        setLoading(true);
        const mercadoResponse = null;
        const amazonResponse = null;
        try {


             mercadoResponse = await mercadolibre(InputValue);
             amazonResponse = await amazon(InputValue);



        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setAPIsData(Combine(mercadoResponse, amazonResponse));
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
