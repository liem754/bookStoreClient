import { applyMiddleware, combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./authReducer";
import autoMergeLevel2 from "redux-persist/es/stateReconciler/autoMergeLevel2";
import userReducer from "./userReducer";

const common = {
  storage,
  stateReconciler: autoMergeLevel2,
};

const autoConfig = {
  ...common,
  key: "auth",
  whilelist: ["isLoggedIn", "token"],
};
const rootReducer = combineReducers({
  auth: persistReducer(autoConfig, authReducer),
  user: userReducer,
});
export default rootReducer;
