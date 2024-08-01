import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const roundsslice = createSlice({
    name: 'rounds',
    initialState: [],
    reducers: {
        setRounds: (state, action) => action.payload,
        addRound: (state, payload) => state.push(payload),
        updateRound: (state, {payload: updatedRound}) => {
            const index = state.findIndex(r => r.id === updatedRound.id)
            state[index] = updatedRound
        }
}})

export const { setRounds, addRound, updateRound } = roundsslice.actions;

export default roundsslice.reducer;

export const getRoundsThunk = () => async (dispatch) => {
    const url = 'http://localhost:8080'
    await axios.get(`${url}/rounds`)
        .then(res => {
            console.log(res.data)
            dispatch(setRounds(res.data))
        })
        .catch(err => console.log(err))
}

export const createRoundThunk = (newRound) => async (dispatch) => {
    const url = 'http://localhost:8080'
    try {
        const roundRes = await axios.post(`${url}/rounds`, newRound);
        // const usersRes = await axios.post(`${url}/games/${gameRes.data.id}/users`, adminUser)
        // dispatch(addGame({ ...gameRes.data, users: usersRes.data }));
        dispatch(addRound(roundRes.data));
    } catch (err) {
        console.log(err);
    }
};

export const updateRoundThunk = (data, id) => async (dispatch) => {
    const url = 'http://localhost:8080'
    await axios.put(`${url}/rounds/${id}`, data)
        .then(res => {
            console.log(res)
            dispatch(updateRound(res.data))
        })
        .catch(err => console.log(err))
}