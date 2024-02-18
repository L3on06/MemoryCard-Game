import { useEffect, useState } from 'react';
import './App.css';
import SingleCard from './Components/SingleCard';
import PropagateLoader from "react-spinners/PropagateLoader";

const cardImages = [
  { "src": "/images/Bulbasaur.png", matched: false },
  { "src": "/images/Nidoking.png", matched: false },
  { "src": "/images/Phanpy.png", matched: false },
  { "src": "/images/Pidgey.png", matched: false },
  { "src": "/images/Pikachu.png", matched: false },
  { "src": "/images/Voltorb.png", matched: false },
];

function App() {
  const [loading, setLoading] = useState(false);
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [gameStarted, setGameStarted] = useState(false); // New state to track if the game has started

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
      .map(card => ({ ...card, id: Math.random() }));

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurns(0);
    setGameStarted(true); // Set gameStarted to true when the game starts
  };

  // Handle Choice
  const handleChoice = (card) => {
    if (choiceOne && choiceOne.id === card.id) {
      // Do nothing if the same card is clicked again
      return;
    }

    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  // Compare 2 Selected Cards
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  // Reset Choices & Increase turn
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(prevTurns => prevTurns + 1);
    setDisabled(false);
  };

  // Start New Game Automatically
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      shuffleCards();
      setLoading(false);
    }, 1500);
  }, []);

  useEffect(() => {
    if (gameStarted && cards.every(card => card.matched === true)) { // Only show prompt if game has started
      setTimeout(() => {
        shuffleCards();
        alert(`Good job u did ${turns} turns, wanna try again to break your record`);
      }, 1000);
    }
  }, [cards, gameStarted]);

  return (
    <main className="main">
      {
        loading ?
          <PropagateLoader
            loading={loading}
            size={30}
            cssOverride={override}
          />
          :
          <section className='container'>
            <article>
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
            </article>
            <article className="card-grid">
              {cards.map(card => (
                <SingleCard
                  key={card.id}
                  card={card}
                  handleChoice={handleChoice}
                  flipped={card === choiceOne || card === choiceTwo || card.matched}
                  disabled={disabled}
                />
              ))}
            </article>
          </section>
      }

    </main>
  );
}

export default App;
