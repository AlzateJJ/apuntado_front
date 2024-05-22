import React, { useEffect } from 'react'
import './styles/AvailableGameCard.css'
import { Navigate, useNavigate } from 'react-router-dom'
import { getLoggedUserThunk, updateUserThunk } from '../../store/states/users.slice'
import { useSelector } from 'react-redux'

const AvailableGameCard = ( { game } ) => {

  const navigate = useNavigate()
  
  useEffect(() => {
    getLoggedUserThunk()
  }, [])
  
  const user = useSelector(store => store.user);

  const handleSubmit = () => {
    console.log(user)
    // se hace update al user, a usuario jugador
    // updateUserThunk(user)
    // se hace update al game
    // se hace navigate a la sala de espera, que el id de la ruta sea el id del game?
    // verificar por medio del token, que el usuario sí pueda ingresar
    
    // navigate('/waitingroom')
  }

  return (
    <article className="game">
        <h3>{game?.name}</h3>
        <h2>{`👥: ${game?.users.length}`}</h2>
        <button onClick={handleSubmit} className='accessGame_btn'>Unirme</button>
    </article>
  )
}

export default AvailableGameCard