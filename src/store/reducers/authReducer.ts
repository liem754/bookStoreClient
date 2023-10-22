import { authAction } from "@/types/userAction";
import { actiontype } from "../actions/actiontype";

interface AuthState {
  isLoggedIn: boolean;
  token: string | null;
}
const initState = {
  isLoggedIn: false,
  token: null,
};

const authReducer = (state: AuthState = initState, action: authAction): any => {
  switch (action.type) {
    case actiontype.LOGIN:
      return {
        ...state,
        isLoggedIn: true,
        token: action.token,
      };
    case actiontype.LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        token: null,
      };
    default:
      return state;
  }
};

export default authReducer;
