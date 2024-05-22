import React from 'react'
import './styles/AvailableGameCard.css'

const AvailableGameCard = ( { game } ) => {

  const hadleSubmit = () => {
    const url = 'http://localhost:8080/user'
    // se hace update al user, a usuario jugador
    // se hace update al game
    // se hace navigate a la sala de espera, que el id de la ruta sea el id del game?
    // verificar por medio del token, que el usuario sí pueda ingresar

  }

  return (
    <article className="game">
        <h3>{game?.name}</h3>
        <ul className="game_data">
            <li className="game_data_li">{`Empieza a las: ${game?.startHour}`}</li>
            <li className="game_data_li">{`Número de jugadores: ${game?.num_players}`}</li>
        </ul>
        <button className='accessGame_btn'>Unirme</button>
    </article>
  )
}

export default AvailableGameCard