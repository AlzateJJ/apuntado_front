import './styles/LoginPage.css'
import { Form, useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { loginUserThunk } from '../store/states/users.slice'

const LoginPage = () => {

    const { handleSubmit, register, reset } = useForm()

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const submit = data => {
        console.log(data)
        dispatch(loginUserThunk(data))
        // buscar el usuaro y cambiarle los
        // atibutos a usuario activo
        reset({
            email: '',
            password: ''
        })
        navigate('/home')
    }

    return (
        <div className='login_page'>
            <h1>Apuntado</h1>
            <h1>Ingresa tu email y contraseña!</h1>

            <form onSubmit={handleSubmit(submit)} className="login_form">
                <label className="form__label">
                    <span className="form__field">Email</span>
                    <input {...register('email')} type="email" className="form__field-value" />
                </label>
                <label className="form__label">
                    <span className="form__field">Contraseña</span>
                    <input {...register('password')} type="password" className="form__field-value" />
                </label>
                <h4><a href="">Olvidaste tu contraseña?</a></h4>
                <button className="form__btn">Ingresar</button>
                <button className="form__btn">Registrarse</button>
            </form>
        </div>
    )
}

export default LoginPage