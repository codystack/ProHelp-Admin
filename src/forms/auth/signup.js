import * as Yup from "yup";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
// Third party
import toast, { Toaster } from "react-hot-toast";
// Services
import APIService from "../../service/";

import { Box, Button, Grid, MenuItem, Typography } from "@mui/material";

import { useDispatch } from "react-redux";
// import env from '../../env';

import {
  ValidatorForm,
  TextValidator,
  SelectValidator,
} from "react-material-ui-form-validator";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import useProfile from "hooks/profile";
import { setAuth, setProfile } from "../../redux/slices/profile";
import { APP_KEY } from "config.js";
import SoftButton from "components/SoftButton";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const sex = [
  {
    label: "Male",
    value: "male",
  },
  {
    label: "Female",
    value: "female",
  },
];

const privilegeTypes = [
  {
    label: "Admin",
    value: "admin",
  },
  {
    label: "Super Admin",
    value: "superadmin",
  },
];

const privilegeClaims = [
  {
    label: "Read Only",
    value: "readonly",
  },
  {
    label: "Read & Write",
    value: "read/write",
  },
];

const privilegeRoles = [
  {
    label: "Manager",
    value: "manager",
  },
  {
    label: "Editor",
    value: "editor",
  },
  {
    label: "Developer",
    value: "developer",
  },
];

function RegisterForm(props) {
  //   const { mutate } = props;
  const [loading, setLoading] = useState();
  const [countryCode] = useState("+234");
  const [showCode, setShowCode] = useState(false);
  const [formValues, setFormValues] = useState({
    fullname: "",
    phone: "",
    gender: "",
    email: "",
    password: "",
    type: "",
    role: "",
    access: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevData) => ({ ...prevData, [name]: value }));
  };

  const osName = () => {
    const userAgent = window.navigator.userAgent;
    let os = "";

    if (userAgent.indexOf("Win") !== -1) {
      os = "Windows";
    } else if (userAgent.indexOf("Mac") !== -1) {
      os = "MacOS";
    } else if (userAgent.indexOf("Linux") !== -1) {
      os = "Linux";
    } else if (userAgent.indexOf("Android") !== -1) {
      os = "Android";
    } else if (userAgent.indexOf("iOS") !== -1) {
      os = "iOS";
    } else {
      os = "Unknown";
    }

    return os;
  };

  const submitForm = async (e) => {
    // console.log("LOADING >>>", APP_KEY);
    // setLoading(true);

    try {
      const { type, access, role, phone, fullname, gender, ...rest } =
        Object.assign({}, formValues);

      const payload = {
        ...rest,

        privilege: {
          type: formValues.type,
          role: formValues.role,
          access: formValues.access,
        },
        device: {
          os: `${osName()}`,
        },
        bio: {
          fullname: formValues.fullname,
          phone: `${countryCode}${
            formValues?.phone.charAt(0) === "0"
              ? formValues?.phone.substring(1)
              : formValues?.phone
          }`,
        },
      };

      console.log("PAYLOADS ", payload);

      const response = APIService.post("/admin/create", payload);

      toast.promise(response, {
        loading: "Loading",
        success: (res) => {
          setLoading(false);

          //Now route to login
          navigate("/login", {
            replace: true,
          });

          return `Login to continue`;
        },
        error: (err) => {
          // console.log("ERROR HERE >>> ", `${err}`);
          setLoading(false);
          return (
            err?.response?.data?.message ||
            err?.message ||
            "Something went wrong, try again."
          );
        },
      });
    } catch (error) {
      console.log("ERROR => ", error);
    }
  };

  return (
    <>
      <ValidatorForm onSubmit={submitForm}>
        {/* <Stack spacing={2} sx={{ marginBottom: 2 }}> */}
        <TextValidator
          margin="normal"
          required
          fullWidth
          id="fullname"
          name="fullname"
          value={formValues.fullname}
          onChange={handleChange}
          placeholder="Full name"
          variant="outlined"
          validators={["required"]}
          errorMessages={["Full name is required"]}
        />

        <TextValidator
          margin="normal"
          autoComplete="email-address"
          required
          type="email"
          fullWidth
          id="email"
          name="email"
          value={formValues.email}
          onChange={handleChange}
          placeholder="Email address"
          variant="outlined"
          validators={["required"]}
          errorMessages={["Email address is required"]}
        />

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={6}>
            <TextValidator
              margin="normal"
              required
              autoComplete="phone"
              fullWidth
              id="phone"
              name="phone"
              value={formValues.phone}
              onChange={handleChange}
              placeholder="Phone number"
              variant="outlined"
              validators={["required"]}
              errorMessages={["Phone number is required"]}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <SelectValidator
              margin="normal"
              value={formValues.gender}
              onChange={handleChange}
              label="Select gender"
              name="gender"
              fullWidth
              variant="outlined"
              size="small"
              id="gender"
              validators={["required"]}
              errorMessages={["Gender e is required"]}
            >
              {sex?.map((gender) => (
                <MenuItem key={gender.value} value={gender.value}>
                  {gender.label}
                </MenuItem>
              ))}
            </SelectValidator>
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={6}>
            <SelectValidator
              margin="normal"
              value={formValues.type}
              onChange={handleChange}
              label="Select admin type"
              name="type"
              fullWidth
              variant="outlined"
              size="small"
              id="type"
              validators={["required"]}
              errorMessages={["Admin type is required"]}
            >
              {privilegeTypes?.map((item) => (
                <MenuItem key={item.value} value={item.value}>
                  {item.label}
                </MenuItem>
              ))}
            </SelectValidator>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <SelectValidator
              margin="normal"
              value={formValues.role}
              onChange={handleChange}
              label="Select admin role"
              name="role"
              fullWidth
              variant="outlined"
              size="small"
              id="role"
              validators={["required"]}
              errorMessages={["Admin role is required"]}
            >
              {privilegeRoles?.map((item) => (
                <MenuItem key={item.value} value={item.value}>
                  {item.label}
                </MenuItem>
              ))}
            </SelectValidator>
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={6}>
            <SelectValidator
              margin="normal"
              value={formValues.access}
              onChange={handleChange}
              label="Select access"
              name="access"
              fullWidth
              variant="outlined"
              size="small"
              id="access"
              validators={["required"]}
              errorMessages={["Admin access is required"]}
            >
              {privilegeClaims?.map((item) => (
                <MenuItem key={item.value} value={item.value}>
                  {item.label}
                </MenuItem>
              ))}
            </SelectValidator>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <TextValidator
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={showCode ? "text" : "password"}
              id="password"
              onChange={handleChange}
              value={formValues.password}
              autoComplete="current-password"
              placeholder="Password"
              variant="outlined"
              validators={["required"]}
              errorMessages={["Password is required"]}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle code"
                      onClick={() => setShowCode(!showCode)}
                      onMouseDown={() => setShowCode(!showCode)}
                      edge="end"
                    >
                      {showCode ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        </Grid>

        <br />

        <SoftButton
          fullWidth
          size="large"
          color="error"
          type="submit"
          variant="contained"
          disabled={loading}
        >
          Create Account
        </SoftButton>

        <Box
          paddingY={2}
          display={"flex"}
          flexDirection={"row"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Typography variant="body2">Already have an account? </Typography>
          <Link
            style={{
              fontSize: 15,
              textDecoration: "underline",
              paddingLeft: 10,
            }}
            to={"/login"}
          >
            Login{" "}
          </Link>
        </Box>
      </ValidatorForm>
      <Toaster />
    </>
  );
}

export default RegisterForm;
