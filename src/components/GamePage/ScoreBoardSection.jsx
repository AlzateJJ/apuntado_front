import { useSelector } from 'react-redux'
import './styles/ScoreBoardSection.css'
import PropTypes from 'prop-types'

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
            {
                game?.rounds?.length &&
                    <header className='scoreBoard-header'>
                        <h2 className='scoreBoard-title'>{`Tabla de puntajes, ronda ${game?.rounds?.length} en curso`}</h2>
                    </header>
            }
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
                <svg xmlns="http://www.w3.org/2000/svg" onClick={handleOpenScoreboard} fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="size-1 scoreBoard_close-btn">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5" />
                </svg>


            </section>
        </div>
    )
}

ScoreBoardSection.propTypes = {
    openScoreBoard: PropTypes.bool.isRequired,
    setopenScoreBoard: PropTypes.func.isRequired
}

export default ScoreBoardSection