"use client";

import Image from "next/image";
import WeatherDashboard from "../components/WeatherDashboard";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function Home() {
  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };
  
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  
  // Use InView hooks for scroll animations
  const [heroRef, heroInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });
  
  const [featuresRef, featuresInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });
  
  const [dashboardRef, dashboardInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <motion.section 
        ref={heroRef}
        initial="hidden"
        animate={heroInView ? "visible" : "hidden"}
        variants={fadeIn}
        className="py-20 bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-800"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <motion.div 
              className="md:w-1/2 mb-10 md:mb-0"
              variants={{
                hidden: { opacity: 0, x: -50 },
                visible: { 
                  opacity: 1, 
                  x: 0,
                  transition: { duration: 0.6, delay: 0.2 }
                }
              }}
            >
              <motion.h1 
                className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 1, transition: { duration: 0.8 } }
                }}
              >
                Weather Dashboard
              </motion.h1>
              <motion.p 
                className="text-lg text-gray-600 dark:text-gray-300 mb-8"
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 1, transition: { duration: 0.8, delay: 0.3 } }
                }}
              >
                A professional weather application with real-time data, forecasts, and beautiful UI.
              </motion.p>
              <motion.div 
                className="flex flex-col sm:flex-row gap-4"
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 1, transition: { duration: 0.8, delay: 0.4 } }
                }}
              >
                <motion.button 
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-md hover:opacity-90 transition-opacity duration-200 font-medium"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Get Started
                </motion.button>
                <motion.button 
                  className="bg-white dark:bg-gray-800 text-gray-800 dark:text-white border border-gray-300 dark:border-gray-700 px-6 py-3 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 font-medium"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Learn More
                </motion.button>
              </motion.div>
            </motion.div>
            <motion.div 
              className="md:w-1/2 flex justify-center"
              variants={{
                hidden: { opacity: 0, x: 50 },
                visible: { 
                  opacity: 1, 
                  x: 0,
                  transition: { duration: 0.6, delay: 0.4 }
                }
              }}
            >
              <div className="relative w-full max-w-md h-80 md:h-96">
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-lg"
                  animate={{ rotate: 3 }}
                  initial={{ rotate: 0 }}
                  transition={{ duration: 0.6 }}
                ></motion.div>
                <motion.div 
                  className="absolute inset-0 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl p-6 flex items-center justify-center"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                >
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
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Full Weather Dashboard */}
      <motion.section 
        className="py-10"
        ref={dashboardRef}
        initial="hidden"
        animate={dashboardInView ? "visible" : "hidden"}
        variants={fadeIn}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-10"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
            }}
          >
            <h2 className="text-3xl font-bold mb-4">Live Weather Dashboard</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Get real-time weather data for any location with our professional weather dashboard
            </p>
          </motion.div>
          
          {/* Weather Dashboard Component */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.3 } }
            }}
          >
            <WeatherDashboard />
          </motion.div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section 
        className="py-20"
        ref={featuresRef}
        initial="hidden"
        animate={featuresInView ? "visible" : "hidden"}
        variants={staggerContainer}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            variants={fadeIn}
          >
            <h2 className="text-3xl font-bold mb-4">Weather Features</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Our professional weather dashboard comes with everything you need
            </p>
          </motion.div>
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={staggerContainer}
          >
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
              <motion.div 
                key={index} 
                className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-md hover:shadow-lg transition-shadow duration-300"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { 
                    opacity: 1, 
                    y: 0,
                    transition: { duration: 0.5, delay: index * 0.1 } 
                  }
                }}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}
