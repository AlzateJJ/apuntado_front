import React, { useEffect } from 'react'
import './styles/AvailableGameCard.css'
import { Navigate, useNavigate } from 'react-router-dom'
import { updateUserThunk } from '../../store/states/users.slice'
import { useDispatch, useSelector } from 'react-redux'

const AvailableGameCard = ( { game } ) => {
  console.log('entré a AbailableGameCard')

  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  const user = useSelector(store => store.user);

  const handleSubmit = (e) => {
    // e.preventDefault()
    // console.log(user)
    // se hace update al user, a usuario jugador
    dispatch(updateUserThunk({ ...user, isPlaying: true, points: 0, gameId: game.id }))
    // console.log(user)
    // se hace update al game

    // se hace navigate a la sala de espera, que el id de la ruta sea el id del game?

    // verificar por medio del token, que el usuario sí pueda ingresar
    
    // navigate('/waitingroom')
  }
  // console.log(game)
  return (
    <article className="game">
      <h1 className="game__name">{game?.name || 'Juego sin nombre'}</h1>
      <h2 className="game__users">{`en sala: ${game?.users?.length || 0}`}</h2>
      <h2 className="game__max-players">{`max: ${game?.max_players || 0}`}</h2>
      <button onClick={handleSubmit} className="accessGame_btn">Unirme</button>
  </article>

  )
}

export default AvailableGameCard