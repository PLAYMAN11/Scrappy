//import mercadolibre from './ScrapMercadoLibre';
//import amazon from './BrightData';
//import ProductCard from './components/ProductCard.js';
//import React, { useState, useEffect, useRef } from 'react';
//import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
//
//function sortJSON(data, orden) {
//    return data.sort((a, b) => {
//        const x = parseFloat(a.price);
//        const y = parseFloat(b.price);
//        console.log(orden)
//        return orden == 'asc' ? x - y : y - x;
//    });
//}
//
//function Combine(JSON1, JSON2) {
//
//    let JSON11 = JSON.parse(JSON.stringify(JSON1));
//    let JSON22 = JSON.parse(JSON.stringify(JSON2));
//    let combined = [];
//
//    for (let i = 0; i < 50; i++) {
//        if (JSON11.data[i]) combined.push(JSON11.data[i]);
//        if (JSON22.data[i]) combined.push(JSON22.data[i]);
//    }
//    return combined;
//}
//
//const APIsCall = () => {
//    const videoRef = useRef(null);
//    const [videoRate, setvideoRate] = useState(null)
//    const [inputValue, setInputValue] = useState('');
//    const [loading, setLoading] = useState(false);
//    const [combine, setCombine] = useState(null);
//    const [apisData, setApisData] = useState(null);
//    const [plat, setPlat] = useState("");
//    const [orden, setorden]=useState('asc');
//
//    useEffect(() => {
//        if (videoRef.current) {
//            videoRef.current.playbackRate = 0.75;
//        }
//    }, [loading]);
//
//    const handleSearch = async (e) => {
//        e.preventDefault();
//        setLoading(true);
//
//        try {
//            const mercadoResponse = await mercadolibre(inputValue);
//            const amazonResponse = await amazon(inputValue);
//
//            const combinedData = sortJSON(Combine(mercadoResponse, amazonResponse),orden);
//            setApisData(combinedData);
//            setCombine(combinedData);
//        } catch (error) {
//            console.error("Error fetching data:", error);
//        } finally {
//            setLoading(false);
//        }
//    };
//
//    const handleSelect = (e) => {
//        const selectedPlatform = typeof e === "string" ? e : e.target.value;
//        setPlat(selectedPlatform);
//
//        if (!apisData) return;
//
//        const filteredData = selectedPlatform === "amazon"
//            ? apisData.filter(item => item.plataforma === 'Amazon')
//            : selectedPlatform === "mercado"
//                ? apisData.filter(item => item.plataforma === 'MercadoLibre')
//                : apisData;
//
//        setCombine(sortJSON(filteredData, orden));
//    };
//    const handleOrderChange = (e) => {
//        const selectedOrder = e.target.value;
//        setorden(selectedOrder);
//
//        if (!combine) return;
//
//        const sortedData = sortJSON(combine, selectedOrder);
//        setCombine(sortedData);
//    };
//
//
//    return (
//        <div className="bg-indigo-200">
//            <div className="flex items-center justify-between bg-indigo-300 p-4 h-20">
//            <form
//                className="flex items-center space-x-2 justify-center rounded-full py-2 px-4 bg-indigo-400 opacity-70 max-w-md mx-auto"
//                onSubmit={handleSearch}
//            >
//                <input
//                    type="text"
//                    value={inputValue}
//                    onChange={(e) => setInputValue(e.target.value)}
//                    placeholder="Buscar productos..."
//                    className="flex-1 outline-none bg-transparent text-white placeholder:text-white mr-16"
//                />
//                <button
//                    type="button"
//                    onClick={handleSearch}
//                    className="flex items-center justify-center"
//                >
//                    <MagnifyingGlassIcon className="h-6 w-6 text-white" />
//                </button>
//            </form>
//
//            </div>
//
//            <div className="flex space-x-4 items-center justify-center mt-4">
//                <select className= " px-5 py-2 rounded-full cursor-pointer flex items-center space-x-2 justify-center rounded-full py-2 px-4 bg-[#9297cd] text-[#ffffff] max-w-md font-bold"id="Presentacion" name="Presentacion" onChange={handleSelect}>
//                    <img width= "10"src="/src/icon.svg"/>
//                    <option value="combinado">Combinado</option>
//                    <option value="amazon">Amazon</option>
//                    <option value="mercado">Mercado Libre</option>
//                </select>
//                <select className= "px-5 py-2 rounded-full cursor-pointer flex items-center space-x-2 justify-center rounded-full py-2 px-4 bg-[#9297cd] max-w-md mx-auto text-[#ffffff] max-w-md font-bold" id="Orden" name="Orden" onChange={handleOrderChange}>
//                    <option value='asc'>Menor precio</option>
//                    <option value='des'>Mayor precio</option>
//                </select>
//            </div>
//            {combine && <ProductCard productos={combine}/>}
//            {loading && (
//                <video ref={videoRef} autoPlay loop muted style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', objectFit: 'cover'}}>
//                    <source src="/Animation%20-%201732217162462.webm" type="video/webm"/>
//                    Tu navegador no soporta este formato de video.
//                </video>)}
//        </div>)
//}
//
//export default APIsCall;

