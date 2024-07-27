import React from 'react'
import { useSelector } from 'react-redux'

const ScoreBoardSection = () => {
    const games = useSelector(store => store.games)
    const user = useSelector(store => store.user)

    const game = games?.find(g => g.id === user?.gameId)
    console.log(game)

    return (
        <div className='scoreBoard'>
            {
                game?.users.map(
                    p => (
                        <article className='player_points'>
                            
                        </article>
                    )
                )
            }
        </div>
    )
}

export default ScoreBoardSection