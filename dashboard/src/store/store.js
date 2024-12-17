import { configureStore } from '@reduxjs/toolkit';
import  userReducer  from './slices/userSlice';
import forgotResetPassReducer from './slices/forgotResetPasswordSlice'
import messageReducer from './slices/messageSlice'
import timelineReducer from './slices/timelineSlice';
import skillReducer from './slices/skillSlice';
import softwareApplicationReduser from './slices/applicationSlice'
import projectReducer from './slices/projectSlice'


export const store = configureStore({
    reducer: {
        user: userReducer,
        forgotPassword: forgotResetPassReducer,
        message: messageReducer,
        timeline: timelineReducer,
        skill: skillReducer,
        application: softwareApplicationReduser,
        project: projectReducer,
    }
})