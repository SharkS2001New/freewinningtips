import { getServerApiHeaders } from '@/components/functions/apiConfig';

async function getFreePredictionsData(fetchUrl) {
  try {
    const response = await fetch(fetchUrl, {
      headers: getServerApiHeaders(),
    });
    return response.json();
  } catch (error) {
    console.error(error);
  }
}

export default getFreePredictionsData;
