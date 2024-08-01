import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getLoggedUserThunk } from '../../store/states/users.slice'
import Card from './Card'
import './styles/CardsSection.css'

const CardsSection = ({ selectCard, selectedCard, cardsOrder }) => {
    const user = useSelector(store => store.user);

    // console.log(user)
    // console.log(cardsOrder)

    return (
        <section className='cards_section'>
            {
                cardsOrder.length > 0
                ?
                    (cardsOrder.map(order => {
                        const nextCard = user?.cards?.find(card => card.id == order);
                        if (!nextCard) return null;
                        
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
                        user.cards.map(card => (
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

export default CardsSection;