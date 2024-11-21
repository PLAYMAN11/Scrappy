import React, { useState } from 'react';
import mercadolibre from './ScrapMercadoLibre';
import amazon from './BrightData';
import ProductCard from './components/ProductCard.js';


function sortJSON(data, orden) {
    return data.sort((a, b) => {
        const x = parseFloat(a.price);
        const y = parseFloat(b.price);
        console.log(orden)
        return orden == 'asc' ? x - y : y - x;
    });
}

function Combine(JSON1, JSON2) {


    let JSON11 = JSON.parse(JSON.stringify(JSON1));
    let JSON22 = JSON.parse(JSON.stringify(JSON2));
    let combined = [];

    for (let i = 0; i < 50; i++) {
        if (JSON11.data[i]) combined.push(JSON11.data[i]);  // Asegúrate de que el índice existe
        if (JSON22.data[i]) combined.push(JSON22.data[i]);
    }
    return combined;
}

const APIsCall = () => {
    const [inputValue, setInputValue] = useState('');
    const [loading, setLoading] = useState(false);
    const [combine, setCombine] = useState(null);
    const [apisData, setApisData] = useState(null);
    const [plat, setPlat] = useState("");
    const [orden, setorden]=useState('asc');

    const handleSearch = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const mercadoResponse = await mercadolibre(inputValue);
            const amazonResponse = await amazon(inputValue);


            const combinedData = sortJSON(Combine(mercadoResponse, amazonResponse),orden);
            setApisData(combinedData);
            setCombine(combinedData); // Mostrar datos combinados por defecto
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

        setCombine(sortJSON(filteredData, orden));
    };
    const handleOrderChange = (e) => {
        const selectedOrder = e.target.value;
        setorden(selectedOrder);

        if (!combine) return;

        const sortedData = sortJSON(combine, selectedOrder);
        setCombine(sortedData);
    };


    return (
        <div className='bg-[#c7c3e4]'>
            <div className="flex items-center justify-between bg-[#c7c3e4] p-4 h-20">
            <a
                    href="#"
                    target="_self"
                    rel="noopener noreferrer"
                    title="Home"
                ><img src="../public/buscar.png"></img></a>
            <form
                className="flex items-center space-x-2 justify-center rounded-full py-2 px-4 bg-[#9297cd] w-[40%]"
                style={{position: 'absolute', left: '30%'}}
                onSubmit={handleSearch}
            >
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Search..."
                    className="flex-1 outline-none bg-transparent text-[#ffffff] placeholder:text-[#ffffff] font-bold mr-16"
                />
                <button type="submit">Buscar</button>
            </form>
            
            </div>

            <div className="flex space-x-4 items-center justify-center mt-4">
                <select className= " px-5 py-2 rounded-full cursor-pointer flex items-center space-x-2 justify-center rounded-full py-2 px-4 bg-[#9297cd] text-[#ffffff] max-w-md font-bold"id="Presentacion" name="Presentacion" onChange={handleSelect}>
                    <img width= "10"src="/src/icon.svg"/>
                    <option value="combinado">Combinado</option>
                    <option value="amazon">Amazon</option>
                    <option value="mercado">Mercado Libre</option>
                </select>
                <select className= "px-5 py-2 rounded-full cursor-pointer flex items-center space-x-2 justify-center rounded-full py-2 px-4 bg-[#9297cd] max-w-md mx-auto text-[#ffffff] max-w-md font-bold" id="Orden" name="Orden" onChange={handleOrderChange}>
                    <option value='asc'>Menor a mayor</option>
                    <option value='des'>Mayor a menor</option>
                </select>
            </div>
            {combine && <ProductCard productos={combine}/>}
            {loading && <p>Cargando...</p>}
        </div>
    );
};

export default APIsCall;
