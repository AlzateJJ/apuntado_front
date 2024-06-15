import { useForm } from 'react-hook-form'
import './styles/CreateGameForm.css'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createGameThunk } from '../../store/states/games.slice'
import { getLoggedUserThunk, updateUserThunk } from '../../store/states/users.slice'
import { useNavigate } from 'react-router-dom'

const CreateGameForm = ( { formIsOpened, setFormIsOpened } ) => {
    console.log('entré a CreateGameForm')

    const { handleSubmit, register, reset } = useForm()

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const user = useSelector(store => store.user);
    console.log(user)

    const submit = data => {
        // crear el juego
        dispatch(createGameThunk(data))
        // hacer update del user admin del juego
        // dispatch(updateUserThunk({ isPlaying: true }, user.id)) // , gameId: game.id // , gameId: games[games?.length-1].id

        // resetear y cerrar form
        reset({
            name: '',
            max_players: ''
        })
        setFormIsOpened(false)
        
        // dispatch(getLoggedUserThunk()) // PENDIENTE: actualizar el usuario local, y después hacer el navigate
        // navigate(`/waitingroom/${user.gameId}`)
    }

    const closeForm = () => {
        reset({
            name: '',
            max_players: ''
        })
        setFormIsOpened(false)
    }

    // useEffect(() => {
    //     if (user?.gameId) {
    //         navigate(`/waitingroom/${user.gameId}`)
    //     }
    //     // Establece un intervalo que despache la acción cada 3 segundos
    //     const intervalId = setInterval(() => {
    //         dispatch(getLoggedUserThunk());
    //     }, 3000); // PENDIENTE: volver a poner en 3 segundos: 3000

    //     // Limpia el intervalo cuando el componente se desmonte
    //     return () => clearInterval(intervalId);
    // }, [])

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

export default CreateGameForm