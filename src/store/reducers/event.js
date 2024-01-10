import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import api from "../../api";

// CREATE EVENT
export const createEvent = createAsyncThunk(
  "event/create",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/event/create", payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// GET EVENTS
export const getEvents = createAsyncThunk(
  "event/all",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await api.get(
        `/event/all?page=${payload.page}&perPage=${payload.perPage}`
      );
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data.message);
    }
  }
);

// GET EVENT
export const getEvent = createAsyncThunk(
  "event/single",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/event/${payload}`);
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data.message);
    }
  }
);

// GET SCOUT BY USER ID
// export const getScoutByUserId = createAsyncThunk(
//   "scout/get-by-id",
//   async (payload, { rejectWithValue }) => {
//     try {
//       const { data } = await api.get(`/scout/user/${payload}`);
//       return data;
//     } catch (error) {
//       return rejectWithValue(error.response.data.message);
//     }
//   }
// );

// UPDATE SCOUT STATUS
// export const updateStatus = createAsyncThunk(
//   "scout/update-status",
//   async (payload, { rejectWithValue }) => {
//     try {
//       const { data } = await api.put(`/scout/update/${payload.scoutId}`, {
//         status: payload.status,
//       });
//       return data;
//     } catch (error) {
//       return rejectWithValue(error.response.data.message);
//     }
//   }
// );

const eventSlice = createSlice({
  name: "event",
  initialState: {
    loading: false,
    successMsg: "",
    errorMsg: "",
    events: [],
    totalEvent: 0,
    event: {},
  },
  reducers: {
    clearMsg: (state) => {
      state.successMsg = "";
      state.errorMsg = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createEvent.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createEvent.fulfilled, (state, action) => {
      state.loading = false;
      state.successMsg = action.payload.message;
    });
    builder.addCase(createEvent.rejected, (state, action) => {
      state.loading = false;
      state.errorMsg = action.payload;
    });
    builder.addCase(getEvents.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getEvents.fulfilled, (state, action) => {
      state.loading = false;
      state.events = action.payload.events;
      state.totalEvent = action.payload.totalEvent;
    });
    builder.addCase(getEvents.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(getEvent.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getEvent.fulfilled, (state, action) => {
      state.loading = false;
      state.event = action.payload;
    });
    builder.addCase(getEvent.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const { clearMsg } = eventSlice.actions;

export default eventSlice.reducer;
