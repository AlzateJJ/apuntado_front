import './styles/HomePage.css'
import AvailableGames from '../components/HomePage/AvailableGames'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getLoggedUserThunk } from '../store/states/users.slice'

const HomePage = () => {

    const dispatch = useDispatch

    useEffect(() => {
        getLoggedUserThunk()
    }, [])

    const user = useSelector(store => store.user);
    
    console.log(user)
    return (
        <div className='home_wrapper'>
            <h1>Home Header</h1>
            <h2>{`Bienvenido ${user?.firstName} ${user?.lastName}`}</h2>
            < AvailableGames />
        </div>

    )
}

export default HomePage