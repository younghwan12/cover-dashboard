import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import appApi from "./appApi";
import { rtkErrorLogger } from "./middlewares/rtkErrorLogger";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

import authSlice from "@/features/login/redux/loginSlice";
import userSlice from "@/features/main/redux/userSlice";

const persistConfig = {
    key: "root",
    storage,
};

const reducers = combineReducers({
    [appApi.reducerPath]: appApi.reducer,
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
            .concat(rtkErrorLogger),
    devTools: false,
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
