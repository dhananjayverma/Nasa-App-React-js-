import React from 'react'
import "./Asteroid.css";
import axios from "axios";


type Asteroid_Details = {
  id: string | number | undefined;
  name: string | undefined;
  nasa_jpl_url: string | undefined;
  is_potentially_hazardous_asteroid: boolean | string | undefined;
}
const Asteroid_Data: React.FC = () => {
  const [myAsteroidDetails, setMyAsteroidDetails] = React.useState<null | Asteroid_Details >(null)

  const [loading, setLoading] = React.useState<boolean>(true);
    const token_data: string = `LcVoGKtf8i9zOPs8IejcjR5IZgZO6XMQhMAeMaDl`
   
  const fetch_data= async () => {
    let asteroId = localStorage.getItem("astId");
    console.log("astId:", asteroId);
    try {
        const { data } = await axios.get( `https://api.nasa.gov/neo/rest/v1/neo/${asteroId}?api_key=${token_data}`)
        setMyAsteroidDetails(data)
        setLoading((prev: boolean) => true);
    } catch (err) {
      console.log(err);
      setLoading((prev: boolean) => false);
}}
React.useEffect(() => {
    fetch_data()
}, [])
return (
  <>
    <div id="asteroid">
      {loading ? (
        <p>Loading...</p>
      ) : myAsteroidDetails ? (
        <div>
          <h1>Asteroid</h1>
          <p id="outerText">
            <span id="innerText">ID: </span>
            {myAsteroidDetails.id}
          </p>
          <p id="outerText">
            <span id="innerText">Name: </span>
            {myAsteroidDetails.name}
          </p>
          <p id="outerText">
            <span id="innerText">NASA JPL URL: </span>
            {myAsteroidDetails.nasa_jpl_url}
          </p>
          <p id="outerText">
            <span id="innerText">Is Potentially Hazardous Asteroid: </span>
            {myAsteroidDetails.is_potentially_hazardous_asteroid ? "True" : "False"}
          </p>
        </div>
      ) : (
        <p>Incorrect Asteroid ID</p>
      )}
    </div>
  </>
);
};

export default Asteroid_Data;