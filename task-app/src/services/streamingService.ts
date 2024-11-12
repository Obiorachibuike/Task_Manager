import axios from 'axios';

const twitchAPI = 'https://api.twitch.tv/helix/streams';
const clientId = 'your-twitch-client-id'; // Use your own Twitch client ID

export const fetchStreamingData = async () => {
  try {
    const response = await axios.get(twitchAPI, {
      headers: {
        'Client-ID': clientId,
      },
    });
    return response.data.data;
  } catch (error) {
    throw new Error('Error fetching streaming data');
  }
};
