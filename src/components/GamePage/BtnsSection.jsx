import  { useState } from 'react'
import './styles/BtnsSection.css'
import { useDispatch, useSelector } from 'react-redux'
import { getLoggedUserThunk } from '../../store/states/users.slice'
import { serveCardsThunk, updateGameThunk } from '../../store/states/games.slice'
import { updateCardThunk } from '../../store/states/cards.slice'
import { createRoundThunk, updateRoundThunk } from '../../store/states/rounds.slice'
import PropTypes from 'prop-types';


const BtnsSection = ( { selectedCard, selectCard, setCardsOrder, cardsOrder } ) => {

    const dispatch = useDispatch()
    const user = useSelector(store => store.user)
    const cards = useSelector(store => store.cards)
    const games = useSelector(store => store.games)
    const game = games?.find(g => g.id == user?.gameId) // se encuentra el juego


    const [cartaEscogida, setCartaEscogida] = useState(false)

    const handleTocar = (e) => {
        e.preventDefault()
    }

    const handleBajarse = async (e) => {
        e.preventDefault()
        // 1. verificar que el jugador pueda bajarse (PENDIENTE)
        // const verifyWin = await axios.post('http://localhost:8080/win/games', getConfigToken())
        //     .then(res => {console.log(res)})
        //     .catch(err => console.log(err))
        // if (verifyWin.status == 400) return console.log(verifyWin)

        // 2. terminar el round
        const findLastRound = (game) => {
            //  la función reduce en JavaScript es un método de los arrays que se utiliza para iterar 
            // sobre un array y acumular un solo valor basado en un callback proporcionado
            if (!game || !game.rounds) {
                return -1;
            }
            const { rounds } = game
            const lastRoundId = rounds.reduce((max, round) => (round.id > max ? round.id : max), 0)
            return rounds.find(r => r.id === lastRoundId)
        }

        const lastRound = findLastRound(game)
        console.log(lastRound)
        dispatch(updateRoundThunk({ ...lastRound, finished: true, winner_id: user.id}, lastRound.id))
        // 3. actualizar los puntos de todos los jugadores (PENDIENTE)
        // 4. sacar jugadores si es necesario, declarar ganador si es necesario (PENDIENTE)
        // 5. empezar una nueva ronda con los jugadores restantes
        dispatch(createRoundThunk({ gameId: lastRound.gameId }))
        // 6. volver a ejecutar serveCards, pero esta vez, el que recibe 11 es el ganador, no el primero
        dispatch(serveCardsThunk(game.id, user.id))
        // 7. actualizar estados locales
        setCardsOrder([])
        setCartaEscogida(true)
    }

    const handleArrastrar = (e) => {
        e.preventDefault()

        // 1. se busca en el deck una carta random que tenga state 1
        const retrieveRandomDeckCard = (deck) => {
            console.log(deck)
            const availableCards = deck.filter(card => card.state === 1 && !card.userId);
            console.log(availableCards)
            console.log(availableCards.length)

            if (availableCards.length === 0) {
                // PENDIENTE: lógica para cuando se acaben las cartas
                return null;
            }

            const randomIndex = Math.floor(Math.random() * availableCards.length);
            return availableCards[randomIndex];
        }

        const card = retrieveRandomDeckCard(cards || game?.deck?.cards)
        // 2. se le actualiza el estado a 2 y se le asigna al jugador
        dispatch(updateCardThunk({ ...card, state: 2, userId: user.id}, card.id))
        // 3. se quitan datos de discarded_card y se actualiza esa carta con estado 4 y sin userId
        dispatch(updateCardThunk({ ...game.discarded_card.card, userId: null, state: 4}, game.discarded_card.card.id))
        // dispatch(updateGameThunk({ ...game, discarded_card: {playerId: null, card: null} }, game.id)) // PENDIENTE: puede que no sea necesario porque cuando el jugador tira la carta, actualiza los datos de discarded_card
        setCartaEscogida(true)
        if (cardsOrder.length > 0) {
            console.log(cardsOrder)
            setCardsOrder([ card.id, ...cardsOrder ])
        }
    }

    const handleCogerCartaTirada = (e) => {
        e.preventDefault()
        console.log('entré a handleCogerCartaTirada')

        // console.log({ ...game.discarded_card.card, userId: user.id, state: 2})
        dispatch(updateCardThunk({ ...game.discarded_card.card, userId: user.id, state: 2}, game.discarded_card.card.id))
        setCartaEscogida(true)
        selectCard('')
        if (cardsOrder.length > 0) {
            console.log(cardsOrder)
            setCardsOrder([ game.discarded_card.card.id, ...cardsOrder ])
        }
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
        selectCard(false)
        setCartaEscogida(false)
    }

    const handleOrderCards = (e) => {
        e.preventDefault()
        // const cardsIndexs = user.cards.map(card => card.id)
        // console.log(cardsIndexs)

        const orderedCardsByIndexs = [ ...user.cards].sort((a, b) => a.id - b.id)
        console.log(orderedCardsByIndexs)

        const cardsRanksFiltered = orderedCardsByIndexs.sort((a, b) => (+(a.rank)) - (+(b.rank)))
        console.log(cardsRanksFiltered)

        const cardsFilteredIds = cardsRanksFiltered.map(card => card.id)

        setCardsOrder(cardsFilteredIds)
        // dispatch(setUserCards(orderedCardsIndexs, user.id))
        selectCard(false)
    }

    const handleSwapCards = (e) => {
        e.preventDefault()
    }
    // console.log(selectedCard)
    // console.log(user)
    // console.log(game?.turnplayerID == user?.id)
    // console.log(game?.discarded_card.card && !cartaEscogida)
    // console.log(cartaEscogida)
    return (
        
        <section className='game_btns-section'>
            <>
            <article className='order_swap-wrapper'>
                <button className='game_btn order_cards-btn alter_cards-btn' onClick={handleOrderCards}>Ordenar Cartas</button>
                <button className='game_btn swap_cards-btn alter_cards-btn' onClick={handleSwapCards}>Intercambiar Cartas</button>
            </article>
            {
                game?.turnplayerID == user?.id
                    ?
                        (
                            user?.cards?.length === 10
                                ?
                                    <>
                                    <article className='end_game-btns'>
                                        <button className="end_game_btn tocar_btn" onClick={handleTocar}>Tocar</button>
                                        <button className="end_game_btn bajarse_btn" onClick={handleBajarse}>Bajarse</button>
                                    </article>
                                    <article className='card_btns'>
                                        {
                                            game?.discarded_card.card && !cartaEscogida
                                            ?
                                                <>
                                                <div className='arrastrar-div'>
                                                    <h4 className='arrastrar-title'>Arrastrar del mazo</h4>
                                                    <div className="arrastrar-img_container" onClick={handleArrastrar}>
                                                        <img src='../../../deck.png' className='arrastrar_img' alt="imagen del mazo"></img>
                                                    </div>
                                                </div>
                                                <div className='carta_tirada-div'>
                                                    {
                                                        game?.users?.length > 0
                                                        ?
                                                            <h4 className='carta_tirada-title'>{`Coger carta tirada por 
                                                                ${((game.users.find(p => p.id == game.discarded_card.playerId))?.firstName) ?
                                                                    ((game.users.find(p => p.id == game.discarded_card.playerId))?.firstName) : 'el anterior'
                                                                }
                                                                ${((game.users.find(p => p.id == game.discarded_card.playerId))?.lastName) ?
                                                                    ((game.users.find(p => p.id == game.discarded_card.playerId))?.lastName) : ' jugador'
                                                                }
                                                            `}</h4>
                                                            :
                                                            <h4 className='carta_tirada-title'>{`Coger carta tirada`}</h4>
                                                    }
                                                    <article className='card' onClick={handleCogerCartaTirada}>
                                                        <header className='card_header'>
                                                            <h2 className={`card_rank ${(game.discarded_card.card.suit === 'corazón' || game.discarded_card.card.suit === 'diamante') && 'red_suit'}`}>
                                                                {`${game.discarded_card.card.rank == 11 ? "J" : 
                                                                    (game.discarded_card.card.rank == 12 ? "Q" :
                                                                        (game.discarded_card.card.rank == 13 ? "K" :
                                                                            (game.discarded_card.card.rank == 14 ? "A" : game.discarded_card.card.rank)
                                                                        )
                                                                    )
                                                                }`}
                                                            </h2>
                                                        </header>
                                                        <div className='card_body'>
                                                            <div className='img_container'>
                                                                <img src={`../../../${game.discarded_card.card.suit}.png`} className='card_img' alt="imagen de la carta"></img>
                                                            </div>
                                                        </div>
                                                        <footer className='card_footer'>
                                                            <h2 className={`card_rank ${(game.discarded_card.card.suit === 'corazón' || game.discarded_card.card.suit === 'diamante') && 'red_suit'}`}>
                                                                {`${game.discarded_card.card.rank == 11 ? "J" : 
                                                                    (game.discarded_card.card.rank == 12 ? "Q" :
                                                                        (game.discarded_card.card.rank == 13 ? "K" :
                                                                            (game.discarded_card.card.rank == 14 ? "A" : game.discarded_card.card.rank)
                                                                        )
                                                                    )
                                                                }`}
                                                            </h2>
                                                        </footer>
                                                    </article>
                                                </div>
                                                </>
                                            :
                                                null
                                        }
                                    </article>
                                    </>
                                :
                                    (
                                        selectedCard &&
                                        <article className='tirar_btn-div'>
                                            <button className="game_btn tirar_btn" onClick={handleTirarCarta}>Tirar</button>
                                        </article>
                                    )
                            
                        )
                    :
                        null
            }
            </>
            </section>
    )
}

BtnsSection.propTypes = {
    selectedCard: PropTypes.object,
    selectCard: PropTypes.func.isRequired,
    setCardsOrder: PropTypes.func.isRequired,
    cardsOrder: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default BtnsSection