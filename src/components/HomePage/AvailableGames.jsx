import './styles/AvailableGames.css'
import AvailableGameCard from './AvailableGameCard'
import { useSelector } from 'react-redux'

const AvailableGames = () => {

    const games = useSelector(store => store.games)

    // console.log(games)
    return (
        <div className='availableGames'>
            <h2>Juegos a los que te puedes unir</h2>
            <div className="games_wrapper">
                {
                    games?.map(game => (
                        < AvailableGameCard 
                            game = {game}
                            key = {game.id}
                        />
                    ))
                }
            </div>
        </div>
  )
}

export default AvailableGames