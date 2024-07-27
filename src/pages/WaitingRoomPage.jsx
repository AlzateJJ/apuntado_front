import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { deleteGameThunk, getGamesThunk, serveCardsThunk, updateGameThunk } from '../store/states/games.slice'
import { updateUserThunk } from '../store/states/users.slice'
import GamePlayerCard from '../components/WitingRoomPage/GamePlayerCard'
import './styles/WaitingRoomPage.css'

const WaitingRoomPage = () => {
    // console.log("entré a waiting room")
    
    const { idgame } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const games = useSelector(store => store.games)
    const user = useSelector(store => store.user)
    const game = games?.find(g => g.id == idgame) // se encuentra el juego
    // console.log(idgame)

    useEffect(() => {
        dispatch(getGamesThunk())
        
        // Establece un intervalo que despache la acción cada 3 segundos
        const intervalId = setInterval(() => {
            // console.log('ejecuto 3 secs')
            dispatch(getGamesThunk());

        }, 3000); // PENDIENTE: volver a poner en 3 segundos: 3000
        
        // Limpia el intervalo cuando el componente se desmonte
        return () => clearInterval(intervalId);
    }, [])
    

    const handleJoinGame = e => {
        e.preventDefault()
        navigate(`/game/${game?.id}`)
    }

    const handleLeaveGame = e => {
        e.preventDefault()
        if (user?.id == game?.adminUserID) { // si el que se sale es el admin
            if (game?.users.length > 1) { // si queda más de 1 jugador
                const newGameAdmin = game?.users.find(user => user.id != game?.adminUserID) // encontrar nuevo admin
                console.log(newGameAdmin)
                dispatch(updateGameThunk({... game, adminUserID: newGameAdmin.id}, game.id)) // asignarle admin al juego
                dispatch(updateUserThunk({gameId: null}, user.id)) // sacar antigüo admin del juego
            } else { // si solo queda 1 jugador (el admin) en el juego
                dispatch(updateUserThunk({... user, gameId: null}, user.id)) // sacar al admin del juego
                dispatch(deleteGameThunk(game.id)) // eliminar juego
            }
        } else { // si el que se sale es alguien que no es admin (queda mínimo el admin en el juego)
            dispatch(updateUserThunk({gameId: null}, user.id)) // sacar al jugador del juego
        }
        navigate('/home')
    }
    
    const handleStartGame = e => {
        e.preventDefault()
        console.log('juego comenzado')
        console.log(game.id)
        dispatch(serveCardsThunk(game.id))
        dispatch(updateGameThunk({ started: true }, game.id))
        navigate(`/game/${game.id}`)
        
    }
    // console.log(game)
    // console.log(user)
    return (
        <>
            <section className='waiting_room-header'>
                <h2 className='waiting_room-title'>Sala de espera para el juego:
                    <span className='game_name'> {`${game?.name}`}</span>
                </h2>
                <article className='btns-wrapper'>
                    {
                        user?.id == game?.adminUserID
                        ?   <button onClick={handleStartGame} className='start_game-btn w_room_header-btn'>Iniciar Juego</button>
                        :   (game?.started
                            ?   <button onClick={handleJoinGame} className='join_game-btn w_room_header-btn'>Entrar al Juego!</button>
                            :   (
                                    game?.users
                                    ?
                                        <h3 className='admin_user-name'>{`Esperando que  
                                            ${(game?.users.find(p => p.id === game?.adminUserID)).firstName} 
                                            ${(game?.users.find(p => p.id === game?.adminUserID)).lastName}
                                        inicie el juego`}</h3>
                                        :
                                            <h3>Esperando que el administrador inicie el juego</h3>
                                )
                            )
                    }
                    <button onClick={handleLeaveGame} className='leave_game-btn w_room_header-btn'>Salir del juego</button>
                </article>
            </section>
            
            <h3 className='game_players-title'>{`Jugadores en sala de espera: ${game?.users.length}`}</h3>
            <section className='players-wrapper'>
                {
                    game?.users.map(u => (
                        < GamePlayerCard
                            key = {u.id}
                            player = {u}
                        />
                    ))
                }
            </section>
        </>
    )
}

export default WaitingRoomPage