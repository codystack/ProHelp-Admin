import React from 'react'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

// import { useSnackbar } from "notistack";
import { useDispatch, useSelector } from 'react-redux'
import { makeStyles } from '@mui/styles'
import { setLoading } from '../../../redux/slices/backdrop'
import { PropTypes } from 'prop-types'
import SoftBox from 'components/SoftBox'
import {
  Box,
  Dialog,
  Icon} from '@mui/material'

import Slide from '@mui/material/Slide'
import { Close } from '@mui/icons-material'
import APIService from 'service'
import { mutate } from 'swr'
import UpdateFAQForm from 'forms/cms/update_faq'
import { setFAQs } from 'redux/slices/cms'

const useStyles = makeStyles(theme => ({
  awardRoot: {
    display: 'flex',
    flexDirection: 'column'
  },
  awardRow: {
    display: 'flex',
    flexDirection: 'row',
    marginLeft: 'auto'
  },
  button: {
    margin: theme.spacing(1)
  }
}))

const Transition = React.forwardRef(function Transition (props, ref) {
  return <Slide direction='up' ref={ref} {...props} />
})

const ActionButton = ({ selected }) => {
  const classes = useStyles()
  const dispatch = useDispatch()

  // const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [openEdit, setOpenEdit] = React.useState(false)
  const [openDelete, setOpenDelete] = React.useState(false)

  const [openConfirm, setOpenConfirm] = React.useState(false)
  const [menu, setMenu] = React.useState(null)

  const openMenu = ({ currentTarget }) => setMenu(currentTarget)
  const closeMenu = () => setMenu(null)

  const openAction = Boolean(anchorEl)
  //   const { enqueueSnackbar } = useSnackbar();
  const { profileData } = useSelector(state => state.profile)
  const handleMoreAction = e => setAnchorEl(e.currentTarget)

  const handleDelete = async () => {
    try {
      dispatch(setLoading(true))
      const res = await APIService.delete(
        '/cms/faqs/delete',
        selected?.row?.id
      )
      console.log('RESP HERE >>> ', `${res}`)
      mutate('/faqs/all')
      setOpenDelete(false)

      const resp = await APIService.fetcher("/faqs/all/");
      dispatch(setLoading(false))
      dispatch(setFAQs(resp?.docs));
    } catch (error) {}
  }

  const renderMenu = (
    <Menu
      id='simple-menu'
      anchorEl={menu}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'left'
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right'
      }}
      open={Boolean(menu)}
      onClose={closeMenu}
    >
      <MenuItem
        onClick={() => {
          setOpenEdit(true)
          closeMenu()
        }}
      >
        Update
      </MenuItem>
      <MenuItem
        onClick={() => {
          setOpenDelete(true)
          closeMenu()
        }}
      >
        Delete
      </MenuItem>
    </Menu>
  )

  return (
    <>
      <SoftBox color='text' px={2}>
        <Icon
          sx={{ cursor: 'pointer', fontWeight: 'bold' }}
          fontSize='small'
          onClick={openMenu}
        >
          more_vert
        </Icon>
      </SoftBox>
      {renderMenu}

      <Dialog
        open={openEdit}
        maxWidth='md'
        onClose={() => setOpenEdit(false)}
        TransitionComponent={Transition}
      >
        <Box p={1} width={'40vw'}>
          <UpdateFAQForm data={selected?.row} setOpen={setOpenEdit} />
        </Box>
      </Dialog>

      <Dialog
        open={openDelete}
        maxWidth='md'
        onClose={() => setOpenDelete(false)}
        TransitionComponent={Transition}
      >
        <Box p={2} width={'33vw'}>
          <Box
            pb={1}
            display={'flex'}
            flexDirection={'row'}
            justifyContent={'space-between'}
            alignItems={'center'}
          >
            <Typography>Delete FAQ</Typography>
            <IconButton onClick={() => setOpenDelete(false)}>
              <Close />
            </IconButton>
          </Box>
          <Typography gutterBottom py={2} variant='body2'>
            Are you sure you want to delete this Frequently Asked Question?
          </Typography>
          <Box
            display={'flex'}
            flexDirection={'row'}
            justifyContent={'space-between'}
            alignItems={'center'}
          >
            <Button onClick={() => setOpenDelete(false)}>Cancel</Button>
            <Button onClick={() => handleDelete()} >Delete</Button>
          </Box>
        </Box>
      </Dialog>
    </>
  )
}

// Typechecking props for the ActionButton
ActionButton.propTypes = {
  selected: PropTypes.object
}

export default ActionButton
