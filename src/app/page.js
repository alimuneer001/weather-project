import Image from "next/image";
import WeatherDashboard from "../components/WeatherDashboard";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Weather Dashboard
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                A professional weather application with real-time data, forecasts, and beautiful UI.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-md hover:opacity-90 transition-opacity duration-200 font-medium">
                  Get Started
                </button>
                <button className="bg-white dark:bg-gray-800 text-gray-800 dark:text-white border border-gray-300 dark:border-gray-700 px-6 py-3 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 font-medium">
                  Learn More
                </button>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="relative w-full max-w-md h-80 md:h-96">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-lg transform rotate-3"></div>
                <div className="absolute inset-0 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl p-6 flex items-center justify-center">
                  <div className="w-full">
                    <div className="w-full h-10 bg-gray-100 dark:bg-gray-700 rounded-md mb-4 flex items-center px-3">
                      <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                      <div className="flex-1 h-4 bg-gray-200 dark:bg-gray-600 rounded-sm ml-2"></div>
                    </div>
                    <div className="w-full h-6 bg-blue-600 rounded-t-md flex items-center px-4">
                      <div className="w-4 h-4 bg-white rounded-full mr-2 opacity-70"></div>
                      <div className="text-white text-xs font-medium">Weather App</div>
                    </div>
                    <div className="w-full h-40 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-b-md p-3">
                      <div className="flex justify-between items-center mb-4">
                        <div className="w-16 h-4 bg-blue-100 dark:bg-blue-900 rounded"></div>
                        <div className="flex space-x-3">
                          <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-xs">☀️</div>
                        </div>
                      </div>
                      <div className="space-y-3">
                        {[1, 2, 3].map((i) => (
                          <div key={i} className="w-full h-6 bg-gray-100 dark:bg-gray-800 rounded"></div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Full Weather Dashboard */}
      <section className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4">Live Weather Dashboard</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Get real-time weather data for any location with our professional weather dashboard
            </p>
          </div>
          
          {/* Weather Dashboard Component */}
          <WeatherDashboard />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Weather Features</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Our professional weather dashboard comes with everything you need
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Real-Time Data',
                description: 'Get the latest weather information from around the world',
                icon: '🌍'
              },
              {
                title: '5-Day Forecast',
                description: 'Plan ahead with accurate 5-day weather predictions',
                icon: '📅'
              },
              {
                title: 'Detailed Metrics',
                description: 'View humidity, wind speed, pressure, and more',
                icon: '📊'
              }
            ].map((feature, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
