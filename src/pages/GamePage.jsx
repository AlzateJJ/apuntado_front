import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import BtnsSection from '../components/GamePage/BtnsSection'
import CardsSection from '../components/GamePage/CardsSection'
import './styles/GamePage.css'
import { getLoggedUserThunk } from '../store/states/users.slice'
import { getGamesThunk } from '../store/states/games.slice'

const GamePage = () => {
    console.log('entré a GamePage')
    const dispatch = useDispatch()
    const games = useSelector(store => store.games)
    const user = useSelector(store => store.user)

    const [ selectedCard, setSelectedCard ] = useState('')

    useEffect(() => {
        dispatch(getLoggedUserThunk())
        dispatch(getGamesThunk()) // PENDIENTE: por qué es necesario hacer el get?
    }, [])

    console.log(user)
    console.log(selectedCard)

    console.log(games)
    // se encuentra el juego
    const game = games?.find(g => g.id == user?.gameId)

    return (
        <>
            <div className='gamePage_header'>
                <h3 className='gamePage_title'>GamePage</h3>
            </div>
            {
                game?.turnplayerID == user?.id 
                ?
                    <>
                        < BtnsSection 
                            selectedCard = {selectedCard}
                        />
                        < CardsSection
                            selectCard = {setSelectedCard}
                            selectedCard = {selectedCard}
                        />
                    </>
                :
                    <>
                        <h2>No es tu turno todavía</h2>
                        < CardsSection
                            selectCard = {setSelectedCard}
                            selectedCard = {selectedCard}
                        />
                    </>
            }
        </>
    )
}

export default GamePage