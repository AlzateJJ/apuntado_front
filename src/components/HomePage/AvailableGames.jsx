import './styles/AvailableGames.css'
import AvailableGameCard from './AvailableGameCard'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import CreateGameForm from './CreateGameForm'

const AvailableGames = () => {
    console.log('entré a AbailableGames')

    const games = useSelector(store => store.games)

    const [formIsOpened, setFormIsOpened] = useState(false)

    // console.log(games)

    const openForm = () => {
        setFormIsOpened(true)
    }

    return (
        <section className='availableGames'>
            <div className="title_btn-wrapper">
                <h2 className='games_title'>Juegos a los que te puedes unir</h2>
                <button className="create_game-btn" onClick={openForm}>Crear Juego</button>
            </div>

            <CreateGameForm 
                formIsOpened = {formIsOpened}
                setFormIsOpened = {setFormIsOpened}
            />

            <div className="games_wrapper">
                {
                    games?.map(game => (
                        < AvailableGameCard 
                            key = {game.id}
                            game = {game}
                        />
                    ))
                }
            </div>
        </section>
  )
}

export default AvailableGames