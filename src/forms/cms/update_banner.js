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
  NativeSelect,
  TextField,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "redux/slices/backdrop";
import { CameraAlt } from "@mui/icons-material";
import { ref } from "firebase/storage";
import {
  storage,
  uploadBytesResumable,
  getDownloadURL,
} from "../../utils/firebase-config";
import APIService from "service";
import { mutate } from "swr";
import toast from "react-hot-toast";
import { setBanners } from "redux/slices/cms";

export default function UpdateBannerForm({ setOpen, data }) {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile.profileData);
  const { id, page, title, description, featuredImage } = data;


  const pickerRef = React.useRef();
  const [mfile, setMFile] = React.useState(null);
  const [previewImage, setPreviewImage] = React.useState(featuredImage);

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Banner title is required"),
    page: Yup.string().required("Banner placement is required"),
    description: Yup.string().nullable(),
  });

  const formik = useFormik({
    initialValues: {
      page: page,
      title: title,
      description: description,
    },
    validationSchema,
    onSubmit: async (values) => {
      dispatch(setLoading(true));
      try {
        // Send image to Firebase storage first
        if (mfile) {
          const timeNow = new Date().getTime();
          const storageRef = ref(storage, "banners/" + values.title);
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
                    page: values.page,
                    title: values.title,
                    featuredImage: downloadURL,
                    description: values.description,
                  };

                  console.log("PAYLOAD HERE:: ", payload);

                  const res = await APIService.post(
                    "/cms/banners/add",
                    payload
                  );

                  console.log("RESP HERE >>> ", `${res}`);
                  mutate("/banners/all/");
                  setOpen(false);
                  dispatch(setLoading(false));

                  toast.success("Operation successful");
                })
                .catch((error) => {
                  dispatch(setLoading(false));
                  toast.error("Page already selected");
                  console.log(
                    "ERROR HERE >>> ",
                    `${error?.message || error?.response?.message}`
                  );
                });
            }
          );
        } else {
          const payload = {
            page: values.page,
            title: values.title,
            featuredImage: featuredImage,
            description: values.description,
          };

          console.log("PAYLOAD HERE:: ", payload);

          const res = await APIService.update("/cms/banners/update", id, payload);

          console.log("RESP HERE >>> ", `${res}`);
          mutate("/banners/all");
          setOpen(false);

          const resp = await APIService.fetcher("/banners/all/");
          dispatch(setLoading(false))
          dispatch(setBanners(resp?.docs));

          toast.success("Operation successful");
        }
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
        {...getFieldProps("title")}
        label="Banner Title"
        placeholder="Enter the banner title"
        required
        size="large"
        error={Boolean(touched.title && errors.title)}
        helperText={errors.title}
      />
      <br />
      <TextField
        variant="outlined"
        fullWidth
        multiline
        minRows={5}
        {...getFieldProps("description")}
        label="Banner Description"
        placeholder="Enter the banner title"
        required
        error={Boolean(touched.description && errors.description)}
        helperText={errors.description}
      />
      <br />
      <FormControl fullWidth error={Boolean(touched.page && errors.page)}>
        <p style={{ fontSize: 14 }}>Select Page</p>
        <NativeSelect
          defaultValue={formik.values.page}
          disableUnderline
          variant="outlined"
          onChange={formik.handleChange}
          required
          fullWidth
          value={formik.values.page}
          sx={{ textTransform: "capitalize" }}
          inputProps={{
            name: "page",
            id: "Page",
            sx: {
              minWidth: "100%",
            },
          }}
        >
          {["home", "explore", "faq"].map((el, index) => (
            <option style={{ textTransform: "capitalize" }} key={el} value={el}>
              {`${el}`}
            </option>
          ))}
        </NativeSelect>
        <FormHelperText>{errors.page}</FormHelperText>
      </FormControl>

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
