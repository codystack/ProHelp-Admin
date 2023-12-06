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

export default function BannersTable() {
  const columns = [
    {
      field: "featuredImage",
      headerName: "Image",
      width: 125,
      renderCell: (params) => (
        <Avatar src={params?.row?.featuredImage} variant="rounded" />
      ),
    },
    {
      field: "page",
      headerName: "Page",
      width: 120,
      renderCell: (params) => {
        return <p>{params.row?.page}</p>;
      },
    },
    {
      field: "title",
      headerName: "Title",
      width: 256,
      renderCell: (params) => {
        return <p>{params.row?.title}</p>;
      },
    },
    {
      field: "description",
      headerName: "Description",
      width: 500,
      renderCell: (params) => {
        return <p>{params.row?.description}</p>;
      },
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

  const { banners } = useSelector((state) => state.cms);

  return (
    <div style={{ height: "77vh", width: "100%" }}>
      {banners && (
        <DataGrid
          sx={{ padding: 1 }}
          rows={banners}
          columns={columns}
          pagination={false}
          paginationMode="client"
          components={{
            Toolbar: CustomToolbar,
            NoRowsOverlay: CustomNoRowsOverlay,
          }}
        />
      )}
    </div>
  );
}
