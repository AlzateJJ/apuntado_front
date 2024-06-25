import './App.css'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import { Routes, Route } from 'react-router-dom'
import WaitingRoomPage from './pages/WaitingRoomPage'
import ProtectedRoutes from './components/ProtectedRoutes'
import GamePage from './pages/GamePage'

function App() {
    console.log('entré a App')

    return (
        <>
            <Routes>
                <Route path = '/' element = { <LoginPage /> } />
                <Route element = { <ProtectedRoutes />} >
                    <Route path='/home' element = { <HomePage /> } />
                    <Route path='/waitingroom/:idgame' element = { <WaitingRoomPage /> } />
                    <Route path='/game/:idgame' element = { < GamePage/> } />
                </Route>
            </Routes>
            
        </>
    )
}

export default App
