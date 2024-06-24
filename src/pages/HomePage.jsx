import './styles/HomePage.css'
import AvailableGames from '../components/HomePage/AvailableGames'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getLoggedUserThunk } from '../store/states/users.slice'
import { useNavigate } from 'react-router-dom'

const HomePage = () => {

    console.log('entré a home')
    const dispatch = useDispatch()
    
    const user = useSelector(store => store.user);
    
    // useEffect(() => {
    //     dispatch(getLoggedUserThunk())
    // }, [])

    console.log(user)

    const navigate = useNavigate()
    const handleLogOut = () => {
        localStorage.removeItem("token")
        navigate('/')
    }

    return (
        <div className='home_wrapper'>
            <h1 className='home_title' >Juega Apuntado Online!</h1>
            <section className='user_logout-wrapper' >
                <h2 className='home_user' >{`Bienvenido ${user?.firstName} ${user?.lastName}`}</h2>
                <button onClick={handleLogOut} className='logout_btn'>Cerrar Sesión</button>
            </section>
            < AvailableGames />
        </div>

    )
}

export default HomePage