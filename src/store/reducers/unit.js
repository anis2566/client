import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import api from "../../api";

// CREATE UNIT
export const createUnit = createAsyncThunk(
  "unit/create",
  async (payload, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await api.post("/unit/create", payload.data);
      const { page, perPage, search } = payload.query;
      dispatch(getUnits({ page, perPage, search }));
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// GET UNITS
export const getUnits = createAsyncThunk(
  "unit/all",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await api.get(
        `/unit/all?page=${payload.page}&&perPage=${payload.perPage}&&search=${payload.search}`
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// GET UNIT
export const getUnit = createAsyncThunk(
  "unit/single",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/unit/${payload}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// UPDATE UNIT
export const updateUnit = createAsyncThunk(
  "unit/update",
  async (payload, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await api.put(`/unit/${payload.unitId}`, payload.data);
      const { page, perPage, search } = payload.query;
      dispatch(getUnits({ page, perPage, search }));
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// DELETE UNIT
export const deleteUnit = createAsyncThunk(
  "unit/delete",
  async (payload, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await api.delete(`/unit/${payload.data}`);
      const { page, perPage, search } = payload.query;
      dispatch(getUnits({ page, perPage, search }));
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const unitSlice = createSlice({
  name: "unit",
  initialState: {
    loading: false,
    loadingUnit: false,
    loadingDelete: false,
    loadingUnitSingle: false,
    loadingUpdateUnit: false,
    successMsg: "",
    errorMsg: "",
    units: [],
    totalUnit: 0,
    currentUnit: "",
    unit: {},
  },
  reducers: {
    clearMsg: (state) => {
      state.successMsg = "";
      state.errorMsg = "";
    },
    setCurrentUnit: (state, action) => {
      state.currentUnit = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createUnit.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createUnit.fulfilled, (state, action) => {
      state.loading = false;
      state.successMsg = action.payload.message;
    });
    builder.addCase(createUnit.rejected, (state, action) => {
      state.loading = false;
      state.errorMsg = action.payload;
    });
    builder.addCase(getUnits.pending, (state) => {
      state.loadingUnit = true;
    });
    builder.addCase(getUnits.fulfilled, (state, action) => {
      state.loadingUnit = false;
      state.units = action.payload.units;
      state.totalUnit = action.payload.totalUnit;
    });
    builder.addCase(getUnits.rejected, (state) => {
      state.loadingUnit = false;
    });
    builder.addCase(deleteUnit.pending, (state) => {
      state.loadingDelete = true;
    });
    builder.addCase(deleteUnit.fulfilled, (state, action) => {
      state.loadingDelete = false;
      state.successMsg = action.payload.message;
    });
    builder.addCase(deleteUnit.rejected, (state, action) => {
      state.loadingDelete = false;
      state.errorMsg = action.payload;
    });
    builder.addCase(getUnit.pending, (state) => {
      state.loadingUnitSingle = true;
    });
    builder.addCase(getUnit.fulfilled, (state, action) => {
      state.loadingUnitSingle = false;
      state.unit = action.payload;
    });
    builder.addCase(getUnit.rejected, (state) => {
      state.loadingUnitSingle = false;
    });
    builder.addCase(updateUnit.pending, (state) => {
      state.loadingUpdateUnit = true;
    });
    builder.addCase(updateUnit.fulfilled, (state, action) => {
      state.loadingUpdateUnit = false;
      state.successMsg = action.payload.message;
    });
    builder.addCase(updateUnit.rejected, (state, action) => {
      state.loadingUpdateUnit = false;
      state.errorMsg = action.payload;
    });
  },
});

export const { clearMsg, setCurrentUnit } = unitSlice.actions;

export default unitSlice.reducer;
