import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import BtnsSection from '../components/GamePage/BtnsSection'
import CardsSection from '../components/GamePage/CardsSection'
import './styles/GamePage.css'
import { getLoggedUserThunk, updateUserThunk } from '../store/states/users.slice'
import { getGamesThunk } from '../store/states/games.slice'
import { getCardsThunk } from '../store/states/cards.slice'
import ScoreBoardSection from '../components/GamePage/ScoreBoardSection'
import { useNavigate } from 'react-router-dom'

const GamePage = () => {
    console.log('entré a GamePage')
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const games = useSelector(store => store.games)
    const user = useSelector(store => store.user)
    // console.log(games)
    const [ selectedCard, setSelectedCard ] = useState('')
    const [ openScoreBoard, setopenScoreBoard ] = useState(false)
    const [ cardsOrder, setCardsOrder] = useState([])

    console.log(user)
    useEffect(() => {
        const intervalId = setInterval(() => {
            dispatch(getLoggedUserThunk());
            dispatch(getGamesThunk()); // PENDIENTE: por qué es necesario hacer el get?
            dispatch(getCardsThunk(user?.gameId))
        }, 3000);
        
        return () => clearInterval(intervalId); // Limpia el intervalo cuando el componente se desmonta
    }, []); // Solo se ejecuta una vez al montar, pero mantiene el intervalo
    
    const game = games?.find(g => g.id == user?.gameId) // se encuentra el juego
    // console.log(game?.users?.find(u.id === ))

    const handleScoreBoard = e => {
        e.preventDefault()
        setopenScoreBoard(true)
    }

    const handleAbandonGame = (e) => {
        e.preventDefault()
        
        dispatch(updateUserThunk({gameId: null}, user.id))
        navigate('/home')
    }

    return (
        <>
            <div className='gamePage_header'>
                {
                    game?.turnplayerID === user?.id
                    ?
                        <>
                            <h3 className='gamePage_title'>{`${user?.firstName} ${user?.lastName}, es tu turno!`}</h3>
                        </>
                    :
                    (
                        <>
                            {
                                game?.users?.length > 0
                                ?
                                    <h3 className='gamePage_title'>{`Todavía no es tu turno, está jugando 
                                        ${(game?.users?.find(p => p.id === game?.turnplayerID))?.firstName} 
                                        ${(game?.users?.find(p => p.id === game?.turnplayerID))?.lastName}`}
                                    </h3>
                                :
                                    <h3 className='gamePage_title'>Todavía no es tu turno</h3>
                            }
                            <button className='abandon_game-btn' onClick={handleAbandonGame}>Abandonar Juego</button>
                        </>
                    )
                }
            </div>
            <div className='gamePage_info'>
                {
                    !openScoreBoard 
                    ?
                        <button className='handleScoreBoard_btn' onClick={handleScoreBoard}>Ver tabla de puntajes</button>
                    :
                        null
                }

                < BtnsSection 
                    selectedCard = {selectedCard}
                    selectCard = {setSelectedCard}
                    setCardsOrder = {setCardsOrder}
                    cardsOrder = {cardsOrder}
                />
                
                <CardsSection
                    selectCard = {setSelectedCard}
                    selectedCard = {selectedCard}
                    setCardsOrder = {setCardsOrder}
                    cardsOrder = {cardsOrder}
                />
                <ScoreBoardSection 
                    openScoreBoard = {openScoreBoard}
                    setopenScoreBoard = {setopenScoreBoard}
                />
            </div>
        </>
    )
}

export default GamePage