import React from "react";
import { PropTypes } from "prop-types";
import { Avatar, Chip, Divider, Grid, Typography } from "@mui/material";
import Box from "@mui/system/Box";
import formatCurrency from "utils/formatCurrency";
import logo from "../../../assets/images/fast-logos/credit_card_icon.jpg";

const Preview = (props) => {
  let { selected } = props;

  let fL = selected?.row?.user?.firstName?.slice(0, 1);
  let sL = selected?.row?.user?.lastName?.slice(0, 1);

  return (
    <Box
      padding={4}
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Avatar
        size="large"
        sx={{ width: 128, height: 128 }}
        src={selected?.row?.user?.photoUrl ?? logo}
        imgProps={{ sx: { objectFit: "cover" } }}
      >{`${fL}${sL}`}</Avatar>
      <br />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={3}>
          <Box>
            <Typography variant="h6" fontWeight={600}>
              FULLNAME
            </Typography>
            <p style={{ fontSize: 14, textTransform: "capitalize" }}>
              {selected?.row?.user?.fullName}
            </p>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Box>
            <Typography variant="h6" fontWeight={600}>
              EMAIL
            </Typography>
            <p style={{ fontSize: 14, textTransform: "lowercase" }}>
              {selected?.row?.user?.emailAddress}
            </p>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Box>
            <Typography variant="h6" fontWeight={600}>
              PHONE NUMBER
            </Typography>
            <p style={{ fontSize: 14, textTransform: "capitalize" }}>
              {selected?.row?.user?.phoneNumber}
            </p>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Box>
            <Typography variant="h6" fontWeight={600}>
              GENDER
            </Typography>
            <p style={{ fontSize: 14, textTransform: "capitalize" }}>
              {selected?.row?.user?.gender}
            </p>
          </Box>
        </Grid>
      </Grid>
      <br />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={3}>
          <Box>
            <Typography variant="h6" fontWeight={600}>
              REQUEST TYPE
            </Typography>
            <p style={{ fontSize: 14, textTransform: "capitalize" }}>{selected?.row?.type}</p>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Box>
            <Typography variant="h6" fontWeight={600}>
              DURATION
            </Typography>
            <p style={{ fontSize: 14, textTransform: "capitalize" }}>{selected?.row?.duration}</p>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Box>
            <Typography variant="h6" fontWeight={600}>
              INITIATED ON
            </Typography>
            <p style={{ fontSize: 14, textTransform: "capitalize" }}>
              {new Date(selected?.row?.createdAt).toLocaleString("en-US", {
                weekday: "short",
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </p>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Box>
            <Typography variant="h6" fontWeight={600}>
              AMOUNT
            </Typography>
            <p style={{ fontSize: 14, textTransform: "capitalize" }}>
              {formatCurrency(selected?.row?.amount)}
            </p>
          </Box>
        </Grid>
      </Grid>
      <Divider />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={3}>
          <Box>
            <Typography variant="h6" fontWeight={600}>
              AMOUNT ISSUED
            </Typography>
            <p style={{ fontSize: 14, textTransform: "capitalize" }}>
              {formatCurrency(selected?.row?.amountIssued)}
            </p>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Box>
            <Typography variant="h6" fontWeight={600}>
              INTEREST %
            </Typography>
            <p style={{ fontSize: 14, textTransform: "capitalize" }}>{selected?.row?.interest}</p>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Box>
            <Typography variant="h6" fontWeight={600}>
              REASON
            </Typography>
            <p style={{ fontSize: 14, textTransform: "capitalize" }}>{selected?.row?.reason}</p>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Box>
            <Typography variant="h6" fontWeight={600}>
              LOAN ID
            </Typography>
            <p style={{ fontSize: 14 }}>{selected?.row?.loanId}</p>
          </Box>
        </Grid>
      </Grid>

      <Divider />

      <br />
      <Box
        padding={1}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Typography variant="h6" fontWeight={600}>
           STATUS
        </Typography>
        <Chip
          size="large"
          sx={{ textTransform: "capitalize" }}
          label={selected?.row?.status}
          color={
            selected?.row?.status === "pending"
              ? "warning"
              : selected?.row?.status === "approved" || selected?.row?.status === "settled"
              ? "success"
              : selected?.row?.status === "credited"
              ? "info"
              : "error"
          }
        />
      </Box>
    </Box>
  );
};

Preview.propTypes = {
  selected: PropTypes.object,
};

export default Preview;
