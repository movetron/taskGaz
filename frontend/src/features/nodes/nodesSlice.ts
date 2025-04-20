import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api from "../../api";

export interface Node {
    id: number;
    caption: string;
    status: number;
    cpu: number;
    memory: number;
    disk: number;
}

interface NodesState {
  list: Node[];
  loading: boolean;
  error: string | null;
}

const initialState: NodesState = { list: [], loading: false, error: null };

export const fetchNodes = createAsyncThunk(
  "nodes/fetch",
  async (groupId: number | null) => {
    const url = groupId ? `/nodes?groupId=${groupId}` : "/nodes";
    const response = await api.get(url);
    return response.data as Node[];
  }
);

const nodesSlice = createSlice({
  name: "nodes",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchNodes.pending, state => { state.loading = true; state.error = null; })
      .addCase(fetchNodes.fulfilled, (state, action: PayloadAction<Node[]>) => {
        state.loading = false; state.list = action.payload;
      })
      .addCase(fetchNodes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Ошибка";
      });
  },
});

export default nodesSlice.reducer;
