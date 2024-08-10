import { useForm } from 'react-hook-form'
import './styles/CreateGameForm.css'
import { useDispatch, useSelector } from 'react-redux'
import { updateUserThunk } from '../../store/states/users.slice'
import { useNavigate } from 'react-router-dom'
import getConfigToken from '../../services/getConfigToken'
import { addGame } from '../../store/states/games.slice'
import axios from 'axios'
import PropTypes from 'prop-types'

const CreateGameForm = ( { formIsOpened, setFormIsOpened } ) => {
    // console.log('entré a CreateGameForm')

    const { handleSubmit, register, reset } = useForm()

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const user = useSelector(store => store.user);
    // console.log(user)

    const submit = async data => {

        let datos_juego
        try {
        const gameRes = await axios.post("http://localhost:8080/games", data, getConfigToken())
            addGame(gameRes.data)
            datos_juego = gameRes.data
        }
         catch (err) {
            console.log(user)
            console.log(err)
        }

        // actualizar el user con el nuevo gameId
        console.log(datos_juego)
        console.log({... user, gameId: datos_juego?.id})
        // dispatch(updateUserThunk({... user, gameId: datos_juego.id}, datos_juego.adminUserID))
        dispatch(updateUserThunk({gameId: datos_juego.id}, datos_juego.adminUserID))

        navigate(`/waitingroom/${datos_juego.id}`)

        // resetear y cerrar form
        reset({
            name: '',
            max_players: ''
        })
        setFormIsOpened(false)
    }

    const closeForm = () => {
        reset({
            name: '',
            max_players: ''
        })
        setFormIsOpened(false)
    }

    return (
        <div className = {`create_game-form_container ${!formIsOpened && "close_form"}`}>
            <form className="form" onSubmit={handleSubmit(submit)}>
                <header className='form__header'>
                    <h2 className='form__title'>Crear Nuevo Juego</h2>
                    <div onClick={closeForm} className='form__close-btn'>x</div>
                </header>
                <label className="form__label">
                    <span className="form__field">Nombre del Juego</span>
                    <input {...register('name')} type="text" className="form__field-value" />
                </label>
                <label className="form__label">
                    <span className="form__field">Máximo de Jugadores</span>
                    <input {...register('max_players')} type="number" className="form__field-value" min="2" max="8"/>
                </label>
                <button className='create_game-btn'>Crear Juego</button>
            </form>
        </div>
    )
}

CreateGameForm.propTypes = {
    formIsOpened: PropTypes.bool.isRequired,
    setFormIsOpened: PropTypes.func.isRequired
}

export default CreateGameForm