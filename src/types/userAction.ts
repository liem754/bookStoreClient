export interface userAction {
  type: string;
  userData: any;
  mes: string;
}
export interface authAction {
  type: string;
  isLoggedIn: string;
  token: string;
}
