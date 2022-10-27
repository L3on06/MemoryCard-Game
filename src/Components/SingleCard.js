import React from "react";
import "./SingleCard.css"

function Card({ card }) {
    return (
        <div className="card" key={card.id}>
            <div>
                <img className="front-card" src={card.src} alt="Front Card" />
                <img className="back-card" src="/image/cover.png" alt="Cover - Back Card" />
            </div>
        </div>
    )
}

export default Card;
