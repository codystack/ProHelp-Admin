import * as React from "react";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid";

import CustomNoRowsOverlay from "../../../components/no_data/custom_no_row";
import ActionButton from "./action";
import { useSelector } from "react-redux";
import useJobs from "hooks/useJob";
import { toast } from "react-hot-toast";
import { Avatar, Button } from "@mui/material";
import { FileDownload } from "@mui/icons-material";
import xlsx from "json-as-xlsx";

export default function JobApplicationsTable() {
  const { jobApplications } = useSelector((state) => state.job);

  const [loading, setLoading] = React.useState(false);
  const [count, setCount] = React.useState(jobApplications?.totalDocs ?? 0);
  const [filteredJobs, setFilteredJobs] = React.useState(
    jobApplications?.docs ?? []
  );

  const [paginationModel, setPaginationModel] = React.useState({
    page: 0,
    pageSize: 25,
  });

  const { data: jobData } = useJobs(paginationModel.page + 1);

  React.useEffect(() => {
    if (jobApplications) {
      setFilteredJobs(jobApplications?.docs);
    }
  }, [jobApplications]);

  const columns = [
    {
      field: "photo",
      headerName: "Image",
      width: 125,
      renderCell: (params) => (
        <Avatar src={params?.row?.applicant?.photo} variant="rounded" />
      ),
    },
    {
      field: "name",
      headerName: "Applicant",
      width: 125,
      renderCell: (params) => (
        <p style={{ textTransform: "capitalize", fontSize: 14 }}>
          {params?.row?.applicant?.name}
        </p>
      ),
    }, 
    {
      field: "email",
      headerName: "Applicant's Email",
      width: 135,
      renderCell: (params) => (
        <p style={{ fontSize: 14 }}>{params?.row?.applicant?.email}</p>
      ),
    },
    {
      field: "phone",
      headerName: "Applicant's Phone",
      width: 125,
      renderCell: (params) => (
        <p style={{ textTransform: "capitalize", fontSize: 14 }}>
          {params?.row?.applicant?.phone}
        </p>
      ),
    },
    {
      field: "recruiter",
      headerName: "Recruiter",
      width: 120,
      renderCell: (params) => (
        <p style={{ textTransform: "capitalize", fontSize: 14 }}>
          {params?.row?.jobData?.recruiter?.name}
        </p>
      ),
    },
    {
      field: "jobId",
      headerName: "Job ID",
      width: 140,
      renderCell: (params) => (
        <p style={{ textTransform: "capitalize", fontSize: 14 }}>
          {params?.row?.jobId}
        </p>
      ),
    },
    {
      field: "jobTitle",
      headerName: "Job Title",
      width: 120,
      renderCell: (params) => (
        <p style={{ textTransform: "capitalize", fontSize: 14 }}>
          {params?.row?.jobData?.jobTitle}
        </p>
      ),
    },
    {
      field: "profession",
      headerName: "Profession",
      width: 140,
      renderCell: (params) => (
        <p style={{ fontSize: 14, textTransform: 'capitalize' }}>{params?.row?.jobData?.profession}</p>
      ),
    },
    {
      field: "company",
      headerName: "Company",
      width: 145,
      renderCell: (params) => (
        <p style={{ textTransform: "capitalize", fontSize: 14 }}>
          {params?.row?.jobData?.company}
        </p>
      ),
    },
    {
      field: "workplaceType",
      headerName: "Work place",
      width: 110,
      renderCell: (params) => (
        <p style={{ textTransform: "capitalize", fontSize: 14 }}>
          {params?.row?.jobData?.workplaceType}
        </p>
      ),
    },
    {
      field: "jobType",
      headerName: "Job Type",
      width: 90,
      renderCell: (params) => (
        <p style={{ textTransform: "capitalize", fontSize: 14 }}>
          {params?.row?.jobData?.jobType}
        </p>
      ),
    },
    {
      field: "status",
      headerName: "Job Status",
      width: 100,
      renderCell: (params) => (
        <p
          style={{ textTransform: "capitalize", fontSize: 14 }}
        >{`${params?.row?.status}`}</p>
      ),
    },
    {
      field: "id",
      headerName: "Actions",
      width: 80,
      renderCell: (params) => {
        return <ActionButton selected={params} />;
      },
    },
  ];

  let data = [
    {
      sheet: "JobApplications",
      columns: [
        { label: "Applicant", value: (row) => row.applicant?.name },
        { label: "Applicant's Email", value: (row) => row.applicant?.email },
        { label: "Applicant's Phone", value: (row) => row.applicant?.phone },
        { label: "Recruiter Name", value: (row) => row.job?.recruiter?.name },
        { label: "Recruiter Email", value: (row) => row.job?.recruiter?.email },
        { label: "Recruiter Phone", value: (row) => row.job?.recruiter?.phone },
        { label: "Job Title", value: (row) => row.job?.jobTitle },
        { label: "Job Type", value: (row) => row.job?.jobType },
        { label: "Workplace Type", value: (row) => row.job?.workplaceType },
        { label: "Job ID", value: "jobId" },
        { label: "Job Description", value: (row) => row.job?.description },
        {
          label: "Posted On",
          value: (row) =>
            new Date(row?.job?.createdAt).toLocaleString("en-US", {
              weekday: "short",
              day: "numeric",
              month: "short",
              year: "numeric",
            }),
        },
        { label: "Job Status", value: (row) => row.job?.jobStatus },
      ],
      content: jobApplications?.docs ?? [],
    },
  ];

  let settings = {
    fileName: "job_applications", // Name of the resulting spreadsheet
    extraLength: 3, // A bigger number means that columns will be wider
    writeMode: "writeFile", // The available parameters are 'WriteFile' and 'write'. This setting is optional. Useful in such cases https://docs.sheetjs.com/docs/solutions/output#example-remote-file
    writeOptions: {}, // Style options from https://docs.sheetjs.com/docs/api/write-options
    RTL: false, // Display the columns from right-to-left (the default value is false)
  };

  let callback = function (sheet) {
    toast.success("Excel file downloaded successfully");
  };

  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector />
        <GridToolbarExport />
        <Button
          startIcon={<FileDownload />}
          onClick={() => {
            xlsx(data, settings, callback); // Will download the excel file
          }}
        >
          Excel
        </Button>
      </GridToolbarContainer>
    );
  }

  React.useEffect(() => {
    let active = true;

    (async () => {
      setLoading(true);
      // const newData = await loadServerRows(paginationModel.page, data);
      if (jobData) {
        // console.log("SECOND PAGE DATA", requestData);
        setFilteredJobs(jobData?.docs);
      }

      if (!active) {
        return;
      }

      // setFilteredRequests(data)
      setLoading(false);
    })();

    return () => {
      active = false;
    };
  }, [paginationModel.page, jobData]);

  return (
    <div style={{ height: "75vh", width: "100%" }}>
      {jobApplications && jobApplications?.docs && (
        <DataGrid
          sx={{ padding: 1 }}
          rows={jobApplications?.docs}
          columns={columns}
          paginationMode="server"
          pageSizeOptions={[25]}
          rowCount={count}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          loading={loading}
          components={{
            Toolbar: CustomToolbar,
            NoRowsOverlay: CustomNoRowsOverlay,
          }}
        />
      )}
    </div>
  );
}
