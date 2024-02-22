import React from "react";
import { PropTypes } from "prop-types";
import { Avatar, Chip, Divider, Grid, Typography } from "@mui/material";
import Box from "@mui/system/Box";
import formatCurrency from "utils/formatCurrency";

const Preview = (props) => {
  let { selected } = props;

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
        sx={{ width: 256, height: 256 }}
        variant="rounded"
        src={selected?.row?.image}
      >{`${selected?.row?.name}`}</Avatar>
      <br />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={3}>
          <Box>
            <Typography variant="h6" fontWeight={600}>
              NAME
            </Typography>
            <p
              style={{ fontSize: 14, textTransform: "capitalize" }}
            >{`${selected?.row?.name}`}</p>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Box>
            <Typography variant="h6" fontWeight={600}>
              SKILLS
            </Typography>
            <ol style={{ fontSize: 14, textTransform: "lowercase" }}>
              {selected?.row?.skills?.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ol>
          </Box>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Box>
            <Typography variant="h6" fontWeight={600}>
              CREATED ON
            </Typography>
            <p style={{ fontSize: 14, textTransform: "capitalize" }}>
              {new Date(selected?.row?.createdAt).toLocaleString("en-US", {
                weekday: "short",
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          </Box>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Box>
            <Typography variant="h6" fontWeight={600}>
              LAST UPDATED ON
            </Typography>
            <p style={{ fontSize: 14, textTransform: "capitalize" }}>
              {new Date(selected?.row?.updatedAt).toLocaleString("en-US", {
                weekday: "short",
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          </Box>
        </Grid>
      </Grid>
      <br />
      <Box display={'flex'} flexDirection={'column'} justifyContent={'start'} alignItems={'start'} alignSelf={'start'} >
        <Typography variant="h6" fontWeight={600}>
          DESCRIPTION
        </Typography>
        <p style={{ fontSize: 14, textTransform: "capitalize" }}>
          {selected?.row?.description}
        </p>
      </Box>
    </Box>
  );
};

Preview.propTypes = {
  selected: PropTypes.object,
};

export default Preview;
