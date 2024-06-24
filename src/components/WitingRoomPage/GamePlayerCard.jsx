import React from 'react'
import './styles/GamePlayerCard.css'

const GamePlayerCard = ( { player } ) => {
	console.log('entré a GamePlayerCard')

	console.log(player)

	const today = new Date()
	console.log(today)

  	return (
		<div className='player-card'>
			<h4 className='player-name'>{`${player?.firstName} ${player?.lastName}`}</h4>
			<p className='player-created_date'> {`jugador desde el ${player?.createdAt}`} </p>
		</div>
  	)
}

export default GamePlayerCard