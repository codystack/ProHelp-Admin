import React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../../redux/slices/backdrop";
import { PropTypes } from "prop-types";
import SoftBox from "components/SoftBox";
import {
  AppBar,
  Dialog,
  DialogActions,
  DialogContent,
  Icon,
  List,
  Toolbar,
} from "@mui/material";

import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { Close } from "@mui/icons-material";
import Preview from "./preview";
import APIService from "service";
import { toast } from "react-hot-toast";
import { mutate } from "swr";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ActionButton = ({ selected }) => {
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [verifyType, setVerifyType] = React.useState("");

  const [openConfirm, setOpenConfirm] = React.useState(false);
  const [openConfirmVerify, setOpenConfirmVerify] = React.useState(false);
  const [menu, setMenu] = React.useState(null);
  const dispatch = useDispatch();

  const openMenu = ({ currentTarget }) => setMenu(currentTarget);
  const closeMenu = () => setMenu(null);

  const openAction = Boolean(anchorEl);
  //   const { enqueueSnackbar } = useSnackbar();
  const { profileData } = useSelector((state) => state.profile);

  const handleClickOpen = () => {
    closeMenu();
    setOpenConfirm(true);
  };

  const handleClose = () => {
    setOpenConfirm(false);
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
      {profileData && profileData?.privilege?.access === "read/write" && (
        <div>
          {selected?.row?.accountStatus !== "frozen" ? (
            <MenuItem onClick={handleClickOpen}>{`Freeze Account`}</MenuItem>
          ) : (
            <MenuItem onClick={handleClickOpen}>{`Unfreeze Account`}</MenuItem>
          )}
          {!selected?.row?.isGuarantorVerified && (
            <MenuItem
              onClick={() => {
                closeMenu();
                setVerifyType("Guarantor");
                setOpenConfirmVerify(true);
              }}
            >
              {"Verify Guarantor"}
            </MenuItem>
          )}
          {!selected?.row?.isAddressVerified && (
            <MenuItem
              onClick={() => {
                closeMenu();
                setVerifyType("House Address");
                setOpenConfirmVerify(true);
              }}
            >
              {"Verify House Address"}
            </MenuItem>
          )}
          {!selected?.row?.isPoliceCleared && (
            <MenuItem
              onClick={() => {
                closeMenu();
                setVerifyType("Police Clearance");
                setOpenConfirmVerify(true);
              }}
            >
              {"Verify Police Clearance"}
            </MenuItem>
          )}
          {!selected?.row?.isPreviousWorkAddressVerified && (
            <MenuItem
              onClick={() => {
                closeMenu();
                setVerifyType("Previous Work Information");
                setOpenConfirmVerify(true);
              }}
            >
              {"Verify Prev Work Address"}
            </MenuItem>
          )}
        </div>
      )}

      <MenuItem
        onClick={() => {
          closeMenu();
          setOpen(true);
        }}
      >
        Preview
      </MenuItem>
    </Menu>
  );

  const freezeAccount = () => {
    handleClose();
    dispatch(setLoading(true));
    const payload = { ...selected?.row, accountStatus: "frozen" };

    try {
      let response = APIService.update("/admin/users/update", "", payload);

      toast.promise(response, {
        loading: "Loading",
        success: (res) => {
          dispatch(setLoading(false));
          mutate("/admin/users/all");
          return `User account successfully frozen`;
        },
        error: (err) => {
          console.log("ERROR HERE >>> ", `${err}`);
          dispatch(setLoading(false));
          return (
            err?.response?.data?.message ||
            err?.message ||
            "Something went wrong, try again."
          );
        },
      });
    } catch (error) {
      dispatch(setLoading(false));
      console.log("ERROR ASYNC HERE >>> ", `${error}`);
    }
  };

  const unfreezeAccount = () => {
    handleClose();
    dispatch(setLoading(true));
    const payload = {
      ...selected?.row,
      accountStatus:
        selected?.row?.isEmailVerified && selected?.row?.isPhoneVerified
          ? "verified"
          : "pending",
    };

    try {
      let response = APIService.update("/admin/users/update", "", payload);

      toast.promise(response, {
        loading: "Loading",
        success: (res) => {
          dispatch(setLoading(false));
          mutate("/admin/users/all");
          return `User account successfully unfrozen`;
        },
        error: (err) => {
          console.log("ERROR HERE >>> ", `${err}`);
          dispatch(setLoading(false));
          return (
            err?.response?.data?.message ||
            err?.message ||
            "Something went wrong, try again."
          );
        },
      });
    } catch (error) {
      dispatch(setLoading(false));
      console.log("ERROR ASYNC HERE >>> ", `${error}`);
    }
  };

  const verifier = () => {
    // admin/users/update
    setOpenConfirmVerify(false);
    dispatch(setLoading(true));
    let payload = null;
    if (verifyType.includes('Guarantor')) {
      payload = {
        ...selected?.row,
        isGuarantorVerified: true,
        profileCompleteness: selected?.row?.profileCompleteness + 10
      };
    } else if (verifyType.includes('Police')) {
      payload = {
        ...selected?.row,
        isPoliceCleared: true,
        profileCompleteness: selected?.row?.profileCompleteness + 15
      };
    }
    else if (verifyType.includes('House Address')) {
      payload = {
        ...selected?.row,
        isAddressVerified: true,
        profileCompleteness: selected?.row?.profileCompleteness + 20
      };
    }
    else if (verifyType.includes('Prev Work')) {
      payload = {
        ...selected?.row,
        isPreviousWorkAddressVerified: true,
        profileCompleteness: selected?.row?.profileCompleteness + 10
      };
    }
    

    try {
      let response = APIService.update("/admin/users/update", "", payload);

      toast.promise(response, {
        loading: "Loading",
        success: (res) => {
          dispatch(setLoading(false));
          mutate("/admin/users/all");
          return `User account successfully updated`;
        },
        error: (err) => {
          console.log("ERROR HERE >>> ", `${err}`);
          dispatch(setLoading(false));
          return (
            err?.response?.data?.message ||
            err?.message ||
            "Something went wrong, try again."
          );
        },
      });
    } catch (error) {
      dispatch(setLoading(false));
      console.log("ERROR ASYNC HERE >>> ", `${error}`);
    }
  }

  return (
    <>
      <SoftBox color="text" px={2}>
        <Icon
          sx={{ cursor: "pointer", fontWeight: "bold" }}
          fontSize="small"
          onClick={openMenu}
        >
          more_vert
        </Icon>
      </SoftBox>
      {renderMenu}
      <Dialog
        open={openConfirm}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>
          {selected?.row?.accountStatus === "frozen"
            ? "Unfree Account"
            : "Freeze Account"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-slide-description"
            sx={{ fontSize: 14 }}
          >
            {`${
              selected?.row?.accountStatus === "frozen"
                ? `Are you sure you want to unfreeze ${selected?.row?.bio?.firstname} ${selected?.row?.bio?.lastname}'s account?`
                : `Are you sure you want to freeze ${selected?.row?.bio?.firstname} ${selected?.row?.bio?.lastname}'s account?`
            }`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={
              selected?.row?.accountStatus === "frozen"
                ? unfreezeAccount
                : freezeAccount
            }
          >
            Yes, proceed
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openConfirmVerify}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setOpenConfirmVerify(false)}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{`Verify ${verifyType}`}</DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-slide-description"
            sx={{ fontSize: 14 }}
          >
            {`${`Are you sure you want to verify ${
              selected?.row?.bio?.firstname
            } ${selected?.row?.bio?.lastname}'s ${verifyType} and mark as ${
              verifyType.includes("Police") ? "'CLEARED'" : "'VERIFIED'"
            }?`}`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConfirmVerify(false)}>Cancel</Button>
          <Button
            onClick={
              verifier
            }
          >
            Yes, proceed
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        fullScreen
        open={open}
        onClose={() => setOpen(false)}
        TransitionComponent={Transition}
      >
        <AppBar
          sx={{
            position: "relative",
            backgroundColor: "#18113c",
            color: "white",
          }}
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
              {`${selected?.row?.bio.firstname} ${selected?.row?.bio.lastname}'s Profile`}
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
    </>
  );
};

// Typechecking props for the ActionButton
ActionButton.propTypes = {
  selected: PropTypes.object,
};

export default ActionButton;
