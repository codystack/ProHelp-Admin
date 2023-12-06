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

export default function FAQsTable() {
  const columns = [
    
    {
      field: "question",
      headerName: "Question",
      width: 400,
    },
    {
      field: "answer",
      headerName: "Answer",
      width: 750,
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

  const { faqs } = useSelector((state) => state.cms);

  return (
    <div style={{ height: "70vh", width: "100%" }}>
      {faqs && (
        <DataGrid
          sx={{ padding: 1 }}
          rows={faqs}
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
