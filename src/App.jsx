
import 'leaflet/dist/leaflet.css';
import { Map } from "../src/Map";
import "../style.css"
import { useEffect, useState } from "react";


async function fetchProducts(url) {
  const response = await fetch(url);
  const data = await response.json();
  const filteredData = {
    latitude: data.latitude,
    longitude: data.longitude,
  };

  console.log(filteredData);

  return filteredData;
}
function App() {
  const iss_url = "https://api.wheretheiss.at/v1/satellites/25544";
  const [data, setData] = useState(); // 初期値を null に設定
  useEffect(() => {
    const fetchData = async () => {
      const newContent = await fetchProducts(iss_url);
      setData(newContent);
    };

    fetchData();
  }, []);
  const position = data ? [data.latitude, data.longitude] : [0, 0];
  return (
    <div className="App">
       <h1>where is iss</h1>
      {data && (
        <>
          <p>緯度: {data.latitude}</p>
          <p>経度: {data.longitude}</p>
        </>
      )}
      <Map position={position} name="map" />
      <footer>
        <p>s5422069 板橋輝</p>
        <p>日本大学文理学部情報科学科 Webプログラミングの演習課題</p>
      </footer>
    </div>    
  );
}

export default App;
