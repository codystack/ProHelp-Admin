import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Avatar,
  Box,
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  InputLabel,
  MenuItem,
  NativeSelect,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "redux/slices/backdrop";
import { CameraAlt, Cancel } from "@mui/icons-material";
import { ref } from "firebase/storage";
import {
  storage,
  uploadBytesResumable,
  getDownloadURL,
} from "../../utils/firebase-config";
import APIService from "service";
import { mutate } from "swr";
import toast from "react-hot-toast";

export default function AddCategoryForm({ setOpen }) {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile.profileData);

  const pickerRef = React.useRef();
  const skillsRef = React.useRef();
  const [mfile, setMFile] = React.useState(null);
  const [previewImage, setPreviewImage] = React.useState("");

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Title is required"),
    skills: Yup.array().required("Skills are required"),
    description: Yup.string().nullable(),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      skills: [],
      description: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      dispatch(setLoading(true));
      try {
        // Send image to Firebase storage first
        const timeNow = new Date().getTime();
        const storageRef = ref(storage, "professions/" + values.name);
        const uploadTask = uploadBytesResumable(storageRef, mfile);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const uprogress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            // setProgress(uprogress);
          },
          (error) => {
            // setIsUploading(false);
            console.log(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref)
              .then(async (downloadURL) => {
                const payload = {
                  name: values.name,
                  image: downloadURL,
                  skills: values.skills,
                  description: values.description,
                };

                const res = await APIService.post(
                  "/profession/create",
                  payload
                );

                dispatch(setLoading(false));

                console.log("RESP HERE >>> ", `${res}`);
                setOpen(false);
                mutate("/profession/all/");
                

                toast.success("Operation successful");
              })
              .catch((error) => {
                dispatch(setLoading(false));
                console.log(
                  "ERROR HERE >>> ",
                  `${error?.message || error?.response?.message}`
                );
              });
          }
        );
      } catch (error) {
        dispatch(setLoading(false));
      }
    },
  });

  const { errors, getFieldProps, handleSubmit, touched, values, setFieldValue } = formik;

  const handleDelete = (value) => {
    const newSkills = values?.skills?.filter((val) => val !== value);
    setFieldValue('skills', newSkills)
  };

  return (
    <Box
      p={2}
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"start"}
      alignItems={"center"}
    >
      <AvatrBox
        pickerRef={pickerRef}
        previewImage={previewImage}
        setMFile={setMFile}
        setPreviewImage={setPreviewImage}
      />
      <br />

      <TextField
        variant="outlined"
        fullWidth
        {...getFieldProps("name")}
        label="Category Name"
        placeholder="Enter the category name"
        required
        size="large"
        error={Boolean(touched.name && errors.name)}
        helperText={errors.name}
      />
      <br />
      <TextField
        variant="outlined"
        fullWidth
        multiline
        minRows={5}
        {...getFieldProps("description")}
        label="Description"
        placeholder="Enter the category description"
        required
        error={Boolean(touched.description && errors.description)}
        helperText={errors.description}
      />
      <br />
      <TextField
          inputRef={skillsRef}
          fullWidth
          variant="outlined"
          size="small"
          margin="none"
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
                // Handle saving the value here
                setFieldValue('skills', [...values.skills, event?.target?.value])
                skillsRef.current.value = "";
              }
          }}
          placeholder={values.skills.length < 5 ? "Enter skill. Press 'Enter' to save" : ""}
          InputProps={{
            startAdornment: (
              <Box sx={{ margin: "0 0.2rem 0 0", display: "flex" }}>
                {values?.skills?.map((data, index) => {
                  return (
                    <Tags data={data} handleDelete={handleDelete} key={index} />
                  );
                })}
              </Box>
            ),
          }}
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

const AvatrBox = ({ pickerRef, previewImage, setPreviewImage, setMFile }) => {
  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        if (event.target?.files[0]) {
          setMFile(file);
          setPreviewImage(URL.createObjectURL(file));
        } else {
          setPreviewImage("");
        }
      } catch (e) {
        console.log("ERROR BRSND ADD ", e);
      }
    } else {
      setMFile(null);
    }
  };

  return (
    <Box
      p={2}
      width={"100%"}
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <IconButton
        sx={{ p: 0, position: "relative" }}
        onClick={() => {
          pickerRef.current.click();
        }}
      >
        <Box
          position={"absolute"}
          bottom={1}
          zIndex={10}
          width={100}
          height={65}
          display="flex"
          flexDirection={"column"}
          justifyContent={"end"}
          alignItems={"center"}
          sx={{
            width: 98,
            height: 64,
            borderRadius: 10,
            backgroundImage: "linear-gradient(transparent, #ccc)",
          }}
        >
          <CameraAlt fontSize="small" sx={{ color: "white", mb: 2 }} />
        </Box>
        <Avatar
          variant="rounded"
          sx={{
            width: 100,
            height: 66,
            borderRadius: 10,
            border: "1px solid #0066F5",
          }}
          alt="Banner logo"
          src={previewImage}
        />
      </IconButton>
      <input
        ref={pickerRef}
        id="image"
        name="image"
        type="file"
        style={{ display: "none" }}
        // value={image}
        onChange={handleFileInputChange}
        placeholder="Featured image banner"
      />
      <Typography fontSize={14} p={2}>
        Featured Image
      </Typography>
    </Box>
  );
};

const Tags = ({ data, handleDelete }) => {
  return (
    <Box
      sx={{
        background: "#283240",
        height: "100%",
        display: "flex",
        padding: "0.1rem",
        margin: "0.2rem 0 0",
        justifyContent: "center",
        alignContent: "center",
        color: "#ffffff",
      }}
    >
      <Stack direction="row" gap={0.5}>
        <Typography fontSize={14} lineHeight={1.1} >{data}</Typography>
        <Cancel
          sx={{ cursor: "pointer" }}
          onClick={() => {
            handleDelete(data);
          }}
        />
      </Stack>
    </Box>
  );
};
