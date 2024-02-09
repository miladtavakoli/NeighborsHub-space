import Apis from "services/apis";
import { startLoading, endLoading } from "store/slices/appSlices";

export const googleAuth = (data) => async (dispatch) => {
  dispatch(startLoading());
  return Apis.auth
    .googleAuth(data)
    .then((res) => {
      console.log(res)
      localStorage.setItem("token", res.access_token);
      return res;
    })
    .finally(() => dispatch(endLoading()));
};

export const setGooglePassword = (data) => async (dispatch) => {
  dispatch(startLoading());
  return Apis.auth
    .setGooglePassword(data)
    .then((res) => {
      localStorage.setItem("token", res.access_token);
      return res;
    })
    .finally(() => dispatch(endLoading()));
};
