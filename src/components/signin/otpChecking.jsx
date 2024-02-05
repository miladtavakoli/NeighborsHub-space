"use client";
import { useState } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import { useInputHandler } from "hooks/useInputHandler";
import TextField from "@mui/material/TextField";
// import { MuiTelInput } from "mui-tel-input";
// import ReactPhoneInput from 'react-phone-input-material-ui';
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import GoogleIcon from "@mui/icons-material/Google";
import Typography from "@mui/material/Typography";
import Apis from "services/apis";
import { useSnackbar } from "notistack";
import CircularProgress from "@mui/material/CircularProgress";
import STATUS from "components/signup/status";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { startLoading, endLoading } from "store/slices/appSlices";
import { getMyAddresses } from "store/actions/userActions";

const OtpChecking = ({ setCurrentState, otp, emailPhoneNumber }) => {
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(startLoading());
    Apis.auth
      .optLoginChecking({
        mobile: emailPhoneNumber.value,
        otp: otp.value,
      })
      .then((res) => {
        enqueueSnackbar("Successful", { variant: "success" });

        typeof window !== "undefined" &&
          localStorage.setItem("token", res.access_token);
        dispatch(getMyAddresses({ token: res.access_token }));
        router.push("/app");
      })
      .catch((message) => {
        enqueueSnackbar(message, { variant: "error" });
      })
      .finally(() => {
        dispatch(endLoading());
      });
  };

  const handleBack = () => {
    otp.onChange({ target: { value: "" } });
    setCurrentState(STATUS.GET_EMAIL_MOBILE);
  };

  return (
    <>
      <form style={{ width: "100%" }} onSubmit={handleSubmit}>
        <Typography textAlign={"center"}>Enter your Code</Typography>

        <TextField
          sx={{
            mt: 1,
            borderRadius: "30px",
            "& .MuiOutlinedInput-notchedOutline": {
              fontSize: "12px",
              borderRadius: "10px!important",
            },
            "& .MuiInputBase-input": {
              padding: "12px 20px",
            },
          }}
          InputLabelProps={{
            sx: {
              color: "darkenGray",
              fontSize: "12px",
              fontWeight: "bold",
            },
          }}
          fullWidth
          variant="outlined"
          label="Code"
          name="your code"
          {...otp}
        />
        <Button
          sx={{
            mt: 3,
            borderRadius: "10px",
            height: "47px",
            fontSize: "13px",
            backgroundColor: "#0298e8",
          }}
          fullWidth
          variant="contained"
          type="submit"
        >
          Submit
        </Button>
        <Button
          sx={{
            mt: 2,
            borderRadius: "10px",
            height: "47px",
            fontSize: "13px",
            backgroundColor: "transparent",
            border: "1px solid #e85a02",
            color: "#e85a02",
            "&:hover": {
              backgroundColor: "#f27527",
              border: "1px solid #e85a02",
              color: "white",
            },
          }}
          fullWidth
          variant="outlined"
          color="secondary"
          onClick={handleBack}
        >
          Back
        </Button>
      </form>
    </>
  );
};

export default OtpChecking;
