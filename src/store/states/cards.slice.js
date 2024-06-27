import { createSlice } from '@reduxjs/toolkit';

export const cardsslice = createSlice({
    name: 'cards',
    initialState: '',
    reducers: {
        updateCard: (state, {payload: card}) => {
            const cardIndex = state.findIndex(c => c.id === card.id)
            state[cardIndex] = card
        }
    }
})

export const { updateCard } = cardsslice.actions;

export default cardsslice.reducer;

export const updateCardThunk = async (card) => {
    const url = 'http://localhost:8080'
    await axios.put(`${url}/cards/${card.id}`)
        .then(res => {
            updateCard(res.data)
        })
        .catch(err => console.log(err)
    )
}
