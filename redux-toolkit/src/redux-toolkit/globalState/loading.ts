import { createSlice, AsyncThunk } from "@reduxjs/toolkit";

type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>;

type PendingAction = ReturnType<GenericAsyncThunk["pending"]>;
type RejectedAction = ReturnType<GenericAsyncThunk["rejected"]>;
type FulfilledAction = ReturnType<GenericAsyncThunk["fulfilled"]>;

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
    // setLoading: (state, action) => {
    //   state.loading = action.payload;
    // },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher<PendingAction>(
        (action) => action.type.endsWith("pending"),
        (state, action) => {
          state.loading = true;
        }
      )
      .addMatcher<RejectedAction | FulfilledAction>(
        (action) =>
          action.type.endsWith("rejected") || action.type.endsWith("fulfilled"),
        (state, action) => {
          state.loading = false;
        }
      );
  },
});

export default globalState.reducer;
