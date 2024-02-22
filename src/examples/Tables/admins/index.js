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
import { Avatar, Chip } from "@mui/material";

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

export default function AdminsTable() {
  const columns = [
    {
      field: "user",
      headerName: "Photo",
      width: 70,
      renderCell: (params) => (
        <Avatar src={params?.row?.bio?.image} variant="circular">
          {params?.row?.bio?.firstname}
        </Avatar>
      ),
    },
    {
      field: "fullName",
      headerName: "FullName",
      width: 185,
      renderCell: (params) => (
        <p style={{ textTransform: "capitalize", fontSize: 14 }}>{`${params?.row?.bio?.firstname} ${params?.row?.bio?.middlename} ${params?.row?.bio?.lastname}`}</p>
      ),
    },
    {
      field: "gender",
      headerName: "Gender",
      width: 80,
      renderCell: (params) => (
        <p style={{ textTransform: "capitalize", fontSize: 14 }}>{params?.row?.bio?.gender}</p>
      ),
    },
    {
      field: "emailAddress",
      headerName: "Email",
      renderCell: (params) => <p style={{ fontSize: 14 }}>{params?.row?.email}</p>,
      width: 200,
    },
    {
      field: "phoneNumber",
      headerName: "Phone",
      renderCell: (params) => (
        <p style={{ textTransform: "capitalize", fontSize: 14 }}>{`${params?.row?.bio?.phone}`}</p>
      ),
      width: 135,
    },
    {
      field: "type",
      headerName: "Admin Type",
      renderCell: (params) => (
        <p
          style={{ textTransform: "capitalize", fontSize: 14 }}
        >{`${params?.row?.privilege?.type}`}</p>
      ),
      width: 110,
    },
    {
      field: "role",
      headerName: "Role",
      width: 108,
      renderCell: (params) => (
        <p
          style={{ textTransform: "capitalize", fontSize: 14 }}
        >{`${params?.row?.privilege?.role}`}</p>
      ),
    },
    {
      field: "claim",
      headerName: "Access",
      width: 100,
      renderCell: (params) => (
        <p
          style={{ textTransform: "capitalize", fontSize: 14 }}
        >{`${params?.row?.privilege?.access}`}</p>
      ),
    },
    {
      field: "createdAt",
      headerName: "Created On",
      width: 160,
      renderCell: (params) => (
        <p style={{ textTransform: "capitalize", fontSize: 14 }}>{`${new Date(
          params?.row?.createdAt
        ).toLocaleString("en-US", {
          weekday: "short",
          day: "numeric",
          month: "short",
          year: "numeric",
        })}`}</p>
      ),
    },
    {
      field: "status",
      headerName: "Status",
      width: 90,
      renderCell: (params) => (
        <Chip
          size="small"
          sx={{ textTransform: "capitalize" }}
          label={params?.row?.accountStatus}
          color={params?.row?.accountStatus !== "active" ? "warning" : "success"}
        />
      ),
    },
    {
      field: "id",
      headerName: "Action",
      width: 90,
      renderCell: (params) => {
        return <ActionButton selected={params} />;
      },
    },
  ];

  const { admins } = useSelector((state) => state.admin);

  console.log("ADMIN DATA HERE :::: ", admins);

  return (
    <div style={{ height: "70vh", width: "100%" }}>
      {admins && (
        <DataGrid
          rows={admins}
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
