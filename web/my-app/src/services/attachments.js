import fetchUtil from "../utils/hooks/fetchUtils";

//Creating new Attachment
export const createAttachment = async ({ formData, ProjectId}) => {
    try {
      //console.log("UserId", UserId);
      const response = await fetchUtil.post(`attachments/uploads?ProjectId=${ProjectId}`, formData);
      //console.log(response.data);
      return response.data;
    } catch (error) {
    //  console.error(error);
    }
  };

  //Getting Attachments for a project
export const getAttachments = async (ProjectId) => {
  try {
    //console.log("UserId", UserId);
    const response = await fetchUtil.get(`attachments/?ProjectId=${ProjectId}`);
    //console.log("response.data aka attachment in services", response.data);
    return response.data.data;
  } catch (error) {
    //console.error(error);
  }
};

export const deleteAttachment = async (filename, id) => {
  try {
    //console.log("UserId", UserId);
    const response = await fetchUtil.delete(`attachments/delete?filename=${filename}&id=${id}`);
    //console.log("response.data aka attachment in services", response.data);
    return response.data.data;
  } catch (error) {
    
    console.error(error);
    return error;
  }
};
  