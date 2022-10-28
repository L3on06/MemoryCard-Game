import React from "react";
import "./SingleCard.css"

function Card({ card, handleChoice, flipped }) {

    const handleClick = () => {
        handleChoice(card)
    }

    return (
        <div className="card" key={card.id}>
            <div className={flipped ? "flipped" : ""}>
                <img className="front-card" src={card.src} alt="Front Card" />
                <img
                    className="back-card"
                    src="/image/cover.png"
                    onClick={handleClick}
                    alt="Cover - Back Card"
                />
            </div>
        </div>
    )
}

export default Card;
