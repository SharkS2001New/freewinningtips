async function getAdminSelectedFreePredictionsData(fetch_url,fixture_date) {    
    const headers = { 
        "Authorization": "UJlhuDILIR1Lc2IEwZDIKOln9d",
        "Content-Type": "application/json" // Set the Content-Type header for POST requests
    };

    const requestData = {
        fixture_date: fixture_date
    };

    try {
        // Fetch fixtures with POST method
        const response = await fetch(fetch_url, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(requestData) // Include the request data in the body
        });

        const data = await response.json();
    
        return data;          

    } catch (error) {
        console.error(error);
        // Handle error here, e.g., show a message to the user
    }
}
 
export default getAdminSelectedFreePredictionsData;