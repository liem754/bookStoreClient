import * as api from "@/apis/user";
import { userAction } from "@/types/userAction";
import { actiontype } from "./actiontype";
export const getUser = () => async (dispatch: any) => {
  try {
    const rs = await api.getOne();

    if (rs.data.err === 0) {
      dispatch({
        type: actiontype.GETONE,
        userData: rs.data.userData,
        mes: rs.data.mes,
      });
    } else {
      console.log(rs);

      dispatch({
        type: actiontype.GETONE,
        userData: null,
        mes: "no",
      });
    }
  } catch (error) {
    dispatch({
      type: actiontype.GETONE,
      userData: null,
    });
  }
};
