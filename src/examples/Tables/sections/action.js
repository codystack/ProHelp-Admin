import React from 'react'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '../../../redux/slices/backdrop'
import { PropTypes } from 'prop-types'
import SoftBox from 'components/SoftBox'
import {
  AppBar,
  Box,
  Dialog,
  Icon,
  List,
  Toolbar
} from '@mui/material'

import Slide from '@mui/material/Slide'
import { Close } from '@mui/icons-material'
import APIService from 'service'
import { mutate } from 'swr'
import UpdateSectionForm from 'forms/cms/update_section'



const Transition = React.forwardRef(function Transition (props, ref) {
  return <Slide direction='up' ref={ref} {...props} />
})

const ActionButton = ({ selected }) => {
  const dispatch = useDispatch()

  // const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [openEdit, setOpenEdit] = React.useState(false)
  const [openDelete, setOpenDelete] = React.useState(false)

  // const [openConfirm, setOpenConfirm] = React.useState(false)
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
        '/cms/sections/delete',
        selected?.row?.id
      )
      console.log('RESP HERE >>> ', `${res}`)
      setOpenDelete(false)
      
      const resp = await APIService.fetcher("/sections/all/");
      dispatch(setLoading(false))
      dispatch(setSections(resp?.docs));
      mutate('/sections/all')

     
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
        fullScreen={true}
        onClose={() => setOpenEdit(false)}
        TransitionComponent={Transition}
      >
         <AppBar
          sx={{ position: "relative", backgroundColor: "#18113c", color: "white" }}
          color="secondary"
        >
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => setOpenEdit(false)}
              aria-label="close"
            >
              <Close />
            </IconButton>
            <Typography
              sx={{ ml: 2, flex: 1, textTransform: "capitalize",}}
              variant="h6"
              component="div"
              color={"#fff"}
            >
              {'Update Section On Website'}
            </Typography>
            <Button autoFocus color="inherit" onClick={() => setOpenEdit(false)}>
              Close
            </Button>
          </Toolbar>
        </AppBar>
        <List>
        <Box p={1} >
          <UpdateSectionForm data={selected?.row} setOpen={setOpenEdit} />
        </Box>
        </List>
       
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
            <Typography>Delete Section</Typography>
            <IconButton onClick={() => setOpenDelete(false)}>
              <Close />
            </IconButton>
          </Box>
          <Typography gutterBottom py={2} variant='body2'>
            Are you sure you want to delete this section?
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
