"use client";

import React, { useEffect, useState } from "react";

// Function to fetch weather for a city
async function getWeather(city: string) {
  const url = `https://api.weatherapi.com/v1/current.json?key=28ddc184243642a8935185544240410&q=${city}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

function Page() {
  // Define the structure of weather data
  interface WeatherData {
    location: {
      name: string;
      country: string;
      region: string;
    };
    current: {
      temp_c: number;
      condition: {
        text: string;
        icon: string;
      };
    };
  }

  // State to store the city name and weather data
  const [city, setCity] = useState<string>("");
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Function to fetch weather based on the user input
  const fetchWeatherData = async () => {
    setLoading(true);
    try {
      const data = await getWeather(city);
      if (data && data.location && data.current) {
        setWeatherData(data); // Update state with fetched weather data
      } else {
        setWeatherData(null); // If no valid data is fetched, reset the weather data
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Trigger fetchWeatherData when the component mounts
  useEffect(() => {
    fetchWeatherData();
  }, []); // Only run once on initial mount

  // Handle city input changes
  const handleCityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCity(event.target.value);
  };

  // Fetch weather when user submits a new city
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent page reload
    fetchWeatherData(); // Fetch new weather data based on the city
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-500 to-sky-600">
      <div className="bg-white shadow-xl rounded-xl py-10 px-16 max-w-lg w-full text-center">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col mb-6">
            <input
              className="mb-4 p-3 rounded-full text-black text-lg border-2 border-blue-300 focus:outline-none focus:border-blue-500 transition-colors"
              type="text"
              value={city}
              onChange={handleCityChange}
              placeholder="Enter city"
              list="cities"
            />
            <datalist id="cities">
              <option value="Lahore" />
              <option value="Karachi" />
              <option value="Islamabad" />
              <option value="Peshawar" />
              <option value="Quetta" />
              <option value="Multan" />
              <option value="Faisalabad" />
              <option value="Rawalpindi" />
              <option value="Sahiwal" />

              {/* You can add more cities here */}
            </datalist>
            <button
              type="submit"
              className="bg-gradient-to-r from-sky-600 to-blue-500 text-white px-6 py-2 rounded-full text-lg hover:shadow-lg transition-shadow duration-300"
            >
              Get Weather
            </button>
          </div>
        </form>

        <h1 className="text-2xl font-bold mb-6 text-blue-700">Weather</h1>

        {loading ? (
          <p className="text-blue-500 text-center">Loading weather data...</p>
        ) : weatherData ? (
          <div className="flex flex-col gap-4 justify-center items-center">
            <div className="flex gap-2 items-center text-xl">
              <p className="text-lg">
                <span className="font-semibold">Location:</span>{" "}
              </p>
              <p>{weatherData.location.name},</p>
              <p>{weatherData.location.region},</p>
              <p>{weatherData.location.country}</p>
            </div>
            <p className="text-lg">
              <span className="font-semibold">Temperature:</span>{" "}
              {weatherData.current.temp_c}°C
            </p>
            <p className="text-lg">
              <span className="font-semibold">Condition:</span>{" "}
              {weatherData.current.condition.text}
            </p>
            <img
              className="w-16 h-16"
              src={weatherData.current.condition.icon}
              alt={weatherData.current.condition.text}
            />
          </div>
        ) : (
          <p className="text-blue-500">
            Enter a valid city name to get the weather data.
          </p>
        )}
      </div>
    </div>
  );
}

export default Page;
