import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import appApi from "./appApi";
import licenseApi from "./licenseApi";
import { rtkErrorLogger } from "./middlewares/rtkErrorLogger";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

import authSlice from "@/features/login/redux/loginSlice";
import userSlice from "@/features/main/redux/userSlice";

import { codeMgtReducer } from "@/features/codeMgt/redux";
import { userMgtReducer } from "@/features/userMgt/redux";
import { projectMgtReducer } from "@/features/projectMgt/redux";
import { issuesMgtReducer } from "@/features/issues/redux";
import { dashboardReducer } from "@/features/dashboard/redux";
import sessionExpirationMiddleware from "./middlewares/sessionExpiration";

const persistConfig = {
    key: "root",
    storage,
    whitelist: ["login"], // login 슬라이스만 유지하도록 whitelist 설정
};

const reducers = combineReducers({
    [appApi.reducerPath]: appApi.reducer,
    [licenseApi.reducerPath]: licenseApi.reducer,
    code: codeMgtReducer,
    user: userMgtReducer,
    project: projectMgtReducer,
    issues: issuesMgtReducer,
    dashboard: dashboardReducer,
    login: authSlice,
    profile: userSlice,
    // auth: authSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ["persist/PERSIST"],
            },
        })
            .concat(appApi.middleware)
            .concat(licenseApi.middleware)
            .concat(sessionExpirationMiddleware),
    // .concat(rtkErrorLogger),
    devTools: false,
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
