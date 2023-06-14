// @mui material components
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import MiniStatisticsCard from "examples/Cards/StatisticsCards/MiniStatisticsCard";
import GradientLineChart from "examples/Charts/LineCharts/GradientLineChart";

// Soft UI Dashboard React base styles
import typography from "assets/theme/base/typography";

// // Dashboard layout components
// import BuildByDevelopers from "layouts/dashboard/components/BuildByDevelopers";
// import WorkWithTheRockets from "layouts/dashboard/components/WorkWithTheRockets";
// import Projects from "layouts/dashboard/components/Projects";
// import OrderOverview from "layouts/dashboard/components/OrderOverview";

// Data
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import gradientLineChartData from "layouts/dashboard/data/gradientLineChartData";
import { useSelector } from "react-redux";
import { forwardRef, useEffect, useState } from "react";
import { Slide } from "@mui/material";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Dashboard() {
  const { size } = typography;
  // const { chart, items } = reportsBarChartData;
  const [allJobs, setAllJob] = useState([]);
  const [availableJobs, setAvailableJob] = useState([]);
  const [applications, setApplications] = useState([]);
  const [acceptedApplications, setAcceptedApplications] = useState([]);
  const [professionals, setProfessionals] = useState([]);
  const [recruiters, setRecruiters] = useState([]);

  const { jobs, jobApplications } = useSelector((state) => state.job);
  const { users } = useSelector((state) => state.user);
  // const [title, setTitle] = useState("");
  // const [lData, setLData] = useState([]);

  useEffect(() => {
    if (jobs) {
      let arr = jobs?.docs;
      let arr2 = jobs?.docs?.filter((item) => item?.jobStatus === "accepting");
      setAllJob(arr);
      setAvailableJob(arr2);
    }

    if (jobApplications) {
      let arr = jobApplications?.docs;
      let arr2 = jobApplications?.docs?.filter((item) => item?.status === "accepted");
      setApplications(arr);
      setAcceptedApplications(arr2);
    }

    if (users) {
      let arr = users?.docs?.filter((item) => item?.accountType.toLowerCase() === "freelancer");
      let arr2 = users?.docs?.filter((item) => item?.accountType.toLowerCase() === "recruiter");
      setProfessionals(arr);
      setRecruiters(arr2);
    }

  }, [jobs, jobApplications, users]);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4}>
              <MiniStatisticsCard
                title={{ text: "total jobs" }}
                count={allJobs?.length}
                percentage={{ color: "info", text: "jobs posted" }}
                icon={{ color: "info", component: "paid" }}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              // onClick={() => {
              //   setLData(disbursed);
              //   setOpen(true);
              //   setTitle("All Disbursed Loans");
              // }}
            >
              <MiniStatisticsCard
                title={{ text: "Available Jobs" }}
                count={availableJobs?.length}
                percentage={{ color: "info", text: "available for application" }}
                icon={{ color: "info", component: "price_check" }}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              // onClick={() => {
              //   setLData(approved);
              //   setOpen(true);
              //   setTitle("All Approved Loans");
              // }}
            >
              <MiniStatisticsCard
                title={{ text: "Job Applications" }}
                count={applications?.length}
                percentage={{ color: "info", text: "submitted applications" }}
                icon={{ color: "info", component: "credit_score" }}
              />
            </Grid>
          </Grid>
        </SoftBox>

        <SoftBox mb={3}>
          <Grid container spacing={2}>
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              // onClick={() => {
              //   setLData(pending);
              //   setOpen(true);
              //   setTitle("All Pending Loans");
              // }}
            >
              <MiniStatisticsCard
                title={{ text: "Accepted applications" }}
                count={acceptedApplications?.length}
                percentage={{ color: "info", text: "accepted applications" }}
                icon={{
                  color: "info",
                  component: "hourglass_bottom",
                }}
              />
            </Grid>

            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              // onClick={() => {
              //   setLData(due);
              //   setOpen(true);
              //   setTitle("All Due Loans");
              // }}
            >
              <MiniStatisticsCard
                title={{ text: "Professionals" }}
                count={professionals?.length}
                percentage={{ color: "info", text: "professionals " }}
                icon={{
                  color: "info",
                  component: "access_alarm",
                }}
              />
            </Grid>

            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              // onClick={() => {
              //   setLData(overdue);
              //   setOpen(true);
              //   setTitle("All Overdue Loans");
              // }}
            >
              <MiniStatisticsCard
                title={{ text: "Recruiters" }}
                count={recruiters?.length}
                percentage={{ color: "info", text: "recruiters/employers" }}
                icon={{ color: "info", component: "fmd_bad" }}
              />
            </Grid>
            {/* <Grid
              item
              xs={12}
              sm={6}
              md={4}
              onClick={() => {
                setLData(denied);
                setOpen(true);
                setTitle("All Declined Loans");
              }}
            >
              <MiniStatisticsCard
                title={{ text: "declined loans" }}
                count={denied?.length}
                percentage={{ color: "error", text: "declined" }}
                icon={{
                  color: "error",
                  component: "error",
                }}
              />
            </Grid> */}
          </Grid>
        </SoftBox>

        <SoftBox mb={3}>
          <Grid container spacing={3}>
            {/* <Grid item xs={12} lg={5}>
              <ReportsBarChart
                title="active users"
                description={
                  <>
                    (<strong>+23%</strong>) than last week
                  </>
                }
                chart={chart}
                items={items}
              />
            </Grid> */}
            <Grid item xs={12} lg={12}>
              <GradientLineChart
                title="Revenue Overview"
                description={
                  <SoftBox display="flex" alignItems="center">
                    <SoftBox
                      fontSize={size.lg}
                      color="success"
                      mb={0.3}
                      mr={0.5}
                      lineHeight={0}
                    >
                      <Icon className="font-bold">arrow_upward</Icon>
                    </SoftBox>
                    <SoftTypography
                      variant="button"
                      color="text"
                      fontWeight="medium"
                    >
                      4% more{" "}
                      <SoftTypography
                        variant="button"
                        color="text"
                        fontWeight="regular"
                      >
                        in May
                      </SoftTypography>
                    </SoftTypography>
                  </SoftBox>
                } 
                height="20.25rem"
                chart={gradientLineChartData}
              />
            </Grid>
          </Grid>
        </SoftBox>
        <Grid container spacing={3}> 
          <Grid item xs={12} md={12} lg={12}>
            {/* <Loans recentLoans={recentLoans} /> */}
          </Grid>
          {/* <Grid item xs={12} md={6} lg={4}>
            <OrderOverview />
          </Grid> */}
        </Grid>
      </SoftBox>

      {/* <Dialog
        fullScreen
        open={open}
        onClose={() => setOpen(false)}
        TransitionComponent={Transition}
      >
        <InfoDialog title={title} setOpen={setOpen} data={lData} />
      </Dialog> */}
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
