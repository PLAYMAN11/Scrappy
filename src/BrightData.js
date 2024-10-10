import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ApiDataFetcher = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [pending, setPending] = useState(false);
    const apiToken = process.env.BRIGHTKEY || 'b34823d1-ad0f-4b8e-bf65-a85ec974779a';

    useEffect(() => {
        const fetchData = async () => {
            try {
                const triggerResponse = await fetch("/api/dca/trigger_immediate?collector=c_m1s0qyib15thpdh5ac", {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${apiToken}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({"search":"Teclado"})
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

        fetchData();
    }, [apiToken]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (pending) {
        return <div>Processing, please wait...</div>;
    }

    return (
        <div>
            <h1>API Data</h1>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    );
};

export default ApiDataFetcher;
