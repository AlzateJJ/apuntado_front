import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { getGamesThunk } from '../store/states/games.slice'
import { getLoggedUserThunk, updateUserThunk } from '../store/states/users.slice'
import GamePlayerCard from '../components/WitingRoomPage/GamePlayerCard'
import './styles/WaitingRoomPage.css'

const WaitingRoomPage = () => {
    console.log("entré a waiting room")
    
    const { idgame } = useParams()
    const dispatch = useDispatch()
    const games = useSelector(store => store.games)
    const user = useSelector(store => store.user)
    
    console.log(idgame)

    useEffect(() => {
        dispatch(getGamesThunk())
        
        // Establece un intervalo que despache la acción cada 3 segundos
        //const intervalId = setInterval(() => {
        //    dispatch(getGamesThunk());
        //}, 3000); // PENDIENTE: volver a poner en 3 segundos: 3000
        
        // Limpia el intervalo cuando el componente se desmonte
        //return () => clearInterval(intervalId);
    }, [])
    
    console.log(games)
    const game = games?.find(g => g.id == idgame)

    console.log(game)
    console.log(user)
    console.log(game?.users)
    return (
        <>
            <h2 className='waiting_room-title'>Sala de espera</h2>

            <section className='btns-wrapper'>
                {
                    user?.id == game?.adminUserID
                    ? <button>Iniciar Juego</button>
                    : <div>`usuario admin: ${game.userAdminID}`</div>
                }
            </section>
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