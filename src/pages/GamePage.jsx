import React from 'react'
import { useSelector } from 'react-redux'
import BtnsSection from '../components/GamePage/BtnsSection'
import CardsSection from '../components/GamePage/CardsSection'
import './styles/GamePage.css'

const GamePage = () => {
    console.log('entré a GamePage')

    const games = useSelector(store => store.games)
    const user = useSelector(store => store.user)


    console.log(user)
    console.log(games)

    return (
        <>
            <div className='gamePage_header'>
                <h3 className='gamePage_title'>GamePage</h3>
            </div>
            < BtnsSection />
            < CardsSection/>
        </>
    )
}

export default GamePage