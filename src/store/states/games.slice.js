import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import getConfigToken from '../../services/getConfigToken';

export const gamesslice = createSlice({
    name: 'games',
    initialState: [],
    reducers: {
        setGames: (state, action) => action.payload,
        addGame: (state, {payload}) => {state.push(payload)},
        updateGame: (state, {payload: game}) => {
            const index = state.findIndex(g => g.id === game.id)
            state[index] = game
        },
        deleteGame: (state, { payload: id }) => {
            state.filter(game => game.id !== id)
        }
    }
})

export const { setGames, addGame, updateGame, deleteGame } = gamesslice.actions;

export default gamesslice.reducer;

export const getGamesThunk = () => async (dispatch) => {
    const url = 'http://localhost:8080'
    await axios.get(`${url}/games`)
        .then(res => {
            // console.log(res.data)
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

export const updateGameThunk = (data, id) => async (dispatch) => {
    const url = 'http://localhost:8080'
    await axios.put(`${url}/games/${id}`, data, getConfigToken())
        .then(res => {
            console.log(res)
            dispatch(updateGame(res.data))
        })
        .catch(err => console.log(err))
}

export const deleteGameThunk = id => async (dispatch) => {
    const url = 'http://localhost:8080'
    await axios.delete(`${url}/games/${id}`, getConfigToken())
        .then(res => {
            dispatch(deleteGame(id))
        })
        .catch(err => console.log(err))
}

export const serveCardsThunk = (id) => async (dispatch) => {
    console.log(id)
    const url = 'http://localhost:8080'
    await axios.post(`${url}/serve/games/${id}`) // , getConfigToken()
        .then(res => {
            console.log(res.data)
            dispatch(updateGame(res.data))
        })
        .catch(err => console.log(err))
}