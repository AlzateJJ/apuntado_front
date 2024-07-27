import { configureStore } from '@reduxjs/toolkit'
import appSlice from './states/app.slice'
import games from './states/games.slice'
import user from './states/users.slice'
import cards from './states/cards.slice'
import rounds from './states/rounds.slice'

export default configureStore({
  reducer:{
    app: appSlice,
    games,
    user,
    cards,
    rounds
  }
})