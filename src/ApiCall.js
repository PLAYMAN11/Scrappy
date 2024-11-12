import React, { useState } from 'react';
import mercadolibre from './ScrapMercadoLibre';
import amazon from './BrightData';
import ProductCard from './components/ProductCard.js'


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
            const mercadoResponse = await mercadolibre(inputValue);
            const amazonResponse = await amazon(inputValue);


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


            {apisData && <ProductCard productos={/*AQUI METER EL JSON RESULTADO DEL METODO DE JESUS*/ } />}

        </div>
    );
};

export default APIsCall;
