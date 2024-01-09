import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

import api from "../../api";

// CREATE USER
export const createUser = createAsyncThunk(
  "auth/create-user",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/auth/user/create", payload);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// LOGIN USER
export const loginUser = createAsyncThunk(
  "auth/login-user",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/auth/user/login", payload);
      localStorage.setItem("accessToken", data.token);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// LOGIN ADMIN
export const loginAdmin = createAsyncThunk(
  "auth/login-admin",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/auth/admin/login", payload);
      localStorage.setItem("accessToken", data.token);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// GET USER
export const getUser = createAsyncThunk(
  "auth/get-user",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/auth/get-user");
      localStorage.setItem("userInfo", JSON.stringify(data));
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// GET SCOUT
export const getScout = createAsyncThunk(
  "auth/get-scout",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/auth/get-scout");
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// UPDATE SCOUT
export const updateScout = createAsyncThunk(
  "auth/update-scout",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await api.put("/auth/update-scout", payload);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// UPDATE USER PASSWORD
export const updateUserPassword = createAsyncThunk(
  "auth/update-user-password",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/auth/user/change-password", payload);
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data.message);
    }
  }
);

// UPDATE USER AVATAR
export const updateUserAvatar = createAsyncThunk(
  "auth/update-user-avatar",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/auth/user/update-avatar", payload, {
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

// UPDATE SHOP INFO
export const updateShop = createAsyncThunk(
  "auth/update-shop",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await api.put("/auth/update-shop-info", payload);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// LOGOUT SCOUT
export const logout = createAsyncThunk(
  "auth/scout",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/auth/logout");
      localStorage.removeItem("accessToken");
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// ROLE MANAGE
const returnRole = (token) => {
  if (token) {
    const decodedToken = jwtDecode(token);
    const expireTime = new Date(decodedToken.exp * 1000);
    if (new Date() > expireTime) {
      localStorage.removeItem("accessToken");
      return "";
    } else {
      return decodedToken.role;
    }
  } else {
    return "";
  }
};

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    loadingScoutUpdate: false,
    loadingShopUpdate: false,
    loadingChangePasswrod: false,
    loadingUpdateAvatar: false,
    successMsg: "",
    errorMsg: "",
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : {},
    role: returnRole(localStorage.getItem("accessToken")),
    token: localStorage.getItem("accessToken"),
  },
  reducers: {
    clearMsg: (state) => {
      state.successMsg = "";
      state.errorMsg = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;
      state.successMsg = action.payload.message;
      state.token = action.payload.token;
      state.role = returnRole(action.payload.token);
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.errorMsg = action.payload;
    });
    builder.addCase(loginAdmin.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loginAdmin.fulfilled, (state, action) => {
      state.loading = false;
      state.successMsg = action.payload.message;
      state.token = action.payload.token;
      state.role = returnRole(action.payload.token);
    });
    builder.addCase(loginAdmin.rejected, (state, action) => {
      state.loading = false;
      state.errorMsg = action.payload;
    });
    builder.addCase(createUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createUser.fulfilled, (state, action) => {
      state.loading = false;
      state.successMsg = action.payload.message;
    });
    builder.addCase(createUser.rejected, (state, action) => {
      state.loading = false;
      state.errorMsg = action.payload;
    });
    builder.addCase(updateUserAvatar.pending, (state) => {
      state.loadingUpdateAvatar = true;
    });
    builder.addCase(updateUserAvatar.fulfilled, (state) => {
      state.loadingUpdateAvatar = false;
      state.successMsg = "Avatar Updated";
    });
    builder.addCase(updateUserAvatar.rejected, (state, action) => {
      state.loadingUpdateAvatar = false;
      state.errorMsg = action.payload;
    });
    builder.addCase(updateUserPassword.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateUserPassword.fulfilled, (state) => {
      state.loading = false;
      state.successMsg = "Password changed";
    });
    builder.addCase(updateUserPassword.rejected, (state, action) => {
      state.loading = false;
      state.errorMsg = action.payload;
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.userInfo = action.payload;
    });
    builder.addCase(logout.fulfilled, (state, action) => {
      state.successMsg = action.payload.message;
      state.userInfo = {};
      state.token = "";
    });
  },
});

export const { clearMsg } = authSlice.actions;

export default authSlice.reducer;
