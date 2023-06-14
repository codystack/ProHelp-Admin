import Card from "@mui/material/Card";

import { Box } from "@mui/system";
import Footer from "examples/Footer";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import JobApplicationsTable from "examples/Tables/jobApplications";

function Applications() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Box py={3}>
        <Card>
          <JobApplicationsTable />
        </Card>
      </Box>
      <Footer />
    </DashboardLayout>
  );
}

export default Applications;
