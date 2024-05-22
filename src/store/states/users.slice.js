import { createSlice } from '@reduxjs/toolkit';

export const usersslice = createSlice({
    name: 'players',
    initialState: null,
    reducers: {

    }
})

export const {  } = usersslice.actions;

export default usersslice.reducer;

export const updateUserThunk = (url, user) => (dispatch) => {
    axios.put(url, user)
    .then(res => {
        console.log(res.data)
        dispatch(setGames(res.data))
    })
    .catch(err => console.log(err))
}
        // {
        //     await axios().post('/users', user)
        //     navigate();
        // }, "User created succesfully"));
