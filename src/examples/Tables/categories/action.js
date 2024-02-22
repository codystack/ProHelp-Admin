import React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

// import { useSnackbar } from "notistack";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@mui/styles";
import { setLoading } from "../../../redux/slices/backdrop";
import Box from "@mui/system/Box";
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
import SoftInput from "components/SoftInput";
import { useFormik } from "formik";
import * as Yup from "yup";
import UpdateCategoryForm from "forms/category/update_category";
import SoftButton from "components/SoftButton";

const useStyles = makeStyles((theme) => ({
  awardRoot: {
    display: "flex",
    flexDirection: "column",
  },
  awardRow: {
    display: "flex",
    flexDirection: "row",
    marginLeft: "auto",
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ActionButton = ({ selected }) => {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openDelete, setOpenDelete] = React.useState(false);

  const [openEdit, setOpenEdit] = React.useState(false);
  const [menu, setMenu] = React.useState(null);
  const dispatch = useDispatch();

  const openMenu = ({ currentTarget }) => setMenu(currentTarget);
  const closeMenu = () => setMenu(null);

  const openAction = Boolean(anchorEl);
  const { profileData } = useSelector((state) => state.profile);

  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .min(6, "A minimum of 6 characters is required")
      .required("Password is required!"),
  });

  const handleClickOpen = () => {
    closeMenu();
    setOpenDelete(true);
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
      <MenuItem onClick={() => setOpen(true)}>View</MenuItem>
      {profileData &&
        profileData?.privilege?.access === "read/write" &&
        profileData?.privilege?.type.toLowerCase() === "superadmin" && (
          <div>
            <MenuItem
              onClick={() => {
                closeMenu();
                setOpenEdit(true);
              }}
            >
              {"Update"}
            </MenuItem>
            <MenuItem onClick={handleClickOpen}>{"Remove"}</MenuItem>
          </div>
        )}
    </Menu>
  );

  const removeCategory = async () => {
    handleClose();
    setOpenDelete(false);

    dispatch(setLoading(true));

    try {
      let response = await APIService.delete(
        "/profession/delete",
        `${selected?.row?.id}`
      );

      console.log("RESPONE DELETE CATEGORY ::: ", response.data);

      toast.promise(response, {
        loading: "Loading",
        success: (res) => {
          mutate("/profession/all");
          dispatch(setLoading(false));

          return `${res?.message || "Category deleted successfully"}`;
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
        fullScreen
        open={openEdit}
        onClose={() => setOpenEdit(false)}
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
              color="white"
              onClick={() => setOpenEdit(false)}
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
              {`Update Category '${selected?.row?.name}' `}
            </Typography>
            <SoftButton
              autoFocus
              color="inherit"
              onClick={() => setOpenEdit(false)}
            >
              Close
            </SoftButton>
          </Toolbar>
        </AppBar>
        {<Toolbar />}
        <List
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <SoftBox
            width={ "80%"
            }
          >
            <UpdateCategoryForm setOpen={setOpenEdit} selected={selected} />
          </SoftBox>
        </List>
      </Dialog>

      <Dialog
        open={openDelete}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setOpenDelete(true)}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Remove Category(Profession)"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {`Are you sure you want to remove ${selected?.row?.name} from categories? 
            Proceed if you are very sure you want to remove this profession`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDelete(false)}>Cancel</Button>
          <Button onClick={removeCategory}>Yes, proceed</Button>
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
              color={"#fff"}
            >
              {`${selected?.row?.bio?.firstname} ${selected?.row?.bio?.lastname}'s Profile`}
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

ActionButton.propTypes = {
  selected: PropTypes.object,
};

export default ActionButton;
