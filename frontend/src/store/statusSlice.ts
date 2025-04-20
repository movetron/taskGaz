import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api";

export const fetchStatus = createAsyncThunk("status/fetch", async () => {
  const res = await api.get("/status");
  return res.data;
});

const statusSlice = createSlice({
  name: "status",
  initialState: { data: null, loading: false },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchStatus.pending, state => { state.loading = true; })
      .addCase(fetchStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      });
  }
});

export default statusSlice.reducer;
