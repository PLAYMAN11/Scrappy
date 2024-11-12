import axios from 'axios';

const API = async (inputValue) => {
    const apiToken = process.env.REACT_APP_BRIGHTKEY;

    let data = null;
    let error = null;
    let loading = true;
    let pending = false;

    try {

        const triggerResponse = await fetch("/dca/trigger?collector=c_m337y86o1i8vdpaki3&queue_next=1", {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({"search": inputValue})
        });

        if (!triggerResponse.ok) {
            throw new Error('Error al realizar la primera solicitud');
        }

        const triggerData = await triggerResponse.json();
        const responseID = triggerData.collection_id;

        const fetchResult = async () => {
            let resultData = null;

        while (true) {
            try {

                const resultResponse = await axios.get(`/api/dca/dataset`, {
                    params: {id: responseID},
                    headers: {Authorization: `Bearer ${apiToken}`}
                });
                resultData = resultResponse.data;
                if (resultData.status === "collecting" || resultData.status === "building") {
                    pending = true;
                    await new Promise(resolve => setTimeout(resolve, 2000));
                } else {
                    data = resultData;
                    pending = false;
                    break;
                }
            } catch (err) {
                error = err;
                pending = false;
                break;
            }
        }
    };

        await fetchResult();
    } catch (err) {
        error = err;
    } finally {
        loading = false;
    }

    return { data };
};

export default API;
