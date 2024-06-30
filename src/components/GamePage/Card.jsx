import React from 'react'
import './styles/Card.css'

const Card = ( { card } ) => {

    return (
        <article className='card'>
            <header className='card_header'>
                <h2 className={`card_rank ${(card.suit === 'corazón' || card.suit === 'diamante') && 'red_suit'}`}>{`${card.rank}`}</h2>
            </header>
            <div className='card_body'>
                <div className='img_container'>
                    <img src={`../../../${card.suit}.png`} className='card_img' alt="imagen de la carta"></img>
                </div>
            </div>
            <footer className='card_footer'>
                <h2 className={`card_rank ${(card.suit === 'corazón' || card.suit === 'diamante') && 'red_suit'}`}>{`${card.rank}`}</h2>
            </footer>
        </article>
    )
}

export default Card