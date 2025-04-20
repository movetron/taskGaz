import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api";

export const fetchStatus = createAsyncThunk("info/fetchStatus", async () => {
  const response = await api.get("/status");
  return response.data.status;
});

const infoSlice = createSlice({
  name: "info",
  initialState: {
    status: null as number | null,
    loading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchStatus.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.status = action.payload;
      })
      .addCase(fetchStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Ошибка загрузки";
      });
  },
});

export default infoSlice.reducer;
