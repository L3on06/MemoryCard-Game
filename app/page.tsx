"use client"

import React, { useEffect, useState } from 'react';
import SingleCard from '@/Components/SingleCard';
import PropagateLoader from "react-spinners/PropagateLoader";

interface Card {
  src: string;
  id?: number;
  matched: boolean;
}

const cardImages: Card[] = [
  { "src": "./images/Bulbasaur.png", matched: false },
  { "src": "./images/Nidoking.png", matched: false },
  { "src": "./images/Phanpy.png", matched: false },
  { "src": "./images/Pidgey.png", matched: false },
  { "src": "./images/Pikachu.png", matched: false },
  { "src": "./images/Voltorb.png", matched: false },
];

export default function Home() {
  const [loading, setLoading] = useState<boolean>(false);
  const [cards, setCards] = useState<Card[]>([]);
  const [turns, setTurns] = useState<number>(0);
  const [choiceOne, setChoiceOne] = useState<Card | null>(null);
  const [choiceTwo, setChoiceTwo] = useState<Card | null>(null);
  const [disabled, setDisabled] = useState<boolean>(false);
  const [gameStarted, setGameStarted] = useState<boolean>(false);

  const override: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    textAlign: "center",
  };

  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card, index) => ({ ...card, id: index }));

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurns(0);
    setGameStarted(true);
  };

  const handleChoice = (card: Card) => {
    if (choiceOne && choiceOne.id === card.id) {
      return;
    }

    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

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

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(prevTurns => prevTurns + 1);
    setDisabled(false);
  };

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      shuffleCards();
      setLoading(false);
    }, 1500);
  }, []);

  useEffect(() => {
    if (gameStarted && cards.every(card => card.matched === true)) {
      setTimeout(() => {
        shuffleCards();
        alert(`Good job u did ${turns} turns, wanna try again to break your record`);
      }, 1000);
    }
  }, [cards, gameStarted, turns]);

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