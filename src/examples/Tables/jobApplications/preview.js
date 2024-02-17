import React from "react";
import { PropTypes } from "prop-types";
import { Avatar, Grid, Toolbar, Typography } from "@mui/material";
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
        sx={{ width: 128, height: 128, borderRadius: 64 }}
        src={selected?.row?.applicant?.bio?.image}
      />
      <br />

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={3}>
          <Box>
            <Typography variant="h6" fontWeight={600}>
              COMPANY NAME
            </Typography>
            <p style={{ fontSize: 14, textTransform: "capitalize" }}>
              {selected?.row?.job?.company}
            </p>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Box>
            <Typography variant="h6" fontWeight={600}>
              JOB TITLE
            </Typography>
            <p style={{ fontSize: 14, textTransform: "capitalize" }}>
              {selected?.row?.job?.jobTitle}
            </p>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Box>
            <Typography variant="h6" fontWeight={600}>
              JOB TYPE
            </Typography>
            <p style={{ fontSize: 14, textTransform: "capitalize" }}>
              {selected?.row?.job?.jobType}
            </p>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Box>
            <Typography variant="h6" fontWeight={600}>
              WORKPLACE TYPE
            </Typography>
            <p style={{ fontSize: 14, textTransform: "capitalize" }}>
              {selected?.row?.job?.workplaceType}
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
              {selected?.row?.job?.jobLocation?.country}
            </p>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Box>
            <Typography variant="h6" fontWeight={600}>
              JOB STATE
            </Typography>
            <p style={{ fontSize: 14, textTransform: "capitalize" }}>
              {selected?.row?.job?.jobLocation?.state}
            </p>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Box>
            <Typography variant="h6" fontWeight={600}>
              JOB CITY
            </Typography>
            <p style={{ fontSize: 14, textTransform: "capitalize" }}>
              {selected?.row?.job?.jobLocation?.city}
            </p>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Box>
            <Typography variant="h6" fontWeight={600}>
              JOB STATUS
            </Typography>
            <p style={{ fontSize: 14, textTransform: "capitalize" }}>
              {selected?.row?.job?.jobStatus}
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
            <p style={{ fontSize: 14 }}>{selected?.row?.job?.profession?.name}</p>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Box>
            <Typography variant="h6" fontWeight={600}>
              MINIMUM QUALIFICATION
            </Typography>
            <p style={{ fontSize: 14, textTransform: "capitalize" }}>
              {selected?.row?.job?.minimumQualification}
            </p>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Box>
            <Typography variant="h6" fontWeight={600}>
              APPLICANTS
            </Typography>
            <p style={{ fontSize: 14, textTransform: "capitalize" }}>
              {selected?.row?.job?.applicants?.length}
            </p>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Box>
            <Typography variant="h6" fontWeight={600}>
              APPLICATION SUBMITTED ON
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
      </Grid>
      <Toolbar />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={6}>
          <Box>
            <Typography variant="h6" fontWeight={600}>
              JOB DESCRIPTION
            </Typography>
            <p style={{ fontSize: 14 }}>{selected?.row?.job?.description}</p>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <Box>
            <Typography variant="h6" fontWeight={600}>
              JOB REQUIREMEMTS
            </Typography>
            <p style={{ fontSize: 14, textTransform: "capitalize" }}>
              {selected?.row?.job?.requirements?.map((item, k) => (
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
              SCREENING QUESTIONS & ANSWERS
            </Typography>
            <p style={{ fontSize: 16, textTransform: "capitalize" }}>
              {selected?.row?.answers?.map((item, k) => (
                <Box>
                  <li key={k}>{`${1 + k}. ${item?.question}`}</li>
                  <Typography ml={2} key={k} fontSize={13} >{`answer: ${item?.answer}`}</Typography>
                </Box>
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
