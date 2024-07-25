import React from 'react'
import './styles/BtnsSection.css'
import { useDispatch, useSelector } from 'react-redux'
import { updateUserThunk } from '../../store/states/users.slice'
import { updateGameThunk } from '../../store/states/games.slice'

const BtnsSection = ( { selectedCard } ) => {

    const dispatch = useDispatch()
    const user = useSelector(store => store.user)

    const games = useSelector(store => store.games)
    console.log(games)
    const game = games?.find(g => g.id == user?.gameId) // se encuentra el juego


    const handleTocar = (e) => {
        e.preventDefault()  
    }

    const handleBajarse = (e) => {
        e.preventDefault()  
    }

    const handleArrastrar = (e) => {
        e.preventDefault()
    }

    const handleCogerCartaTirada = (e) => {
        e.preventDefault()  
    }

    const handleTirarCarta = (e) => {
        e.preventDefault()
        console.log("entré a handleTirarCarta")
        // 1. actualizar las cartas del jugador que tiró la carta (que se le quite la que tiró)
        const newCards = user.cards.filter(card => card.id !== selectedCard.id)
        console.log(newCards)
        dispatch(updateUserThunk({ cards: newCards }, user.id))
        // 2. settear la carta tirada del juego

        // 3. encontrar y actualizar el jugador que sigue (el turnPlayerId) del juego
        const activePlayerID = game.turnplayerID
        const index = game.users.findIndex(player => player.id === activePlayerID)
        const newActivePlayerIndex = (index == (game.users.length - 1)) ? 0 : (index + 1)
        const newActivePlayerID = game.users[newActivePlayerIndex].id
        dispatch(updateGameThunk(
            {
                turnplayerID: newActivePlayerID,
                discarded_card:
                    {
                        playerId: user.id,
                        card: selectedCard
                    }
            }
            , game.id
        ))
    }

    return (
        <section className='game_btns-section'>
            <article className='end_game-btns'>
                <button className="end_game_btn tocar_btn" onClick={handleTocar}>Tocar</button>
                <button className="end_game_btn bajarse_btn">Bajarse</button>
            </article>

            {
                user?.cards.length === 10
                ?
                    <article className='card_btns'>
                        <div className='arrastrar-div'>
                            <h4 className='arrastrar-title'>Arrastrar del mazo</h4>
                            <div className="arrastrar-img_container">
                                <img src='../../../deck.png' className='arrastrar_img' alt="imagen del mazo"></img>
                            </div>
                        </div>
                        <div className='carta_tirada-div'>
                            <h4 className='carta_tirada-title'>Coger carta tirada</h4>
                            <div className='carta_tirada-img_container'>
                                <img src='../../../deck.png' className='carta_tirada-img' alt="imagen del mazo"></img>
                            </div>
                        </div>
                    </article>
                :
                    null
            }

            {
                selectedCard
                ?
                    <article className='tirar_btn-div'>
                        <button className="game_btn tirar_btn" onClick={handleTirarCarta}>Tirar</button>
                    </article>
                :
                    null
            }
        </section>
    )
}

export default BtnsSection