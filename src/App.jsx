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

export default function App() {
  const iss_url ="https://api.wheretheiss.at/v1/satellites/25544";
  const [data, setData] = useState(); 

  useEffect(() => {
    const fetchData = async () => {
        const newContent = await fetchProducts(iss_url);
        setData(newContent);
      };

    fetchData();
  }, []);

  return (
    <>
      <h1>where is iss</h1>
      {data && (
        <>
          <p>緯度: {data.latitude}</p>
          <p>経度: {data.longitude}</p>
        </>
      )}
    </>
    
  );
}
