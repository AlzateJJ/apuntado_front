import PropTypes from 'prop-types'
import './styles/GamePlayerCard.css'

const GamePlayerCard = ( { player } ) => {
	// console.log('entré a GamePlayerCard')

	// console.log(player)

	// console.log(today)

	return (
		<div className='player-card'>
			<h4 className='player-name'>{`${player?.firstName} ${player?.lastName}`}</h4>
			<p className='player-created_date'> {`jugador desde el ${player?.createdAt}`} </p>
		</div>
	)
}

GamePlayerCard.propTypes = {
    player: PropTypes.shape({
        firstName: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired,
        createdAt: PropTypes.string.isRequired
    }).isRequired
}

export default GamePlayerCard