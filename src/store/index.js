import { configureStore } from '@reduxjs/toolkit'
import games from './states/games.slice'
import user from './states/users.slice'

export default configureStore({
  reducer:{
    games,
    user
  }
})