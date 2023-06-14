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
import { Button } from "@mui/material";
import { FileDownload } from "@mui/icons-material";
import xlsx from "json-as-xlsx";

export default function JobsTable() {
  const { jobs } = useSelector((state) => state.job);

  const [loading, setLoading] = React.useState(false);
  const [count, setCount] = React.useState(jobs?.totalDocs ?? 0);
  const [filteredJobs, setFilteredJobs] = React.useState(jobs?.docs ?? []);

  const [paginationModel, setPaginationModel] = React.useState({
    page: 0,
    pageSize: 25,
  });

  const { data: jobData } = useJobs(paginationModel.page + 1);

  React.useEffect(() => {
    if (jobs) {
      setFilteredJobs(jobs?.docs);
    }
  }, [jobs]);

  const columns = [
    {
      field: "name",
      headerName: "Recruiter",
      width: 125,
      renderCell: (params) => (
        <p style={{ textTransform: "capitalize", fontSize: 14 }}>
          {params?.row?.recruiter?.name}
        </p>
      ),
    },
    {
      field: "jobTitle",
      headerName: "Job Title",
      width: 120,
      renderCell: (params) => (
        <p style={{ textTransform: "capitalize", fontSize: 14 }}>
          {params?.row?.jobTitle}
        </p>
      ),
    },
    {
      field: "profession",
      headerName: "Profession",
      width: 140,
      renderCell: (params) => (
        <p style={{ fontSize: 14 }}>{params?.row?.professoin}</p>
      ),
    },
    {
      field: "company",
      headerName: "Company",
      width: 145,
      renderCell: (params) => (
        <p style={{ textTransform: "capitalize", fontSize: 14 }}>
          {params?.row?.company}
        </p>
      ),
    },
    {
      field: "workplaceType",
      headerName: "Work place",
      width: 110,
      renderCell: (params) => (
        <p style={{ textTransform: "capitalize", fontSize: 14 }}>
          {params?.row?.workplaceType}
        </p>
      ),
    },
    {
      field: "jobType",
      headerName: "Job Type",
      width: 90,
      renderCell: (params) => (
        <p style={{ textTransform: "capitalize", fontSize: 14 }}>
          {params?.row?.jobType}
        </p>
      ),
    },
    {
      field: "city",
      headerName: "City",
      width: 115,
      renderCell: (params) => (
        <p style={{ textTransform: "capitalize", fontSize: 14 }}>
          {params?.row?.jobLocation?.city ?? ""}
        </p>
      ),
    },
    {
      field: "state",
      headerName: "State",
      width: 115,
      renderCell: (params) => (
        <p style={{ textTransform: "capitalize", fontSize: 14 }}>
          {params?.row?.jobLocation?.state}
        </p>
      ),
    },
    {
      field: "country",
      headerName: "Country",
      width: 100,
      renderCell: (params) => (
        <p style={{ textTransform: "capitalize", fontSize: 14 }}>
          {params?.row?.jobLocation?.country}
        </p>
      ),
    },
    {
      field: "jobStatus",
      headerName: "Job Status",
      width: 100,
      renderCell: (params) => (
        <p
          style={{ textTransform: "capitalize", fontSize: 14 }}
        >{`${params?.row?.jobStatus}`}</p>
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
      sheet: "Jobs",
      columns: [
        { label: "Recruiter Name", value: (row) => row.recruiter?.name },
        { label: "Recruiter Email", value: (row) => row.recruiter?.email },
        { label: "Recruiter Phone", value: (row) => row.recruiter?.phone },
        { label: "Job Title", value: "jobTitle" },
        { label: "Company", value: "company" },
        { label: "Job Type", value: "jobType" },
        { label: "Workplace Type", value: "workplaceType" },
        { label: "Job Location", value: (row) => row.jobLocation?.state },
        { label: "Job City", value: (row) => row.jobLocation?.city },
        { label: "Country", value: (row) => row.jobLocation?.country },
        { label: "Minimum Qualification", value: "minimumQualification" },
        { label: "Job Description", value: "description" },
        {
          label: "Posted On",
          value: (row) =>
            new Date(row?.createdAt).toLocaleString("en-US", {
              weekday: "short",
              day: "numeric",
              month: "short",
              year: "numeric",
            }),
        },
        { label: "Job Status", value: "jobStatus" },
      ],
      content: jobs?.docs ?? [],
    },
  ];

  let settings = {
    fileName: "jobs", // Name of the resulting spreadsheet
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
    <div style={{ height: 600, width: "100%" }}>
      {jobs && jobs?.docs && (
        <DataGrid
          sx={{ padding: 1 }}
          rows={jobs?.docs}
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
