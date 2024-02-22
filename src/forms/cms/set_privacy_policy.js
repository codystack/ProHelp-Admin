import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Box, Button, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from 'redux/slices/backdrop'
import APIService from 'service'
import toast from 'react-hot-toast'
import QuillEditable from 'components/richtext/edit_quill'
import { mutate } from 'swr'

export default function UpdatePrivacyPolicyForm ({ setOpen, data }) {
  const dispatch = useDispatch()
  const [mcontent, setContent] = React.useState(data?.privacy);
  const profile = useSelector(state => state.profile.profileData)
  const { id, privacy: policy } = data

  const validationSchema = Yup.object().shape({
    policy: Yup.string().required('Privacy policy is required')
  })

  const formik = useFormik({
    initialValues: {
      policy: policy ?? ''
    },
    validationSchema,
    onSubmit: async values => {
      dispatch(setLoading(true))
      try {
        const payload = {
          privacy: mcontent,
          id: id
        }

        console.log('PAYLOAD HERE:: ', payload)

        const res = await APIService.update(
          '/legal/privacy/update',
          '',
          payload
        )

        console.log('RESP HERE >>> ', `${res?.data}`)
        mutate("/legal/all");
        setOpen(false)

        dispatch(setLoading(false))

        toast.success(`${res.data?.message}`)
      } catch (error) {
        toast.error(error?.message)
        dispatch(setLoading(false))
      }
    }
  })

  const { errors, getFieldProps, handleSubmit, touched } = formik

  return (
    <Box
      p={2}
      display={'flex'}
      flexDirection={'column'}
      justifyContent={'start'}
      alignItems={'center'}
    >
      <Typography>Privacy Policy</Typography>
      <QuillEditable
        value={mcontent}
        setValue={setContent}
        placeholder={'Enter the content here'}
      />

      <br />
      <Button
        variant='contained'
        fullWidth
        sx={{ textTransform: 'capitalize' }}
        onClick={() => handleSubmit()}
      >
        Submit
      </Button>
    </Box>
  )
}
