import { useEffect, useState } from 'react'
import './App.css'
import SingleCard from './Components/SingleCard'
import PropagateLoader from "react-spinners/PropagateLoader";

const cardImages = [
  { "src": "/image/helmet-1.png", matched: false },
  { "src": "/image/potion-1.png", matched: false },
  { "src": "/image/ring-1.png", matched: false },
  { "src": "/image/scroll-1.png", matched: false },
  { "src": "/image/shield-1.png", matched: false },
  { "src": "/image/sword-1.png", matched: false },
]

function App() {
  const [loading, setLoading] = useState(false)
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)

  // Style for Loader
  const override = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    textAlign: "center",

  };

  // Shuffle Cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map(card => ({ ...card, id: Math.random() }))

    setChoiceOne(null)
    setChoiceTwo(null)
    setCards(shuffledCards)
    setTurns(0)
  }

  //Handle Choise
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
    console.log(card)
  }

  // Compare 2 Selected Cards
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true)
      if (choiceOne.src === choiceTwo.src) {
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true }
            } else {
              return card
            }
          })
        })
        resetTurn()
      } else {
        setTimeout(() => resetTurn(), 1000)
      }
    }
  }, [choiceOne, choiceTwo])

  // Reset Choices & Increse turn
  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns + 1)
    setDisabled(false)
  }

  // Start New Game Automatically
  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      shuffleCards()
      setLoading(false)
    }, 1500)
  }, [])

  return (
    <main className="main">
      {
        loading ?
          <PropagateLoader
            loading={loading}
            size={30}
            cssOverride={override}
          // color={'rgba(255, 53, 127, 1) 100%'}
          />
          :
          <div className='container'>
            <div className='title-container'>
              <button className='title'>M</button>
              <button className='title'>E</button>
              <button className='title'>M</button>
              <button className='title'>O</button>
              <button className='title'>R</button>
              <button className='title'>Y&nbsp;&nbsp;</button>
              <button className='title'>G</button>
              <button className='title'>A</button>
              <button className='title'>M</button>
              <button className='title'>E</button>
            </div>
            <div className='flex'>
              <button className='button' onClick={shuffleCards}>New Game</button>
              <p className='turns'>Turns: {turns}</p>
            </div>
            <div className="card-grid">
              {cards.map(card => (
                <SingleCard
                  key={card.id}
                  card={card}
                  handleChoice={handleChoice}
                  flipped={card === choiceOne || card === choiceTwo || card.matched}
                  disabled={disabled}
                />
              ))}
            </div>
          </div>
      }

    </main>
  );
}

export default App;