import { createSlice } from "@reduxjs/toolkit";
interface IInitialState {
  loading: boolean;
}

const initialState: IInitialState = {
  loading: false,
};

const globalState = createSlice({
  name: "global",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setLoading } = globalState.actions;
export default globalState.reducer;
