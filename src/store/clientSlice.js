import { createSlice } from "@reduxjs/toolkit";

const clientSlice = createSlice({
  name: "clients",
  initialState: {
    data: [],
    currentPage: 1,
    lastPage: 1,
  },
  reducers: {
    setClients: (state, action) => {
      state.data = action.payload.data;
      state.currentPage = action.payload.meta.current_page;
      state.lastPage = action.payload.meta.last_page;
    },
  },
});

export const { setClients } = clientSlice.actions;
export default clientSlice.reducer;