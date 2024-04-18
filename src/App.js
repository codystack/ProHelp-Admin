import { useState, useEffect, useMemo } from "react";

// react-router components
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

// @mui material components
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Icon from "@mui/material/Icon";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";

// Soft UI Dashboard React examples
import Sidenav from "examples/Sidenav";
import Configurator from "examples/Configurator";

// Soft UI Dashboard React themes
import theme from "assets/theme";
// import themeRTL from "assets/theme/theme-rtl";

// RTL plugins
import rtlPlugin from "stylis-plugin-rtl";
// import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

// Soft UI Dashboard React routes
import routes from "routes";

// Soft UI Dashboard React contexts
import {
  useSoftUIController,
  setMiniSidenav,
  setOpenConfigurator,
} from "context";

import { useDispatch, useSelector } from "react-redux";

// Images
import brand from "assets/images/fast-logos/playstore.png";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";

import useProfile from "hooks/profile";
import { setAuth, setProfile } from "./redux/slices/profile";
import { setSupport } from "redux/slices/support";
import { setUsers } from "redux/slices/user";
import { setAdmins } from "redux/slices/admin";
import { Backdrop, CircularProgress } from "@mui/material";
import useSupport from "hooks/support";
import useUsers from "hooks/users";
import useAdmins from "hooks/admins";
import useJobs from "./hooks/useJob";
import { setJobs } from "redux/slices/jobs";
import useJobApplications from "hooks/useJobApplication";
import { setJobApplications } from "redux/slices/jobs";
import useBanner from "hooks/useBanner";
import useFAQ from "hooks/useFAQ";
import { setBanners } from "redux/slices/cms";
import { setFAQs } from "redux/slices/cms";
import useSection from "hooks/useSection";
import { setSections } from "redux/slices/cms";
import { Toaster } from "react-hot-toast";
import useProfessions from "hooks/useProfession";
import { setCategories } from "redux/slices/categories";
import useLegal from "hooks/useLegal";
import { setPolicy } from "redux/slices/legal";
import { setLegal } from "redux/slices/legal";
import { setTerms } from "redux/slices/legal";

export default function App() {
  const [controller, dispatch] = useSoftUIController();
  const { miniSidenav, direction, layout, openConfigurator, sidenavColor } =
    controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const [rtlCache, setRtlCache] = useState(null);
  const { pathname } = useLocation();

  const { data, mutate } = useProfile();
  const { data: jobData } = useJobs(1);
  const { data: bannerData,  } = useBanner(1);
  const { data: sectionData,  } = useSection(1);
  const { data: jobApplicationData } = useJobApplications(1);
  const { data: faqData } = useFAQ(1);
  const { data: legalData } = useLegal();
  const { data: professionData } = useProfessions();
  const { data: supportData, mutate: supportMutate } = useSupport();
  const { data: usersData, mutate: usersMutate } = useUsers(1);
  const { data: adminsData, mutate: adminsMutate } = useAdmins();

  const dispatcher = useDispatch();
  const { profileData, isAuth } = useSelector((state) => state.profile);
  const { isLoading } = useSelector((state) => state.loading);

  console.log("LEGAL :::---::: ",  legalData);

  // const { isAuth, profile } = useSelector((state) => state.auth);

  // Cache for the rtl
  useMemo(() => {
    const cacheRtl = createCache({
      key: "rtl",
      stylisPlugins: [rtlPlugin],
    });

    setRtlCache(cacheRtl);
  }, []);

  useEffect(() => {
    if (data) {
      dispatcher(setAuth(true));
      dispatcher(setProfile(data));
    }

    // if (settingsData) {
    //   dispatcher(setSettings(settingsData?.docs[0]));
    // }
  }, [data, dispatcher]);

  useEffect(() => {
    if (bannerData) {
      dispatcher(setBanners(bannerData?.docs));
    }
    if (sectionData) {
      dispatcher(setSections(sectionData?.docs));
    }
    if (faqData) {
      dispatcher(setFAQs(faqData?.docs));
    }
    if (supportData) {
      dispatcher(setSupport(supportData));
    }
    if (jobData) {
      dispatcher(setJobs(jobData));
    }
    if (jobApplicationData) {
      dispatcher(setJobApplications(jobApplicationData));
    }
    if (professionData) {
      dispatcher(setCategories(professionData?.docs));
    }
    if (legalData) {
      dispatcher(setPolicy(legalData?.docs[0]?.privacy))
      dispatcher(setTerms(legalData?.docs[0]?.terms))
      dispatcher(setLegal(legalData?.docs[0]))
    }
  }, [dispatcher, supportData, jobData, jobApplicationData, bannerData, faqData, sectionData, professionData, legalData]);

  useEffect(() => {
    if (usersData) {
      dispatcher(setUsers(usersData));
    }
    if (adminsData) {
      dispatcher(setAdmins(adminsData));
    }
  }, [usersData, adminsData]);

  // Open sidenav when mouse enter on mini sidenav
  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  // Close sidenav when mouse leave mini sidenav
  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };

  // Change the openConfigurator state
  const handleConfiguratorOpen = () =>
    setOpenConfigurator(dispatch, !openConfigurator);

  // Setting the dir attribute for the body element
  useEffect(() => {
    document.body.setAttribute("dir", direction);
  }, [direction]);

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }

      if (route.route) {
        return (
          <Route
            exact
            path={route.route}
            element={route.component}
            key={route.key}
          />
        );
      }

      return null;
    });

  const configsButton = (
    <SoftBox
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="3.5rem"
      height="3.5rem"
      bgColor="white"
      shadow="sm"
      borderRadius="50%"
      position="fixed"
      right="2rem"
      bottom="2rem"
      zIndex={99}
      color="dark"
      sx={{ cursor: "pointer" }}
      onClick={handleConfiguratorOpen}
    >
      <Icon fontSize="default" color="inherit">
        settings
      </Icon>
    </SoftBox>
  );

  return (
    <ThemeProvider theme={theme}>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Toaster
        position='top-center'
        reverseOrder={false}
        gutter={8}
        toastOptions={{
          duration: 5000,
          success: {
            theme: {
              primary: "green",
              secondary: "black",
            },
          },
        }}
      />
      <CssBaseline />
      {isAuth ? (
        layout === "dashboard" && (
          <>
            <Sidenav
              color={sidenavColor}
              brand={brand}
              brandName="ProHelp Admin"
              routes={routes}
              onMouseEnter={handleOnMouseEnter}
              onMouseLeave={handleOnMouseLeave}
            />
            <Configurator />
            {/* {configsButton} */}
          </>
        )
      ) : (
        <></>
      )}

      {/* {layout === "vr" && <Configurator />} */}
      {!isAuth && !profileData ? (
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
        </Routes>
      ) : (
        <Routes>
          {getRoutes(routes)}
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
      )}
    </ThemeProvider>
  );
}
