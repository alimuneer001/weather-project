import Image from "next/image";

export default function Portfolio() {
  // Sample portfolio projects
  const projects = [
    {
      id: 1,
      title: "Weather Forecasting App",
      description: "A mobile application providing real-time weather forecasts with interactive maps and severe weather alerts.",
      image: "https://images.unsplash.com/photo-1601134467661-3d775b999c8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      category: "Mobile App",
      technologies: ["React Native", "OpenWeatherMap API", "Node.js"],
      link: "#"
    },
    {
      id: 2,
      title: "Climate Data Visualization",
      description: "Interactive dashboard visualizing climate trends and patterns using historical weather data.",
      image: "https://images.unsplash.com/photo-1590856029826-c7a73142bbf1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      category: "Web Application",
      technologies: ["D3.js", "React", "Python", "MongoDB"],
      link: "#"
    },
    {
      id: 3,
      title: "Agricultural Weather Service",
      description: "Specialized weather forecasting system for farmers with soil moisture, frost alerts, and crop-specific recommendations.",
      image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      category: "Enterprise Solution",
      technologies: ["AWS", "Machine Learning", "IoT Sensors", "React"],
      link: "#"
    },
    {
      id: 4,
      title: "Severe Weather Alert System",
      description: "Early warning system for severe weather events with automated notifications and safety recommendations.",
      image: "https://images.unsplash.com/photo-1605727216801-e27ce1d0cc28?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      category: "Public Safety",
      technologies: ["Python", "Twilio API", "Weather Radar Data", "GIS"],
      link: "#"
    },
    {
      id: 5,
      title: "Weather Data API",
      description: "RESTful API service providing comprehensive weather data for developers and third-party applications.",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      category: "API Service",
      technologies: ["Node.js", "Express", "MongoDB", "Docker"],
      link: "#"
    },
    {
      id: 6,
      title: "Historical Weather Analysis",
      description: "Data analysis platform for historical weather patterns with predictive modeling for climate research.",
      image: "https://images.unsplash.com/photo-1581922819941-6ab31ab79afc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      category: "Data Science",
      technologies: ["Python", "TensorFlow", "Pandas", "Jupyter"],
      link: "#"
    }
  ];

  // Categories for filtering
  const categories = ["All", "Mobile App", "Web Application", "Enterprise Solution", "Public Safety", "API Service", "Data Science"];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-purple-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Our Weather Projects
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              Explore our portfolio of innovative weather solutions, from mobile apps to enterprise systems and data visualization projects.
            </p>
          </div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((category, index) => (
              <button
                key={index}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  category === "All" 
                    ? "bg-blue-600 text-white" 
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          
          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div 
                key={project.id} 
                className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col"
              >
                <div className="relative h-60 w-full">
                  <Image 
                    src={project.image} 
                    alt={project.title}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                  <div className="absolute top-4 right-4">
                    <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                      {project.category}
                    </span>
                  </div>
                </div>
                <div className="p-6 flex-grow">
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, index) => (
                      <span 
                        key={index} 
                        className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs px-2 py-1 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700 border-t border-gray-100 dark:border-gray-600">
                  <a 
                    href={project.link} 
                    className="text-blue-600 dark:text-blue-400 font-medium hover:text-blue-800 dark:hover:text-blue-300 transition-colors flex items-center"
                  >
                    View Project
                    <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Client Testimonials */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Client Testimonials</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              What our clients say about our weather solutions
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote: "The agricultural weather service has transformed how we plan our farming operations. The soil moisture predictions and frost alerts are incredibly accurate.",
                name: "Robert Johnson",
                title: "Farm Owner, Green Valley Farms",
                image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
              },
              {
                quote: "Implementing the severe weather alert system has significantly improved our emergency response times. The automated notifications are reliable and timely.",
                name: "Sarah Williams",
                title: "Emergency Services Director",
                image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
              },
              {
                quote: "The weather data API is exceptionally well-documented and reliable. It's been seamless to integrate into our outdoor recreation platform.",
                name: "Michael Chen",
                title: "CTO, AdventureTech",
                image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white dark:bg-gray-700 p-8 rounded-lg shadow-md">
                <div className="flex items-center mb-6">
                  <div className="relative h-12 w-12 rounded-full overflow-hidden mr-4">
                    <Image 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  <div>
                    <h4 className="font-bold">{testimonial.name}</h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">{testimonial.title}</p>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300 italic">"{testimonial.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-10 md:p-16 text-center text-white">
            <h2 className="text-3xl font-bold mb-6">Ready to Work With Us?</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Let's discuss how our weather solutions can help your business or organization.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="bg-white text-blue-600 px-8 py-3 rounded-md hover:bg-gray-100 transition-colors duration-200 font-medium">
                Contact Us
              </button>
              <button className="bg-blue-500 bg-opacity-30 text-white px-8 py-3 rounded-md hover:bg-opacity-40 transition-colors duration-200 font-medium">
                View More Projects
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
