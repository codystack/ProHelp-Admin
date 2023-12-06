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

export default function UpdateFAQForm({ setOpen, data }) {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile.profileData);
  const { id, answer, question, } = data;


  const validationSchema = Yup.object().shape({
    answer: Yup.string().required("Answer is required"),
    question: Yup.string().required("Question is required"),
  });

  const formik = useFormik({
    initialValues: {
      answer: answer,
      question: question,
    },
    validationSchema,
    onSubmit: async (values) => {
      dispatch(setLoading(true));
      try {
        // Send image to Firebase storage first
          const payload = {
            question: values.question,
            answer: values.answer,
          };

          console.log("PAYLOAD HERE:: ", payload);

          const res = await APIService.update("/cms/faqs/update", id, payload);

          console.log("RESP HERE >>> ", `${res}`);
          mutate("/faqs/all");
          setOpen(false);
          dispatch(setLoading(false));

          toast.success("Operation successful");
        
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
        placeholder="Enter the question"
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
        placeholder="Enter the answer"
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

