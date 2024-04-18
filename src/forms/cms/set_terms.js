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

export default function SetTermsOfServiceForm ({ setOpen, data }) {
  const dispatch = useDispatch()
  const [mcontent, setContent] = React.useState(data?.terms);
  const { id, terms } = data
  const { isLoading } = useSelector((state) => state.loading);

  const validationSchema = Yup.object().shape({
    terms: Yup.string().required('Terms of use is required')
  })

  const formik = useFormik({
    initialValues: {
      terms: terms ?? ''
    },
    validationSchema,
    onSubmit: async values => {
      dispatch(setLoading(true))
      try {
        const payload = {
          terms: mcontent,
          id: id
        }

        console.log('PAYLOAD HERE:: ', payload)

        const res = await APIService.update(
          '/legal/terms/update',
          '',
          payload
        )

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

  const { handleSubmit } = formik

  return (
    <Box
      p={2}
      display={'flex'}
      flexDirection={'column'}
      justifyContent={'start'}
      alignItems={'center'}
    >
      <Typography>Terms Of Service (ToS)</Typography>
      <Box
        width={"86%"}
        sx={{
          borderLeft: `1px solid #ccc`,
          borderRight: "1px solid #ccc",
          borderBottom: `1px solid #ccc`,
        }}
      >
        <QuillEditable
          value={mcontent}
          setValue={setContent}
          placeholder={"Enter the content here"}
        />
      </Box>

      <br />
      <Button
        variant='contained'
        fullWidth
        disabled={isLoading}
        sx={{ textTransform: 'capitalize', width: "86%" }}
        onClick={() => handleSubmit()}
      >
        Submit
      </Button>
    </Box>
  )
}
