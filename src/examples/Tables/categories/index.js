import * as React from 'react'
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector
} from '@mui/x-data-grid'

import CustomNoRowsOverlay from '../../../components/no_data/custom_no_row'
import ActionButton from './action'
import { useSelector } from 'react-redux'
import { Avatar, Chip } from '@mui/material'

function CustomToolbar () {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
      <GridToolbarExport />
    </GridToolbarContainer>
  )
}

export default function CategoriesTable () {
  const columns = [
    {
      field: 'user',
      headerName: 'Featured Image',
      width: 256,
      renderCell: params => (
        <Avatar sx={{width: 200, height: 200}} src={params?.row?.image} variant='rounded'>
          {params?.row?.bio?.firstname}
        </Avatar>
      )
    },
    {
      field: 'name',
      headerName: 'Name',
      width: 185,
      renderCell: params => (
        <p
          style={{ textTransform: 'capitalize', fontSize: 14 }}
        >{`${params?.row?.name}`}</p>
      )
    },
    {
      field: 'description',
      headerName: 'Description',
      width: 420,
      renderCell: params => (
        <p style={{ textTransform: 'capitalize', fontSize: 14 }}>
          {params?.row?.description}
        </p>
      )
    },
    {
      field: 'skills',
      headerName: 'Skills',
      width: 150,
      renderCell: params => (
        <p style={{ textTransform: 'capitalize', fontSize: 14 }}>
          {` ${params?.row?.skills?.length > 1 ? params?.row?.skills?.length + " skills " : params?.row?.skills?.length +" skill"}`}
        </p>
      )
    },
    {
      field: 'createdAt',
      headerName: 'Created On',
      width: 160,
      renderCell: params => (
        <p style={{ textTransform: 'capitalize', fontSize: 14 }}>{`${new Date(
          params?.row?.createdAt
        ).toLocaleString('en-US', {
          weekday: 'short',
          day: 'numeric',
          month: 'short',
          year: 'numeric'
        })}`}</p>
      )
    },
    {
      field: 'id',
      headerName: 'Action',
      width: 90,
      renderCell: params => {
        return <ActionButton selected={params} />
      }
    }
  ]

  const { categories } = useSelector(state => state.category)

  console.log('ADMIN DATA HERE :::: ', categories)

  return (
    <div style={{ height: '70vh', width: '100%' }}>
      {categories && (
        <DataGrid
          rows={categories}
          columns={columns}
          //   autoHeight
          components={{
            Toolbar: CustomToolbar,
            NoRowsOverlay: CustomNoRowsOverlay
          }}
        />
      )}
    </div>
  )
}
