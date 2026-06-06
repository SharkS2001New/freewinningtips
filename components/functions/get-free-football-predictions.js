import { API_AUTH } from '@/components/functions/apiConfig';

async function getFreePredictionsData(fetchUrl) {
  try {
    const response = await fetch(fetchUrl, {
      headers: { Authorization: API_AUTH },
    });
    return response.json();
  } catch (error) {
    console.error(error);
  }
}

export default getFreePredictionsData;
