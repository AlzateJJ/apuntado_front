import { configureStore } from '@reduxjs/toolkit'
import games from './states/games.slice'

export default configureStore({
  reducer:{
    games
  }
})