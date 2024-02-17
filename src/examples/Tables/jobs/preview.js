import React from "react";
import { PropTypes } from "prop-types";
import { Avatar, Grid, Toolbar, Typography } from "@mui/material";
import Box from "@mui/system/Box";

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
        sx={{ width: 128, height: 128, borderRadius: 64 }}
        src={selected?.row?.recruiter?.bio?.image}
      />
      <br />

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={3}>
          <Box>
            <Typography variant="h6" fontWeight={600}>
              COMPANY NAME
            </Typography>
            <p style={{ fontSize: 14, textTransform: "capitalize" }}>
              {selected?.row?.company}
            </p>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Box>
            <Typography variant="h6" fontWeight={600}>
              JOB TITLE
            </Typography>
            <p style={{ fontSize: 14, textTransform: "capitalize" }}>
              {selected?.row?.jobTitle}
            </p>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Box>
            <Typography variant="h6" fontWeight={600}>
              JOB TYPE
            </Typography>
            <p style={{ fontSize: 14, textTransform: "capitalize" }}>
              {selected?.row?.jobType}
            </p>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Box>
            <Typography variant="h6" fontWeight={600}>
              WORKPLACE TYPE
            </Typography>
            <p style={{ fontSize: 14, textTransform: "capitalize" }}>
              {selected?.row?.workplaceType}
            </p>
          </Box>
        </Grid>
      </Grid>
      <Toolbar />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={3}>
          <Box>
            <Typography variant="h6" fontWeight={600}>
              JOB COUNTRY
            </Typography>
            <p style={{ fontSize: 14, textTransform: "capitalize" }}>
              {selected?.row?.jobLocation?.country}
            </p>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Box>
            <Typography variant="h6" fontWeight={600}>
              JOB STATE
            </Typography>
            <p style={{ fontSize: 14, textTransform: "capitalize" }}>
              {selected?.row?.jobLocation?.state}
            </p>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Box>
            <Typography variant="h6" fontWeight={600}>
              JOB CITY
            </Typography>
            <p style={{ fontSize: 14, textTransform: "capitalize" }}>
              {selected?.row?.jobLocation?.city}
            </p>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Box>
            <Typography variant="h6" fontWeight={600}>
              JOB STATUS
            </Typography>
            <p style={{ fontSize: 14, textTransform: "capitalize" }}>
              {selected?.row?.jobStatus}
            </p>
          </Box>
        </Grid>
      </Grid>
      <Toolbar />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={3}>
          <Box>
            <Typography variant="h6" fontWeight={600}>
              PROFESSION
            </Typography>
            <p style={{ fontSize: 14 }}>{selected?.row?.profession?.name}</p>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Box>
            <Typography variant="h6" fontWeight={600}>
              MINIMUM QUALIFICATION
            </Typography>
            <p style={{ fontSize: 14, textTransform: "capitalize" }}>
              {selected?.row?.minimumQualification}
            </p>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Box>
            <Typography variant="h6" fontWeight={600}>
              APPLICANTS
            </Typography>
            <p style={{ fontSize: 14, textTransform: "capitalize" }}>
              {selected?.row?.applicants?.length}
            </p>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Box>
            <Typography variant="h6" fontWeight={600}>
              JOB POSTED ON
            </Typography>
            <p style={{ fontSize: 14, textTransform: "capitalize" }}>
              {new Date(selected?.row?.updatedAt).toLocaleString("en-US", {
                weekday: "short",
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </p>
          </Box>
        </Grid>
      </Grid>
      <Toolbar />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={6}>
          <Box>
            <Typography variant="h6" fontWeight={600}>
              JOB DESCRIPTION
            </Typography>
            <p style={{ fontSize: 14 }}>{selected?.row?.description}</p>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <Box>
            <Typography variant="h6" fontWeight={600}>
              JOB REQUIREMEMTS
            </Typography>
            <p style={{ fontSize: 14, textTransform: "capitalize" }}>
              {selected?.row?.requirements?.map((item, k) => (
                <li key={k}>{`${1 + k}. ${item}`}</li>
              ))}
            </p>
          </Box>
        </Grid>
      </Grid>
      <Toolbar />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={9}>
          <Box>
            <Typography variant="h6" fontWeight={600}>
              SCREENING QUESTIONS
            </Typography>
            <p style={{ fontSize: 14, textTransform: "capitalize" }}>
              {selected?.row?.screeningQuestions?.map((item, k) => (
                <li key={k}>{`${1 + k}. ${item}`}</li>
              ))}
            </p>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

Preview.propTypes = {
  selected: PropTypes.object,
};

export default Preview;
