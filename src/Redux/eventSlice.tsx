import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Event {
  id: number;
  name: string;
  description: string;
  date: string;
  createdBy: number;
}

interface EventsState {
  events: Event[];
  loading: boolean;
  error: string | null;
}

const initialState: EventsState = {
  events: [],
  loading: false,
  error: null,
};

const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    fetchEventsRequest(state) {
      state.loading = true;
      state.error = null;
    },
    fetchEventsSuccess(state, action: PayloadAction<Event[]>) {
      state.loading = false;
      state.events = action.payload;
    },
    fetchEventsFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchEventsRequest, fetchEventsSuccess, fetchEventsFailure } = eventsSlice.actions;
export default eventsSlice.reducer;