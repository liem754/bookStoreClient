import { actiontype } from "./actiontype";

export const logintoken = ({ token }: { token: string }) => {
  return {
    type: actiontype.LOGIN,
    token: token,
  };
};
export const logout = () => {
  return {
    type: actiontype.LOGOUT,
  };
};
