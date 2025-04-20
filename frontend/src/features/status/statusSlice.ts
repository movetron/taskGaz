// src/features/status/statusSlice.ts

import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import api from "../../api";

// 1. Описываем точный набор возможных описаний статусов
export type StatusDescription =
  | "UNREACHABLE"
  | "SHUTDOWN"
  | "UP"
  | "WARNING"
  | "CRITICAL"
  | "DOWN";

// 2. Интерфейс самого статуса
export interface Status {
  id: number;
  description: StatusDescription;
  color: string;
}

// 3. Состояние слайса
interface StatusState {
  serviceStatus: Status | null;
  loading: boolean;
  error: string | null;
}

const initialState: StatusState = {
  serviceStatus: null,
  loading: false,
  error: null,
};

// 4. Приоритеты — теперь TypeScript понимает, что ключи точно из StatusDescription
const statusPriority: Record<StatusDescription, number> = {
  UNREACHABLE: 1,
  SHUTDOWN:    2,
  UP:          3,
  WARNING:     4,
  CRITICAL:    5,
  DOWN:        6,
};

// 5. Асинхронный Thunk для загрузки статусов нод и вычисления наихудшего
export const fetchServiceStatus = createAsyncThunk<
  Status,          // возвращаемый тип
  number,          // аргумент (groupId)
  { rejectValue: string }
>(
  "status/fetchServiceStatus",
  async (groupId, { rejectWithValue }) => {
    try {
      // GET /api/nodes/status?groupId=…
      const response = await api.get<Status[]>(`/nodes/status?groupId=${groupId}`);
      const nodes = response.data;

      if (nodes.length === 0) {
        return rejectWithValue("Нет нод в группе");
      }

      // Находим "худший" статус по приоритету
      let worst = nodes[0];
      for (const node of nodes) {
        if (statusPriority[node.description] > statusPriority[worst.description]) {
          worst = node;
        }
      }

      return worst;
    } catch (err) {
      // Корректно обрабатываем unknown
      const msg = err instanceof Error ? err.message : "Неизвестная ошибка";
      return rejectWithValue(msg);
    }
  }
);

// 6. Собственно слайс
const statusSlice = createSlice({
  name: "status",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchServiceStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchServiceStatus.fulfilled, (state, action: PayloadAction<Status>) => {
        state.loading = false;
        state.serviceStatus = action.payload;
      })
      .addCase(fetchServiceStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? action.error.message ?? "Ошибка загрузки";
      });
  },
});

export default statusSlice.reducer;
