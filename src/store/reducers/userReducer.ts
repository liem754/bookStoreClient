import { actiontype } from "../actions/actiontype";
import { userAction } from "@/types/userAction";
const initState = {
  userData: null,
  mes: "",
};

const userReducer = (state = initState, action: userAction) => {
  switch (action.type) {
    case actiontype.GETONE:
      return {
        userData: action.userData,
        mes: action.mes,
      };

    default:
      return state;
  }
};

export default userReducer;