import React, { useState, useEffect, useRef } from "react";
import mercadolibre from "./ScrapMercadoLibre";
import amazon from "./BrightData";
import ProductCard from "./components/ProductCard.js";
import { MagnifyingGlassIcon, AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline';

function sortJSON(data, order) {
    return data.sort((a, b) => {
    const x = parseFloat(a.price);
    const y = parseFloat(b.price);
    return order === "asc" ? x - y : y - x;
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
    return combined;
}

const APIsCall = () => {
    const [inputValue, setInputValue] = useState("");
    const [loading, setLoading] = useState(false);
    const [combine, setCombine] = useState(null);
    const [apisData, setApisData] = useState(null);
    const videoRef = useRef(null);
    const [videoRate, setvideoRate] = useState(null);
    const [selectedPlatforms, setSelectedPlatforms] = useState({
        amazon: true,
        mercado: true,
    });
    const [order, setOrder] = useState("asc");
    const [filtersVisible, setFiltersVisible] = useState(false);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.playbackRate = 0.75;
        }
    }, [loading]);

    const toggleFilters = () => {
        setFiltersVisible(!filtersVisible);
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const mercadoResponse = await mercadolibre(inputValue);
            const amazonResponse = await amazon(inputValue);

            const combinedData = Combine(mercadoResponse, amazonResponse);
            setApisData(combinedData);
            filterData(combinedData, selectedPlatforms, order);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    const handlePlatformChange = (platform) => {
        const updatedPlatforms = {
          ...selectedPlatforms,
            [platform]: !selectedPlatforms[platform],
        };

        if (Object.values(updatedPlatforms).some((isSelected) => isSelected)) {
            setSelectedPlatforms(updatedPlatforms);
            filterData(apisData, updatedPlatforms, order);
        }
    };

    const handleOrderChange = (e) => {
        const selectedOrder = e.target.value;
        setOrder(selectedOrder);
        filterData(apisData, selectedPlatforms, selectedOrder);
    };

    const filterData = (data, platforms, order) => {
        if (!data) return;

        const filteredData = data.filter((item) =>
            platforms.amazon && item.plataforma === "Amazon"
            ? true
            : platforms.mercado && item.plataforma === "MercadoLibre"
        );

        setCombine(sortJSON(filteredData, order));
    };

    return (
        <div className="bg-indigo-200">
            <div className="flex items-center justify-center bg-indigo-300 p-4 h-20">
                <div className="flex items-center space-x-8">
                    <form
                      className="flex items-center space-x-2 justify-center rounded-full py-2 px-4 bg-indigo-400 opacity-70 max-w-md mx-auto"
                      onSubmit={handleSearch}
                    >
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder="Buscar productos..."
                            className="flex-1 outline-none bg-transparent text-white placeholder:text-white"
                        />
                        <button
                            type="button"
                            onClick={handleSearch}
                            className="flex items-center justify-center"
                        >
                            <MagnifyingGlassIcon className="h-6 w-6 text-white" />
                        </button>
                    </form>

                    <div className="flex items-center space-x-4">
                        <div
                            className="cursor-pointer"
                            onClick={toggleFilters}
                        >
                            <AdjustmentsHorizontalIcon className="h-8 w-8 text-white rounded-full bg-indigo-400 opacity-70 p-1" />
                        </div>

                        {filtersVisible && (
                            <div className="flex space-x-8 text-indigo-800">

                                <label className="flex items-center space-x-2">
                                    <span>Plataformas</span>
                                </label>

                                <div className="flex flex-col space-y-2">
                                  <label className="flex items-center space-x-2">
                                    <input
                                      type="checkbox"
                                      id="amazon"
                                      checked={selectedPlatforms.amazon}
                                      onChange={() => handlePlatformChange("amazon")}
                                      className="peer hidden"
                                    />
                                    <span className="w-5 h-5 border-2 border-indigo-500 rounded-sm peer-checked:bg-indigo-400 peer-checked:border-transparent peer-checked:ring-2 peer-checked:ring-indigo-500 cursor-pointer"></span>
                                    <span>Amazon</span>
                                  </label>

                                  <label className="flex items-center space-x-2">
                                    <input
                                      type="checkbox"
                                      id="mercado"
                                      checked={selectedPlatforms.mercado}
                                      onChange={() => handlePlatformChange("mercado")}
                                      className="peer hidden"
                                    />
                                    <span className="w-5 h-5 border-2 border-indigo-500 rounded-sm peer-checked:bg-indigo-400 peer-checked:border-transparent peer-checked:ring-2 peer-checked:ring-indigo-500 cursor-pointer"></span>
                                    <span>Mercado Libre</span>
                                  </label>
                                </div>

                                <label className="flex items-center">
                                    <span>Orden de precios</span>
                                </label>

                                <div className="flex flex-col space-y-2">
                                  <label className="flex items-center space-x-2">
                                    <input
                                      type="radio"
                                      name="order"
                                      value="asc"
                                      checked={order === "asc"}
                                      onChange={handleOrderChange}
                                      className="peer hidden"
                                    />
                                    <span className="w-5 h-5 border-2 border-indigo-500 rounded-full flex items-center justify-center peer-checked:bg-indigo-400 peer-checked:ring-2 peer-checked:ring-indigo-300 cursor-pointer">
                                      <span className="w-3 h-3 rounded-full bg-white hidden peer-checked:block"></span>
                                    </span>
                                    <span>Menor precio</span>
                                  </label>

                                  <label className="flex items-center space-x-2">
                                    <input
                                      type="radio"
                                      name="order"
                                      value="desc"
                                      checked={order === "desc"}
                                      onChange={handleOrderChange}
                                      className="peer hidden"
                                    />
                                    <span className="w-5 h-5 border-2 border-indigo-500 rounded-full flex items-center justify-center peer-checked:bg-indigo-400 peer-checked:ring-2 peer-checked:ring-indigo-300 cursor-pointer">
                                      <span className="w-3 h-3 rounded-full bg-white hidden peer-checked:block"></span>
                                    </span>
                                    <span>Mayor precio</span>
                                  </label>
                                </div>

                            </div>
                        )}
                    </div>
                </div>
            </div>

            {combine && <ProductCard productos={combine} />}
            {loading && (
                <video
                    ref={videoRef}
                    autoPlay
                    loop
                    muted
                    style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        objectFit: "cover",
                    }}
                >
                    <source src="/Animation%20-%201732217162462.webm" type="video/webm" />
                    Tu navegador no soporta este formato de video.
                </video>
            )}
        </div>
    );
};

export default APIsCall;
