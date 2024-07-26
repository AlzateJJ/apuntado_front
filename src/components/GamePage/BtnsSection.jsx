import React from 'react'
import './styles/BtnsSection.css'
import { useDispatch, useSelector } from 'react-redux'
import { getLoggedUserThunk, updateUserThunk } from '../../store/states/users.slice'
import { updateGameThunk } from '../../store/states/games.slice'
import { updateCardThunk } from '../../store/states/cards.slice'

const BtnsSection = ( { selectedCard } ) => {

    const dispatch = useDispatch()
    const user = useSelector(store => store.user)

    const games = useSelector(store => store.games)
    // console.log(games)
    const game = games?.find(g => g.id == user?.gameId) // se encuentra el juego
    // console.log(game)

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
        console.log('entré a handleCogerCartaTirada')

        // console.log({ ...game.discarded_card.card, userId: user.id, state: 2})
        dispatch(updateCardThunk({ ...game.discarded_card.card, userId: user.id, state: 2}, game.discarded_card.card.id))
    }

    const handleTirarCarta = (e) => {
        e.preventDefault()
        console.log("entré a handleTirarCarta")
        // 1. actualizar las cartas del jugador que tiró la carta (que se le quite la que tiró)
            // const newCards = user?.cards.filter(card => card.id !== selectedCard.id)
            // console.log(newCards)
            // dispatch(updateUserThunk({ cards: newCards }, user.id))
        
        console.log({ ...selectedCard, state: 3, userId: null})
        dispatch(updateCardThunk({ ...selectedCard, state: 3, userId: null}, selectedCard.id)) // PENDIENTE: null?
        dispatch(getLoggedUserThunk()) // para actualizar las cartas del jugador rápidamente en la interfaz
        // 2. settear la carta tirada del juego

        // 3. encontrar y actualizar el jugador que sigue (el turnPlayerId) del juego
        const activePlayerID = game.turnplayerID
        const index = game.users.findIndex(player => player.id === activePlayerID)
        const newActivePlayerIndex = ((index == (game.users.length - 1)) ? 0 : (index + 1))
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
            {
                user?.cards.length === 10
                ?
                    <article className='end_game-btns'>
                        <button className="end_game_btn tocar_btn" onClick={handleTocar}>Tocar</button>
                        <button className="end_game_btn bajarse_btn">Bajarse</button>
                    </article>
                :
                    null
            }

            {
                user?.cards.length === 10
                ?
                    <article className='card_btns'>
                        <div className='arrastrar-div'>
                            <h4 className='arrastrar-title'>Arrastrar del mazo</h4>
                            <div className="arrastrar-img_container" onClick={handleArrastrar}>
                                <img src='../../../deck.png' className='arrastrar_img' alt="imagen del mazo"></img>
                            </div>
                        </div>
                        <div className='carta_tirada-div'>
                            <h4 className='carta_tirada-title'>{`Coger carta tirada por jugador con Id: ${game.discarded_card.playerId}`}</h4>
                            {
                                game?.discarded_card.card
                                ?
                                    <article className='card' onClick={handleCogerCartaTirada}>
                                        <header className='card_header'>
                                            <h2 className={`card_rank ${(game.discarded_card.card.suit === 'corazón' || game.discarded_card.card.suit === 'diamante') && 'red_suit'}`}>{`${game.discarded_card.card.rank}`}</h2>
                                        </header>
                                        <div className='card_body'>
                                            <div className='img_container'>
                                                <img src={`../../../${game.discarded_card.card.suit}.png`} className='card_img' alt="imagen de la carta"></img>
                                            </div>
                                        </div>
                                        <footer className='card_footer'>
                                            <h2 className={`card_rank ${(game.discarded_card.card.suit === 'corazón' || game.discarded_card.card.suit === 'diamante') && 'red_suit'}`}>{`${game.discarded_card.card.rank}`}</h2>
                                        </footer>
                                    </article>
                                :
                                <h2>No hay carta tirada</h2>
                            }
                        </div>
                    </article>
                :
                    null
            }

            {
                selectedCard && user.cards.length === 11
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