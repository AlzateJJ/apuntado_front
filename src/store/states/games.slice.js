import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const gamesslice = createSlice({
    name: 'games',
    initialState: null,
    reducers: {
        setGames: (state, action) => action.payload
    }
})

export const { setGames } = gamesslice.actions;

export default gamesslice.reducer;

export const getGamesThunk = () => (dispatch) => {
    const url = 'http://localhost:8080/games'
    axios.get(url)
        .then(res => {
            // console.log(res.data)
            dispatch(setGames(res.data))
        })
        .catch(err => console.log(err))
}
