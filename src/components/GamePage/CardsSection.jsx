import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getLoggedUserThunk } from '../../store/states/users.slice'
import Card from './Card'
import './styles/CardsSection.css'

const CardsSection = () => {

    const dispatch = useDispatch()
    const user = useSelector(store => store.user)

    console.log(user)
    
    useEffect(() => {
        dispatch(getLoggedUserThunk())
    }, [])

    return (
        <section className='cards_section'>
            {
                user?.cards.map(card => (
                    <Card 
                        card = { card }
                        key = { card.id}
                    />
                ))
            }
        </section>
    )
}

export default CardsSection