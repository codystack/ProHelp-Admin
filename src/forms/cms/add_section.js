import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardMedia,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  NativeSelect,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "redux/slices/backdrop";
import { CameraAlt, DeleteForever } from "@mui/icons-material";
import { ref } from "firebase/storage";
import {
  storage,
  uploadBytesResumable,
  getDownloadURL,
} from "../../utils/firebase-config";
import APIService from "service";
import { mutate } from "swr";
import toast from "react-hot-toast";
import oxygenPreview from "../../assets/images/oxygen.png";
import ctaPreview from "../../assets/images/cta.png";
import fullFlexPreview from "../../assets/images/full-flex.png";
import testimonialPreview from "../../assets/images/testimoni_img.gif";
import QuillEditor from "components/richtext/quill";
import { setSections } from "redux/slices/cms";
import QuillEditable from "components/richtext/edit_quill";
// import SoftButton from "components/SoftButton";
// import { outlined } from "assets/theme/components/button/outlined";
// import SoftAvatar from "components/SoftAvatar";

export default function AddSectionForm({ setOpen }) {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile.profileData);

  const pickerRef = React.useRef();
  const [mfile, setMFile] = React.useState(null);
  const [showImage, setShowImage] = React.useState(false);
  const [templatePreview, setTemplatePreview] = React.useState("");
  const [previewImage, setPreviewImage] = React.useState("");
  const [content, setContent] = React.useState(null);
  const [testimonials, setTestimonials] = React.useState([]);

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Section heading is required"),
    page: Yup.string().required("Banner placement is required"),
    excerpt: Yup.string().nullable(),
    template: Yup.string().nullable(),
  });

  const pages = ["home", "explore", "faq"];
  const templates = ["call to action", "full-flex", "oxygen", "testimonial"];

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
      page: "",
      title: "",
      excerpt: "",
      template: "",
    },
    // validationSchema,
    onSubmit: async (values) => {
     
      dispatch(setLoading(true));
      try {
        if (values.template === "full-flex") {
          if (!mfile) {
            toast.error("Featured Image is required!");
          } else {

            console.log("FILE  !!!", mfile);
            // Send image to Firebase storage first
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
                      page: values.page,
                      title: values.title,
                      excerpt: values.excerpt,
                      featuredAsset: downloadURL,
                      template: values.template,
                      content: content,
                      testimonials: [],
                    };

                    console.log("PAYLOAD HERE:: ", payload);

                    const res = await APIService.post(
                      "/cms/sections/add",
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
                    // toast.error("Page already selected");
                    console.log(
                      "ERROR HERE >>> ",
                      `${error?.message || error?.response?.message}`
                    );
                  });
              }
            );
          }
        } else if (values.template === "testimonial") {
          if (!testimonials) {
            toast.error("Testimonial data are required!");
          } else {
            const copyOfTestimonial = testimonials;
            const allFiles = copyOfTestimonial?.map((item) => {
              return {
                file: item.file,
              };
            });

            console.log("FILTERED :: ", allFiles);
            console.log("FILTERED FILES :: ", testimonials);

            uploadMultipleFiles(allFiles)
              .then(async (downloadUrls) => {
                console.log("PROMISE RESULT :: ", downloadUrls);

                const testimonialsData = downloadUrls?.map((item, index) => {
                  return {
                    name: testimonials[index]?.name,
                    image: item,
                    message: testimonials[index]?.message,
                  };
                });

                const payload = {
                  page: values.page,
                  title: values.title,
                  excerpt: values.excerpt,
                  featuredImage: downloadUrls,
                  template: values.template,
                  content: content,
                  testimonials: testimonialsData,
                };

                const response = await APIService.post(
                  "/cms/sections/add/",
                  payload
                );

                console.log("RESP HERE >>> ", `${response}`);
                mutate("/sections/all/");
                setOpen(false);
                const resp = await APIService.fetcher("/sections/all/");
                dispatch(setLoading(false));
                dispatch(setSections(resp?.docs));
              })
              .catch((error) => {
                console.log(error);
                dispatch(setLoading(false));
              });
          }
        } else {
          const payload = {
            page: values.page,
            title: values.title,
            excerpt: values.excerpt,
            template: values.template,
            content: content,
          };

          const response = await APIService.post("/cms/sections/add/", payload);

          console.log("RESP HERE >>> ", `${response}`);
          mutate("/sections/all/");
          setOpen(false);

          const resp = await APIService.fetcher("/sections/all/");
          dispatch(setLoading(false));
          dispatch(setSections(resp?.docs));

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
              onChange={formik.handleChange('page')}
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
              defaultValue={formik.values.type}
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

export const AvatrBox = ({ pickerRef, previewImage, setPreviewImage, setMFile }) => {
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

export const TestimonialBox = ({ setTestimonials, testimonials }) => {
  const pickerRef = React.useRef();
  const [mfile, setMFile] = React.useState(null);
  const [previewImage, setPreviewImage] = React.useState("");
  const [testims, setTestims] = React.useState([]);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Title/Name is required"),
    message: Yup.string().required("Short description is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      message: "",
    },
    validationSchema,
    onSubmit: (values) => {
      const array = testimonials;
      const pushed = array.push({
        name: values.name,
        message: values.message,
        file: mfile,
      });
      setTestims(array);
      setTestimonials(array);

      values.name = "";
      values.message = "";
    },
  });

  const { touched, errors, getFieldProps } = formik;

  const deleteItem = (index) => {
    const del = testims.filter((item) => item !== testims[index]);
    setTestims(del);
    setTestimonials(del);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="start"
      width={"80vw"}
    >
      <Grid
        container
        spacing={2}
        display="flex"
        flexDirection="row"
        justifyContent="start"
        alignItems={"stretch"}
        height={"100%"}
      >
        {testims?.map((item, index) => (
          <Grid key={index} item xs={12} sm={6} md={4} height={"100%"}>
            <Box component={Card} display="flex" flexDirection="column">
              <Box
                width="100%"
                display="flex"
                flexDirection="row"
                justifyContent="end"
              >
                <IconButton onClick={() => deleteItem(index)}>
                  <DeleteForever />
                </IconButton>
              </Box>
              <Box display="flex" flexDirection="row" justifyContent="center">
                <Avatar
                  src={`${URL.createObjectURL(item?.file)}`}
                  variant="circular"
                  sx={{ width: 64, height: 64 }}
                />
              </Box>
              <Box p={4}>
                <Typography>{item?.name}</Typography>
                <Typography gutterBottom fontSize={12}>
                  {item?.message}
                </Typography>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <AvatrBox
          pickerRef={pickerRef}
          previewImage={previewImage}
          setMFile={setMFile}
          setPreviewImage={setPreviewImage}
        />

        <TextField
          variant="outlined"
          fullWidth
          {...getFieldProps("name")}
          label="Name"
          sx={{ mx: 2 }}
          placeholder="Enter name"
          error={Boolean(touched.name && errors.name)}
          helperText={errors.name}
        />

        <TextField
          variant="outlined"
          fullWidth
          multiline
          minRows={4}
          {...getFieldProps("message")}
          label="Short Description"
          placeholder="Enter description"
          error={Boolean(touched.message && errors.message)}
          helperText={errors.message}
        />
      </Box>

      <br />
      <Button
        variant="outlined"
        sx={{ color: "black" }}
        onClick={() => formik.handleSubmit()}
      >
        Add Testimonial
      </Button>
    </Box>
  );
};
