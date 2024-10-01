import axios from 'axios';

// Weather API KEY
const apiKey: string = 'f5cd0d517b12491ead694804242409';

// Endpoint
const apiBaseUrl: string = 'https://api.weatherapi.com/v1';

const searchLocationEndpoint = (city: string) =>
  `${apiBaseUrl}/search.json?key=${apiKey}&q=${city}`;

const dailyForecastEndpoint = (city: string) =>
  `${apiBaseUrl}/forecast.json?key=${apiKey}&q=${city}&days=7`;

const currentWeatherEndpoint = (city: string) =>
  `${apiBaseUrl}/current.json?key=${apiKey}&q=${city}`;

// API Call
const apiCall = async (endpoint: string, params = {}) => {
  const options = {
    method: 'GET',
    url: endpoint,
    params,
  };
  try {
    const res = await axios.request(options);
    return res.data;
  } catch (error) {
    console.error(error);
    return {};
  }
};

// Fetching Endpoint
export const fetchCurrentWeather = (city: string) => {
  return apiCall(currentWeatherEndpoint(city));
};

export const fetchDailyForecast = (city: string) => {
  return apiCall(dailyForecastEndpoint(city));
};

export const fetchSearchLocations = (city: string) => {
  return apiCall(searchLocationEndpoint(city));
};
