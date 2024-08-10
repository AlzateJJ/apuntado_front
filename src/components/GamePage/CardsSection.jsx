import { useSelector } from 'react-redux'
import Card from './Card'
import './styles/CardsSection.css'
import PropTypes from 'prop-types';

const CardsSection = ({ selectCard, selectedCard, cardsOrder, setCardsOrder }) => {
    const user = useSelector(store => store.user);
    const games = useSelector(store => store.games)
    const game = games?.find(g => g.id == user?.gameId) // se encuentra el juego
    console.log(game)
    // console.log(user)
    // console.log(cardsOrder)

    // const findPickedCard = () => {
    //     user?.cards?.map(card => {
    //         if (!cardsOrder.includes(card.id)) {
    //             return card
    //         }
    //     })
    // }
    
    // let pickedCard = ''
    // if ((user?.cards?.length - 1) === (cardsOrder.length)) {
    //     pickedCard = findPickedCard()
    // }

    // {
    //     pickedCard
    //     ?
    //         <Card 
    //             card={pickedCard}
    //             key={pickedCard.id}
    //             selectCard={selectCard}
    //             selectedCard={selectedCard}
    //         />
    //     :
    //         null
    // }

    const handleDeleteCardsOrder = () => {
        const existingCards = (
            user?.cards?.map(
                card => (cardsOrder.find(indexOrder => indexOrder == card.id)))
            )?.filter(c => c != undefined)
            // console.log(existingCards.length)
            // console.log(existingCards)
            // console.log(cardsOrder)
            if (existingCards.length < 7 ) {
                console.log('hollssa')
            setCardsOrder([])
        }
    }

    return (
        <section className='cards_section'>
            {
                cardsOrder.length > 0
                ?
                    (cardsOrder.map(order => {
                        const nextCard = user?.cards?.find(card => card.id == order);
                            if (!nextCard) return handleDeleteCardsOrder();
                        
                        return (
                            <Card 
                                card={nextCard}
                                key={nextCard.id}
                                selectCard={selectCard}
                                selectedCard={selectedCard}
                            />
                        );
                    }))
                :
                    (
                        user?.cards?.map(card => (
                            <Card 
                                card={card}
                                key={card.id}
                                selectCard={selectCard}
                                selectedCard={selectedCard}
                            />
                        ))
                    )
            }
            
        </section>
    );
}

CardsSection.propTypes = {
    selectCard: PropTypes.func.isRequired,
    selectedCard: PropTypes.object,
    cardsOrder: PropTypes.arrayOf(PropTypes.object).isRequired,
    setCardsOrder: PropTypes.func.isRequired
}

export default CardsSection;