import React, { useState, useEffect } from 'react'

// @mui material components
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'

// Soft UI Dashboard React components
import SoftBox from 'components/SoftBox'
import SoftTypography from 'components/SoftTypography'
import SoftAvatar from 'components/SoftAvatar'

// Soft UI Dashboard React examples
import DashboardNavbar from 'examples/Navbars/DashboardNavbar'

// Soft UI Dashboard React icons
import Cube from 'examples/Icons/Cube'

// Soft UI Dashboard React base styles
import breakpoints from 'assets/theme/base/breakpoints'

// Images
// import burceMars from "assets/images/bruce-mars.jpg";
import { useSelector, useDispatch } from 'react-redux'
import curved0 from 'assets/images/fast-logos/profile_bgImage.jpg'
import { setTab } from 'redux/slices/settings'
import { Box, Dialog, Slide } from '@mui/material'
import UpdateProfileForm from 'forms/profile/update_profile'

const Transition = React.forwardRef(function Transition (props, ref) {
  return <Slide direction='up' ref={ref} {...props} />
})

function Header () {
  const [tabsOrientation, setTabsOrientation] = useState('horizontal')
  const [tabValue, setTabValue] = useState(0)
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch()

  const { profileData } = useSelector(state => state.profile)

  useEffect(() => {
    // A function that sets the orientation state of the tabs.
    function handleTabsOrientation () {
      return window.innerWidth < breakpoints.values.sm
        ? setTabsOrientation('vertical')
        : setTabsOrientation('horizontal')
    }

    /** 
     The event listener that's calling the handleTabsOrientation function when resizing the window.
    */
    window.addEventListener('resize', handleTabsOrientation)

    // Call the handleTabsOrientation function to set the state with the initial value.
    handleTabsOrientation()

    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleTabsOrientation)
  }, [tabsOrientation])

  const handleSetTabValue = (event, newValue) => setTabValue(newValue)

  // main

  return (
    <SoftBox position='relative'>
      <Dialog
        open={open}
        maxWidth='md'
        onClose={() => setOpen(false)}
        TransitionComponent={Transition}
      >
        <Box p={1} width={'40vw'}>
          <UpdateProfileForm setOpen={setOpen} data={profileData} />
        </Box>
      </Dialog>
      <DashboardNavbar absolute light />
      <SoftBox
        display='flex'
        alignItems='center'
        position='relative'
        minHeight='18.75rem'
        borderRadius='xl'
        sx={{
          backgroundImage: ({
            functions: { rgba, linearGradient },
            palette: { gradients }
          }) => `url(${curved0})`,
          backgroundSize: 'cover',
          backgroundPosition: '50%',
          overflow: 'hidden'
        }}
      />
      <Card
        sx={{
          backdropFilter: `saturate(200%) blur(30px)`,
          backgroundColor: ({ functions: { rgba }, palette: { white } }) =>
            rgba(white.main, 0.8),
          boxShadow: ({ boxShadows: { navbarBoxShadow } }) => navbarBoxShadow,
          position: 'relative',
          mt: -8,
          mx: 3,
          py: 2,
          px: 2
        }}
      >
        <Grid container spacing={3} alignItems='center'>
          <Grid item>
            <SoftAvatar
              src={profileData?.bio?.image}
              alt='profile-image'
              variant='rounded'
              size='xl'
              shadow='sm'
            />
          </Grid>
          <Grid item>
            <SoftBox height='100%' mt={0.5} lineHeight={1}>
              <SoftTypography
                variant='h5'
                fontWeight='medium'
                textTransform='capitalize'
              >
                {profileData?.bio?.fullname}
              </SoftTypography>
              <SoftTypography
                variant='button'
                color='text'
                fontWeight='medium'
                textTransform='capitalize'
              >
                {`${profileData?.privilege?.role}, ${profileData?.privilege?.access}`}
              </SoftTypography>
            </SoftBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3} sx={{ ml: 'auto' }}>
            <Tabs
              orientation={tabsOrientation}
              value={tabValue}
              onChange={handleSetTabValue}
              sx={{ background: 'transparent' }}
            >
              <Tab
                label='Update Account'
                icon={<Cube />}
                onClick={() => {
                  dispatch(setTab(0))
                  setOpen(true)
                }}
              />
              {/* {profileData?.privilege?.type === "superadmin" &&
                  (profileData?.privilege?.role === "manager" ||
                    profileData?.privilege?.role === "developer") &&
                  profileData?.privilege?.access === "read/write" && (
                    <Tab
                      label="Platform Settings"
                      icon={<Settings />}
                      onClick={() => {
                        dispatch(setTab(1));
                      }}
                    />
                  )} */}
            </Tabs>
          </Grid>
        </Grid>
      </Card>
    </SoftBox>
  )
}

export default Header
