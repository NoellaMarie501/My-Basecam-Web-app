import { useState } from "react";
import { handleChange } from "../../utils/handleChange";
import { useNavigate, useParams } from "react-router-dom";
import { createThread, getThreadsByProject } from "../../services/threads";

const CreateThread = () => {
  const [form, setForm] = useState({ title: "" });
  const { ProjectId } = useParams();
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();

    createThread({ formData: form, ProjectId }).then((response) => {});
    getThreadsByProject(ProjectId);
    navigate(`/threads/${ProjectId}`);
  };
  return (
    <>
      <form onSubmit={(e) => handleSubmit(e, ProjectId)}>
        <input
          type="text"
          name="title"
          onChange={(e) => handleChange(e, setForm, form)}
          placeholder="Enter Thread Title"
        />
        <button type="submit">Create</button>
      </form>
      <Link className="link-button" to={`/threads/${ProjectId}`}>
        <FaArrowLeft />
        Go back
      </Link>
    </>
  );
};

export default CreateThread;
