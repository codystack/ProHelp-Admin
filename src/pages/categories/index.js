import Footer from "examples/Footer";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

import React from "react";

import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import Box from "@mui/system/Box";
// import Card from "@mui/material/Card";
import SoftButton from "components/SoftButton";
import { Add, Close } from "@mui/icons-material";
import {
  AppBar,
  Dialog,
  FormControl,
  Grid,
  IconButton,
  List,
  NativeSelect,
  Toolbar,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import Slide from "@mui/material/Slide";
import SoftBox from "components/SoftBox";
import SoftInput from "components/SoftInput";
import { useFormik } from "formik";
import APIService from "service";
import { toast } from "react-hot-toast";
import CategoriesTable from "examples/Tables/categories";
import AddCategoryForm from "forms/category/add_category.";

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



const Categories = () => {
  const [countryCode] = React.useState("+234");
  const [value, setValue] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [isLoading, setLoading] = React.useState(false);
  const [errMsg, setErrMsg] = React.useState("");
  const [isError, setError] = React.useState(false);
  const [deviceType, setDeviceType] = React.useState("mobile");

  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.only('xs'));
  const tablet = useMediaQuery(theme.breakpoints.only('sm'));

  React.useEffect(() => {
    if (mobile) {
      setDeviceType('mobile')
    } else  if (tablet) {
      setDeviceType('tablet')
    }
    else {
      setDeviceType('pc')
    }
  }, [tablet, mobile])


  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Box py={3} display='flex' flexDirection='row' justifyContent='end' alignItems='center'>
        <SoftButton variant="gradient"
                color="dark" startIcon={<Add />} onClick={() => setOpen(true)}>
          Add Category
        </SoftButton>
      </Box>
      <Box sx={{ width: "100%" }}>
        <CategoriesTable />
      </Box>
      <Dialog
        fullScreen
        open={open}
        onClose={() => setOpen(false)}
        TransitionComponent={Transition}
      >
        <AppBar
          sx={{ position: "relative", backgroundColor: "#18113c", color: "white" }}
          color='secondary'
        >
          <Toolbar>
            <IconButton
              edge='start'
              color='white'
              onClick={() => setOpen(false)}
              aria-label='close'
            >
              <Close />
            </IconButton>
            <Typography
              sx={{ ml: 2, flex: 1, textTransform: "capitalize" }}
              variant='h6'
              component='div'
              color='#fff'
            >
              {`Create New Category`}
            </Typography>
            <SoftButton autoFocus color='inherit' onClick={() => setOpen(false)}>
              Close
            </SoftButton>
          </Toolbar>
        </AppBar>
        {
          deviceType === "mobile" && <Toolbar />
        }
        <List
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <SoftBox width={deviceType === "pc" ? '60%' : deviceType === "tablet" ? '80%' : "90%"} >
            <AddCategoryForm setOpen={setOpen} />
          </SoftBox>
        </List>
      </Dialog>
      <Footer />
    </DashboardLayout>
  );
};

export default Categories;
