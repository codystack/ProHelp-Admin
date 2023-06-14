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
import { Avatar } from "@mui/material";

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

export default function SupportTable() {
  const columns = [
    {
      field: "image",
      headerName: "Photo",
      width: 80,
      renderCell: (params) => (
        <Avatar src={params?.row?.user?.image} variant="circular" />
      ),
    },
    {
      field: "fullname",
      headerName: "Fullname",
      width: 135,
      renderCell: (params) => {
        return <p>{params.row?.user?.fullname}</p>;
      },
    },
    {
      field: "email",
      headerName: "Email address",
      width: 140,
      renderCell: (params) => {
        return <p>{params.row?.user?.email}</p>;
      },
    },
    {
      field: "ticketId",
      headerName: "Ticket ID",
      width: 110,
    },
    {
      field: "purpose",
      headerName: "Purpose",
      width: 320,
    },
    {
      field: "message",
      headerName: "Message",
      width: 500,
    },
    {
      field: "id",
      headerName: "ACTIONS",
      width: 90,
      renderCell: (params) => {
        return <ActionButton selected={params} />;
      },
    },
  ];

  const { supports } = useSelector((state) => state.support);

  return (
    <div style={{ height: 512, width: "100%" }}>
      {supports && (
        <DataGrid
          sx={{ padding: 1 }}
          rows={supports?.docs}
          columns={columns}
          //   autoHeight
          components={{
            Toolbar: CustomToolbar,
            NoRowsOverlay: CustomNoRowsOverlay,
          }}
        />
      )}
    </div>
  );
}
