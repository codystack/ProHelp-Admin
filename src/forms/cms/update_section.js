import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Avatar,
  Box,
  Button,
  Grid,
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
import { TestimonialBox } from "./add_section";
import QuillEditable from "components/richtext/edit_quill";

import oxygenPreview from "../../assets/images/oxygen.png";
import ctaPreview from "../../assets/images/cta.png";
import fullFlexPreview from "../../assets/images/full-flex.png";
import testimonialPreview from "../../assets/images/testimoni_img.gif";
import { setSections } from "redux/slices/cms";

export default function UpdateSectionForm({ setOpen, data }) {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile.profileData);
  const { id, page, title, template, excerpt, content, featuredAsset } = data;

  const returnPreview = () => {
    return template === "full-flex"
      ? fullFlexPreview
      : template === "oxygen"
      ? oxygenPreview
      : template === "testimonial"
      ? testimonialPreview
      : template === "call to action"
      ? ctaPreview
      : "";
  };

  const pickerRef = React.useRef();
  const [mfile, setMFile] = React.useState(null);
  const [previewImage, setPreviewImage] = React.useState(featuredAsset);

  const [showImage, setShowImage] = React.useState(false);
  const [templatePreview, setTemplatePreview] = React.useState(returnPreview());

  const [mcontent, setContent] = React.useState(content);
  const [testimonials, setTestimonials] = React.useState([]);

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Banner title is required"),
    page: Yup.string().required("Banner placement is required"),
    description: Yup.string().nullable(),
  });

  const pages = ["home", "explore", "faq"];
  const templates = ["call to action", "full-flex", "oxygen",];

  const uploadFile = (file) => {
    const storageRef = ref(
      storage,
      "sections/testimonials/" + new Date().getTime()
    );
    const uploadTask = uploadBytesResumable(storageRef, file?.file);

    return uploadTask.then((res) => getDownloadURL(storageRef));
  };

  // Function to handle multiple file uploads using Promise.all
  const uploadMultipleFiles = (files) => {
    const uploadPromises = files.map(uploadFile);

    return Promise.all(uploadPromises);
  };

  const formik = useFormik({
    initialValues: {
      page: page,
      title: title,
      template: template,
      excerpt: excerpt,
    },
    validationSchema,
    onSubmit: async (values) => {
      dispatch(setLoading(true));
      try {
        // Send image to Firebase storage first Updating full-flex image
        if (mfile && values.template === "full-flex") {
          const timeNow = new Date().getTime();
          const storageRef = ref(storage, "sections/" + values.title);
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
                    ...data,
                    page: values.page,
                    title: values.title,
                    excerpt: values.excerpt,
                    featuredAsset: downloadURL,
                    template: values.template,
                    content: mcontent,
                  };

                  console.log("PAYLOAD HERE:: ", payload);

                  const res = await APIService.post(
                    "/cms/sections/update",
                    payload
                  );

                  console.log("RESP HERE >>> ", `${res}`);
                  mutate("/sections/all/");
                  setOpen(false);
                  
                  const resp = await APIService.fetcher("/sections/all/");
                  dispatch(setLoading(false));
                  dispatch(setSections(resp?.docs));

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
        } 
        else if (values.template === "testimonial") {
          if (!testimonials) {
            toast.error("Testimonial data are required!");
          } 
        }
        else  {
          const payload = {
            ...data,
            page: values.page,
            title: values.title,
            excerpt: values.excerpt,
            template: values.template,
            content: mcontent,
          };

          console.log("PAYLOAD HERE:: ", payload);

          const res = await APIService.update(
            "/cms/sections/update",
            id,
            payload
          );

          console.log("RESP HERE >>> ", `${res}`);
          mutate("/sections/all");
          setOpen(false);

          const resp = await APIService.fetcher("/sections/all/");
          dispatch(setLoading(false));
          dispatch(setSections(resp?.docs));

          toast.success("Operation successful");
        }
      } catch (error) {
        toast.error("Page already");
        dispatch(setLoading(false));
      }
    },
  });

  const { errors, getFieldProps, handleSubmit, touched } = formik;


  React.useEffect(() => {
    switch (formik.values.template) {
      case "oxygen":
        setTemplatePreview(oxygenPreview);
        break;

      case "testimonial":
        setTemplatePreview(testimonialPreview);
        break;

      case "full-flex":
        setTemplatePreview(fullFlexPreview);
        setShowImage(true);
        break;

      case "call to action":
        setTemplatePreview(ctaPreview);
        break;

      default:
        setTemplatePreview(null);
        break;
    }
  }, [formik.values.type, formik.values.template]);

  return (
    <Box
      p={2}
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"start"}
      alignItems={"center"}
    >
      {showImage && (
        <AvatrBox
          pickerRef={pickerRef}
          previewImage={previewImage}
          setMFile={setMFile}
          setPreviewImage={setPreviewImage}
        />
      )}
      <br />

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            variant="outlined"
            fullWidth
            {...getFieldProps("title")}
            label="Section Heading"
            placeholder="Enter the heading"
            required
            size="large"
            error={Boolean(touched.title && errors.title)}
            helperText={errors.title}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            variant="outlined"
            fullWidth
            {...getFieldProps("excerpt")}
            label="Short Description"
            placeholder="Enter excerpt"
            error={Boolean(touched.excerpt && errors.excerpt)}
            helperText={errors.excerpt}
          />
        </Grid>
      </Grid>

      <br />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
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
              {pages.map((el, index) => (
                <option
                  style={{ textTransform: "capitalize" }}
                  key={el}
                  value={el}
                >
                  {`${el}`}
                </option>
              ))}
            </NativeSelect>
            <FormHelperText>{errors.page}</FormHelperText>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl
            fullWidth
            error={Boolean(touched.template && errors.template)}
          >
            <p style={{ fontSize: 14 }}>Select Template</p>
            <NativeSelect
              defaultValue={formik.values.template}
              disableUnderline
              variant="outlined"
              onChange={formik.handleChange("template")}
              required
              fullWidth
              value={formik.values.template}
              sx={{ textTransform: "capitalize" }}
              inputProps={{
                name: "template",
                id: "template",
                sx: {
                  minWidth: "100%",
                },
              }}
            >
              {templates.map((el, index) => (
                <option
                  style={{ textTransform: "capitalize" }}
                  key={el}
                  value={el}
                >
                  {`${el}`}
                </option>
              ))}
            </NativeSelect>
            <FormHelperText>{errors.template}</FormHelperText>
          </FormControl>
        </Grid>
      </Grid>

      <Box
        mt={-1}
        width={"100%"}
        display="flex"
        flexDirection={"row"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <img src={templatePreview} width={"50%"} alt="" />
      </Box>

      <br />
      <br />

      <Box width={"97vw"} minHeight={200}>
        <Typography>Content</Typography>
        <QuillEditable
          value={mcontent}
          setValue={setContent}
          placeholder={"Enter the content here"}
        />
      </Box>

      <br />
      <br />

      {formik.values.template === "testimonial" && (
        <Box>
          <TestimonialBox
            setTestimonials={setTestimonials}
            testimonials={testimonials}
          />
        </Box>
      )}

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
