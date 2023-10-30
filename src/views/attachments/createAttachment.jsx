import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "../../constants/config";
import { useProjectsContext } from "../../context/projects/projectsContext";

export default function NewAttachment() {
  const [file, setFile] = useState("");
  const { currentProject } = useProjectsContext();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    var formdata = new FormData();
    formdata.append("file", file[0]);

    var requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };
   
    try {
      const response = await fetch(
        `${API_URL}/attachments/uploads?ProjectId=${currentProject?.id}`,
        requestOptions
      );
      const result = await response.json();
    
    } catch (error) {
      console.log("error: ", error);
    }
    navigate(`/projects/view/${currentProject.id}`);
  };

  return (
    <>
    <form>
      <h1>{`Uploading file to ${currentProject?.name}`}</h1>
      <input
        type="file"
        name="file"
        onChange={(e) => {
          setFile(e.target.files);
          //console.log(e.target.files);
        }}
      />
      <button
        type="submit"
        onClick={(e) => {
          handleSubmit(e);
        }}
      >
        Upload
      </button>
    </form>
     <Link className="link-button" to={`/projects/view/${currentProject.id}`}>
      <FaArrowLeft />
     Go back
   </Link>
    </>
  );
}
