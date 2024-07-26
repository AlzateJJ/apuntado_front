import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import BtnsSection from '../components/GamePage/BtnsSection'
import CardsSection from '../components/GamePage/CardsSection'
import './styles/GamePage.css'
import { getLoggedUserThunk } from '../store/states/users.slice'
import { getGamesThunk } from '../store/states/games.slice'
import { getCardsThunk } from '../store/states/cards.slice'

const GamePage = () => {
    console.log('entré a GamePage')
    const dispatch = useDispatch()
    const games = useSelector(store => store.games)
    const user = useSelector(store => store.user)

    const [ selectedCard, setSelectedCard ] = useState('')

    useEffect(() => {
        const intervalId = setInterval(() => {
            dispatch(getLoggedUserThunk());
            dispatch(getGamesThunk()); // PENDIENTE: por qué es necesario hacer el get?
            dispatch(getCardsThunk())
        }, 3000);

        return () => clearInterval(intervalId); // Limpia el intervalo cuando el componente se desmonta
    }, []); // Solo se ejecuta una vez al montar, pero mantiene el intervalo

    //console.log(user)
    // console.log(selectedCard)

    // console.log(games)
    // se encuentra el juego
    const game = games?.find(g => g.id == user?.gameId)

    return (
        <>
            <div className='gamePage_header'>
                {
                    game?.turnplayerID === user?.id
                    ?
                        <h3 className='gamePage_title'>Es tu turno!</h3>
                    :
                        <h3 className='gamePage_title'>{`Todavía no es tu turno, está jugando el jugador con Id: ${game?.turnplayerID}`}</h3>
                }
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