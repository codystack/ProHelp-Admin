import Footer from "examples/Footer";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

import React from "react";

import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import Box from "@mui/system/Box";
// import Card from "@mui/material/Card";

import Slide from "@mui/material/Slide";
import { useSelector } from "react-redux";
import JobsTable from "examples/Tables/jobs";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 4 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const Jobs = () => {
  // const [countryCode] = React.useState("+234");
  // const [value, setValue] = React.useState(0);
  // const [open, setOpen] = React.useState(false);
  // const [isLoading, setLoading] = React.useState(false);
  // const [errMsg, setErrMsg] = React.useState("");
  // const [isError, setError] = React.useState(false);
  // const [pass, setPass] = React.useState("");

  // const { admins } = useSelector((state) => state.admin);

  // const handleChange = (event, newValue) => {
  //   setValue(newValue);
  // };

  // const types = ["personal", "non-profit", "corporation", "government-owned"];

  // const osName = () => {
  //   const userAgent = window.navigator.userAgent;
  //   let os = "";

  //   if (userAgent.indexOf("Win") !== -1) {
  //     os = "Windows";
  //   } else if (userAgent.indexOf("Mac") !== -1) {
  //     os = "MacOS";
  //   } else if (userAgent.indexOf("Linux") !== -1) {
  //     os = "Linux";
  //   } else if (userAgent.indexOf("Android") !== -1) {
  //     os = "Android";
  //   } else if (userAgent.indexOf("iOS") !== -1) {
  //     os = "iOS";
  //   } else {
  //     os = "Unknown";
  //   }

  //   return os;
  // };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Box sx={{ width: "100%" }}>
        <JobsTable />
      </Box>
      <br/>
      <Footer />
    </DashboardLayout>
  );
};

export default Jobs;
