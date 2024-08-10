import './styles/Card.css'
import PropTypes from 'prop-types';

const Card = ({ card, selectCard, selectedCard }) => {

    const handleClick = () => {
        if (card == selectedCard) {
            selectCard('')
        } else {
            selectCard(card)
        }
    }

    return (
        <article className={`card ${card.id === selectedCard.id && 'selectedCard'}`} onClick={handleClick}>
            <header className='card_header'>
                <h2 className={`card_rank ${(card.suit === 'corazón' || card.suit === 'diamante') && 'red_suit'}`}>
                    {`${card.rank == 11 ? "J" :
                        (card.rank == 12 ? "Q" :
                            (card.rank == 13 ? "K" :
                                (card.rank == 14 ? "A" : card.rank)
                            )
                        )
                        }`}
                </h2>
            </header>
            <div className='card_body'>
                <div className='img_container'>
                    <img src={`../../../${card.suit}.png`} className='card_img' alt="imagen de la carta"></img>
                </div>
            </div>
            <footer className='card_footer'>
                <h2 className={`card_rank ${(card.suit === 'corazón' || card.suit === 'diamante') && 'red_suit'}`}>
                    {`${card.rank == 11 ? "J" :
                        (card.rank == 12 ? "Q" :
                            (card.rank == 13 ? "K" :
                                (card.rank == 14 ? "A" : card.rank)
                            )
                        )
                        }`}
                </h2>
            </footer>
        </article>
    )
}

Card.propTypes = {
    card: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        suit: PropTypes.string.isRequired, // Puede ser 'corazón', 'diamante', 'trébol', etc.
        rank: PropTypes.number.isRequired // El rango de la carta (de 2 a 14, donde 11 = J, 12 = Q, 13 = K, 14 = A)
    }).isRequired,
    selectCard: PropTypes.func.isRequired, // Función para seleccionar la carta
    selectedCard: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        suit: PropTypes.string,
        rank: PropTypes.number
    }) // La carta actualmente seleccionada (puede estar vacía o no coincidir con la carta actual)
};

export default Card