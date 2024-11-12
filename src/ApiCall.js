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

    let JSON11 = JSON.stringify(JSON1)

    let JSON22 = JSON.stringify(JSON2)

    JSON11 = JSON.parse(JSON11);
    JSON22 =JSON.parse(JSON22);

     console.log(JSON11);
    console.log(JSON22);
    let combined = [];

    for (let i = 0; i < 11; i++) {
         combined.push(JSON11.data[i]);  // Añadir de MercadoLibre
          combined.push(JSON22.data[i]);  // Añadir de Amazon
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
