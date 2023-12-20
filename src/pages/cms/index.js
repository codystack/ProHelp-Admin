import Footer from "examples/Footer";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

import React from "react";

import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/system/Box";
import BannersTable from "examples/Tables/banners";
import FAQsTable from "examples/Tables/faqs";
import { AppBar, Button, Dialog, IconButton, List, Toolbar } from "@mui/material";
import { Add, Close } from "@mui/icons-material";
import SoftButton from "components/SoftButton";
import AddBannerForm from "forms/cms/add_banner";
import AddFAQForm from "forms/cms/add_faq";
import Slide from '@mui/material/Slide'
import AddSectionForm from "forms/cms/add_section";
import SectionsTable from "examples/Tables/sections";

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

const Transition = React.forwardRef(function Transition (props, ref) {
  return <Slide direction='up' ref={ref} {...props} />
})

const CMS = () => {
  const [value, setValue] = React.useState(0);
  const [openFAQ, setOpenFAQ] = React.useState(false);
  const [openBanner, setOpenBanner] = React.useState(false);
  const [openSection, setOpenSection] = React.useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <DashboardLayout>
      <Dialog open={openBanner} onClose={() => setOpenBanner(false)}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => setOpenBanner(false)}
            aria-label="close"
          >
            <Close />
          </IconButton>
          <Typography
            sx={{ ml: 2, flex: 1, textTransform: "capitalize" }}
            variant="h6"
            component="div"
          >
            {"........ Add A New Website Banner ........"}
          </Typography>
          <Button
            autoFocus
            color="inherit"
            onClick={() => setOpenBanner(false)}
          >
            Close
          </Button>
        </Toolbar>
        <AddBannerForm setOpen={setOpenBanner} />
      </Dialog>

      <Dialog open={openFAQ} onClose={() => setOpenFAQ(false)}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => setOpenFAQ(false)}
            aria-label="close"
          >
            <Close />
          </IconButton>
          <Typography
            sx={{ ml: 2, flex: 1, textTransform: "capitalize" }}
            variant="h6"
            component="div"
          >
            {"... Add A New Frequently Asked Question ..."}
          </Typography>
          <Button
            autoFocus
            color="inherit"
            onClick={() => setOpenFAQ(false)}
          >
            Close
          </Button>
        </Toolbar>
        <AddFAQForm setOpen={setOpenFAQ} />
      </Dialog>

      <Dialog
        fullScreen
        open={openSection}
        onClose={() => setOpenSection(false)}
        TransitionComponent={Transition}
      >
        <AppBar
          sx={{ position: "relative", backgroundColor: "#18113c", color: "white" }}
          color="secondary"
        >
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => setOpenSection(false)}
              aria-label="close"
            >
              <Close />
            </IconButton>
            <Typography
              sx={{ ml: 2, flex: 1, textTransform: "capitalize",}}
              variant="h6"
              component="div"
              color={"#fff"}
            >
              {'Add New Section On Website'}
            </Typography>
            <Button autoFocus color="inherit" onClick={() => setOpenSection(false)}>
              Close
            </Button>
          </Toolbar>
        </AppBar>
        <List>
          <AddSectionForm setOpen={setOpenSection} />
        </List>
      </Dialog>
      
      <DashboardNavbar />
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Banners" {...a11yProps(0)} />
            <Tab label="Sections" {...a11yProps(1)} />
            <Tab label="Frequently Asked Questions" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <Box
            width={"100%"}
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"start"}
            alignItems={"start"}
          >
            <Box
              pb={2}
              width={"100%"}
              display={"flex"}
              flexDirection={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Typography>Website Banners</Typography>
              <SoftButton
                startIcon={<Add />}
                variant="contained"
                onClick={() => setOpenBanner(true)}
                sx={{ textTransform: "capitalize", color: "white" }}
              >
                Add banner
              </SoftButton>
            </Box>
            <BannersTable />
          </Box>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Box
            width={"100%"}
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"start"}
            alignItems={"start"}
          >
            <Box
              pb={2}
              width={"100%"}
              display={"flex"}
              flexDirection={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Typography>Website Sections</Typography>
              <SoftButton
                startIcon={<Add />}
                variant="contained"
                onClick={() => setOpenSection(true)}
                sx={{ textTransform: "capitalize", color: "white" }}
              >
                Add section
              </SoftButton>
            </Box>
            <SectionsTable />
          </Box>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Box
            width={"100%"}
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"start"}
            alignItems={"start"}
          >
            <Box
              pb={2}
              width={"100%"}
              display={"flex"}
              flexDirection={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Typography>Frequently Asked Questions</Typography>
              <SoftButton
                startIcon={<Add />}
                variant="contained"
                onClick={() => setOpenFAQ(true)}
                sx={{ textTransform: "capitalize", color: "white" }}
              >
                Add FAQ
              </SoftButton>
            </Box>
            <FAQsTable />
          </Box>
        </TabPanel>
      </Box>
      <Footer />
    </DashboardLayout>
  );
};

export default CMS;
