import { combineSlices, configureStore } from "@reduxjs/toolkit";

export const rootReducer = combineSlices();

export const extra: { router?: any } = {};

export const store = configureStore({
  reducer: rootReducer,

  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: extra
      }
    })
});
