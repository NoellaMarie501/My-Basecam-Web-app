import fetchUtil from "../utils/hooks/fetchUtils";

//getting al projects
export const getProjects = async () => {
  try {
    const response = await fetchUtil.get(`projects/all`);
    //console.log("response projects.js:", response.data);
    return response;
  } catch (error) {
    console.error("An error occurred while fetching Projects:", error);
  }
};

//associating user to project
export const AssociateUser = async (userId, projectId) => {
  try {

    console.log("projectId", projectId);
    const response = await fetchUtil.post(`projects/associate/${projectId}/users`, { userId });
    return response.data;
  }
  catch (error) {
    console.error("An error occurred while Associating user to Project:", error);
  }
}
//remove User from project
export const removeUserFromProject = async (userId, projectId) => {
  try {
    const response = await fetchUtil.delete(`projects/remove/${projectId}/users/${userId}`)
    console.log(response.data);
    return response.data;
  }
  catch (error) {
    console.error("An error occurred while removing user from Project:", error);
  }
}

//getting a project with id
export const getProject = async (project_id) => {
  try {
    const response = await fetchUtil.get(`projects/${project_id}`);
    // console.log("id", project_id);
    return response.data;
  } catch (e) {
    console.log(e);
  }
};

//deleteing a project with is
export const deleteProject = async (project_id) => {
  try {
    const response = await fetchUtil.delete(`projects/delete/${project_id}`);
    return response.data;
  } catch (e) {
    console.log(e);
  }
};

//updating a project with id
export const updateProject = async (project_id, { name, description }) => {
  //console.log("name, description", name, description);
  try {
    //console.log(`updating id ${project_id}`);
    const response = await fetchUtil.put(`projects/update/${project_id}`, {
      name,
      description,
    });
    return response.data;
  } catch (e) {
    console.log(e);
  }
};

//Creating new project
export const createProject = async ({ name, description, projectAdmin }) => {
  try {
    //console.log("UserId", UserId);
    const response = await fetchUtil.post("projects/new_project", {
      name,
      description,
      projectAdmin,
    });
    //console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
