// src/features/groups/groupsSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api from "../../api";

export type Group = { id: number; caption: string };

interface GroupsState {
  list: Group[];
  selectedGroupId: number | null;
  loading: boolean;
  error: string | null;
}

const initialState: GroupsState = {
  list: [],
  selectedGroupId: null,
  loading: false,
  error: null,
};

export const fetchGroups = createAsyncThunk("groups/fetch", async () => {
  const response = await api.get("/groups");
  return response.data as Group[];
});

const groupsSlice = createSlice({
  name: "groups",
  initialState,
  reducers: {
    selectGroup(state, action: PayloadAction<number>) {
      state.selectedGroupId = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchGroups.pending, state => { state.loading = true; state.error = null; })
      .addCase(fetchGroups.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchGroups.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Ошибка";
      });
  },
});

export const { selectGroup } = groupsSlice.actions;
export default groupsSlice.reducer;
