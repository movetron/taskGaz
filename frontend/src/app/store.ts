import { configureStore } from "@reduxjs/toolkit";
import groupsReducer from "../features/groups/groupsSlice";
import nodesReducer from "../features/nodes/nodesSlice";
import infoReducer from "../features/info/infoSlice";
import statusReducer from "../features/status/statusSlice"; 

export const store = configureStore({
  reducer: {
    groups: groupsReducer,
    nodes: nodesReducer,
    info: infoReducer,
    status: statusReducer, 
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
