const axios = require("axios").default;
const rapidiApiKey = process.env.VUE_APP_RAPIDI_API_KEY;
const rapidiApiUrl = process.env.VUE_APP_RAPIDI_API_URL;
const rapidiApiHost = process.env.VUE_APP_RAPIDI_API_HOST;

export async function downloadAudio(value) {
  const downloadResults = [];
  for (const index in value) {
    const opts = {
      method: "GET",
      url: rapidiApiUrl,
      params: { id: value[index] },
      headers: {
        "x-rapidapi-key": rapidiApiKey,
        "x-rapidapi-host": rapidiApiHost,
      },
    };

    try {
      const response = await axios.request(opts);
      downloadResults.push({
        linkAudio: response.data.link,
        message: response.data.msg,
        title: response.data.title,
      });
    } catch (error) {
      return error.response;
    }
  }

  return downloadResults;
}
