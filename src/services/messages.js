import fetchUtil from "../utils/hooks/fetchUtils";

//getting al messages
export const getMessagesByThread = async (ThreadId) => {
  try {
    const response = await fetchUtil.get(`messages/${ThreadId}`);
   // console.log("response messages.js:", response);
    return response.data;
  } catch (error) {
   // console.error("An error occurred while fetching messages:", error);
  }
};

//getting a message with id
export const getMessage = async (message_id) => {
  try {
    //console.log("message_id", message_id)
    const response = await fetchUtil.get(`messages/get_message/${message_id}`);
    return response;
  } catch (e) {
   // console.log(e);
  }
};

//deleteing a message with is
export const deleteMessage = async (message_id) => {
  try {
    const response = await fetchUtil.delete(`messages/delete/${message_id}`);
    return response.data;
  } catch (e) {
   // console.log(e);
  }
};

//updating a message with id
export const updateMessage = async (messageId, { content }) => {
  //console.log("name, description", name, description);
  try {
    //console.log(`updating id ${message_id}`);
    const response = await fetchUtil.put(`messages/update/${messageId}`, {
      content,
    });
    return response.data;
  } catch (e) {
   // console.log(e);
  }
};

//Creating new message
export const createMessage = async ({ content, UserId, ThreadId }) => {
  try {
    //console.log("UserId", UserId);
    const response = await fetchUtil.post("messages/new_message", {
      content,
      UserId,
      ThreadId,
    });
    //console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
