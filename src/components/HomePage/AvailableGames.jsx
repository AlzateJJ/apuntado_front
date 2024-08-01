import './styles/AvailableGames.css'
import AvailableGameCard from './AvailableGameCard'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import CreateGameForm from './CreateGameForm'
import { getGamesThunk } from '../../store/states/games.slice'
import { updateUserThunk } from '../../store/states/users.slice'

const AvailableGames = () => {
    // console.log('entré a AbailableGames')

    const [formIsOpened, setFormIsOpened] = useState(false)

    const dispatch = useDispatch()

    const games = useSelector(store => store.games)
    const user = useSelector(store => store.user);

    useEffect(() => {
        dispatch(getGamesThunk())
        // Establece un intervalo que despache la acción cada 3 segundos
        const intervalId = setInterval(() => {
            dispatch(getGamesThunk());
        }, 3000); // PENDIENTE: volver a poner en 3 segundos: 3000

        // Limpia el intervalo cuando el componente se desmonte
        return () => clearInterval(intervalId);
    }, [])

    // console.log(user)
    if (user?.gameId) { // PENDIENTE: a veces no funciona como se quiere
        dispatch(updateUserThunk({gameId: null}, user.id))
        // PENDIENTE: falta el caso en el que el que se salga sea el admin del juego
    }

    const openForm = () => {
        setFormIsOpened(true)
    }
    // PENDIENTE: cuando todos los juegos que hay están empezados, se muestra el string que no es: "Juegos a los que te puedes unir"
    // console.log(games)
    // <button className="create_game-btn" onClick={openForm}>Crear Juego</button>
    return (
        <section className='availableGames'>
            <div className="title_btn-wrapper">
                <h2 className='games_title'>{(games?.filter(g => g.started === false)).length > 0 ? 'Juegos a los que te puedes unir' : 'No hay juegos disponibles todavía, crea uno!'}</h2>
                <button onClick={openForm} className="create_game-btn">
                    <p>Crear Juego</p>
                </button>
            </div>

            <CreateGameForm 
                formIsOpened = {formIsOpened}
                setFormIsOpened = {setFormIsOpened}
            />

            <div className="games_wrapper">
                {
                    games?.map(game => (
                        !game.started // && game.users.length PENDIENTE: validar que solo se muestren los juegos con jugadores
                            ?   < AvailableGameCard
                                    key = {game.id}
                                    game = {game}
                                />
                            :   console.log(game)
                    ))
                }
            </div>
        </section>
  )
}

export default AvailableGames