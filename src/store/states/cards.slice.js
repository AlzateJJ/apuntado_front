import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const cardsslice = createSlice({
    name: 'cards',
    initialState: '',
    reducers: {
        setCards: (state, action) => action.payload,
        updateCard: (state, {payload: card}) => {
            const cardIndex = state.findIndex(c => c.id === card.id)
            state[cardIndex] = card
        }
    }
})

export const { setCards, updateCard } = cardsslice.actions;

export default cardsslice.reducer;

export const getCardsThunk = () => async (dispatch) => {
    const url = 'http://localhost:8080'
    await axios.get(`${url}/cards`)
        .then(res => {
            // console.log(res.data)
            dispatch(setCards(res.data))
        })
        .catch(err => console.log(err))
}

export const updateCardThunk = (data, id) => async (dispatch) => {
    const url = 'http://localhost:8080'
    await axios.put(`${url}/cards/${id}`, data)
        .then(res => {
            console.log(res.data)
            dispatch(updateCard(res.data))
        })
        .catch(err => console.log(err)
    )
}
