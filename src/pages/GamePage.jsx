import React from 'react'
import { useSelector } from 'react-redux'
import BtnsSection from '../components/GamePage/BtnsSection'
import CardsSection from '../components/GamePage/CardsSection'

const GamePage = () => {
    console.log('entré a GamePage')

    const games = useSelector(store => store.games)
    const user = useSelector(store => store.user)


    console.log(user)
    console.log(games)

    return (
        <>
            <h3>GamePage</h3>
            < BtnsSection />
            < CardsSection/>
        </>
    )
}

export default GamePage