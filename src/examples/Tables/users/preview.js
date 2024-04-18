import React from "react";
import { PropTypes } from "prop-types";
import { Avatar, Chip, Divider, Grid, Typography } from "@mui/material";
import Box from "@mui/system/Box";
import formatCurrency from "utils/formatCurrency";
import { DoneAll, Warning, WarningAmber } from "@mui/icons-material";

const Preview = (props) => {
  let { selected } = props;

  let fL = selected?.row?.firstName?.slice(0, 1);
  let sL = selected?.row?.lastName?.slice(0, 1);

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
        src={selected?.row?.bio?.image}
      >{`${fL}${sL}`}</Avatar>
      <Box
        padding={1}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Typography variant="h6" fontWeight={600}>
          ACCOUNT STATUS
        </Typography>
        <Chip
          size="large"
          sx={{ textTransform: "capitalize" }}
          label={selected?.row?.accountStatus}
          color={
            selected?.row?.accountStatus !== "active" ? "error" : "success"
          }
        />
      </Box>
      <br />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={3}>
          <Box>
            <Typography variant="h6" fontWeight={600}>
              FULLNAME
            </Typography>
            <p style={{ fontSize: 14, textTransform: "capitalize" }}>
              {selected?.row?.bio?.firstname +
                " " +
                selected?.row?.bio?.middlename +
                " " +
                selected?.row?.bio?.lastname}
            </p>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Box>
            <Typography variant="h6" fontWeight={600}>
              EMAIL
            </Typography>
            <p style={{ fontSize: 14, textTransform: "lowercase" }}>
              {selected?.row?.email}
            </p>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Box>
            <Typography variant="h6" fontWeight={600}>
              PHONE NUMBER
            </Typography>
            <p style={{ fontSize: 14, textTransform: "capitalize" }}>
              {selected?.row?.bio?.phone}
            </p>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Box>
            <Typography variant="h6" fontWeight={600}>
              GENDER
            </Typography>
            <p style={{ fontSize: 14, textTransform: "capitalize" }}>
              {selected?.row?.bio?.gender}
            </p>
          </Box>
        </Grid>
      </Grid>
      <br />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={3}>
          <Box>
            <Typography variant="h6" fontWeight={600}>
              DATE OF BIRTH
            </Typography>
            <p style={{ fontSize: 14, textTransform: "capitalize" }}>
              {new Date(selected?.row?.bio?.dob).toLocaleString("en-US", {
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
              COUNTRY
            </Typography>
            <p style={{ fontSize: 14, textTransform: "capitalize" }}>
              {selected?.row?.address?.country}
            </p>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Box>
            <Typography variant="h6" fontWeight={600}>
              STATE
            </Typography>
            <p style={{ fontSize: 14, textTransform: "capitalize" }}>
              {selected?.row?.address?.state}
            </p>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Box>
            <Typography variant="h6" fontWeight={600}>
              CITY
            </Typography>
            <p style={{ fontSize: 14, textTransform: "capitalize" }}>
              {selected?.row?.address?.city}
            </p>
          </Box>
        </Grid>
      </Grid>
      <Divider />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={3}>
          <Box>
            <Typography variant="h6" fontWeight={600}>
              STREET ADDRESS
              <Chip
                size="large"
                sx={{ textTransform: "capitalize", mx: 1, pl: 0.5 }}
                label={
                  selected?.row?.isAddressVerified
                    ? "Verified"
                    : "Not Verified"
                }
                color={
                  selected?.row?.isAddressVerified
                    ? "success"
                    : "warning"
                }
                icon={
                  selected?.row?.isAddressVerified ? (
                    <DoneAll />
                  ) : (
                    <WarningAmber />
                  )
                }
              />
            </Typography>
            <p style={{ fontSize: 14, textTransform: "capitalize" }}>
              {selected?.row?.address?.street}
            </p>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Box>
            <Typography variant="h6" fontWeight={600}>
              EMAIL VERIFIED
            </Typography>
            <p style={{ fontSize: 14, textTransform: "capitalize" }}>
              {selected?.row?.isEmailVerified ? "True" : "False"}
            </p>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Box>
            <Typography variant="h6" fontWeight={600}>
              PHONE VERIFIED
            </Typography>
            <p style={{ fontSize: 14, textTransform: "capitalize" }}>
              {selected?.row?.isPhoneVerified ? "True" : "False"}
            </p>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Box>
            <Typography variant="h6" fontWeight={600}>
              NIN
            </Typography>
            <p style={{ fontSize: 14, textTransform: "capitalize" }}>
              {selected?.row?.bio?.nin}
            </p>
          </Box>
        </Grid>
      </Grid>
      <Divider />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={3}>
          <Box>
            <Typography variant="h6" fontWeight={600}>
              PROFESSION
            </Typography>
            <p style={{ fontSize: 14, textTransform: "capitalize" }}>
              {selected?.row?.profession}
            </p>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Box>
            <Typography variant="h6" fontWeight={600}>
              YEARS OF EXPERIENCE
            </Typography>
            <p style={{ fontSize: 14, textTransform: "capitalize" }}>
              {selected?.row?.experienceYears}
            </p>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Box>
            <Typography variant="h6" fontWeight={600}>
              CONNECTIONS
            </Typography>
            <p style={{ fontSize: 14, textTransform: "capitalize" }}>
              {selected?.row?.connections?.length}
            </p>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Box>
            <Typography variant="h6" fontWeight={600}>
              WALLET BALANCE
            </Typography>
            <p style={{ fontSize: 14, textTransform: "capitalize" }}>
              {selected?.row?.wallet?.balance} coins
            </p>
          </Box>
        </Grid>
      </Grid>
      <Divider color="blue" />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={3}>
          <Box>
            <Typography variant="h6" fontWeight={600}>
              LANGUAGES
            </Typography>
            <p style={{ fontSize: 14, textTransform: "capitalize" }}>
              {selected?.row?.languagesSpoken?.map((item) => (
                <li>{item}</li>
              ))}
            </p>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Box>
            <Typography variant="h6" fontWeight={600}>
              ACCOUNT TYPE
            </Typography>
            <p style={{ fontSize: 14, textTransform: "capitalize" }}>
              {selected?.row?.accountType?.toLowerCase() === "freelancer"
                ? "Professional"
                : selected?.row?.accountType}
            </p>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Box>
            <Typography variant="h6" fontWeight={600}>
              ACCOUNT CREATED ON
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
      <Divider />
      <br />
      <Typography
        textTransform={"uppercase"}
        variant="h5"
        gutterBottom
        fontWeight={700}
      >
        Guarantor Information
        <Chip
          size="large"
          sx={{ textTransform: "capitalize", mx: 1, pl: 0.5 }}
          label={
            selected?.row?.isGuarantorVerified ? "Verified" : "Not Verified"
          }
          color={selected?.row?.isGuarantorVerified ? "success" : "warning"}
          icon={
            selected?.row?.isGuarantorVerified ? <DoneAll /> : <WarningAmber />
          }
        />
      </Typography>
      <br />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={3}>
          <Box>
            <Typography variant="h6" fontWeight={600}>
              FULLNAME
            </Typography>
            <p style={{ fontSize: 14, textTransform: "capitalize" }}>
              {selected?.row?.guarantor?.name}
            </p>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Box>
            <Typography variant="h6" fontWeight={600}>
              EMAIL ADDRES
            </Typography>
            <p style={{ fontSize: 14, textTransform: "lowercase" }}>
              {selected?.row?.guarantor?.email}
            </p>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Box>
            <Typography variant="h6" fontWeight={600}>
              PHONE NUMBER
            </Typography>
            <p style={{ fontSize: 14, textTransform: "capitalize" }}>
              {selected?.row?.guarantor?.phone}
            </p>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Box>
            <Typography variant="h6" fontWeight={600}>
              RELATIONSHIP
            </Typography>
            <p style={{ fontSize: 14, textTransform: "capitalize" }}>
              {selected?.row?.guarantor?.relationship}
            </p>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Box>
            <Typography variant="h6" fontWeight={600}>
              ADDRESS
            </Typography>
            <p style={{ fontSize: 14, textTransform: "capitalize" }}>
              {selected?.row?.guarantor?.address}
            </p>
          </Box>
        </Grid>
      </Grid>
      <br />
      <Divider />
      <br />
      <Typography
        textTransform={"uppercase"}
        variant="h5"
        gutterBottom
        fontWeight={700}
      >
        Previous Work Information
        <Chip
          size="large"
          sx={{ textTransform: "capitalize", mx: 1, pl: 0.5 }}
          label={
            selected?.row?.isPreviousWorkAddressVerified
              ? "Verified"
              : "Not Verified"
          }
          color={
            selected?.row?.isPreviousWorkAddressVerified ? "success" : "warning"
          }
          icon={
            selected?.row?.isPreviousWorkAddressVerified ? (
              <DoneAll />
            ) : (
              <WarningAmber />
            )
          }
        />
      </Typography>
      <br />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={3}>
          <Box>
            <Typography variant="h6" fontWeight={600}>
              COMPANY
            </Typography>
            <p style={{ fontSize: 14, textTransform: "capitalize" }}>
              {selected?.row?.previousWorkInfo?.company}
            </p>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Box>
            <Typography variant="h6" fontWeight={600}>
              ROLE
            </Typography>
            <p style={{ fontSize: 14, textTransform: "capitalize" }}>
              {selected?.row?.previousWorkInfo?.role}
            </p>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Box>
            <Typography variant="h6" fontWeight={600}>
              COMPANY PHONE
            </Typography>
            <p style={{ fontSize: 14, textTransform: "capitalize" }}>
              {selected?.row?.previousWorkInfo?.phoneNumber}
            </p>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Box>
            <Typography variant="h6" fontWeight={600}>
              COUNTRY
            </Typography>
            <p style={{ fontSize: 14, textTransform: "capitalize" }}>
              {selected?.row?.previousWorkInfo?.country}
            </p>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Box>
            <Typography variant="h6" fontWeight={600}>
              STATE/REGION
            </Typography>
            <p style={{ fontSize: 14, textTransform: "capitalize" }}>
              {selected?.row?.previousWorkInfo?.state}
            </p>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Box>
            <Typography variant="h6" fontWeight={600}>
              CITY
            </Typography>
            <p style={{ fontSize: 14, textTransform: "capitalize" }}>
              {selected?.row?.previousWorkInfo?.city}
            </p>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Box>
            <Typography variant="h6" fontWeight={600}>
              ADDRESS
            </Typography>
            <p style={{ fontSize: 14, textTransform: "capitalize" }}>
              {selected?.row?.previousWorkInfo?.street}
            </p>
          </Box>
        </Grid>
      </Grid>
      <br />
      <Divider />
      <br />
      <Typography
        textTransform={"uppercase"}
        variant="h5"
        gutterBottom
        fontWeight={700}
      >
        SKILL SETS
      </Typography>
      <br />
      <Grid container spacing={2}>
        {(selected?.row?.skills ?? [])?.map((item, index) => (
          <Grid item key={index} xs={12} sm={4} md={3}>
            <Chip
              size="large"
              sx={{ textTransform: "capitalize" }}
              label={`Name: ${item?.name}. \t\tProficiency: ${
                Math.round(item?.proficiency) + "%" ?? "unknown"
              }`}
              color={"info"}
            />
          </Grid>
        ))}
      </Grid>
      <br />
      <Divider />
      <br />
      <Typography
        textTransform={"uppercase"}
        variant="h5"
        gutterBottom
        fontWeight={700}
      >
        WORK EXPERIENCES
      </Typography>
      <br />
      <Grid container spacing={2}>
        {(selected?.row?.experience ?? [])?.map((item, index) => (
          <Grid item key={index} xs={12} sm={4} md={3}>
            <Box
              display={"flex"}
              flexDirection={"row"}
              justifyContent={"space-between"}
              alignItems={"start"}
            >
              <img
                alt=""
                src={item?.companyLogo ?? "/playstore.png"}
                width={56}
              />
              <Box
                px={1}
                flex={1}
                display={"flex"}
                flexDirection={"column"}
                justifyContent={"start"}
                alignItems={"start"}
              >
                <Typography
                  lineHeight={1.1}
                  textTransform={"uppercase"}
                  fontWeight={600}
                >
                  {item?.company}
                </Typography>
                <Typography
                  textTransform={"capitalize"}
                  variant="body2"
                  fontWeight={600}
                >
                  {item?.role} ({item?.workType})
                </Typography>
                <Typography textTransform={"capitalize"} variant="body2">
                  {item?.region}, {item?.country}
                </Typography>
                <Typography
                  textTransform={"capitalize"}
                  variant="body2"
                  fontWeight={600}
                >
                  {item?.startDate} -{" "}
                  {item?.stillHere ? "Present" : item?.endate}
                </Typography>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
      <br />
      <Divider />
      <br />
      <Typography
        textTransform={"uppercase"}
        variant="h5"
        gutterBottom
        fontWeight={700}
      >
        EDUCATIONAL QUALIFICATIONS
      </Typography>
      <br />
      <Grid container spacing={2}>
        {(selected?.row?.education ?? [])?.map((item, index) => (
          <Grid item key={index} xs={12} sm={4} md={3}>
            <Box
              display={"flex"}
              flexDirection={"row"}
              justifyContent={"space-between"}
              alignItems={"start"}
            >
              <img
                alt=""
                src={item?.schoolLogo ?? "/playstore.png"}
                width={56}
              />
              <Box
                px={1}
                flex={1}
                display={"flex"}
                flexDirection={"column"}
                justifyContent={"start"}
                alignItems={"start"}
              >
                <Typography
                  lineHeight={1.1}
                  textTransform={"uppercase"}
                  fontWeight={600}
                >
                  {item?.school}
                </Typography>
                <Typography
                  textTransform={"capitalize"}
                  variant="body2"
                  fontWeight={600}
                >
                  {item?.course} ({item?.degree})
                </Typography>
                <Typography textTransform={"capitalize"} variant="body2">
                  {item?.stillSchooling
                    ? "Still a student"
                    : "Graduated on " + item?.endate}
                </Typography>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

Preview.propTypes = {
  selected: PropTypes.object,
};

export default Preview;
