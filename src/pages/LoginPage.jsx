import './styles/LoginPage.css'
import { Form, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { loginUserThunk } from '../store/states/users.slice'
import { genericRequestThunk } from '../store/states/app.slice'
import axios from 'axios'

const LoginPage = () => {
    console.log('entré a LoginPage')

    const { handleSubmit, register, reset } = useForm()

    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    // localStorage.removeItem("token"); // PENDIENTE: hacer funcionalidad para hacer logout, quitar esto
    const submit = data => {
        console.log(data)
        // dispatch(loginUserThunk(data))
        // buscar el usuaro y cambiarle los
        // atibutos a usuario activo

        dispatch(genericRequestThunk(async () => {
            const res = await axios.post("http://localhost:8080/users/login", data)
            localStorage.setItem("token", res.data.accessToken)
            navigate('./home')
        }, "", "Credenciales inválidas"))
        reset({
            email: '',
            password: ''
        })
    }

    return (
        <div className='login_page'>
            <h1 className='login_page-title'>Apuntado</h1>

            <form onSubmit={handleSubmit(submit)} className="login_form">
                <h1 className='login_form-title'>Ingresa tu email y contraseña!</h1>
                <label className="form__label">
                    <span className="form__field">Email</span>
                    <input {...register('email')} type="email" className="form__field-value" />
                </label>
                <label className="form__label">
                    <span className="form__field">Contraseña</span>
                    <input {...register('password')} type="password" className="form__field-value" />
                </label>
                <a href="" className='password_reset'>Olvidaste tu contraseña?</a>
                <button className="form__btn">Ingresar</button>
                <button className="form__btn">Registrarse</button>
            </form>
        </div>
    )
}

export default LoginPage