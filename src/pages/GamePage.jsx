import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import BtnsSection from '../components/GamePage/BtnsSection'
import CardsSection from '../components/GamePage/CardsSection'
import './styles/GamePage.css'
import { getLoggedUserThunk } from '../store/states/users.slice'
import { getGamesThunk } from '../store/states/games.slice'
import { getCardsThunk } from '../store/states/cards.slice'
import ScoreBoardSection from '../components/GamePage/ScoreBoardSection'

const GamePage = () => {
    console.log('entré a GamePage')
    const dispatch = useDispatch()
    const games = useSelector(store => store.games)
    const user = useSelector(store => store.user)
    // console.log(games)
    const [ selectedCard, setSelectedCard ] = useState('')

    // console.log(user)
    useEffect(() => {
        const intervalId = setInterval(() => {
            dispatch(getLoggedUserThunk());
            dispatch(getGamesThunk()); // PENDIENTE: por qué es necesario hacer el get?
            dispatch(getCardsThunk(user?.gameId))
        }, 30000000);

        return () => clearInterval(intervalId); // Limpia el intervalo cuando el componente se desmonta
    }, []); // Solo se ejecuta una vez al montar, pero mantiene el intervalo

    // console.log(user)
    // console.log(selectedCard)
    // console.log(games)

    const game = games?.find(g => g.id == user?.gameId) // se encuentra el juego

    //console.log(game)
    return (
        <>
            <div className='gamePage_header'>
                {
                    game?.turnplayerID === user?.id
                    ?
                        <h3 className='gamePage_title'>{`${user?.firstName} ${user?.lastName}, es tu turno!`}</h3>
                    :
                        (
                            game?.users
                            ?
                                <h3 className='gamePage_title'>{`Todavía no es tu turno, está jugando 
                                    ${(game?.users.find(p => p.id === game?.turnplayerID)).firstName} 
                                    ${(game?.users.find(p => p.id === game?.turnplayerID)).lastName}`}
                                </h3>
                            :
                                <h3 className='gamePage_title'>Todavía no es tu turno</h3>
                        )
                }
            </div>
            {
                game?.turnplayerID == user?.id
                ?
                    <>
                        < BtnsSection 
                            selectedCard = {selectedCard}
                            selectCard = {setSelectedCard}
                        />
                        < CardsSection
                            selectCard = {setSelectedCard}
                            selectedCard = {selectedCard}
                        />
                        <ScoreBoardSection />
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