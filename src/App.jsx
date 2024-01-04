
import 'leaflet/dist/leaflet.css';
import { Map } from "../src/Map";
import "../style.css"
import { useEffect, useState } from "react";


async function fetchProducts(url) {
  const response = await fetch(url);
  const data = await response.json();
  const altitude=data.altitude.toFixed(5);
  const filteredData = {
    latitude: data.latitude,
    longitude: data.longitude,
    altitude: altitude,
  };
  console.log(filteredData);

  return filteredData;
}
async function fetchContry(url) {
  const response = await fetch(url);
  const data = await response.json();
  const filteredData = {
    time:data.timezone_id,
    offset:data.offset,
    country: data.country_code,
  };
  console.log(filteredData);

  return filteredData;
}

function App() {
  const iss_url = "https://api.wheretheiss.at/v1/satellites/25544";
  const [data, setData] = useState(); 
  const [countryData,setCountryData] = useState();
  const[position,setPosition] = useState(data ? [data.latitude, data.longitude] : [0, 0]);
  const [trajectoryData, setTrajectoryData] = useState([]);
  useEffect(() => {
    const intervalId = setInterval(() => {
      const fetchData = async () => {
        const newContent = await fetchProducts(iss_url);
        setData(newContent);
        setPosition([newContent.latitude, newContent.longitude]);
        console.log(position);
        const newPoint = {
          lat: newContent.latitude,
          lng: newContent.longitude,
        };
        setTrajectoryData(prevData => [...prevData, newPoint]);
        const newCountry = await fetchContry("https://api.wheretheiss.at/v1/coordinates/"+newContent.latitude+","+newContent.longitude);
        setCountryData(newCountry);
      };
      fetchData();
    }, 3000);
    return () => {
      clearInterval(intervalId);
    };
  },[]);
  
  return (
    <div className="App">
      <h1>where is iss</h1>
      <h2>
       This site provides real-time location information of the ISS (international space station)
      </h2>
      {data && (
        <>
          <p>緯度: {data.latitude}</p>
          <p>経度: {data.longitude}</p>
          {countryData && countryData.country !== "??" && (
            <>
              <p>現在地: {countryData.country} {data.altitude}Km上空</p>
            </>
          )}
          {countryData && countryData.country == "??" &&(
            <>
              <p>現在地: SEA {data.altitude}Km上空</p>
            </>
      )}
        </>
      )}
      
      <Map position={position}  trajectoryData={trajectoryData} name="map" />
      <footer>
        <p>s5422069 板橋輝</p>
        <p>日本大学文理学部情報科学科 Webプログラミングの演習課題</p>
      </footer>
    </div>
  );
}

export default App;
