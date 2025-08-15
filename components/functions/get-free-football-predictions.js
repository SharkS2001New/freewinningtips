async function getFreePredictionsData(fetch_url) {    
    const headers = { "Authorization": "R9TxV3PbOEu7qZnJKgydC5LmX2" }; // This is the authorization header from the api.pitchpredictions.com

    try {
        // Fetch fixtures 
        const response = await fetch(fetch_url,{
            headers: headers
        });

        const data = await response.json();
    
        return data;          

    } catch (error) {
        console.error(error);
        // Handle error here, e.g. show a message to the user
    }
}

export default getFreePredictionsData;