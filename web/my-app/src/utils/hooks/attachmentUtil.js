import { API_URL } from "../../constants/config";

export const AttachementsUtils = (file,ProjectId) => {
  var formdata = new FormData();
  formdata.append("file", file);

  var requestOptions = {
    method: "POST",
    body: formdata,
    redirect: "follow",
  };

  fetch(`${API_URL}/attachments/uploads?ProjectId=${ProjectId}`, requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
};
