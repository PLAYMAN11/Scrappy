import React, { useState } from 'react';
import mercadolibre from './ScrapMercadoLibre';
import amazon from './BrightData';


function sortJSON(data, orden) {
    return data.sort((a, b) => {
        const x = parseFloat(a.price) ;
        const y = parseFloat(b.price) ;


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


     console.log(JSON1);
    console.log(JSON2);
    let combined = [];

    for (let i = 0; i < 11; i++) {
         combined.push(JSON1.data[i]);
          combined.push(JSON2.data[i]);
    }
    console.log(combined)
    combined=sortJSON(combined,'asc')
    return combined;
}




const APIsCall = () => {
    const [InputValue, setInputValue] = useState('');
    const [Loading, setLoading] = useState(false);
     const [APIsData, setAPIsData] = useState(null);
    const handleSearch = async () => {
            setLoading(true);
            let mercadoResponse = null;
            let amazonResponse = null;

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
