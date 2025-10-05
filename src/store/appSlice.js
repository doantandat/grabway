import { createSlice } from '@reduxjs/toolkit';

  
const initialState= {
    isLoading: false,
    isLoggedIn: false,
    user:null,
    tabBottom:1,

};

const appSlice = createSlice({
    name: 'App',
    initialState,
    reducers: {
        setLoading(state, action) {
            state.isLoading = action.payload;
        },
        setIsLoggedIn(state, action) {
            state.isLoggedIn = action.payload;
        },
        setUser(state, action) {
            state.user = action.payload;
        },
        setTabBottom(state, action) {
            state.tabBottom = action.payload;
        },
    },
});

export const { setLoading,setIsLoggedIn,setUser,setTabBottom} = appSlice.actions;
export default appSlice.reducer;
