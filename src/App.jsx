import './App.css'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import { Routes, Route } from 'react-router-dom'
import { useDispatch} from 'react-redux'
import { getGamesThunk } from './store/states/games.slice'
import { useEffect } from 'react'

function App() {

    const dispatch = useDispatch()

    useEffect(() => {
        const url = 'http://localhost:8080/games'
        dispatch(getGamesThunk(url))
    }, [])
    

    return (
        <>
            <Routes>
                <Route path = '/' element = { <LoginPage /> } />
                <Route path='/home' element = { <HomePage /> }/>
            </Routes>
            
        </>
    )
}

export default App
