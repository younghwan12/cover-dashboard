import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import appApi from "./appApi";
import { rtkErrorLogger } from "./middlewares";

// import { boardMgtReducer } from "@/features/board/redux";

const reducers = combineReducers({
    // board: boardMgtReducer,
    // cm: cmMgtReducer,
    // wrimodal: wriModalReducer,
    [appApi.reducerPath]: appApi.reducer,
});

export const store = configureStore({
    reducer: reducers,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ["persist/PERSIST"],
            },
        })
            .concat(appApi.middleware)
            .concat(rtkErrorLogger),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
