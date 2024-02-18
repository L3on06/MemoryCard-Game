import React from "react";
import "./SingleCard.css"

function Card({ card, handleChoice, flipped, disabled }) {
    const handleClick = () => {
        if (!disabled) {
            handleChoice(card)
        }
    }

    return (
        <div className="card" key={card.id}>
            <figure className={flipped ? "flipped" : ""}>
                <img
                    className="frontCard"
                    src={card.src}
                    alt="Front Card"
                />
                <img
                    className="backCard"
                    src="./images/cover.jpg"
                    onClick={handleClick}
                    alt="Cover - Back Card"
                />
            </figure>
        </div>
    )
}

export default Card;
