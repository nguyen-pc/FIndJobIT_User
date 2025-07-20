import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import accountReducer from "./slice/accountSlide";
import userReducer from "./slice/userReducer";
import companyReducer from "./slice/companySlide";
import skillReducer from "./slice/skillSlide";
import jobReducer from "./slice/jobSlide";
import permissionReducer from "./slice/permissionSlide";
import roleReducer from "./slice/roleSlide";
import resumeReducer from "./slice/ResumeSlide";
import interviewReducer from "./slice/questionSlide";
export const store = configureStore({
  reducer: {
    account: accountReducer,
    user: userReducer,
    company: companyReducer,
    skill: skillReducer,
    job: jobReducer,
    permission: permissionReducer,
    role: roleReducer,
    resume: resumeReducer,
    interview: interviewReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
