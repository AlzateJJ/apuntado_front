import { configureStore } from '@reduxjs/toolkit'
import appSlice from './states/app.slice'
import games from './states/games.slice'
import user from './states/users.slice'
import cards from './states/cards.slice'

export default configureStore({
  reducer:{
    app: appSlice,
    games,
    user,
    cards
  }
})