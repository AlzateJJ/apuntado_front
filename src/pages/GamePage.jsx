import React from 'react'
import { useSelector } from 'react-redux'

const GamePage = () => {
    console.log('entré a GamePage')

    const games = useSelector(store => store.games)
    const user = useSelector(store => store.user)


    console.log(user)
    console.log(games)

    return (
        <div>
            <h3>GamePage</h3>

        </div>
    )
}

export default GamePage