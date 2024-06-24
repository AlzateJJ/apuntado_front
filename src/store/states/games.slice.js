import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import getConfigToken from '../../services/getConfigToken';
import getLoggedUserThunk from './users.slice'
import updateUserThunk from './users.slice'

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
            console.log(res.data)
            dispatch(setGames(res.data))
        })
        .catch(err => console.log(err))
}

export const getOneGameThunk = (gameId) => async (dispatch) => {
    const url = 'http://localhost:8080'
    await axios.get(`${url}/games/${gameId}`)
        .then(res => {
            console.log(res)
        })
        .catch(err => console.log(err))
}

export const createGameThunk = (newGame) => async (dispatch) => {
    const url = 'http://localhost:8080'
    try {
        const gameRes = await axios.post(`${url}/games`, newGame, getConfigToken());
        // const usersRes = await axios.post(`${url}/games/${gameRes.data.id}/users`, adminUser)
        // dispatch(addGame({ ...gameRes.data, users: usersRes.data }));
        dispatch(addGame(gameRes.data));
    } catch (err) {
        console.log(err);
    }
};

// export const updateGameThunk = (data, id) => async (dispatch) => { // falta
//     console.log('entré a updateGameThunk')
//     const url = 'http://localhost:8080'
//     await axios.put(`${url}/games/${id}`, data, getConfigToken())
//     .then(res => {
//         console.log(res.data)
//         dispatch(setUser(res.data));
//     })
//     .catch(err => console.log(err))
// }