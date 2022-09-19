

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: 'null'
}

const userSlice = createSlice({
    name: 'User',
    initialState: initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
        }
    }
})


export default userSlice;