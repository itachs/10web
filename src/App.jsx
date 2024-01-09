
import 'leaflet/dist/leaflet.css';
import { Map } from "../src/Map";
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
    <>
      <header>
        <h1>ISSはどこにいるのか</h1>
      </header>
      <article>
        <main>
          <h2>サイト説明</h2>
          <p>このサイトではiss(国際宇宙ステーション)の位置をリアルタイムでマップ上に表示しています。<br/>表示しているissは1998年11月20日にロシア・モルドバ・アゼルバイジャン・ベラルーシ・カザフスタン・アルメニア・ウズベキスタン・キルギス・タジキスタンの9か国からなるCISによって打ち上げられたNo.25544です。<br/>
          </p>
          <h2>リアルタイムMAP</h2>
          <Map position={position}  trajectoryData={trajectoryData} name="map" className="map" />
          <h2>
            ISSの移動例
          </h2>
          <ul>
            <li>
              <p>計測スタート位置</p>
              <img src="public/s0.png" alt="はじまり" className="Image"/>
            </li>
            <li>
              <p>20分後の位置</p>
              <img src="public/s20.png" alt="20分後" className="Image"/>
            </li>
            <li>
              <p>30分後の位置</p>
              <img src="public/s30.png" alt="30分後" className="Image"/>
            </li>
            <li>
              <p>60分後の位置</p>
              <img src="public/s60.png" alt="60分後" className="Image"/>
            </li>
            <li>
              <p>90分後の位置</p>
              <img src="public/s90.png" alt="90分後" className="Image"/>
            </li>
          </ul>
        </main>
        <aside>
          <h2>
            issの詳細
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
        </aside>
      </article>
      
      
      <footer>
        <p>s5422069 板橋輝</p>
        <p>日本大学文理学部情報科学科 Webプログラミングの演習課題</p>
      </footer>
    </>
  );
}

export default App;
