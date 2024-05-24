import './App.css'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import { Routes, Route } from 'react-router-dom'
import { useDispatch} from 'react-redux'
import { getGamesThunk } from './store/states/games.slice'
import { useEffect } from 'react'
import WaitingRoomPage from './pages/WaitingRoomPage'
import ProtectedRoutes from './components/ProtectedRoutes'

function App() {
    console.log('entré a App')

    return (
        <>
            <Routes>
                <Route path = '/' element = { <LoginPage /> } />
                <Route element = { <ProtectedRoutes />} >
                    <Route path='/home' element = { <HomePage /> } />
                    <Route path='/waitingroom:idgame' element = { <WaitingRoomPage /> } />
                </Route>
            </Routes>
            
        </>
    )
}

export default App
