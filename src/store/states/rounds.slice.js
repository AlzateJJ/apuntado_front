import { createSlice } from '@reduxjs/toolkit';

export const roundsslice = createSlice({
    name: 'rounds',
    initialState: [],
    reducers: {
        addRound: (state, payload) => state.push(payload)
    }
})

export const {  } = roundsslice.actions;

export default roundsslice.reducer;

export const createRoundThunk = (newRound, gameId) => async (dispatch) => {
    const url = 'http://localhost:8080'
    try {
        const roundRes = await axios.post(`${url}/rounds/${gameId}`, newRound, getConfigToken());
        // const usersRes = await axios.post(`${url}/games/${gameRes.data.id}/users`, adminUser)
        // dispatch(addGame({ ...gameRes.data, users: usersRes.data }));
        dispatch(addRound(roundRes.data));
    } catch (err) {
        console.log(err);
    }
};
