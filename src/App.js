import {useEffect, useCallback, useState} from "react"
import {shuffleArray} from "./utils/shuffle.js"
import './App.css';
import gameover from "./assets/gameover.jpg"

const DOGS_PER_LEVEL = 6;
const API_LOCATION = "https://api.unsplash.com"
const API_QUERY = "/photos/random?query=dogs&orientation=squarish&count="
const API_ACCESS_TOKEN = "wdlcyHspKR9Mmp8P1BX45zKfYtV6COQLH0nYwxYGHfU"

function App() {

  const [dogs, setDogs] = useState([]);
  const [currentPosition, setCurrentPosition] = useState(0) 
  const [level, setLevel] = useState(1)
  const [score, setScore] = useState(0)
  const [highscore, setHighscore] = useState(0);
  const [isGameover, setIsGameover] = useState(false)

  
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

  function reset(type) {
    getDogs();
    switch (type) {
      case "normal":
        break;
      case "gameover":
        setCurrentPosition(0);
        setScore(0)
        setIsGameover(true)
        break;
      default:
        console.error("unexpected reset type!");
    }
  }

  function comparePositions(pos1, pos2) {  
    console.log(pos1 + " " + pos2)
    return pos1 === pos2;
  }

  function gamePlay(pos1, pos2) {
    const roundResult = comparePositions(pos1, pos2);
    setCurrentPosition(currentPosition + 1)
    setScore(score + 1)
    shuffleDogs()

 

    switch (roundResult) {
      case true:
        console.log("yay");
        if (score >= highscore) {
          setHighscore(score + 1);
          if (currentPosition + 1 === level * DOGS_PER_LEVEL) {
            reset("normal")
            setCurrentPosition(0)
          }
        }
        break;
      case false:
        console.log("nay!")
        reset("gameover")
        break;
      default:
        console.error("unexpected computed result")
    }
  }

  return (
    <div className="App">
      {isGameover && <div id="gameoverContainer">
      <div id="gameOverScreen">
      <h2>GAME OVER</h2>
      <p>Your Score: {score}</p>
      <p>Highscore: {highscore}</p>
      <button onClick={() => {
        reset("gameover")
        setIsGameover(false);
        }}>New Game!</button><div><img id="gameoverDog" src={gameover} alt="sad dog looking through locked gate!"></img></div>
      </div></div>}
      <h1>Dogs!</h1>
      <p>Current Score: {score} | Highscore: {highscore}</p>
      <div><p>Level: <input style={{width: "25px"}} type="number" value={level} onChange={e => {
      setLevel(e.target.value);
      reset("gameover");
      setIsGameover(false)
      }}></input></p></div>
      {dogs.length === 0 && <p>Loading dogs...</p>}
      <div id="imageContaier">
      <div id="imageArray">{dogs.map((dog, dogIndex) => <div className="image" key={dogIndex} onClick={() =>{
        gamePlay(currentPosition, dog.position)
        }}><img src={dog.url} alt="dog"/></div>)}</div>
        </div>
    </div>
  );
}

export default App;
