import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { getGamesThunk } from '../store/states/games.slice'
import { getLoggedUserThunk, updateUserThunk } from '../store/states/users.slice'

const WaitingRoomPage = () => {
    console.log("entré a waiting room")
    
    const { idgame } = useParams()

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const games = useSelector(store => store.games)
    const user = useSelector(store => store.user)
    console.log(user)
    console.log(games)

    console.log(idgame)

    useEffect(() => {
        dispatch(getGamesThunk())

        

        // Establece un intervalo que despache la acción cada 3 segundos
        const intervalId = setInterval(() => {
            dispatch(getGamesThunk());
        }, 10000); // PENDIENTE: volver a poner en 3 segundos: 3000

        // Limpia el intervalo cuando el componente se desmonte
        return () => clearInterval(intervalId);
    }, [])

    // const game = games?.find(g => g.id === idgame)

    // console.log(game)

    return (

        

        <div>WaitingRoomPage</div>
    )
}

export default WaitingRoomPage