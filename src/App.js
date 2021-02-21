import {useEffect, useCallback, useState} from "react"
import './App.css';

const DOGS_PER_LEVEL = 5;
const API_LOCATION = "https://api.unsplash.com"
const API_QUERY = "/photos/random?query=dogs&orientation=squarish&count="
const API_ACCESS_TOKEN = "wdlcyHspKR9Mmp8P1BX45zKfYtV6COQLH0nYwxYGHfU"

function App() {

  const [dogs, setDogs] = useState([])
  const [level, setLevel] = useState(1)

  const shuffleArray = function(arrayToShuffle) {
    let shuffledArray = new Array(arrayToShuffle.length)

    let originalOrder = new Array(arrayToShuffle.length)
    let shuffleOrder = new Array(arrayToShuffle.length)
    
    for (let i = 0; i < arrayToShuffle.length; i++) {
      originalOrder[i] = i;
    }

    for(let i = 0; i < arrayToShuffle.length; i++) {
      let randomNumber = 0;

      do {
        randomNumber = Math.floor(Math.random() * Math.floor(arrayToShuffle.length))
      } while (randomNumber in shuffleOrder)

      shuffledArray.append(randomNumber) 
      console.log(shuffleArray) 
    }
    
    // shuffle array
    
    return shuffleArray
  }
  
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


  return (
    <div className="App">
      <h2>Dogs!</h2>
      {dogs.length === 0 && <p>Loading dogs...</p>}
      <div id="imageArray">{dogs.map((dog, dogIndex) => <div className="image" key={dogIndex}><img src={dog.url} alt="dog"/></div>)}</div>
    <button onClick={() => getDogs()}>More Dogs!</button>
    </div>
  );
}

export default App;
