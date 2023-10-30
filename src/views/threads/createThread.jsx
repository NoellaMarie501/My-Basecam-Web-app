import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import CreateEditFormThread from "../../components/CreateEditThreadForm";

export default function CreateProject() {
  const [form, setForm] = useState({
    title: "",
  });
  const { ProjectId } = useParams();
  //const handleChange = (e) => setForm({...form, [e.target.name]: e.target.value});

  return (
    <div className="forms">
      <CreateEditFormThread
        ProjectId={ProjectId}
        title={"createThread"}
        type="createThread"
        form={form}
        setForm={setForm}
      />
      <Link className="link-button" to={`/threads/${ProjectId}`}>
        <FaArrowLeft />
        Go back
      </Link>
    </div>
  );
}
