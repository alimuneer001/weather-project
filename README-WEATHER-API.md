# Weather API Integration Guide

This guide explains how to set up and use the weather widget in your navbar.

## Getting Your OpenWeatherMap API Key

1. Visit [OpenWeatherMap](https://openweathermap.org/) and create a free account
2. After signing in, go to your profile and navigate to "API Keys"
3. Generate a new API key (or use the default one provided)
4. Copy your API key

## Setting Up the Weather Widget

1. Open the `src/components/WeatherWidget.js` file
2. Replace the placeholder API key with your actual OpenWeatherMap API key:

```javascript
// Line 13: Replace 'YOUR_API_KEY' with your actual API key
const API_KEY = 'YOUR_API_KEY'; // Replace with your actual API key
```

## Features of the Weather Widget

- **Automatic Location Detection**: The widget uses geolocation to detect the user's location and display local weather
- **Search Functionality**: Users can search for weather in any city
- **Responsive Design**: Works well on both desktop and mobile interfaces
- **Detailed Weather Information**: Shows temperature, feels like, humidity, wind speed, and pressure
- **Dark Mode Support**: Automatically adapts to your site's light/dark theme

## Customization Options

You can customize the weather widget by modifying the following:

- **Units**: Change from metric (Celsius) to imperial (Fahrenheit) by modifying the API URL in the fetch calls:
  - Replace `units=metric` with `units=imperial` in both fetch functions

- **Default City**: If geolocation fails, the widget defaults to London. You can change this by modifying:
  ```javascript
  fetchWeatherByCity('London'); // Change 'London' to your preferred default city
  ```

- **Styling**: The widget uses Tailwind CSS classes that you can modify to match your site's design

## Troubleshooting

- **API Key Issues**: If you see "City not found or API error", verify your API key is correct
- **CORS Issues**: OpenWeatherMap allows requests from localhost during development. For production, ensure your domain is properly configured
- **Rate Limiting**: The free tier of OpenWeatherMap has a limit of 1,000 API calls per day. Monitor your usage if needed

## Additional Resources

- [OpenWeatherMap API Documentation](https://openweathermap.org/api)
- [OpenWeatherMap Weather Conditions](https://openweathermap.org/weather-conditions)
