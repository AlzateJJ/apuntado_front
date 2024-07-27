import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getLoggedUserThunk } from '../../store/states/users.slice'
import Card from './Card'
import './styles/CardsSection.css'

const CardsSection = ( { selectCard, selectedCard } ) => {

    const user = useSelector(store => store.user)

    // console.log(user)

    return (
        <section className='cards_section'>
            {
                user?.cards?.map(card => (
                    <Card 
                        card = { card }
                        key = { card.id}
                        selectCard = { selectCard }
                        selectedCard = {selectedCard}
                    />
                ))
            }
        </section>
    )
}

export default CardsSection