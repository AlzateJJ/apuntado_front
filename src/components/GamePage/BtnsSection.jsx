import React from 'react'
import './styles/BtnsSection.css'
import { useSelector } from 'react-redux'

const BtnsSection = () => {

    const games = useSelector(store => store.games)
    console.log(games)
    return (
        <section className='game_btns-section'>
            <article className='end_game-btns'>
                <button className="end_game_btn tocar_btn">Tocar</button>
                <button className="end_game_btn bajarse_btn">Bajarse</button>
            </article>

            <article className='card_btns'>
                <div className="arrastrar_btn">
                    <img src='../../../deck.png' className='arrastrar_img' alt="imagen del mazo"></img>
                </div>
                <div className='carta_tirada-div'>
                    <h4 className='carta_tirada-title'>Coger carta tirada</h4>
                    <div className='carta_tirada-img_container'>
                        <img src='../../../public/deck.png' className='carta_tirada-img' alt="imagen del mazo"></img>
                    </div>
                </div>
            </article>

            <article className='tirar_btn-div'>
                <button className="game_btn tirar_btn">Tirar</button>
            </article>
        </section>
    )
}

export default BtnsSection