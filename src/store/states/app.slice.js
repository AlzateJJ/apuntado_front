import { createSlice } from '@reduxjs/toolkit';

export const appslice = createSlice({
    name: 'app',
    initialState: {
        isLoading: true,
        notification: {
            show: false,
            variant: "success",
            message: ""
        }
    },
    reducers: {
        showNotification: (state, action) => {
            state.notification = { ...action.payload, show: true }
        },
        closeNotification: (state) => {
            state.notification.show = false
        },
        setIsLoading: (state, action) => {
            state.isLoading = action.payload
        }
    }
})

export const genericRequestThunk = (
    request,
    notificationMessage,
    notificationError
) => async (dispatch) => {
        dispatch(setIsLoading(true))
        try {
            const res = await request()
            if (notificationMessage)
                dispatch(showNotification({
                    message: notificationMessage,
                    variant: "success"
            }))
            return res
        } catch(error) {
            dispatch(showNotification({
                message: notificationError || 'Hubo un error',
                variant: "danger"
            }))
            console.log(error)
        } finally {
            dispatch(setIsLoading(false))
        }
    }


export const { closeNotification, setIsLoading, showNotification } = appslice.actions;

export default appslice.reducer;
