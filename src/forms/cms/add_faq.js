import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Box,
  Button,
  TextField,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "redux/slices/backdrop";
import APIService from "service";
import { mutate } from "swr";
import toast from "react-hot-toast";
import { setFAQs } from "redux/slices/cms";

export default function AddFAQForm({ setOpen }) {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile.profileData);

  const validationSchema = Yup.object().shape({
    question: Yup.string().required("Question is required"),
    answer: Yup.string().required("Answer is required"),
  });

  const formik = useFormik({
    initialValues: {
      question: "",
      answer: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      dispatch(setLoading(true));
      try {

        const res = await APIService.post("/cms/faqs/add", values);

        console.log("RESP HERE >>> ", `${res}`);
        mutate("/faqs/all/");
        setOpen(false);

        const resp = await APIService.fetcher("/faqs/all/");
        dispatch(setLoading(false))
        dispatch(setFAQs(resp?.docs));

        toast.success(`${res.data?.message}`);
      } catch (error) {
        toast.error("Page already");
        dispatch(setLoading(false));
      }
    },
  });

  const { errors, getFieldProps, handleSubmit, touched } = formik;

  return (
    <Box
      p={2}
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"start"}
      alignItems={"center"}
    >
      <TextField
        variant="outlined"
        fullWidth
        {...getFieldProps("question")}
        label="Question"
        placeholder="Enter faq question"
        required
        size="large"
        error={Boolean(touched.question && errors.question)}
        helperText={errors.question}
      />
      <br />
      <TextField
        variant="outlined"
        fullWidth
        multiline
        minRows={5}
        {...getFieldProps("answer")}
        label="Answer"
        placeholder="Enter the faq answer"
        required
        error={Boolean(touched.answer && errors.answer)}
        helperText={errors.answer}
      />

      <br />
      <br />
      <Button
        variant="contained"
        fullWidth
        sx={{ textTransform: "capitalize" }}
        onClick={() => handleSubmit()}
      >
        Submit
      </Button>
    </Box>
  );
}
