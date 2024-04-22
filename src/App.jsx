import { useState } from "react";
import "./App.css";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Clock from "./components/Clock.jsx";

const URL = `http://api.weatherapi.com/v1/current.json?key=fccf4da15c4540afbf0173321242104&q=Indonesia&aqi=no`;

const App = () => {
  const [weatherData, setWeatherData] = useState(0);
  const [date, setDate] = useState("");

  const { isPending, error, isFetching } = useQuery({
    queryFn: async () => await axios.get(URL).then((res) => {
      setWeatherData(res.data.current)
      setDate(res.data.current)
      return res.data
    }),
    queryKey: ["weather"],
    
  });

  if (isPending || isFetching) return 'Loading...';
  if (error) return 'An error has occurred: ' + error.message;

  return (
    <>
    <div>
      <h1>Just my personal API Fetch</h1>
      <p>Indonesia Temp Now : {weatherData.temp_c}</p>
      <p>Temp in Fahrenheit : {weatherData.temp_f}</p>
      <p>Humidity : {weatherData.humidity}</p>
      <p>Last updated : {date.last_updated}</p>
      <Clock />
    </div>
    </>
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