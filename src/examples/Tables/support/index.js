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
import { Avatar, Button, Chip } from "@mui/material";
import useSupport from "hooks/support";
import { Download } from "@mui/icons-material";
import xlsx from "json-as-xlsx";
import toast from "react-hot-toast";

// function CustomToolbar() {
//   return (
//     <GridToolbarContainer>
//       <GridToolbarColumnsButton />
//       <GridToolbarFilterButton />
//       <GridToolbarDensitySelector />
//       <GridToolbarExport />
//     </GridToolbarContainer>
//   );
// }

export default function SupportTable() {
  const { supports } = useSelector((state) => state.support);
  const [loading, setLoading] = React.useState(false);
  const [filteredSupports, setFilteredSupports] = React.useState(supports?.docs ?? []);

  const [paginationModel, setPaginationModel] = React.useState({
    page: 0,
    pageSize: 25,
  });

  const { data: supportData, mutate } = useSupport(paginationModel.page + 1);

  let data = [
    {
      sheet: "Supports",
      columns: [
        { label: "Ticket ID", value: (row) => row?.ticketId }, // Top level data
        { label: "Subject", value: (row) => row?.subject }, // Top level data
        { label: "Message", value: (row) => row?.message }, // Top level data
        { label: "Sender's Email", value: (row) => row?.user?.emailAddress }, // Top level data
        {
          label: "Initiated On",
          value: (row) =>
            new Date(row?.createdAt).toLocaleString("en-US", {
              weekday: "short",
              day: "numeric",
              month: "short",
              year: "numeric",
            }),
        },
       { label: "Status", value: "status" }, // Top level data
        {
          label: "Updated On",
          value: (row) =>
            new Date(row?.updatedAt).toLocaleString("en-US", {
              weekday: "short",
              day: "numeric",
              month: "short",
              year: "numeric",
            }),
        }, // Top level data
      ],
      content: supports?.docs ?? [],
    },
  ];

  let settings = {
    fileName: "support_records", // Name of the resulting spreadsheet
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
          startIcon={<Download />}
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
    if (supports) {
      setFilteredSupports(supports?.docs);
    }
  }, [supports]);

  const columns = [
    {
      field: "image",
      headerName: "Photo",
      width: 75,
      renderCell: (params) => (
        <Avatar src={params?.row?.user?.image} variant="circular" />
      ),
    },
    {
      field: "fullname",
      headerName: "Fullname",
      width: 130,
      renderCell: (params) => {
        return <p>{params.row?.user?.fullname}</p>;
      },
    },
    {
      field: "email",
      headerName: "Email address",
      width: 200,
      renderCell: (params) => {
        return <p>{params.row?.user?.email}</p>;
      },
    },
    {
      field: "ticket",
      headerName: "Ticket ID",
      width: 256,
    },
    {
      field: "purpose",
      headerName: "Purpose",
      width: 140
    },
    {
      field: "message",
      headerName: "Message",
      width: 310,
    },
    {
      field: "status",
      headerName: "Status",
      width: 108,
      renderCell: (params) => (
        <Chip
          size="small"
          sx={{ textTransform: "capitalize" }}
          label={params?.row?.status ?? "Closed"}
          color={params?.row?.status === "open" ? "success" : "info"}
        />
      ),
    },
    {
      field: "id",
      headerName: "ACTIONS",
      width: 85,
      renderCell: (params) => {
        return <ActionButton selected={params} />;
      },
    },
  ];

  React.useEffect(() => {
    let active = true;

    (async () => {
      setLoading(true);
      if (supportData) {
        setFilteredSupports(supportData?.docs);
      }

      if (!active) {
        return;
      }

      setLoading(false);
    })();

    return () => {
      active = false;
    };
  }, [paginationModel.page, supportData]);

  return (
    <div style={{ height: "77vh", width: "100%" }}>
    {supports && supports?.docs && filteredSupports && (
      <DataGrid
        sx={{ padding: 1 }}
        rows={filteredSupports}
        columns={columns}
        paginationMode="server"
        pageSizeOptions={[25]}
        rowCount={supports?.totalDocs}
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
