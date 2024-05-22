import React from 'react'
import './styles/AvailableGameCard.css'
import { Navigate, useNavigate } from 'react-router-dom'

const AvailableGameCard = ( { game } ) => {

  const navigate = useNavigate()

  const hadleSubmit = () => {
    const url = 'http://localhost:8080/user'
    // se hace update al user, a usuario jugador
    // se hace update al game
    // se hace navigate a la sala de espera, que el id de la ruta sea el id del game?
    // verificar por medio del token, que el usuario sí pueda ingresar
    navigate('/waitingroom')
  }

  return (
    <article className="game">
        <h3>{game?.name}</h3>
        <h2>{`👥: ${game?.users.length}`}</h2>
        <button className='accessGame_btn'>Unirme</button>
    </article>
  )
}

export default AvailableGameCard