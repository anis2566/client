import authSlice from "./reducers/auth";
import scoutSlice from "./reducers/scout";
import unitSlice from "./reducers/unit";
import eventSlice from "./reducers/event";

const rootReducer = {
  auth: authSlice,
  scout: scoutSlice,
  unit: unitSlice,
  event: eventSlice,
};

export default rootReducer;
