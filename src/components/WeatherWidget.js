"use client";

import { useState, useEffect } from 'react';

const WeatherWidget = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState('');
  const [searchLocation, setSearchLocation] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  // You'll need to sign up for a free API key at OpenWeatherMap
  // This is a temporary demo key - replace with your own from https://openweathermap.org/
  const API_KEY = '5f472b7acba333cd8a035ea85a0d4d4c'; // OpenWeatherMap sample API key
  
  // Fetch weather data by city name
  const fetchWeatherByCity = async (city) => {
    if (!city) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
        
      );
      console.log(response);
      
      if (!response.ok) {
        throw new Error('City not found or API error');
      }
      
      const data = await response.json();
      setWeatherData(data);
      setLocation(data.name);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  // Fetch weather data by geolocation
  const fetchWeatherByCoords = async (lat, lon) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
      );
      
      if (!response.ok) {
        throw new Error('Location not found or API error');
      }
      
      const data = await response.json();
      setWeatherData(data);
      setLocation(data.name);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  // Get user's current location on initial load
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchWeatherByCoords(position.coords.latitude, position.coords.longitude);
        },
        (err) => {
          setError("Couldn't get your location. Please search for a city.");
          // Default to a major city if geolocation fails
          fetchWeatherByCity('London');
        }
      );
    } else {
      setError("Geolocation is not supported by your browser");
      // Default to a major city if geolocation is not supported
      fetchWeatherByCity('London');
    }
  }, []);

  // Handle search form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeatherByCity(searchLocation);
    setSearchLocation('');
    setIsOpen(false);
  };

  // Format temperature
  const formatTemp = (temp) => {
    return Math.round(temp);
  };

  // Get weather icon URL
  const getWeatherIconUrl = (iconCode) => {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  };

  // Toggle dropdown
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      {/* Weather Button */}
      <button 
        onClick={toggleDropdown}
        className="flex items-center text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
        aria-label="Weather information"
      >
        <div className="flex items-center">
          {weatherData && (
            <>
              <img 
                src={getWeatherIconUrl(weatherData.weather[0].icon)} 
                alt={weatherData.weather[0].description}
                className="w-8 h-8"
              />
              <span className="ml-1 font-medium hidden sm:inline">
                {formatTemp(weatherData.main.temp)}°C
              </span>
            </>
          )}
          {!weatherData && !error && (
            <svg className="animate-spin h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          )}
          {error && (
            <svg className="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          )}
        </div>
      </button>

      {/* Weather Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-gray-800 rounded-lg shadow-xl z-50 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Weather</h3>
              {location && <span className="text-sm opacity-90">{location}</span>}
            </div>
          </div>

          {/* Content */}
          <div className="p-4">
            {/* Search Form */}
            <form onSubmit={handleSubmit} className="mb-4">
              <div className="flex">
                <input
                  type="text"
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                  placeholder="Search city..."
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                />
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
            </form>

            {/* Weather Display */}
            {loading && (
              <div className="flex justify-center items-center py-8">
                <svg className="animate-spin h-8 w-8 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
            )}

            {error && (
              <div className="bg-red-100 dark:bg-red-900/30 border-l-4 border-red-500 text-red-700 dark:text-red-400 p-4 rounded">
                <p>{error}</p>
              </div>
            )}

            {weatherData && !loading && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <img 
                      src={getWeatherIconUrl(weatherData.weather[0].icon)} 
                      alt={weatherData.weather[0].description}
                      className="w-16 h-16"
                    />
                    <div className="ml-2">
                      <div className="text-3xl font-bold">{formatTemp(weatherData.main.temp)}°C</div>
                      <div className="text-gray-600 dark:text-gray-400 capitalize">{weatherData.weather[0].description}</div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                    <div className="text-gray-500 dark:text-gray-400">Feels Like</div>
                    <div className="font-medium">{formatTemp(weatherData.main.feels_like)}°C</div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                    <div className="text-gray-500 dark:text-gray-400">Humidity</div>
                    <div className="font-medium">{weatherData.main.humidity}%</div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                    <div className="text-gray-500 dark:text-gray-400">Wind</div>
                    <div className="font-medium">{Math.round(weatherData.wind.speed * 3.6)} km/h</div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                    <div className="text-gray-500 dark:text-gray-400">Pressure</div>
                    <div className="font-medium">{weatherData.main.pressure} hPa</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="bg-gray-50 dark:bg-gray-700 px-4 py-3 text-xs text-gray-500 dark:text-gray-400">
            <div className="flex justify-between items-center">
              <span>Powered by OpenWeatherMap</span>
              <button 
                onClick={toggleDropdown}
                className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherWidget;
