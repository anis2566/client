import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import api from "../../api";

// CREATE SCOUT
export const createScout = createAsyncThunk(
  "scout/create-scout",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/scout/create", payload, {
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

// GET SCOUTS
export const getScouts = createAsyncThunk(
  "scout/all",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await api.get(
        `/scout/all?page=${payload.page}&perPage=${payload.perPage}&name=${payload.name}&gender=${payload.gender}&section=${payload.section}`
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// GET PENDING SCOUTS
export const getPendingScouts = createAsyncThunk(
  "scout/pending",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await api.get(
        `/scout/pending?page=${payload.page}&perPage=${payload.perPage}&name=${payload.name}`
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// GET CANCELLED SCOUTS
export const getCancelledScouts = createAsyncThunk(
  "scout/cancelled",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await api.get(
        `/scout/cancelled?page=${payload.page}&perPage=${payload.perPage}&name=${payload.name}`
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// GET VERIFIED SCOUTS
export const getVerifiedScouts = createAsyncThunk(
  "scout/verified",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await api.get(
        `/scout/verified?page=${payload.page}&perPage=${payload.perPage}&name=${payload.name}`
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// GET SCOUT
export const getScout = createAsyncThunk(
  "scout/single",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/scout/${payload}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// GET SCOUT BY USER ID
export const getScoutByUserId = createAsyncThunk(
  "scout/get-by-id",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/scout/user/${payload}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// UPDATE SCOUT STATUS
export const updateStatus = createAsyncThunk(
  "scout/update-status",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await api.put(`/scout/update/${payload.scoutId}`, {
        status: payload.status,
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const scoutSlice = createSlice({
  name: "scout",
  initialState: {
    loading: false,
    loadingStatus: false,
    successMsg: "",
    errorMsg: "",
    scouts: [],
    totalScout: 0,
    scout: {},
  },
  reducers: {
    clearMsg: (state) => {
      state.successMsg = "";
      state.errorMsg = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createScout.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createScout.fulfilled, (state, action) => {
      state.loading = false;
      state.successMsg = action.payload.message;
    });
    builder.addCase(createScout.rejected, (state, action) => {
      state.loading = false;
      state.errorMsg = action.payload;
    });
    builder.addCase(getScouts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getScouts.fulfilled, (state, action) => {
      state.loading = false;
      state.scouts = action.payload.scouts;
      state.totalScout = action.payload.totalScout;
    });
    builder.addCase(getScouts.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(getPendingScouts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getPendingScouts.fulfilled, (state, action) => {
      state.loading = false;
      state.scouts = action.payload.scouts;
      state.totalScout = action.payload.totalScout;
    });
    builder.addCase(getPendingScouts.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(getCancelledScouts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getCancelledScouts.fulfilled, (state, action) => {
      state.loading = false;
      state.scouts = action.payload.scouts;
      state.totalScout = action.payload.totalScout;
    });
    builder.addCase(getCancelledScouts.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(getVerifiedScouts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getVerifiedScouts.fulfilled, (state, action) => {
      state.loading = false;
      state.scouts = action.payload.scouts;
      state.totalScout = action.payload.totalScout;
    });
    builder.addCase(getVerifiedScouts.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(getScout.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getScout.fulfilled, (state, action) => {
      state.loading = false;
      state.scout = action.payload;
    });
    builder.addCase(getScout.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(getScoutByUserId.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getScoutByUserId.fulfilled, (state, action) => {
      state.loading = false;
      state.scout = action.payload;
    });
    builder.addCase(getScoutByUserId.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(updateStatus.pending, (state) => {
      state.loadingStatus = true;
    });
    builder.addCase(updateStatus.fulfilled, (state, action) => {
      state.loadingStatus = false;
      state.successMsg = action.payload.message;
    });
    builder.addCase(updateStatus.rejected, (state) => {
      state.loadingStatus = false;
    });
  },
});

export const { clearMsg } = scoutSlice.actions;

export default scoutSlice.reducer;
