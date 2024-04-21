import { useEffect, useState } from "react";
import "./App.css";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const URL = `http://api.weatherapi.com/v1/current.json?key=fccf4da15c4540afbf0173321242104&q=Indonesia&aqi=no`;

const App = () => {
  const [weatherData, setWeatherData] = useState({ temp_c: 0, humidity: 0, temp_f: 0 });
  
  const { isPending, error, isFetching } = useQuery({
    queryFn: () => axios.get(URL).then((res) => {
      setWeatherData(res.data.current)
      return res.data
    }),
    queryKey: ["weather"],
  });

  if (isPending || isFetching) return 'Loading...';
  if (error) return 'An error has occurred: ' + error.message;

  return (
    <div>
      <h1>Just my personal API Fetch</h1>
      <p>Indonesia Temp Now : {weatherData.temp_c}</p>
      <p>Temp in Fahrenheit : {weatherData.temp_f}</p>
      <p>Humidity : {weatherData.humidity}</p>
    </div>
  );
}

export default App;


// useEffect(() => {
//   const fetchData = async () => {
//     const result = await fetch(URL);
//     result.json().then((json) => {
//       setTemp(json.current.temp_c);
//       setHumidity(json.current.humidity);
//       setTempf(json.current.temp_f);
//     });
//   };
//   fetchData();
// }, []);