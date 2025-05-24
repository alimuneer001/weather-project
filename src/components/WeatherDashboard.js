"use client";

import { useState, useEffect, useRef } from 'react';

const WeatherDashboard = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [location, setLocation] = useState('');
  const [searchLocation, setSearchLocation] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);
  
  // Reference to the search input and suggestions dropdown
  const searchRef = useRef(null);
  const suggestionsRef = useRef(null);

  // This is a temporary demo key - replace with your own from https://openweathermap.org/
  const API_KEY = '5f472b7acba333cd8a035ea85a0d4d4c'; // OpenWeatherMap sample API key
  
  // Fetch current weather data by city name
  const fetchWeatherByCity = async (city) => {
    if (!city) return;
    
    setLoading(true);
    setError(null);
    
    try {
      // Fetch current weather
      const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
      );
      
      if (!weatherResponse.ok) {
        throw new Error('City not found or API error');
      }
      
      const weatherResult = await weatherResponse.json();
      setWeatherData(weatherResult);
      setLocation(weatherResult.name);
      
      // Fetch 5-day forecast
      const forecastResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`
      );
      
      if (!forecastResponse.ok) {
        throw new Error('Forecast data not available');
      }
      
      const forecastResult = await forecastResponse.json();
      setForecastData(forecastResult);
      
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
      // Fetch current weather
      const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
      );
      
      if (!weatherResponse.ok) {
        throw new Error('Location not found or API error');
      }
      
      const weatherResult = await weatherResponse.json();
      setWeatherData(weatherResult);
      setLocation(weatherResult.name);
      
      // Fetch 5-day forecast
      const forecastResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
      );
      
      if (!forecastResponse.ok) {
        throw new Error('Forecast data not available');
      }
      
      const forecastResult = await forecastResponse.json();
      setForecastData(forecastResult);
      
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

  // Fetch city suggestions based on input
  const fetchCitySuggestions = async (query) => {
    if (!query || query.length < 2) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }
    
    setLoadingSuggestions(true);
    
    try {
      // Using OpenWeatherMap's Geocoding API to get city suggestions
      const response = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${API_KEY}`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch suggestions');
      }
      
      const data = await response.json();
      
      // Format suggestions to show city, state (if available), and country
      const formattedSuggestions = data.map(item => ({
        name: item.name,
        fullName: `${item.name}${item.state ? `, ${item.state}` : ''}, ${item.country}`,
        lat: item.lat,
        lon: item.lon
      }));
      
      setSuggestions(formattedSuggestions);
      setShowSuggestions(formattedSuggestions.length > 0);
      setLoadingSuggestions(false);
    } catch (err) {
      console.error('Error fetching suggestions:', err);
      setSuggestions([]);
      setShowSuggestions(false);
      setLoadingSuggestions(false);
    }
  };
  
  // Handle input change for search
  const handleSearchInputChange = (e) => {
    const value = e.target.value;
    setSearchLocation(value);
    fetchCitySuggestions(value);
  };
  
  // Handle suggestion selection
  const handleSelectSuggestion = (suggestion) => {
    setSearchLocation(suggestion.fullName);
    fetchWeatherByCoords(suggestion.lat, suggestion.lon);
    setSuggestions([]);
    setShowSuggestions(false);
  };
  
  // Handle search form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Check if the current search text exactly matches any suggestion
    const exactMatch = suggestions.find(s => s.fullName === searchLocation);
    
    if (exactMatch) {
      // If there's an exact match, use its coordinates
      fetchWeatherByCoords(exactMatch.lat, exactMatch.lon);
    } else if (suggestions.length > 0) {
      // If no exact match but we have suggestions, use the first suggestion
      const firstSuggestion = suggestions[0];
      setSearchLocation(firstSuggestion.fullName);
      fetchWeatherByCoords(firstSuggestion.lat, firstSuggestion.lon);
    } else {
      // Fallback to city name search if no suggestions are available
      fetchWeatherByCity(searchLocation);
    }
    
    setSuggestions([]);
    setShowSuggestions(false);
  };
  
  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchRef.current && 
        !searchRef.current.contains(event.target) &&
        suggestionsRef.current && 
        !suggestionsRef.current.contains(event.target)
      ) {
        setShowSuggestions(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Format temperature
  const formatTemp = (temp) => {
    return Math.round(temp);
  };

  // Get weather icon URL
  const getWeatherIconUrl = (iconCode) => {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  };

  // Format date
  const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  // Format time
  const formatTime = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  // Group forecast data by day
  const groupForecastByDay = () => {
    if (!forecastData || !forecastData.list) return [];
    
    const grouped = {};
    
    forecastData.list.forEach(item => {
      const date = new Date(item.dt * 1000).toLocaleDateString();
      
      if (!grouped[date]) {
        grouped[date] = [];
      }
      
      grouped[date].push(item);
    });
    
    // Get one forecast per day (noon time if available)
    return Object.values(grouped).map(dayForecasts => {
      // Try to get forecast for around noon
      const noonForecast = dayForecasts.find(f => {
        const hour = new Date(f.dt * 1000).getHours();
        return hour >= 11 && hour <= 13;
      });
      
      return noonForecast || dayForecasts[0];
    }).slice(0, 5); // Limit to 5 days
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Search Bar */}
      <div className="mb-8">
        <form onSubmit={handleSubmit} className="relative">
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1" ref={searchRef}>
              <input
                type="text"
                value={searchLocation}
                onChange={handleSearchInputChange}
                onFocus={() => searchLocation.length >= 2 && setShowSuggestions(true)}
                onKeyDown={(e) => {
                  // Handle keyboard navigation for suggestions
                  if (e.key === 'ArrowDown' && showSuggestions && suggestions.length > 0) {
                    // Move focus to the first suggestion
                    const suggestionElements = suggestionsRef.current.querySelectorAll('li');
                    if (suggestionElements.length > 0) {
                      e.preventDefault();
                      suggestionElements[0].focus();
                    }
                  }
                }}
                placeholder="Search for a city..."
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                autoComplete="off"
              />
              
              {/* Loading indicator inside input */}
              {loadingSuggestions && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <svg className="animate-spin h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </div>
              )}
              
              {/* Suggestions Dropdown */}
              {showSuggestions && suggestions.length > 0 && (
                <div 
                  ref={suggestionsRef}
                  className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-lg max-h-60 overflow-y-auto"
                >
                  <ul className="py-1">
                    {suggestions.map((suggestion, index) => (
                      <li 
                        key={index}
                        className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer flex items-center"
                        onClick={() => handleSelectSuggestion(suggestion)}
                        tabIndex="0"
                        onKeyDown={(e) => {
                          // Handle keyboard selection
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            handleSelectSuggestion(suggestion);
                          } else if (e.key === 'ArrowDown') {
                            e.preventDefault();
                            const next = e.target.nextElementSibling;
                            if (next) next.focus();
                          } else if (e.key === 'ArrowUp') {
                            e.preventDefault();
                            const prev = e.target.previousElementSibling;
                            if (prev) {
                              prev.focus();
                            } else {
                              // Move focus back to input if at the top
                              searchRef.current.querySelector('input').focus();
                            }
                          } else if (e.key === 'Escape') {
                            e.preventDefault();
                            setShowSuggestions(false);
                            searchRef.current.querySelector('input').focus();
                          }
                        }}
                      >
                        <svg className="h-5 w-5 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span>{suggestion.fullName}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <button
              type="submit"
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-md hover:opacity-90 transition-opacity duration-200 font-medium"
            >
              Search
            </button>
          </div>
        </form>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600"></div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="bg-red-100 dark:bg-red-900/30 border-l-4 border-red-500 text-red-700 dark:text-red-400 p-4 rounded mb-8">
          <p className="font-medium">Error</p>
          <p>{error}</p>
        </div>
      )}

      {/* Weather Data */}
      {weatherData && !loading && (
        <div>
          {/* Current Weather */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden mb-8">
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-6">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                <div>
                  <h2 className="text-3xl font-bold">{location}</h2>
                  <p className="text-blue-100">{formatDate(weatherData.dt)} • {formatTime(weatherData.dt)}</p>
                </div>
                <div className="mt-4 md:mt-0">
                  <div className="flex items-center">
                    <img 
                      src={getWeatherIconUrl(weatherData.weather[0].icon)} 
                      alt={weatherData.weather[0].description}
                      className="w-20 h-20"
                    />
                    <div>
                      <div className="text-5xl font-bold">{formatTemp(weatherData.main.temp)}°C</div>
                      <div className="capitalize">{weatherData.weather[0].description}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <div className="text-gray-500 dark:text-gray-400 text-sm">Feels Like</div>
                  <div className="text-xl font-semibold">{formatTemp(weatherData.main.feels_like)}°C</div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <div className="text-gray-500 dark:text-gray-400 text-sm">Humidity</div>
                  <div className="text-xl font-semibold">{weatherData.main.humidity}%</div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <div className="text-gray-500 dark:text-gray-400 text-sm">Wind</div>
                  <div className="text-xl font-semibold">{Math.round(weatherData.wind.speed * 3.6)} km/h</div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <div className="text-gray-500 dark:text-gray-400 text-sm">Pressure</div>
                  <div className="text-xl font-semibold">{weatherData.main.pressure} hPa</div>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <div className="text-gray-500 dark:text-gray-400 text-sm">Visibility</div>
                  <div className="text-xl font-semibold">{(weatherData.visibility / 1000).toFixed(1)} km</div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <div className="text-gray-500 dark:text-gray-400 text-sm">Sunrise</div>
                  <div className="text-xl font-semibold">{formatTime(weatherData.sys.sunrise)}</div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <div className="text-gray-500 dark:text-gray-400 text-sm">Sunset</div>
                  <div className="text-xl font-semibold">{formatTime(weatherData.sys.sunset)}</div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <div className="text-gray-500 dark:text-gray-400 text-sm">Cloudiness</div>
                  <div className="text-xl font-semibold">{weatherData.clouds.all}%</div>
                </div>
              </div>
            </div>
          </div>

          {/* 5-Day Forecast */}
          {forecastData && (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl font-bold mb-4">5-Day Forecast</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {groupForecastByDay().map((forecast, index) => (
                    <div key={index} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg text-center">
                      <div className="font-medium">{formatDate(forecast.dt)}</div>
                      <img 
                        src={getWeatherIconUrl(forecast.weather[0].icon)} 
                        alt={forecast.weather[0].description}
                        className="w-16 h-16 mx-auto"
                      />
                      <div className="text-xl font-semibold">{formatTemp(forecast.main.temp)}°C</div>
                      <div className="text-sm capitalize text-gray-600 dark:text-gray-400">
                        {forecast.weather[0].description}
                      </div>
                      <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
                        <div className="bg-gray-100 dark:bg-gray-600 p-1 rounded">
                          <span className="block text-gray-500 dark:text-gray-400">Min</span>
                          <span className="font-medium">{formatTemp(forecast.main.temp_min)}°</span>
                        </div>
                        <div className="bg-gray-100 dark:bg-gray-600 p-1 rounded">
                          <span className="block text-gray-500 dark:text-gray-400">Max</span>
                          <span className="font-medium">{formatTemp(forecast.main.temp_max)}°</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Powered by */}
      <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
        Powered by <a href="https://openweathermap.org/" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">OpenWeatherMap</a>
      </div>
    </div>
  );
};

export default WeatherDashboard;
