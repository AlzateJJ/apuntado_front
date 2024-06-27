import React, { useEffect } from 'react'
import './styles/AvailableGameCard.css'
import { Navigate, useNavigate } from 'react-router-dom'
import { updateUserThunk } from '../../store/states/users.slice'
import { useDispatch, useSelector } from 'react-redux'

const AvailableGameCard = ( { game } ) => {
  // console.log('entré a AbailableGameCard')
  // console.log(game)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector(store => store.user);

  const handleSubmit = (e) => {
    e.preventDefault()

    // se hace update al user
    dispatch(updateUserThunk({ gameId: game.id }, user.id))
    // se hace update al game, PENDIENTE: necesario?
    // verificar por medio del token, que el usuario sí pueda ingresar, PENDIENTE: necesario?

    // se hace navigate a la sala de espera
    navigate(`/waitingroom/${game.id}`)

    
  }
  
  return ( // PENDIENTE: no sé por qué no aparecen los users del game de inmediato, toca esperar a que se recargue el componente
    <article className="game">
      <h1 className="game__name">{game?.name}</h1>
      <h2 className="game__users">{`en sala: ${game.users?.length || 0}`}</h2>
      <h2 className="game__max-players">{`max: ${game?.max_players}`}</h2>
      <button onClick={handleSubmit} className="accessGame_btn">Unirme</button>
  </article>

  )
}

export default AvailableGameCard