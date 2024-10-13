import React, { useState } from 'react';
import axios from 'axios';

const API = () => {
    const [inputValue, setInputValue] = useState('');
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [pending, setPending] = useState(false);
    const apiToken = process.env.REACT_APP_BRIGHTKEY;

    const fetchApiData = async () => {
        setLoading(true);
        try {
            const triggerResponse = await fetch("/api/dca/trigger_immediate?collector=c_m1s0qyib15thpdh5ac", {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${apiToken}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ "search": inputValue })
            });

            if (!triggerResponse.ok) {
                throw new Error('Error al realizar la primera solicitud');
            }

            const triggerData = await triggerResponse.json();
            const responseID = triggerData.response_id;

            const fetchResult = async () => {
                const resultResponse = await axios.get(`/api/dca/get_result`, {
                    params: { response_id: responseID },
                    headers: { Authorization: `Bearer ${apiToken}` }
                });

                const resultData = resultResponse.data;

                if (resultData.pending) {
                    setPending(true);
                    setTimeout(fetchResult, 3000);
                } else {
                    setPending(false);
                    setData(resultData);
                }
            };

            fetchResult();
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <input
                type='text'
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder='Ingrese el producto a encontrar'
            />
            <button onClick={fetchApiData}>Fetch Data</button>

            {loading && <div>Loading...</div>}
            {error && <div>Error: {error.message}</div>}
            {pending && <div>Processing, please wait...</div>}

            {data && (
                <div>
                    <h1>API Data</h1>
                    <pre>{JSON.stringify(data, null, 2)}</pre>
                </div>
            )}
        </div>
    );
};

export default API;
