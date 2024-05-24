import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const gamesslice = createSlice({
    name: 'games',
    initialState: null,
    reducers: {
        setGames: (state, action) => action.payload,
        addGame: (state, {payload}) => {state.push(payload)}
    }
})

export const { setGames, addGame } = gamesslice.actions;

export default gamesslice.reducer;

export const getGamesThunk = () => (dispatch) => {
    const url = 'http://localhost:8080'
    axios.get(`${url}/games`)
        .then(res => {
            // console.log(res.data)
            dispatch(setGames(res.data))
        })
        .catch(err => console.log(err))
}

// export const createGameThunk = (newGame) => (dispatch) => {
//     const url = 'http://localhost:8080'
//     axios.post(`${url}/games`, newGame)
//         .then(res => {
//             // console.log(res.data)
//             dispatch(addGame(res.data))
//         })
//         .catch(err => console.log(err))
// }

export const createGameThunk = (newGame) => async (dispatch) => {
    const url = 'http://localhost:8080';

    try {
        const res = await axios.post(`${url}/games`, newGame);
        dispatch(addGame(res.data));
    } catch (err) {
        console.log(err);
    }
};