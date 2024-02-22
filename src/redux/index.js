import { configureStore } from "@reduxjs/toolkit";
import legalReducer from "./slices/legal";
import profileReducer from "./slices/profile";
import loadingReducer from "./slices/backdrop";
import transactionReducer from "./slices/transactions";
import supportReducer from "./slices/support";
import userReducer from "./slices/user";
import adminReducer from "./slices/admin";
import jobReducer from "./slices/jobs";
import settingReducer from "./slices/settings";
import cardReducer from "./slices/cards";
import cmsReducer from "./slices/cms"
import categoryReducer from "./slices/categories"

export default configureStore({
  reducer: {
    legal: legalReducer,
    profile: profileReducer,
    loading: loadingReducer,
    transaction: transactionReducer,
    support: supportReducer,
    user: userReducer,
    admin: adminReducer,
    job: jobReducer,
    setting: settingReducer,
    card: cardReducer,
    cms: cmsReducer,
    category: categoryReducer,
  },
});


