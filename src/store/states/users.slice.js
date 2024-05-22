import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const usersslice = createSlice({
    name: 'user',
    initialState: null,
    reducers: {
        setUser: (_, {payload}) => payload
    }
})

export const { setUser } = usersslice.actions;

export default usersslice.reducer;

export const loginUserThunk = (user) => (dispatch) => {
    const url = 'http://localhost:8080'
    axios.post(`${url}/users/login`, user)
    .then(res => {
        console.log(res.data)
        localStorage.setItem("token", res.data.accessToken);
        dispatch(setUser(res.data.createdUser));
    })
    .catch(err => console.log(err))
}

export const updateUserThunk = (url, user) => (dispatch) => {
    axios.put(url, user)
    .then(res => {
        console.log(res.data)
        dispatch(setGames(res.data))
    })
    .catch(err => console.log(err))
}

// export const getLoggedUserThunk = () => (dispatch) => {
//     const url = 'http://localhost:8080'
//     axios.get(`${url}/users/me`)
//     .then(res => {
//         console.log(res.data)
//         dispatch(setUser(res.data));
//     })
//     .catch(err => console.log(err))
// }