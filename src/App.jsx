import './App.css'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import { Routes, Route } from 'react-router-dom'
import { useDispatch} from 'react-redux'
import { getGamesThunk } from './store/states/games.slice'
import { useEffect } from 'react'
import WaitingRoomPage from './pages/WaitingRoomPage'

function App() {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getGamesThunk())
    }, [])
    

    return (
        <>
            <Routes>
                <Route path = '/' element = { <LoginPage /> } />
                <Route path='/home' element = { <HomePage /> }/>
                <Route path='/waitingroom' element = { <WaitingRoomPage /> } />
            </Routes>
            
        </>
    )
}

export default App
