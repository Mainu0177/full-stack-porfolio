import {createSlice} from "@reduxjs/toolkit";
import axios from "axios";

const projectSlice = createSlice({
    name: "project",
    initialState: {
        projects: [],
        loading: false,
        error: null,
        message: null,
    },
    reducers: {
        getAllProjectsRequest(state, action){
            state.projects = [];
            state.error = null;
            state.loading = true;
            state.message = null;
        },
        getAllProjectsSuccess(state, action){
            state.projects = action.payload;
            state.error = null;
            state.loading = false;
            // state.message = "projects loaded successfully"
        },
        getAllProjectsFailed(state, action){
            state.projects = state.projects;
            state.error = action.payload;
            state.loading = false;
        },
        addNewProjectRequest(state, action){
            state.loading = true;
            state.error = null;
            state.message = null;
        },
        addNewProjectSuccess(state, action){
            state.loading = false;
            state.error = null;
            state.message = action.payload;
        },
        addNewProjectFailed(state, action){
            state.loading = false;
            state.error = action.payload;
            state.message = null;
        },
        deleteProjectRequest(state, action){
            state.loading = true;
            state.error = null;
            state.message = null;
        },
        deleteProjectSuccess(state, action){
            state.loading = false;
            state.error = null;
            state.message = action.payload
        },
        deleteProjectFailed(state, action){
            state.loading = false;
            state.error = action.payload;
            state.message = null;
        },
        updateProjectRequest(state, action){
            state.loading = true;
            state.error = null;
            state.message = null;
        },
        updateProjectSuccess(state, action){
            state.loading = false;
            state.error = null;
            state.message = action.payload
        },
        updateProjectFailed(state, action){
            state.loading = false;
            state.error = action.payload;
            state.message = null;
        },
        resetProjectSlice(state, action){
            state.error = null;
            state.message = null;
            state.projects = state.projects;
            state.loading = false;
        },
        clearAllErrors(state, action){
            state.error = null;
            state.projects = state.projects;
        },
    },
});

export const getAllProjects = () => async (dispatch) =>{
    dispatch(projectSlice.actions.getAllProjectsRequest());
    try {
        const { data } = await axios.get("http://localhost:4000/api/v1/project/getAll",
            {withCredentials: true}
        );
        dispatch(projectSlice.actions.getAllProjectsSuccess(data.project));
        dispatch(projectSlice.actions.clearAllErrors())
    } catch (error) {
        dispatch(projectSlice.actions.getAllProjectsFailed(error.response.data.message))
    }
}

export const addNewProject = (addNewProjectData) => async (dispatch) =>{
    dispatch(projectSlice.actions.addNewProjectRequest());
    try {
        const response = await axios.post("http://localhost:4000/api/v1/project/add",
            addNewProjectData,
            {withCredentials: true, headers: {"Content-Type" : "multipart/form-data"}}
        );
        dispatch(projectSlice.actions.addNewProjectSuccess(response.data.message));
        dispatch(projectSlice.actions.clearAllErrors())
    } catch (error) {
        dispatch(projectSlice.actions.addNewProjectFailed(error.response.data.message))
    }
}

export const deleteProject = (id) => async (dispatch) =>{
    dispatch(projectSlice.actions.deleteProjectRequest());
    try {
        const { data } = await axios.delete(`http://localhost:4000/api/v1/project/delete/${id}`,
            {withCredentials: true}
        );
        dispatch(projectSlice.actions.deleteProjectSuccess(data.message));
        dispatch(projectSlice.actions.clearAllErrors())
    } catch (error) {
        dispatch(projectSlice.actions.deleteProjectFailed(error.response.data.message))
    }
}

export const updateProject = (id, newData) => async (dispatch) =>{
    dispatch(projectSlice.actions.updateProjectRequest());
    try {
        const { data } = await axios.put(`http://localhost:4000/api/v1/project/delete/${id}`, 
            {newData},
            {withCredentials: true, headers: {"Content-Type": "multipart/form-data"}}
        )
        dispatch(projectSlice.actions.updateProjectSuccess(data.message));
        dispatch(projectSlice.actions.clearAllErrors())
    } catch (error) {
        dispatch(projectSlice.actions.updateProjectFailed(error.response.data.message))
    }
}

export const clearAllProjectSliceErrors = () => (dispatch) =>{
    dispatch(projectSlice.actions.resetProjectSlice());
}

export const resetProjectSlice = () => (dispatch) =>{
    dispatch(projectSlice.actions.resetProjectSlice())
}



export default projectSlice.reducer;