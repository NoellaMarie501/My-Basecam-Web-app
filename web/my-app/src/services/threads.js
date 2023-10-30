import fetchUtil from "../utils/hooks/fetchUtils";

//Creating new thread
export const createThread = async ({ formData, ProjectId}) => {
    try {
      //console.log("ProjectId", ProjectId);
      //console.log("form",formData)
      const response = await fetchUtil.post(`threads/new_thread/${ProjectId}`, formData);
      //console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  //Getting threads for a project
export const getThreadsByProject = async (ProjectId) => {
  try {
    //console.log("ProjectId", ProjectId);
    const response = await fetchUtil.get(`threads/?ProjectId=${ProjectId}`);
    //console.log("response.data aka thread in services", response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const deleteThread = async (id) => {
  try {
    //console.log("UserId", UserId);
    const response = await fetchUtil.delete(`threads/delete/${id}`);
    //console.log("response.data aka thread in services", response.data);
    return response.data;
  } catch (error) {
    
    console.error(error);
    return error;
  }
};

export const getThread= async (id) =>{
  try {
    const response = await fetchUtil.get(`threads/${id}`);
    //console.log("response.data aka thread in services", response.data);
    return response.data;
  } catch (error) {
    
    console.error(error);
    return error;
  }
}

//updating thread 
export const updateThread= async (ThreadId, {title}) =>{
  try {
    //console.log("title", title)
    const response = await fetchUtil.put(`threads/update/${ThreadId}`, {title});
    //console.log("response.data aka thread in services", response.data);
    return response.data;
  } catch (error) {
    
    console.error(error);
    return error;
  }
}
  