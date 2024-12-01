const axios = require("axios").default;
const youtubeApiKey = process.env.VUE_APP_YOUTUBE_API_KEY;
const urlSearch = process.env.VUE_APP_YOUTUBE_URL;

export async function searchVideoOnYouTube(value) {
  const url = `${urlSearch}?key=${youtubeApiKey}&q=${value}&type=video&part=snippet&order=relevance`;

  const opts = { 
    method: "GET",
    url: url,

  }
  const search = await axios.request(opts)
    .then(res => res.data.items)
    .catch(error => error.response)

  const searchResult = search.map((item) => {
    return {
      videoId: item.id.videoId,
      title: item.snippet.title,
      description: item.snippet.description,
      thumbnails: item.snippet.thumbnails,
      channelTitle: item.snippet.channelTitle,
      publishedAt: item.snippet.publishedAt,
    };
  });

  return searchResult;
}
