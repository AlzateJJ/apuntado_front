import './styles/HomePage.css'
import AvailableGames from '../components/HomePage/AvailableGames'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import 'boxicons/css/boxicons.min.css';

const HomePage = () => {

    console.log('entré a HomePage')
    
    const user = useSelector(store => store.user);
    
    // useEffect(() => {
    //     dispatch(getLoggedUserThunk())
    // }, [])

    // console.log(user)

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
            <div className='tokens_div'>
                <a href="https://wa.me/qr/KRZZTMMKXWZTN1" className="tokens_button" target='blank'>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" className="whatsapp-icon" width="20" height="20" />
                    Comprar Tokens
                </a>
            </div>
            < AvailableGames />
        </div>

    )
}

export default HomePage