import authSlice from "./reducers/auth";
import scoutSlice from "./reducers/scout";
import unitSlice from "./reducers/unit";

const rootReducer = {
  auth: authSlice,
  scout: scoutSlice,
  unit: unitSlice,
};

export default rootReducer;
