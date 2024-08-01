import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import './styles/ScoreBoardSection.css'

const ScoreBoardSection = ( { openScoreBoard, setopenScoreBoard } ) => {
    const games = useSelector(store => store.games)
    const user = useSelector(store => store.user)
    const game = games?.find(g => g.id === user?.gameId)
    // console.log(game)

    const handleOpenScoreboard = e => {
        e.preventDefault()
        setopenScoreBoard(false)
    }

    return (
        <div className={`scoreBoard ${!openScoreBoard && 'close_scoreBoard'}`}>
            <header className='scoreBoard-header'>
                <h2 className='scoreBoard-title'>{`Tabla de puntajes, ronda ${game?.rounds?.length} en curso`}</h2>
            </header>
            <section className='scoreBoard-body'>
                <div className='players_wrapper'>
                    {
                        game?.users?.map(
                            player => (
                                <article key={`${player.id}`} className='scoreBoard-player'>
                                    <div className='scoreBoard-player_name_div'>
                                        <h3 className='scoreBoard-player_name'>{`${player.firstName} ${player.lastName}`}</h3>
                                    </div>
                                    <div className='scoreBoard-player_points_div'>
                                        <h3 className='scoreBoard-player_points'>{`${player.points}`}</h3>
                                    </div>
                                </article>
                            )
                        )
                    }
                </div>
                <div className='scoreBoard_close-btn' onClick={handleOpenScoreboard}>➡️</div>
            </section>
        </div>
    )
}

export default ScoreBoardSection