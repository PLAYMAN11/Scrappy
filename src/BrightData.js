import React, { useEffect } from 'react';

const MyComponent = () => {
    useEffect(() => {
        const triggerRequest = async () => {
            const apiUrl = 'https://api.brightdata.com/datasets/v3/trigger?dataset_id=gd_l7q7dkf244hwjntr0&type=discover_new&discover_by=keyword';
            const data = [
                { "keyword": "light bulb" }
            ];
            const apiToken = process.env.BRIGHTKEY;

            try {
                const response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${apiToken}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });

                if (!response.ok) {
                    throw new Error('Error en la solicitud');
                }

                const result = await response.json();
                console.log(result); // Maneja la respuesta aquí

            } catch (error) {
                console.error('Error:', error);
            }
        };

        triggerRequest();
    }, []);

    return (
        <div>
            <h1>Realizando Solicitud...</h1>
        </div>
    );
};

export default MyComponent;
