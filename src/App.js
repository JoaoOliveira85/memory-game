import {useEffect, useCallback, useState} from "react"
import {shuffleArray} from "./utils/shuffle.js"
import './App.css';

const DOGS_PER_LEVEL = 5;
const API_LOCATION = "https://api.unsplash.com"
const API_QUERY = "/photos/random?query=dogs&orientation=squarish&count="
const API_ACCESS_TOKEN = "wdlcyHspKR9Mmp8P1BX45zKfYtV6COQLH0nYwxYGHfU"

function App() {

  const [dogs, setDogs] = useState([]);
  const [currentPosition, setCurrentPosition] = useState(0) 
  const [level, setLevel] = useState(1)

  
  const getDogs = useCallback(async () => {
      const result = await fetch(`${API_LOCATION}${API_QUERY}${level * DOGS_PER_LEVEL}`, {mode: "cors", headers: {Authorization: `Client-ID ${API_ACCESS_TOKEN}`}}).catch(error => console.error(error))
      const resultJson = await result.json().catch(error => console.error(error));

      if(!resultJson) {
        return
      }
      
      setDogs(resultJson.map((image, index) => {return {position: index, url: image.urls.thumb}}))
      
}, [level])

  useEffect(() => {   
    getDogs()
  }, [getDogs])

  const shuffleDogs = () => {
    setDogs(shuffleArray(dogs))
  }

  function comparePositions(pos1, pos2) {  
    console.log(pos1 + " " + pos2)
    return pos1 === pos2 ? "yay" : "nay"
  }


  return (
    <div className="App">
      <h2>Dogs!</h2>
      {dogs.length === 0 && <p>Loading dogs...</p>}
      <div id="imageArray">{dogs.map((dog, dogIndex) => <div className="image" key={dogIndex} onClick={() =>{
        console.log(comparePositions(currentPosition, dog.position))
        setCurrentPosition(currentPosition + 1)
        shuffleDogs()
        }}><img src={dog.url} alt="dog"/></div>)}</div>
    <button onClick={() => getDogs()}>More Dogs!</button>
    <button onClick={() => shuffleDogs()}>Shuffle Dogs!</button>
    </div>
  );
}

export default App;
