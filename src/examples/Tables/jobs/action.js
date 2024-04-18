import React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

// import { useSnackbar } from "notistack";
import { useDispatch, useSelector } from "react-redux";
import { PropTypes } from "prop-types";
import SoftBox from "components/SoftBox";
import {
  AppBar,
  Dialog,
  Icon,
  List,
  Toolbar,
} from "@mui/material";

import Slide from "@mui/material/Slide";
import { Close } from "@mui/icons-material";
import Preview from "./preview";
import EditCompany from "./edit";



const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ActionButton = ({ selected }) => {

  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  //   const [openEdit, setOpenEdit] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);

  const [openEdit, setOpenEdit] = React.useState(false);
  const [menu, setMenu] = React.useState(null);
  const dispatch = useDispatch();

  const openMenu = ({ currentTarget }) => setMenu(currentTarget);
  const closeMenu = () => setMenu(null);

  const openAction = Boolean(anchorEl);
  //   const { enqueueSnackbar } = useSnackbar();
  const { profileData } = useSelector((state) => state.profile);
  const handleMoreAction = (e) => setAnchorEl(e.currentTarget);

  const handleCloseMoreAction = () => {
    setAnchorEl(null);
  };

  // const handleClickOpen = () => {
  //   closeMenu();
  //   setOpenConfirm(true);
  // };

  const handleClose = () => {
    // setOpenConfirm(false);
  };

  const renderMenu = (
    <Menu
      id="simple-menu"
      anchorEl={menu}
      anchorOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={Boolean(menu)}
      onClose={closeMenu}
    >
      <MenuItem
        key={"00"}
        onClick={() => {
          closeMenu();
          setOpen(true);
        }}
      >
        Preview
      </MenuItem>
      {/* {profileData &&
        profileData?.privilege?.type === "superadmin" &&
        profileData?.privilege?.claim === "read/write" && (
          <>
            <MenuItem
              key={"10"}
              onClick={() => {
                closeMenu();
                setOpenEdit(true);
              }}
            >
              {"Update"}
            </MenuItem>
            <MenuItem
              key={"22"}
              onClick={() => {
                closeMenu();
                setOpenDelete(true);
              }}
            >
              {"Remove"}
            </MenuItem>
          </>
        )} */}
    </Menu>
  );



  // const deleteCompany = () => {
  //   handleClose();
  //   dispatch(setLoading(true));
  //   const payload = { ...selected?.row };

  //   try {
  //     let response = APIService.update("/company/delete", `${selected.row?._id}`, payload);

  //     toast.promise(response, {
  //       loading: "Loading",
  //       success: (res) => {
  //         dispatch(setLoading(false));
  //         mutate("/company/all");
  //         return `Company deleted successfully`;
  //       },
  //       error: (err) => {
  //         // console.log("ERROR HERE >>> ", `${err}`);
  //         dispatch(setLoading(false));
  //         return err?.response?.data?.message || err?.message || "Something went wrong, try again.";
  //       },
  //     });
  //   } catch (error) {
  //     dispatch(setLoading(false));
  //     // console.log("ERROR ASYNC HERE >>> ", `${error}`);
  //   }
  // };

  return (
    <>
      <SoftBox color="text" px={2}>
        <Icon sx={{ cursor: "pointer", fontWeight: "bold" }} fontSize="small" onClick={openMenu}>
          more_vert
        </Icon>
      </SoftBox>
      {renderMenu}


      <Dialog
        fullScreen
        open={open}
        onClose={() => setOpen(false)}
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
              onClick={() => setOpen(false)}
              aria-label="close"
            >
              <Close />
            </IconButton>
            <Typography
              sx={{ ml: 2, flex: 1, textTransform: "capitalize" }}
              variant="h6"
              component="div"
              color="#fff"
            >
              {`${selected?.row?.recruiter?.bio?.firstname} ${selected?.row?.recruiter?.bio?.lastname}'s Job Summary`}
            </Typography>
            <Button autoFocus color="inherit" onClick={() => setOpen(false)}>
              Close
            </Button>
          </Toolbar>
        </AppBar>
        <List>
          <Preview selected={selected} />
        </List>
      </Dialog>

      <Dialog
        fullScreen
        open={openEdit}
        onClose={() => setOpenEdit(false)}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative", backgroundColor: "#18113c", color: "white" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => setOpenEdit(false)}
              aria-label="close"
            >
              <Close />
            </IconButton>
            <Typography
              sx={{ ml: 2, flex: 1, textTransform: "capitalize" }}
              variant="h6"
              component="div"
            >
              {`Update ${selected?.row?.name}'s Company Information`}
            </Typography>
            <Button autoFocus color="inherit" onClick={() => setOpenEdit(false)}>
              Close
            </Button>
          </Toolbar>
        </AppBar>
        <EditCompany setOpen={setOpenEdit} selected={selected} />
      </Dialog>
    </>
  );
};

// Typechecking props for the ActionButton
ActionButton.propTypes = {
  selected: PropTypes.object,
};

export default ActionButton;
