import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home";
import axios from "axios";

const Home: React.FC = () => {
  const [myAsteroidId, setmyAsteroidId] = React.useState<string>('');
  const navigate = useNavigate();
  const URL_ID: string = `https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=DEMO_KEY`;
  const handleChangeData = (event: React.ChangeEvent<HTMLInputElement>) => {
    setmyAsteroidId(event.target.value);
  };
  const fetch_data = async () => {
    try {
  
      const res = await axios.get(URL_ID);
      setmyAsteroidId(
        await res.data.near_earth_objects[Math.floor(Math.random() * 10)].id
      );
    } catch (err) {
      console.log(err);
    }
  };
  const showAsteroiddata = (): void => {
    localStorage.setItem("astId", myAsteroidId);
    navigate("/asteroid");
  };
  return (
    <div>
      <h1>Home</h1>
      <div id="form-data">
        <input
          id="input"
          placeholder="Enter Astroid Id"
          onChange={handleChangeData}
          value={myAsteroidId ? myAsteroidId : undefined}
        />
        <button id="random" onClick={fetch_data}>
          Random Asteroid
        </button>
  
        <button
          disabled={!myAsteroidId ? true : false}
          onClick={showAsteroiddata}
        >
        submit </button>
      </div>
    </div>
  );
};
export default Home;
