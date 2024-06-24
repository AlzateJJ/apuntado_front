import './styles/AvailableGames.css'
import AvailableGameCard from './AvailableGameCard'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import CreateGameForm from './CreateGameForm'
import { getGamesThunk } from '../../store/states/games.slice'
import { updateUserThunk } from '../../store/states/users.slice'

const AvailableGames = () => {
    console.log('entré a AbailableGames')

    const [formIsOpened, setFormIsOpened] = useState(false)

    const dispatch = useDispatch()

    const games = useSelector(store => store.games)
    const user = useSelector(store => store.user);

    useEffect(() => {
        dispatch(getGamesThunk())
        if (user?.gameId) {
            dispatch(updateUserThunk({... user, gameId: null}, user?.id))
            // PENDIENTE: falta el caso en el que el que se salga sea el admin del juego
        }

        // Establece un intervalo que despache la acción cada 3 segundos
        const intervalId = setInterval(() => {
            dispatch(getGamesThunk());
        }, 3000); // PENDIENTE: volver a poner en 3 segundos: 3000

        // Limpia el intervalo cuando el componente se desmonte
        return () => clearInterval(intervalId);
    }, [])

    // console.log(games)

    const openForm = () => {
        setFormIsOpened(true)
    }

    // console.log(games)
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