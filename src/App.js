import {useEffect, useCallback, useState} from "react"
import {shuffleArray} from "./utils/shuffle.js"
import './App.css';

const DOGS_PER_LEVEL = 5;
const API_LOCATION = "https://api.unsplash.com"
const API_QUERY = "/photos/random?query=dogs&orientation=squarish&count="
const API_ACCESS_TOKEN = "wdlcyHspKR9Mmp8P1BX45zKfYtV6COQLH0nYwxYGHfU"

function App() {

  const [dogs, setDogs] = useState([]);
  const [originalIndex, setOriginalIndex] = useState([]);
  const [level, setLevel] = useState(1)

  
  const getDogs = useCallback(async () => {
      const result = await fetch(`${API_LOCATION}${API_QUERY}${level * DOGS_PER_LEVEL}`, {mode: "cors", headers: {Authorization: `Client-ID ${API_ACCESS_TOKEN}`}}).catch(error => console.error(error))
      const resultJson = await result.json().catch(error => console.error(error));

      if(!resultJson) {
        return
      }

      console.log(resultJson)
      setDogs(resultJson.map((image, index) => {return {position: index, url: image.urls.thumb}}))
      
}, [level])

  useEffect(() => {   
    getDogs()
  }, [getDogs])

  useEffect(() => {
    setOriginalIndex([...dogs])
    console.log(originalIndex)
  }, [dogs])

  const shuffleDogs = () => {
    setDogs(shuffleArray(dogs))
  }

  function compareDogs(dog1, dog2) {  
    return dog1.position === dog2 ? "yay" : "nay"
  }


  return (
    <div className="App">
      <h2>Dogs!</h2>
      {dogs.length === 0 && <p>Loading dogs...</p>}
      <div id="imageArray">{dogs.map((dog, dogIndex) => <div className="image" key={dogIndex} onClick={() =>
        console.log(originalIndex.findIndex(dogo => dogo.position === dog.position))
        }><img src={dog.url} alt="dog"/></div>)}</div>
    <button onClick={() => getDogs()}>More Dogs!</button>
    <button onClick={() => shuffleDogs()}>Shuffle Dogs!</button>
    </div>
  );
}

export default App;
